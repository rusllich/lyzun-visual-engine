"use client"

import { FormEvent, useEffect, useState } from "react"
import { morphSignIn, morphSupabaseQuery } from "@/lib/morph/supabase-public"

type Client = { id: string; display_name: string; company_name: string | null }
type Project = { id: string; title: string; stage: string; progress: number; next_milestone: string; client_due_at: string | null; payment_state: string; budget_cents: number; currency: string }
type Milestone = { id: string; project_id: string; title: string; status: string; client_due_at: string | null }

const TOKEN_KEY = "morph_portal_access"

export default function ClientPortalPage() {
  const [token, setToken] = useState<string | null>(null)
  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY)
    if (!stored) {
      queueMicrotask(() => setLoading(false))
      return
    }

    async function restorePortal(accessToken: string) {
      try {
        const clients = await morphSupabaseQuery<Client>("morph_clients", accessToken, { select: "id,display_name,company_name", limit: 1 })
        const currentClient = clients[0] ?? null
        const projectRows = currentClient ? await morphSupabaseQuery<Project>("morph_projects", accessToken, { select: "id,title,stage,progress,next_milestone,client_due_at,payment_state,budget_cents,currency", filters: { client_id: currentClient.id }, order: "updated_at.desc" }) : []
        const milestoneRows = currentClient ? await morphSupabaseQuery<Milestone>("morph_milestones", accessToken, { select: "id,project_id,title,status,client_due_at", order: "sort_order.asc" }) : []
        setToken(accessToken)
        setClient(currentClient)
        setProjects(projectRows)
        setMilestones(milestoneRows)
        setError("")
      } catch (cause) {
        sessionStorage.removeItem(TOKEN_KEY)
        setError(cause instanceof Error ? cause.message : "Could not load your workspace")
      } finally {
        setLoading(false)
      }
    }

    void restorePortal(stored)
  }, [])

  async function loadPortal(accessToken: string) {
    try {
      setLoading(true)
      const clients = await morphSupabaseQuery<Client>("morph_clients", accessToken, { select: "id,display_name,company_name", limit: 1 })
      const currentClient = clients[0] ?? null
      setClient(currentClient)
      if (!currentClient) { setProjects([]); setMilestones([]); return }
      const projectRows = await morphSupabaseQuery<Project>("morph_projects", accessToken, { select: "id,title,stage,progress,next_milestone,client_due_at,payment_state,budget_cents,currency", filters: { client_id: currentClient.id }, order: "updated_at.desc" })
      setProjects(projectRows)
      const milestoneRows = await morphSupabaseQuery<Milestone>("morph_milestones", accessToken, { select: "id,project_id,title,status,client_due_at", order: "sort_order.asc" })
      setMilestones(milestoneRows)
      setError("")
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load your workspace")
    } finally { setLoading(false) }
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      setLoading(true)
      const session = await morphSignIn(String(data.get("email") ?? "").trim(), String(data.get("password") ?? ""))
      sessionStorage.setItem(TOKEN_KEY, session.access_token)
      setToken(session.access_token)
      await loadPortal(session.access_token)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign in failed")
      setLoading(false)
    }
  }

  function signOut() {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null); setClient(null); setProjects([]); setMilestones([]); setError("")
  }

  if (!token) return <main className="grid min-h-screen place-items-center bg-[#f4f4ef] px-5 text-[#11120f]"><form onSubmit={signIn} className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-7 sm:p-10"><p className="text-xl font-black tracking-[-0.06em]">MORPH</p><p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-black/35">Client portal</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em]">Your project,<br />without the noise.</h1><div className="mt-8 grid gap-3"><label className="text-xs font-medium">Email<input name="email" type="email" autoComplete="email" required className="mt-2 min-h-12 w-full rounded-xl border border-black/10 px-4 outline-none focus:border-black" /></label><label className="text-xs font-medium">Password<input name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-12 w-full rounded-xl border border-black/10 px-4 outline-none focus:border-black" /></label></div>{error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}<button disabled={loading} className="mt-6 min-h-12 w-full rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-50">{loading ? "Opening…" : "Open workspace"}</button></form></main>

  return <main className="min-h-screen bg-[#f4f4ef] px-5 py-6 text-[#11120f] sm:px-8 lg:px-14 lg:py-10"><header className="flex items-start justify-between border-b border-black/10 pb-8"><div><p className="text-xl font-black tracking-[-0.06em]">MORPH</p><p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-black/35">Client workspace</p><h1 className="mt-3 text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.065em]">{client?.company_name || client?.display_name || "Your project"}</h1></div><button onClick={signOut} className="min-h-11 rounded-full border border-black/10 bg-white px-4 text-xs font-medium">Sign out</button></header>{error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}{loading ? <p className="py-12 text-sm text-black/45">Loading your workspace…</p> : projects.length === 0 ? <section className="py-16"><p className="text-sm text-black/45">Your account is active. No project has been assigned yet.</p></section> : <div className="grid gap-6 py-8 lg:grid-cols-2">{projects.map(project => <article key={project.id} className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.16em] text-black/35">{project.stage}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{project.title}</h2></div><span className="rounded-full bg-[#ecebff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#5146d8]">{project.progress}%</span></div><div className="mt-7 h-2 overflow-hidden rounded-full bg-black/[0.06]"><div className="h-full rounded-full bg-[#6257e8]" style={{ width: `${project.progress}%` }} /></div><dl className="mt-8 grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-3"><div><dt className="text-[9px] uppercase tracking-[0.14em] text-black/35">Next</dt><dd className="mt-2 text-sm font-medium">{project.next_milestone}</dd></div><div><dt className="text-[9px] uppercase tracking-[0.14em] text-black/35">Payment</dt><dd className="mt-2 text-sm font-medium">{project.payment_state}</dd></div><div><dt className="text-[9px] uppercase tracking-[0.14em] text-black/35">Client due</dt><dd className="mt-2 text-sm font-medium">{project.client_due_at ? new Date(project.client_due_at).toLocaleDateString() : "—"}</dd></div></dl><div className="mt-8"><p className="text-[10px] uppercase tracking-[0.16em] text-black/35">Milestones</p><div className="mt-3 grid gap-2">{milestones.filter(item => item.project_id === project.id).map(item => <div key={item.id} className="flex items-center justify-between rounded-xl bg-black/[0.025] px-4 py-3"><span className="text-sm">{item.title}</span><span className="text-[10px] uppercase tracking-[0.12em] text-black/40">{item.status}</span></div>)}</div></div></article>)}</div>}</main>
}
