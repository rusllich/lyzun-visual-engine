import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { isVerifiedPaidStatus } from "@/lib/morph/payments"
import { verifyNowPaymentsIpn } from "@/lib/morph/nowpayments"
import { morphServiceInsert, morphServicePatch, morphServiceSelectOne } from "@/lib/morph/supabase-server"

type Payment = {
  id: string
  project_id: string
  kind: "deposit" | "balance"
  amount_cents: number
  currency: string
}

type IpPayload = {
  payment_id?: string | number
  payment_status?: string
  order_id?: string
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

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null) as IpPayload | null
    if (!payload || !verifyNowPaymentsIpn(payload, request.headers.get("x-nowpayments-sig"))) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const paymentId = payload.order_id?.trim()
    const providerStatus = payload.payment_status?.trim().toLowerCase()
    if (!paymentId || !providerStatus) return NextResponse.json({ error: "Invalid payment event" }, { status: 400 })

    const payment = await morphServiceSelectOne<Payment>("morph_payments", { id: paymentId }, "id,project_id,kind,amount_cents,currency")
    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 })

    const status = internalStatus(providerStatus)
    const paid = isVerifiedPaidStatus(status)
    const now = new Date().toISOString()

    await morphServicePatch("morph_payments", { id: payment.id }, {
      provider_payment_id: payload.payment_id ? String(payload.payment_id) : null,
      provider_payment_status: providerStatus,
      status,
      verified_at: paid ? now : null,
      updated_at: now,
    })

    await morphServiceInsert("morph_payment_events", {
      event_id: `evt_${randomUUID()}`,
      provider: "nowpayments",
      provider_payment_id: payload.payment_id ? String(payload.payment_id) : payment.id,
      payment_id: payment.id,
      project_id: payment.project_id,
      kind: payment.kind,
      amount_cents: payment.amount_cents,
      currency: payment.currency,
      outcome: providerStatus,
      verified_at: now,
    })

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
