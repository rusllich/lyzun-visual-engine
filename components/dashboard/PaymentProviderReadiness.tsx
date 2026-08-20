"use client"

import { useEffect, useState } from "react"

type ProviderState = "checking" | "ready" | "setup"

type Provider = {
  id: "nowpayments" | "payoneer"
  label: string
  description: string
  endpoint: string
}

const providers: Provider[] = [
  {
    id: "nowpayments",
    label: "NOWPayments",
    description: "Crypto checkout · deposit and balance",
    endpoint: "/api/payments/nowpayments/health",
  },
  {
    id: "payoneer",
    label: "Payoneer Checkout",
    description: "Hosted card / local-method checkout",
    endpoint: "/api/payments/payoneer/health",
  },
]

export default function PaymentProviderReadiness() {
  const [states, setStates] = useState<Record<Provider["id"], ProviderState>>({
    nowpayments: "checking",
    payoneer: "checking",
  })

  useEffect(() => {
    let cancelled = false

    async function check(provider: Provider) {
      try {
        const response = await fetch(provider.endpoint, { cache: "no-store" })
        const payload = await response.json().catch(() => null) as { configured?: boolean } | null
        if (!cancelled) {
          setStates(current => ({
            ...current,
            [provider.id]: response.ok && payload?.configured === true ? "ready" : "setup",
          }))
        }
      } catch {
        if (!cancelled) setStates(current => ({ ...current, [provider.id]: "setup" }))
      }
    }

    void Promise.all(providers.map(check))
    return () => { cancelled = true }
  }, [])

  return (
    <section className="border-b border-black/10 py-7">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.16em] text-black/35">Payment providers</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em]">Checkout readiness</h2>
        </div>
        <p className="max-w-md text-xs leading-5 text-black/40">A provider is shown as ready only when its server-side production configuration is present. Secret values are never exposed here.</p>
      </div>
      <div className="grid overflow-hidden rounded-2xl border border-black/10 bg-white lg:grid-cols-2">
        {providers.map((provider, index) => {
          const state = states[provider.id]
          const ready = state === "ready"
          return (
            <article key={provider.id} className={`flex items-center justify-between gap-5 p-5 ${index ? "border-t border-black/10 lg:border-l lg:border-t-0" : ""}`}>
              <div>
                <p className="font-semibold tracking-[-0.025em]">{provider.label}</p>
                <p className="mt-1 text-xs text-black/40">{provider.description}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] ${ready ? "bg-[#ecebff] text-[#5146d8]" : "bg-black/[0.05] text-black/45"}`}>
                {state === "checking" ? "Checking" : ready ? "Ready" : "Needs setup"}
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}
