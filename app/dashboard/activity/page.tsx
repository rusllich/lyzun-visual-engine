"use client"

import { useEffect, useMemo, useState } from "react"
import { morphSupabaseQuery } from "@/lib/morph/supabase-public"

const TOKEN_KEY = "morph_owner_access"
type Activity = { id: string; event_type: string; actor_type: string; visibility: string; title: string; detail: string | null; occurred_at: string }

export default function ActivityPage() {
  const [rows, setRows] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
      queueMicrotask(() => setLoading(false))
      return
    }
    morphSupabaseQuery<Activity>("morph_activity_events", token, {
      select: "id,event_type,actor_type,visibility,title,detail,occurred_at",
      order: "occurred_at.desc",
      limit: 100,
    })
      .then(setRows)
      .catch(() => setError("Live activity data is unavailable."))
      .finally(() => setLoading(false))
  }, [])

  const today = useMemo(() => {
    const current = new Date().toDateString()
    return rows.filter((row) => new Date(row.occurred_at).toDateString() === current).length
  }, [rows])

  return (
    <>
      <header className="border-b border-black/10 pb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Activity</p>
        <h1 className="mt-3 text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Every meaningful action<br />leaves a real trace.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">Live MORPH activity events only. No simulated client approvals, agent actions or delivery milestones.</p>
      </header>

      <section className="grid border-b border-black/10 sm:grid-cols-2">
        <article className="py-6 sm:p-6"><p className="text-[9px] uppercase tracking-[0.16em] text-black/35">Latest records</p><p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{loading ? "—" : String(rows.length).padStart(2, "0")}</p><p className="mt-2 text-xs text-black/40">Up to 100 live events</p></article>
        <article className="py-6 sm:border-l sm:border-black/10 sm:p-6"><p className="text-[9px] uppercase tracking-[0.16em] text-black/35">Today</p><p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{loading ? "—" : String(today).padStart(2, "0")}</p><p className="mt-2 text-xs text-black/40">Recorded today</p></article>
      </section>

      <section className="py-7">
        {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
        {!loading && rows.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-8"><p className="text-[10px] uppercase tracking-[0.16em] text-black/35">Live log</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">No activity events yet.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-black/45">Operational events will appear here when they are recorded by the MORPH workflow.</p></div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            {rows.map((row, index) => <article key={row.id} className={`grid gap-4 p-5 lg:grid-cols-[1.25fr_0.55fr_0.6fr] lg:items-center ${index > 0 ? "border-t border-black/10" : ""}`}><div><h2 className="font-semibold tracking-[-0.025em]">{row.title}</h2><p className="mt-2 text-xs leading-5 text-black/50">{row.detail || row.event_type}</p></div><div><p className="text-[9px] uppercase tracking-[0.13em] text-black/35">Actor</p><p className="mt-2 text-xs font-medium">{row.actor_type}</p></div><div className="lg:text-right"><p className="text-xs text-black/45">{new Date(row.occurred_at).toLocaleString()}</p><p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-black/30">{row.visibility}</p></div></article>)}
          </div>
        )}
      </section>
    </>
  )
}
