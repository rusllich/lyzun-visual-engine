"use client"

import { useState } from "react"

type PaymentKind = "deposit" | "balance"

export default function PaymentLinkButton({ projectId, kind }: { projectId: string; kind: PaymentKind }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  async function createInvoice() {
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
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={createInvoice} disabled={loading} className="min-h-9 rounded-full border border-black/10 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.11em] disabled:opacity-50">
        {loading ? "Creating…" : `Create ${kind} link`}
      </button>
      {checkoutUrl && <a href={checkoutUrl} target="_blank" rel="noreferrer" className="text-[10px] font-semibold text-[#5548d9]">Open checkout →</a>}
      {error && <span role="alert" className="text-[10px] text-red-700">{error}</span>}
    </div>
  )
}
