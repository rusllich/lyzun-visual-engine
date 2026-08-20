import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { morphServiceInsert, morphServicePatch, morphServiceSelectOne } from "@/lib/morph/supabase-server"

type Payment = {
  id: string
  project_id: string
  provider_payment_id: string | null
  kind: "deposit" | "balance"
  amount_cents: number
  currency: string
  status: string
  provider_payment_status: string | null
}

type Json = Record<string, unknown>

function safeEqual(received: string, expected: string) {
  const a = Buffer.from(received)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

function nested(value: unknown, key: string) {
  return value && typeof value === "object" ? (value as Json)[key] : undefined
}

function asString(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : ""
}

function transactionId(payload: Json) {
  return asString(payload.transactionId)
    || asString(nested(payload.identification, "transactionId"))
    || asString(nested(payload.transaction, "transactionId"))
    || asString(nested(payload.transaction, "id"))
}

function statusCode(payload: Json) {
  return (asString(payload.statusCode)
    || asString(payload.status)
    || asString(nested(payload.transaction, "statusCode"))
    || asString(nested(payload.transaction, "status"))).toLowerCase()
}

function paymentDetails(payload: Json) {
  const root = (payload.payment && typeof payload.payment === "object" ? payload.payment : nested(payload.transaction, "payment")) as Json | undefined
  return {
    amount: root ? Number(root.amount) : NaN,
    currency: root ? asString(root.currency).toUpperCase() : "",
  }
}

function eventId(paymentId: string, providerPaymentId: string, status: string) {
  return `evt_${createHash("sha256").update(`payoneer:${paymentId}:${providerPaymentId}:${status}`).digest("hex").slice(0, 32)}`
}

function paidStatus(status: string) {
  return status === "charged" || status === "debited"
}

function failedStatus(status: string) {
  return ["failed", "declined", "cancelled", "canceled", "expired"].includes(status)
}

function authorized(request: Request) {
  const expected = process.env.PAYONEER_NOTIFICATION_SECRET?.trim() || ""
  const received = request.headers.get("x-morph-payoneer-token")?.trim() || ""
  return Boolean(expected && received && safeEqual(received, expected))
}

async function processPayload(payload: Json) {
  const providerPaymentId = transactionId(payload)
  const providerStatus = statusCode(payload)
  if (!providerPaymentId || !providerStatus) return NextResponse.json({ error: "Missing transaction identity or status" }, { status: 400 })

  const payment = await morphServiceSelectOne<Payment>(
    "morph_payments",
    { provider: "payoneer", provider_payment_id: providerPaymentId },
    "id,project_id,provider_payment_id,kind,amount_cents,currency,status,provider_payment_status",
  )
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 })

  const details = paymentDetails(payload)
  if (Number.isFinite(details.amount) && Math.round(details.amount * 100) !== Number(payment.amount_cents)) return NextResponse.json({ error: "Amount mismatch" }, { status: 409 })
  if (details.currency && details.currency !== payment.currency.toUpperCase()) return NextResponse.json({ error: "Currency mismatch" }, { status: 409 })
  if (payment.provider_payment_status === providerStatus) return NextResponse.json({ ok: true, duplicate: true })

  const paid = paidStatus(providerStatus)
  const failed = failedStatus(providerStatus)
  const now = new Date().toISOString()
  const alreadyVerified = payment.status === "confirmed"
  const nextStatus = paid ? "confirmed" : alreadyVerified ? "confirmed" : failed ? "failed" : "confirming"

  await morphServicePatch("morph_payments", { id: payment.id }, {
    status: nextStatus,
    provider_payment_status: providerStatus,
    verified_at: paid ? now : undefined,
    updated_at: now,
  })

  try {
    await morphServiceInsert("morph_payment_events", {
      event_id: eventId(payment.id, providerPaymentId, providerStatus),
      provider: "payoneer",
      provider_payment_id: providerPaymentId,
      payment_id: payment.id,
      project_id: payment.project_id,
      kind: payment.kind,
      amount_cents: payment.amount_cents,
      currency: payment.currency,
      outcome: providerStatus,
      verified_at: now,
    })
  } catch (error) {
    console.warn("[MORPH payments] duplicate Payoneer event ignored", error)
  }

  if (paid) {
    await morphServicePatch("morph_projects", { id: payment.project_id }, {
      payment_state: payment.kind === "deposit" ? "deposit_paid" : "paid_in_full",
      updated_at: now,
    })
  } else if (failed && !alreadyVerified) {
    await morphServicePatch("morph_projects", { id: payment.project_id }, {
      payment_state: payment.kind === "deposit" ? "deposit_failed" : "balance_failed",
      updated_at: now,
    })
  }

  return NextResponse.json({ ok: true })
}

export async function POST(request: Request) {
  try {
    if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const payload = await request.json().catch(() => null) as Json | null
    if (!payload) return NextResponse.json({ error: "Invalid notification" }, { status: 400 })
    return await processPayload(payload)
  } catch (error) {
    console.error("[MORPH payments] Payoneer notification failed", error)
    return NextResponse.json({ error: "Could not process notification" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const url = new URL(request.url)
    return await processPayload(Object.fromEntries(url.searchParams.entries()))
  } catch (error) {
    console.error("[MORPH payments] Payoneer notification failed", error)
    return NextResponse.json({ error: "Could not process notification" }, { status: 500 })
  }
}
