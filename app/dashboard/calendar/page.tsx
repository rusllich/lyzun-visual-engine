"use client"

import { useEffect, useMemo, useState } from "react"
import { morphSupabaseQuery } from "@/lib/morph/supabase-public"

const TOKEN_KEY = "morph_owner_access"
type Milestone = { id: string; project_id: string; title: string; status: string; internal_target_at: string | null; client_due_at: string | null; completed_at: string | null; sort_order: number; updated_at: string }

function displayDate(value: string | null) {
  if (!value) return "Not scheduled"
  return new Date(value).toLocaleString()
}

export default function CalendarPage() {
  const [rows, setRows] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
      queueMicrotask(() => setLoading(false))
      return
    }
    morphSupabaseQuery<Milestone>("morph_milestones", token, {
      select: "id,project_id,title,status,internal_target_at,client_due_at,completed_at,sort_order,updated_at",
      order: "client_due_at.asc",
      limit: 100,
    })
      .then(setRows)
      .catch(() => setError("Live milestone data is unavailable."))
      .finally(() => setLoading(false))
  }, [])

  const open = useMemo(() => rows.filter((row) => !["completed", "approved"].includes(row.status.toLowerCase())).length, [rows])
  const clientReview = useMemo(() => rows.filter((row) => row.status.toLowerCase() === "client_review").length, [rows])

  return (
    <>
      <header className="border-b border-black/10 pb-8"><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Calendar / milestones</p><h1 className="mt-3 text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Deadlines, reviews<br />and client moments.</h1><p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">Live project milestones and client due dates. No sample launches, fabricated meetings or placeholder deadlines.</p></header>
      <section className="grid border-b border-black/10 sm:grid-cols-2"><article className="py-6 sm:p-6"><p className="text-[9px] uppercase tracking-[0.16em] text-black/35">Open milestones</p><p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{loading ? "—" : String(open).padStart(2, "0")}</p><p className="mt-2 text-xs text-black/40">Live delivery schedule</p></article><article className="py-6 sm:border-l sm:border-black/10 sm:p-6"><p className="text-[9px] uppercase tracking-[0.16em] text-black/35">Client review</p><p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{loading ? "—" : String(clientReview).padStart(2, "0")}</p><p className="mt-2 text-xs text-black/40">Awaiting client moment</p></article></section>
      <section className="py-7">{error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}{!loading && rows.length === 0 ? <div className="rounded-2xl border border-black/10 bg-white p-8"><p className="text-[10px] uppercase tracking-[0.16em] text-black/35">Live schedule</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">No milestones scheduled yet.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-black/45">Milestones will appear here after the first real project is provisioned.</p></div> : <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">{rows.map((row, index) => <article key={row.id} className={`grid gap-4 p-5 lg:grid-cols-[1.2fr_0.55fr_0.8fr] lg:items-center ${index > 0 ? "border-t border-black/10" : ""}`}><div><h2 className="font-semibold tracking-[-0.025em]">{row.title}</h2><p className="mt-1 text-xs text-black/40">Project {row.project_id}</p></div><span className="w-fit rounded-full bg-black/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-black/55">{row.status.replaceAll("_", " ")}</span><div className="lg:text-right"><p className="text-[9px] uppercase tracking-[0.12em] text-black/30">Client due</p><p className="mt-1 text-xs text-black/55">{displayDate(row.client_due_at)}</p></div></article>)}</div>}</section>
    </>
  )
}
