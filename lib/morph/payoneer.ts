import "server-only"

function requireEnv(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is not configured`)
  return value
}

function basicAuth() {
  const merchantCode = requireEnv("PAYONEER_MERCHANT_CODE")
  const paymentToken = requireEnv("PAYONEER_PAYMENT_TOKEN")
  return `Basic ${Buffer.from(`${merchantCode}:${paymentToken}`).toString("base64")}`
}

export type PayoneerHostedSession = {
  redirectUrl: string
  transactionId: string | null
  raw: unknown
}

export async function createPayoneerHostedSession(payload: Record<string, unknown>): Promise<PayoneerHostedSession> {
  const endpoint = requireEnv("PAYONEER_LIST_ENDPOINT")
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: basicAuth(),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  const data = await response.json().catch(() => null) as Record<string, unknown> | null
  if (!response.ok || !data) throw new Error(`Payoneer LIST request failed (${response.status})`)

  const redirect = data.redirect as Record<string, unknown> | undefined
  const identification = data.identification as Record<string, unknown> | undefined
  const redirectUrl = typeof redirect?.url === "string" ? redirect.url : ""
  if (!redirectUrl) throw new Error("Payoneer LIST response did not include redirect.url")

  return {
    redirectUrl,
    transactionId: typeof identification?.transactionId === "string" ? identification.transactionId : null,
    raw: data,
  }
}

export function payoneerStoreCode() {
  return requireEnv("PAYONEER_STORE_CODE")
}
