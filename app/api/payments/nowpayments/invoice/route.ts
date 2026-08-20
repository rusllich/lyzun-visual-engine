import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { createNowPaymentsInvoice } from "@/lib/morph/nowpayments"
import { paymentAmountCents, type MorphPaymentKind } from "@/lib/morph/payments"
import { bearerToken, morphServerInsert, morphServerPatch, morphServerSelectOne } from "@/lib/morph/supabase-server"

type StudioMember = { role: string }
type Project = { id: string; title: string; budget_cents: number; currency: string; payment_state: string }
type Payment = { id: string; provider_payment_id: string | null; provider_checkout_url: string | null; provider_payment_status: string | null; amount_cents: number; currency: string; status: string }

function publicBaseUrl(request: Request) {
  return process.env.MORPH_PUBLIC_URL?.replace(/\/$/, "") || new URL(request.url).origin
}

async function findActivePayment(accessToken: string, projectId: string, kind: MorphPaymentKind) {
  for (const status of ["pending", "waiting", "confirming"]) {
    const payment = await morphServerSelectOne<Payment>(
      "morph_payments",
      accessToken,
      { project_id: projectId, kind, status },
      "id,provider_payment_id,provider_checkout_url,provider_payment_status,amount_cents,currency,status",
    )
    if (payment) return payment
  }
  return null
}

function existingPaymentResponse(payment: Payment, kind: MorphPaymentKind) {
  if (!payment.provider_checkout_url) {
    return NextResponse.json({ error: "Invoice creation already in progress", paymentId: payment.id }, { status: 409 })
  }
  return NextResponse.json({
    paymentId: payment.id,
    kind,
    amountCents: Number(payment.amount_cents),
    currency: payment.currency.toUpperCase(),
    checkoutUrl: payment.provider_checkout_url,
    providerInvoiceId: payment.provider_payment_id,
    reused: true,
  })
}

export async function POST(request: Request) {
  try {
    const accessToken = bearerToken(request)
    if (!accessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const member = await morphServerSelectOne<StudioMember>("morph_studio_members", accessToken, {}, "role")
    if (!member || !["owner", "admin"].includes(member.role)) return NextResponse.json({ error: "Owner access required" }, { status: 403 })

    const input = await request.json().catch(() => null) as { projectId?: string; kind?: MorphPaymentKind; depositPercent?: number } | null
    if (!input?.projectId || !input.kind || !["deposit", "balance"].includes(input.kind)) {
      return NextResponse.json({ error: "projectId and payment kind are required" }, { status: 400 })
    }

    const project = await morphServerSelectOne<Project>("morph_projects", accessToken, { id: input.projectId }, "id,title,budget_cents,currency,payment_state")
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })

    const existing = await findActivePayment(accessToken, project.id, input.kind)
    if (existing) return existingPaymentResponse(existing, input.kind)

    const amountCents = paymentAmountCents(Number(project.budget_cents), input.kind, input.depositPercent)
    const paymentId = `pay_${randomUUID()}`
    let reservation: Payment | null = null

    try {
      reservation = await morphServerInsert<Payment>("morph_payments", accessToken, {
        id: paymentId,
        project_id: project.id,
        provider: "nowpayments",
        provider_payment_id: null,
        kind: input.kind,
        amount_cents: amountCents,
        currency: project.currency.toUpperCase(),
        status: "pending",
        provider_payment_status: "creating",
        provider_checkout_url: null,
      })
    } catch (error) {
      const raced = await findActivePayment(accessToken, project.id, input.kind)
      if (raced) return existingPaymentResponse(raced, input.kind)
      throw error
    }

    const baseUrl = publicBaseUrl(request)
    try {
      const invoice = await createNowPaymentsInvoice({
        priceAmount: amountCents / 100,
        priceCurrency: project.currency,
        orderId: paymentId,
        orderDescription: `MORPH · ${project.title} · ${input.kind}`,
        ipnCallbackUrl: `${baseUrl}/api/payments/nowpayments/ipn`,
        successUrl: `${baseUrl}/portal?payment=success`,
        cancelUrl: `${baseUrl}/portal?payment=cancelled`,
      })

      await morphServerPatch("morph_payments", accessToken, { id: paymentId }, {
        provider_payment_id: String(invoice.id),
        provider_payment_status: "waiting",
        provider_checkout_url: invoice.invoice_url,
        updated_at: new Date().toISOString(),
      })

      await morphServerPatch("morph_projects", accessToken, { id: project.id }, {
        payment_state: input.kind === "deposit" ? "awaiting_deposit" : "awaiting_balance",
        updated_at: new Date().toISOString(),
      })

      return NextResponse.json({
        paymentId: reservation?.id ?? paymentId,
        kind: input.kind,
        amountCents,
        currency: project.currency.toUpperCase(),
        checkoutUrl: invoice.invoice_url,
        providerInvoiceId: String(invoice.id),
        reused: false,
      }, { status: 201 })
    } catch (error) {
      await morphServerPatch("morph_payments", accessToken, { id: paymentId }, {
        status: "failed",
        provider_payment_status: "creation_failed",
        updated_at: new Date().toISOString(),
      }).catch(() => null)
      throw error
    }
  } catch (error) {
    console.error("[MORPH payments] invoice creation failed", error)
    return NextResponse.json({ error: "Could not create payment invoice" }, { status: 500 })
  }
}
