import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { createPayoneerHostedSession, payoneerStoreCode } from "@/lib/morph/payoneer"
import { paymentAmountCents, type MorphPaymentKind } from "@/lib/morph/payments"
import { bearerToken, morphServerInsert, morphServerPatch, morphServerSelectOne } from "@/lib/morph/supabase-server"

type StudioMember = { role: string }
type Project = { id: string; client_id: string; title: string; budget_cents: number; currency: string }
type Client = { id: string; display_name: string; company_name: string | null; email: string | null }
type Payment = { id: string; provider: string | null; provider_payment_id: string | null; provider_checkout_url: string | null; amount_cents: number; currency: string; status: string }

function publicBaseUrl(request: Request) {
  return process.env.MORPH_PUBLIC_URL?.replace(/\/$/, "") || new URL(request.url).origin
}

async function findActivePayment(accessToken: string, projectId: string, kind: MorphPaymentKind) {
  for (const status of ["pending", "waiting", "confirming"]) {
    const payment = await morphServerSelectOne<Payment>(
      "morph_payments",
      accessToken,
      { project_id: projectId, kind, status },
      "id,provider,provider_payment_id,provider_checkout_url,amount_cents,currency,status",
    )
    if (payment) return payment
  }
  return null
}

function isoCountry(value: string) {
  const country = value.trim().toUpperCase()
  return /^[A-Z]{2}$/.test(country) ? country : null
}

export async function POST(request: Request) {
  const accessToken = bearerToken(request)
  if (!accessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const member = await morphServerSelectOne<StudioMember>("morph_studio_members", accessToken, {}, "role")
    if (!member || !["owner", "admin"].includes(member.role)) {
      return NextResponse.json({ error: "Owner access required" }, { status: 403 })
    }

    const input = await request.json().catch(() => null) as { projectId?: string; kind?: MorphPaymentKind; country?: string; depositPercent?: number } | null
    if (!input?.projectId || !input.kind || !["deposit", "balance"].includes(input.kind)) {
      return NextResponse.json({ error: "projectId and payment kind are required" }, { status: 400 })
    }

    const country = isoCountry(input.country || "")
    if (!country) return NextResponse.json({ error: "A 2-letter buyer country code is required for Payoneer" }, { status: 400 })

    const project = await morphServerSelectOne<Project>(
      "morph_projects",
      accessToken,
      { id: input.projectId },
      "id,client_id,title,budget_cents,currency",
    )
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 })

    const existing = await findActivePayment(accessToken, project.id, input.kind)
    if (existing) {
      if (existing.provider === "payoneer" && existing.provider_checkout_url) {
        return NextResponse.json({
          paymentId: existing.id,
          provider: "payoneer",
          checkoutUrl: existing.provider_checkout_url,
          amountCents: Number(existing.amount_cents),
          currency: existing.currency,
          reused: true,
        })
      }
      return NextResponse.json({ error: `An active ${input.kind} invoice already exists via ${existing.provider || "another provider"}` }, { status: 409 })
    }

    const client = await morphServerSelectOne<Client>(
      "morph_clients",
      accessToken,
      { id: project.client_id },
      "id,display_name,company_name,email",
    )
    const amountCents = paymentAmountCents(Number(project.budget_cents), input.kind, input.depositPercent)
    const amount = (amountCents / 100).toFixed(2)
    const paymentId = `pay_${randomUUID()}`
    const now = new Date().toISOString()

    try {
      await morphServerInsert<Payment>("morph_payments", accessToken, {
        id: paymentId,
        project_id: project.id,
        provider: "payoneer",
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
      if (raced?.provider === "payoneer" && raced.provider_checkout_url) {
        return NextResponse.json({ paymentId: raced.id, provider: "payoneer", checkoutUrl: raced.provider_checkout_url, amountCents: Number(raced.amount_cents), currency: raced.currency, reused: true })
      }
      throw error
    }

    const baseUrl = publicBaseUrl(request)
    try {
      const session = await createPayoneerHostedSession({
        division: payoneerStoreCode(),
        integration: "PAY_BY_LINK",
        country,
        channel: "WEB_ORDER",
        payment: {
          amount,
          currency: project.currency.toUpperCase(),
        },
        products: [{
          name: `MORPH · ${project.title} · ${input.kind}`,
          type: "DIGITAL",
          amount,
          quantity: 1,
        }],
        callback: {
          returnUrl: `${baseUrl}/portal?payment=success&provider=payoneer`,
          summaryUrl: `${baseUrl}/portal?payment=success&provider=payoneer`,
          cancelUrl: `${baseUrl}/portal?payment=cancelled&provider=payoneer`,
          notificationUrl: `${baseUrl}/api/payments/payoneer/notification`,
        },
        customer: client ? {
          number: client.id,
          email: client.email || undefined,
          firstName: client.display_name,
          companyName: client.company_name || undefined,
        } : undefined,
      })

      await morphServerPatch("morph_payments", accessToken, { id: paymentId }, {
        provider_payment_id: session.transactionId,
        provider_checkout_url: session.redirectUrl,
        provider_payment_status: "listed",
        status: "waiting",
        updated_at: now,
      })
      await morphServerPatch("morph_projects", accessToken, { id: project.id }, {
        payment_state: input.kind === "deposit" ? "awaiting_deposit" : "awaiting_balance",
        updated_at: now,
      })

      return NextResponse.json({ paymentId, provider: "payoneer", checkoutUrl: session.redirectUrl, providerTransactionId: session.transactionId, amountCents, currency: project.currency.toUpperCase(), reused: false }, { status: 201 })
    } catch (error) {
      await morphServerPatch("morph_payments", accessToken, { id: paymentId }, {
        status: "failed",
        provider_payment_status: "session_creation_failed",
        updated_at: new Date().toISOString(),
      }).catch(() => null)
      throw error
    }
  } catch (error) {
    console.error("[MORPH payments] Payoneer link creation failed", error)
    return NextResponse.json({ error: "Could not create Payoneer payment link" }, { status: 500 })
  }
}
