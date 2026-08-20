"use client"

import { useEffect, useState } from "react"

type PaymentKind = "deposit" | "balance"
type PayoneerState = "checking" | "ready" | "setup"

let payoneerReadyPromise: Promise<boolean> | null = null

function checkPayoneerReady() {
  if (!payoneerReadyPromise) {
    payoneerReadyPromise = fetch("/api/payments/payoneer/health", { cache: "no-store" })
      .then(async response => {
        const data = await response.json().catch(() => null) as { configured?: boolean } | null
        return response.ok && data?.configured === true
      })
      .catch(() => false)
  }
  return payoneerReadyPromise
}

export default function PaymentLinkButton({ projectId, kind }: { projectId: string; kind: PaymentKind }) {
  const [loadingProvider, setLoadingProvider] = useState<"nowpayments" | "payoneer" | null>(null)
  const [error, setError] = useState("")
  const [cryptoCheckoutUrl, setCryptoCheckoutUrl] = useState<string | null>(null)
  const [payoneerCheckoutUrl, setPayoneerCheckoutUrl] = useState<string | null>(null)
  const [payoneerState, setPayoneerState] = useState<PayoneerState>("checking")
  const [country, setCountry] = useState("")

  useEffect(() => {
    let active = true
    void checkPayoneerReady().then(ready => {
      if (active) setPayoneerState(ready ? "ready" : "setup")
    })
    return () => { active = false }
  }, [])

  async function createCryptoInvoice() {
    const token = sessionStorage.getItem("morph_owner_access")
    if (!token) {
      setError("Owner session required")
      return
    }

    try {
      setLoadingProvider("nowpayments")
      setError("")
      const response = await fetch("/api/payments/nowpayments/invoice", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, kind }),
      })
      const data = await response.json() as { checkoutUrl?: string; error?: string }
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error || "Could not create invoice")
      setCryptoCheckoutUrl(data.checkoutUrl)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create invoice")
    } finally {
      setLoadingProvider(null)
    }
  }

  async function createPayoneerLink() {
    const token = sessionStorage.getItem("morph_owner_access")
    if (!token) {
      setError("Owner session required")
      return
    }

    const buyerCountry = country.trim().toUpperCase()
    if (!/^[A-Z]{2}$/.test(buyerCountry)) {
      setError("Enter the buyer country as a 2-letter code")
      return
    }

    try {
      setLoadingProvider("payoneer")
      setError("")
      const response = await fetch("/api/payments/payoneer/link", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, kind, country: buyerCountry }),
      })
      const data = await response.json() as { checkoutUrl?: string; error?: string }
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error || "Could not create Payoneer link")
      setPayoneerCheckoutUrl(data.checkoutUrl)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create Payoneer link")
    } finally {
      setLoadingProvider(null)
    }
  }

  const payoneerReady = payoneerState === "ready"
  const validCountry = /^[A-Z]{2}$/.test(country.trim().toUpperCase())

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={createCryptoInvoice}
          disabled={loadingProvider !== null}
          className="min-h-9 rounded-full border border-black/10 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.11em] disabled:opacity-50"
        >
          {loadingProvider === "nowpayments" ? "Creating…" : `Crypto · ${kind}`}
        </button>
        {cryptoCheckoutUrl && <a href={cryptoCheckoutUrl} target="_blank" rel="noreferrer" className="text-[10px] font-semibold text-[#5548d9]">Open checkout →</a>}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {payoneerReady && (
          <input
            value={country}
            onChange={(event) => setCountry(event.target.value.replace(/[^a-z]/gi, "").slice(0, 2).toUpperCase())}
            inputMode="text"
            autoCapitalize="characters"
            maxLength={2}
            aria-label="Buyer country code"
            placeholder="US"
            className="h-9 w-12 rounded-full border border-black/10 bg-white px-2 text-center text-[10px] font-semibold uppercase outline-none focus:border-[#6257e8]"
          />
        )}
        <button
          type="button"
          onClick={createPayoneerLink}
          disabled={!payoneerReady || !validCountry || loadingProvider !== null}
          title={payoneerReady ? "Enter the buyer country code, then create the hosted Payoneer link" : "Payoneer Checkout merchant setup required"}
          className="min-h-9 rounded-full border border-black/10 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.11em] disabled:cursor-not-allowed disabled:bg-black/[0.025] disabled:text-black/35"
        >
          {loadingProvider === "payoneer" ? "Creating…" : `Payoneer · ${kind}`}
        </button>
        {payoneerCheckoutUrl && <a href={payoneerCheckoutUrl} target="_blank" rel="noreferrer" className="text-[10px] font-semibold text-[#5548d9]">Open Payoneer →</a>}
        <span className="text-[9px] uppercase tracking-[0.12em] text-black/35">
          {payoneerState === "checking" ? "Checking" : payoneerReady ? "Ready" : "Needs merchant setup"}
        </span>
      </div>

      {error && <span role="alert" className="text-[10px] text-red-700">{error}</span>}
    </div>
  )
}
