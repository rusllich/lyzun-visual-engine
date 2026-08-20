import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { isVerifiedPaidStatus } from "@/lib/morph/payments"
import { verifyNowPaymentsIpn } from "@/lib/morph/nowpayments"
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

type IpPayload = {
  payment_id?: string | number
  payment_status?: string
  order_id?: string
  price_amount?: string | number
  price_currency?: string
}

function internalStatus(providerStatus: string) {
  switch (providerStatus) {
    case "finished": return "finished"
    case "confirmed": return "confirmed"
    case "confirming": return "confirming"
    case "waiting": return "waiting"
    case "failed": return "failed"
    case "expired": return "expired"
    case "refunded": return "refunded"
    default: return "pending"
  }
}

function eventId(paymentId: string, providerPaymentId: string, providerStatus: string) {
  return `evt_${createHash("sha256").update(`${paymentId}:${providerPaymentId}:${providerStatus}`).digest("hex").slice(0, 32)}`
}

function moneyMatches(payment: Payment, payload: IpPayload) {
  if (payload.price_amount == null || !payload.price_currency) return true
  const cents = Math.round(Number(payload.price_amount) * 100)
  return Number.isFinite(cents) && cents === Number(payment.amount_cents) && payload.price_currency.trim().toUpperCase() === payment.currency.toUpperCase()
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null) as IpPayload | null
    if (!payload || !verifyNowPaymentsIpn(payload, request.headers.get("x-nowpayments-sig"))) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const paymentId = payload.order_id?.trim()
    const providerPaymentId = payload.payment_id ? String(payload.payment_id).trim() : ""
    const providerStatus = payload.payment_status?.trim().toLowerCase()
    if (!paymentId || !providerPaymentId || !providerStatus) {
      return NextResponse.json({ error: "Invalid payment event" }, { status: 400 })
    }

    const payment = await morphServiceSelectOne<Payment>(
      "morph_payments",
      { id: paymentId },
      "id,project_id,provider_payment_id,kind,amount_cents,currency,status,provider_payment_status",
    )
    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    if (!payment.provider_payment_id || payment.provider_payment_id !== providerPaymentId) {
      return NextResponse.json({ error: "Provider payment mismatch" }, { status: 409 })
    }
    if (!moneyMatches(payment, payload)) {
      return NextResponse.json({ error: "Payment amount or currency mismatch" }, { status: 409 })
    }

    const status = internalStatus(providerStatus)
    if (payment.status === status && payment.provider_payment_status === providerStatus) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    const paid = isVerifiedPaidStatus(status)
    const now = new Date().toISOString()

    await morphServicePatch("morph_payments", { id: payment.id }, {
      provider_payment_status: providerStatus,
      status,
      verified_at: paid ? now : null,
      updated_at: now,
    })

    try {
      await morphServiceInsert("morph_payment_events", {
        event_id: eventId(payment.id, providerPaymentId, providerStatus),
        provider: "nowpayments",
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
      console.warn("[MORPH payments] duplicate payment event ignored", error)
    }

    if (paid) {
      await morphServicePatch("morph_projects", { id: payment.project_id }, {
        payment_state: payment.kind === "deposit" ? "deposit_paid" : "paid_in_full",
        updated_at: now,
      })
    } else if (["failed", "expired", "refunded"].includes(status)) {
      await morphServicePatch("morph_projects", { id: payment.project_id }, {
        payment_state: payment.kind === "deposit" ? `deposit_${status}` : `balance_${status}`,
        updated_at: now,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[MORPH payments] IPN processing failed", error)
    return NextResponse.json({ error: "Could not process payment event" }, { status: 500 })
  }
}
