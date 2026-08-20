import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { createNowPaymentsInvoice } from "@/lib/morph/nowpayments"
import { paymentAmountCents, type MorphPaymentKind } from "@/lib/morph/payments"
import { bearerToken, morphServerInsert, morphServerPatch, morphServerSelectOne } from "@/lib/morph/supabase-server"

type StudioMember = { role: string }
type Project = { id: string; title: string; budget_cents: number; currency: string; payment_state: string }
type Payment = { id: string; provider_payment_id: string | null; provider_checkout_url: string | null; amount_cents: number; currency: string; status: string }

function publicBaseUrl(request: Request) {
  return process.env.MORPH_PUBLIC_URL?.replace(/\/$/, "") || new URL(request.url).origin
}

async function findActivePayment(accessToken: string, projectId: string, kind: MorphPaymentKind) {
  for (const status of ["pending", "waiting", "confirming"]) {
    const payment = await morphServerSelectOne<Payment>(
      "morph_payments",
      accessToken,
      { project_id: projectId, kind, status },
      "id,provider_payment_id,provider_checkout_url,amount_cents,currency,status",
    )
    if (payment?.provider_checkout_url) return payment
  }
  return null
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
    if (existing?.provider_checkout_url) {
      return NextResponse.json({
        paymentId: existing.id,
        kind: input.kind,
        amountCents: Number(existing.amount_cents),
        currency: existing.currency.toUpperCase(),
        checkoutUrl: existing.provider_checkout_url,
        providerInvoiceId: existing.provider_payment_id,
        reused: true,
      })
    }

    const amountCents = paymentAmountCents(Number(project.budget_cents), input.kind, input.depositPercent)
    const paymentId = `pay_${randomUUID()}`
    const baseUrl = publicBaseUrl(request)
    const invoice = await createNowPaymentsInvoice({
      priceAmount: amountCents / 100,
      priceCurrency: project.currency,
      orderId: paymentId,
      orderDescription: `MORPH · ${project.title} · ${input.kind}`,
      ipnCallbackUrl: `${baseUrl}/api/payments/nowpayments/ipn`,
      successUrl: `${baseUrl}/portal?payment=success`,
      cancelUrl: `${baseUrl}/portal?payment=cancelled`,
    })

    let payment: Payment | null = null
    try {
      payment = await morphServerInsert<Payment>("morph_payments", accessToken, {
        id: paymentId,
        project_id: project.id,
        provider: "nowpayments",
        provider_payment_id: String(invoice.id),
        kind: input.kind,
        amount_cents: amountCents,
        currency: project.currency.toUpperCase(),
        status: "pending",
        provider_payment_status: "waiting",
        provider_checkout_url: invoice.invoice_url,
      })
    } catch (error) {
      const raced = await findActivePayment(accessToken, project.id, input.kind)
      if (!raced?.provider_checkout_url) throw error
      return NextResponse.json({
        paymentId: raced.id,
        kind: input.kind,
        amountCents: Number(raced.amount_cents),
        currency: raced.currency.toUpperCase(),
        checkoutUrl: raced.provider_checkout_url,
        providerInvoiceId: raced.provider_payment_id,
        reused: true,
      })
    }

    await morphServerPatch("morph_projects", accessToken, { id: project.id }, {
      payment_state: input.kind === "deposit" ? "awaiting_deposit" : "awaiting_balance",
      updated_at: new Date().toISOString(),
    })

    return NextResponse.json({
      paymentId: payment?.id ?? paymentId,
      kind: input.kind,
      amountCents,
      currency: project.currency.toUpperCase(),
      checkoutUrl: invoice.invoice_url,
      providerInvoiceId: String(invoice.id),
      reused: false,
    }, { status: 201 })
  } catch (error) {
    console.error("[MORPH payments] invoice creation failed", error)
    return NextResponse.json({ error: "Could not create payment invoice" }, { status: 500 })
  }
}
