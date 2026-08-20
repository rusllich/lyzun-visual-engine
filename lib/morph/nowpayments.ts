import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"

const NOWPAYMENTS_API = "https://api.nowpayments.io/v1"

function requireEnv(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is not configured`)
  return value
}

export type NowPaymentsInvoice = {
  id: string
  invoice_url: string
  order_id?: string
  price_amount?: number
  price_currency?: string
}

export async function createNowPaymentsInvoice(input: {
  priceAmount: number
  priceCurrency: string
  orderId: string
  orderDescription: string
  ipnCallbackUrl: string
  successUrl: string
  cancelUrl: string
}) {
  const response = await fetch(`${NOWPAYMENTS_API}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": requireEnv("NOWPAYMENTS_API_KEY"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: input.priceAmount,
      price_currency: input.priceCurrency.toLowerCase(),
      order_id: input.orderId,
      order_description: input.orderDescription,
      ipn_callback_url: input.ipnCallbackUrl,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
    }),
    cache: "no-store",
  })

  const payload = await response.json().catch(() => null)
  if (!response.ok || !payload?.id || !payload?.invoice_url) {
    throw new Error(`NOWPayments invoice creation failed (${response.status})`)
  }

  return payload as NowPaymentsInvoice
}

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep)
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>).sort().reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = sortDeep((value as Record<string, unknown>)[key])
      return acc
    }, {})
  }
  return value
}

export function verifyNowPaymentsIpn(payload: unknown, signature: string | null) {
  if (!signature) return false
  const secret = requireEnv("NOWPAYMENTS_IPN_SECRET")
  const canonical = JSON.stringify(sortDeep(payload))
  const expected = createHmac("sha512", secret).update(canonical).digest("hex")
  const supplied = signature.trim().toLowerCase()
  if (supplied.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
}
