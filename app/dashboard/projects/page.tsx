"use client"

import { useEffect, useMemo, useState } from "react"
import PaymentLinkButton from "@/components/dashboard/PaymentLinkButton"
import { morphSupabaseQuery } from "@/lib/morph/supabase-public"

const TOKEN_KEY = "morph_owner_access"

type Project = {
  id: string
  title: string
  stage: string
  progress: number
  next_milestone: string
  client_due_at: string | null
  payment_state: string
  updated_at: string
  budget_cents: number
  currency: string
}

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
      queueMicrotask(() => setLoading(false))
      return
    }

    morphSupabaseQuery<Project>("morph_projects", token, {
      select: "id,title,stage,progress,next_milestone,client_due_at,payment_state,updated_at,budget_cents,currency",
      order: "updated_at.desc",
      limit: 100,
    })
      .then(setProjects)
      .catch(() => setError("Live project data is unavailable."))
      .finally(() => setLoading(false))
  }, [])

  const stats = useMemo(
    () => ({
      active: projects.filter((project) => !["delivered", "completed", "archived", "cancelled"].includes(project.stage.toLowerCase())).length,
      review: projects.filter((project) => /review|qa/i.test(project.stage)).length,
      planned: projects.filter((project) => /scheduled|planned|deposit/i.test(project.stage)).length,
      completed: projects.filter((project) => /delivered|completed|archived/i.test(project.stage)).length,
    }),
    [projects],
  )

  const summary = [
    ["Active", stats.active, "Currently moving"],
    ["Review / QA", stats.review, "Quality gates"],
    ["Planned", stats.planned, "Scheduled next"],
    ["Completed", stats.completed, "Delivered history"],
  ] as const

  return (
    <>
      <header className="border-b border-black/10 pb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Projects</p>
        <h1 className="mt-3 text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
          Every project.<br />One operational truth.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">
          Live delivery stage, progress, next milestone and commercial gate from the MORPH project registry.
        </p>
      </header>

      <section className="grid border-b border-black/10 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map(([label, value, note], index) => (
          <article key={label} className={`py-6 sm:p-6 ${index > 0 ? "sm:border-l sm:border-black/10" : ""}`}>
            <p className="text-[9px] uppercase tracking-[0.16em] text-black/35">{label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{loading ? "—" : String(value).padStart(2, "0")}</p>
            <p className="mt-2 text-xs text-black/40">{note}</p>
          </article>
        ))}
      </section>

      <section className="py-7">
        {error && (
          <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </p>
        )}

        {!loading && projects.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-8">
            <p className="text-[10px] uppercase tracking-[0.16em] text-black/35">Live registry</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">No projects yet.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
              The first qualified client project will appear here after provisioning. No demo projects are shown.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`grid gap-4 p-5 lg:grid-cols-[1.1fr_0.65fr_0.7fr_1.15fr] lg:items-center ${index > 0 ? "border-t border-black/10" : ""}`}
              >
                <div>
                  <h2 className="font-semibold tracking-[-0.025em]">{project.title}</h2>
                  <p className="mt-2 text-xs text-black/40">Next · {project.next_milestone || "Not assigned"}</p>
                  <p className="mt-1 text-xs font-medium">{money(Number(project.budget_cents || 0), project.currency)}</p>
                </div>

                <div>
                  <div className="flex justify-between text-[9px] uppercase tracking-[0.13em] text-black/40">
                    <span>{project.stage}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                    <div className="h-full rounded-full bg-[#6257e8]" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.13em] text-black/35">Payment gate</p>
                  <p className="mt-2 text-xs font-medium">{project.payment_state}</p>
                </div>

                <div className="grid gap-2">
                  <PaymentLinkButton projectId={project.id} kind="deposit" />
                  <PaymentLinkButton projectId={project.id} kind="balance" />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
