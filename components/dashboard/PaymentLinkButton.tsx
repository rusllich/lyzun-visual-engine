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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [payoneerState, setPayoneerState] = useState<PayoneerState>("checking")

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
      setLoading(true)
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
      setCheckoutUrl(data.checkoutUrl)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create invoice")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={createCryptoInvoice} disabled={loading} className="min-h-9 rounded-full border border-black/10 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.11em] disabled:opacity-50">
          {loading ? "Creating…" : `Crypto · ${kind}`}
        </button>
        {checkoutUrl && <a href={checkoutUrl} target="_blank" rel="noreferrer" className="text-[10px] font-semibold text-[#5548d9]">Open checkout →</a>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button disabled title={payoneerState === "ready" ? "Payoneer checkout route is being activated next" : "Payoneer Checkout merchant setup required"} className="min-h-9 cursor-not-allowed rounded-full border border-black/10 bg-black/[0.025] px-3 text-[10px] font-semibold uppercase tracking-[0.11em] text-black/35">
          Payoneer · {kind}
        </button>
        <span className="text-[9px] uppercase tracking-[0.12em] text-black/35">
          {payoneerState === "checking" ? "Checking" : payoneerState === "ready" ? "Configured · route pending" : "Needs merchant setup"}
        </span>
      </div>
      {error && <span role="alert" className="text-[10px] text-red-700">{error}</span>}
    </div>
  )
}
