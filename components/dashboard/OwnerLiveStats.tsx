"use client"

import { useEffect, useState } from "react"
import { morphSupabaseRpc } from "@/lib/morph/supabase-public"

const TOKEN_KEY = "morph_owner_access"

type Snapshot = {
  lead_count: number
  queued_leads: number
  contacted_leads: number
  client_count: number
  project_count: number
  active_projects: number
  planned_projects: number
  awaiting_deposit: number
  completed_projects: number
  payments_received_cents: number
  payments_pending_cents: number
}

function money(cents: number) {
  return new Intl.NumberFormat("en", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(cents / 100)
}

export default function OwnerLiveStats() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) return

    async function load(accessToken: string) {
      try {
        const data = await morphSupabaseRpc<Snapshot>("morph_owner_dashboard_snapshot", accessToken)
        setSnapshot(data)
      } catch {
        setError(true)
      }
    }

    void load(token)
  }, [])

  const items = snapshot ? [
    { label: "Active projects", value: String(snapshot.active_projects).padStart(2, "0"), note: `${snapshot.project_count} total project records` },
    { label: "Planned", value: String(snapshot.planned_projects).padStart(2, "0"), note: "Scheduled / deposit-paid" },
    { label: "Leads in motion", value: String(snapshot.contacted_leads).padStart(2, "0"), note: `${snapshot.lead_count} leads in registry` },
    { label: "Awaiting deposit", value: String(snapshot.awaiting_deposit).padStart(2, "0"), note: "Production gate" },
    { label: "Clients", value: String(snapshot.client_count).padStart(2, "0"), note: `${snapshot.completed_projects} completed` },
    { label: "Received", value: money(snapshot.payments_received_cents), note: `${money(snapshot.payments_pending_cents)} pending` },
  ] : [
    { label: "Active projects", value: "—", note: "Loading live data" },
    { label: "Planned", value: "—", note: "Loading live data" },
    { label: "Leads in motion", value: "—", note: "Loading live data" },
    { label: "Awaiting deposit", value: "—", note: "Loading live data" },
    { label: "Clients", value: "—", note: "Loading live data" },
    { label: "Received", value: "—", note: "Loading live data" },
  ]

  return (
    <section className="grid border-b border-black/10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6" aria-label="Live owner metrics">
      {items.map((item, index) => (
        <article key={item.label} className={`py-6 sm:p-6 ${index > 0 ? "sm:border-l sm:border-black/10" : ""}`}>
          <p className="text-[9px] uppercase tracking-[0.17em] text-black/35">{item.label}</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">{item.value}</p>
          <p className="mt-2 text-[11px] text-black/40">{error ? "Live data unavailable" : item.note}</p>
        </article>
      ))}
    </section>
  )
}
