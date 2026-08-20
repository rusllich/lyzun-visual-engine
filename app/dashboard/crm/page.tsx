"use client"

import { useEffect, useMemo, useState } from "react"
import { morphSupabaseQuery } from "@/lib/morph/supabase-public"

const TOKEN_KEY = "morph_owner_access"

type Lead = {
  lead_id: string
  company: string
  niche: string
  priority: "A" | "B" | "C"
  audit_status: string
  outreach_status: string
  next_action: string
  website: string | null
  business_email: string | null
  commercial_fit_score: number
  updated_at: string
}

type Opportunity = {
  opportunity_id: string
  lead_id: string | null
  buyer_company: string | null
  title: string
  status: string
  next_action: string
  estimated_value_min_cents: number | null
  estimated_value_max_cents: number | null
  estimated_currency: string | null
  updated_at: string
}

type Intake = {
  id: string
  status: string
  business: string
  name: string
  email: string
  build: string
  budget: string
  timeline: string
  website: string
  created_at: string
}

type Project = {
  id: string
  title: string
  stage: string
  updated_at: string
}

function moneyRange(opportunity: Opportunity) {
  const currency = opportunity.estimated_currency || "USD"
  const min = opportunity.estimated_value_min_cents
  const max = opportunity.estimated_value_max_cents
  if (min == null && max == null) return "Value not set"

  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  })

  if (min != null && max != null && min !== max) return `${formatter.format(min / 100)}–${formatter.format(max / 100)}`
  return formatter.format(Number(min ?? max) / 100)
}

function priorityScore(priority: Lead["priority"]) {
  return priority === "A" ? 3 : priority === "B" ? 2 : 1
}

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [intake, setIntake] = useState<Intake[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
      queueMicrotask(() => {
        setError("Owner session required.")
        setLoading(false)
      })
      return
    }

    Promise.all([
      morphSupabaseQuery<Lead>("morph_leads", token, {
        select: "lead_id,company,niche,priority,audit_status,outreach_status,next_action,website,business_email,commercial_fit_score,updated_at",
        order: "updated_at.desc",
        limit: 1000,
      }),
      morphSupabaseQuery<Opportunity>("morph_opportunities", token, {
        select: "opportunity_id,lead_id,buyer_company,title,status,next_action,estimated_value_min_cents,estimated_value_max_cents,estimated_currency,updated_at",
        order: "updated_at.desc",
        limit: 250,
      }),
      morphSupabaseQuery<Intake>("morph_intake_submissions", token, {
        select: "id,status,business,name,email,build,budget,timeline,website,created_at",
        order: "created_at.desc",
        limit: 100,
      }),
      morphSupabaseQuery<Project>("morph_projects", token, {
        select: "id,title,stage,updated_at",
        order: "updated_at.desc",
        limit: 250,
      }),
    ])
      .then(([leadRows, opportunityRows, intakeRows, projectRows]) => {
        setLeads(leadRows)
        setOpportunities(opportunityRows)
        setIntake(intakeRows)
        setProjects(projectRows)
      })
      .catch(() => setError("Live CRM data is unavailable."))
      .finally(() => setLoading(false))
  }, [])

  const pipeline = useMemo(() => {
    const statuses = opportunities.map((item) => item.status.toLowerCase())
    const outreach = leads.map((item) => item.outreach_status.toLowerCase())
    const activeDelivery = projects.filter((project) => !["completed", "archived", "cancelled"].includes(project.stage.toLowerCase())).length

    return [
      { label: "Lead", value: outreach.filter((status) => status === "queued").length, note: "Ready for research / outreach" },
      { label: "Contacted", value: outreach.filter((status) => status === "contacted" || status === "contact attempted").length, note: "Outbound touch made" },
      { label: "Reply", value: statuses.filter((status) => ["replied", "meeting"].includes(status)).length, note: "Conversation opened" },
      { label: "Qualified", value: statuses.filter((status) => ["qualified", "review"].includes(status)).length, note: "Commercial fit confirmed" },
      { label: "Proposal", value: statuses.filter((status) => ["proposal_ready", "applied", "proposal"].includes(status)).length, note: "Commercial offer moving" },
      { label: "Won", value: statuses.filter((status) => status === "won").length, note: "Converted to client" },
      { label: "Lost", value: statuses.filter((status) => ["lost", "expired", "do_not_pursue"].includes(status)).length, note: "Closed / not pursuing" },
      { label: "Delivery", value: activeDelivery, note: "Active client projects" },
    ]
  }, [leads, opportunities, projects])

  const nextLeads = useMemo(
    () => [...leads]
      .filter((lead) => !["do not contact"].includes(lead.outreach_status.toLowerCase()))
      .sort((a, b) => priorityScore(b.priority) - priorityScore(a.priority) || b.commercial_fit_score - a.commercial_fit_score)
      .slice(0, 12),
    [leads],
  )

  const activeOpportunities = useMemo(
    () => opportunities.filter((item) => !["lost", "expired", "do_not_pursue"].includes(item.status.toLowerCase())).slice(0, 12),
    [opportunities],
  )

  return (
    <>
      <header className="flex flex-col gap-5 border-b border-black/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Leads / CRM</p>
          <h1 className="mt-3 text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">From first signal<br />to paid delivery.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">Live acquisition and inbound data only. No demo clients, invented revenue, sample proposals or synthetic win rates.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.12em]">
          <span className="rounded-full bg-[#ecebff] px-3 py-2 text-[#5146d8]">{loading ? "—" : leads.length} leads</span>
          <span className="rounded-full bg-black/[0.05] px-3 py-2 text-black/55">{loading ? "—" : intake.length} inbound briefs</span>
        </div>
      </header>

      {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}

      <section className="grid border-b border-black/10 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8" aria-label="Live acquisition pipeline">
        {pipeline.map((stage, index) => (
          <article key={stage.label} className={`py-6 sm:p-5 ${index > 0 ? "sm:border-l sm:border-black/10" : ""}`}>
            <p className="text-[9px] uppercase tracking-[0.16em] text-black/35">{String(index + 1).padStart(2, "0")} · {stage.label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{loading ? "—" : String(stage.value).padStart(2, "0")}</p>
            <p className="mt-2 text-[11px] leading-4 text-black/40">{stage.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-7 border-b border-black/10 py-7 xl:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Website inbound</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Briefs that came to MORPH</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">Every production homepage submission lands here before qualification or project conversion.</p>
        </div>

        {!loading && intake.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-7">
            <p className="text-sm font-semibold">No inbound briefs yet.</p>
            <p className="mt-2 text-xs leading-5 text-black/45">The first real website enquiry will appear here automatically. No placeholder lead is shown.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            {intake.slice(0, 8).map((item, index) => (
              <article key={item.id} className={`grid gap-3 p-5 lg:grid-cols-[1fr_0.8fr_0.7fr] lg:items-center ${index > 0 ? "border-t border-black/10" : ""}`}>
                <div>
                  <h3 className="font-semibold tracking-[-0.025em]">{item.business || item.name}</h3>
                  <p className="mt-1 text-xs text-black/40">{item.name} · {item.email}</p>
                  {item.website && <a href={item.website} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-[10px] font-semibold text-[#5548d9]">Open current site →</a>}
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.13em] text-black/30">Build</p>
                  <p className="mt-1 text-xs font-medium">{item.build}</p>
                  <p className="mt-1 text-xs text-black/40">{item.budget} · {item.timeline}</p>
                </div>
                <div className="lg:text-right">
                  <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-black/55">{item.status}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-7 border-b border-black/10 py-7 xl:grid-cols-2">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Acquisition queue</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Highest-priority next leads</h2>
            </div>
            <span className="text-[10px] text-black/35">Live registry</span>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
            {nextLeads.map((lead, index) => (
              <article key={lead.lead_id} className={`grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-start ${index > 0 ? "border-t border-black/10" : ""}`}>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold tracking-[-0.025em]">{lead.company}</h3>
                    <span className="rounded-full bg-[#ecebff] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#5146d8]">{lead.priority}</span>
                  </div>
                  <p className="mt-1 text-xs text-black/40">{lead.niche || "Unclassified"} · fit {lead.commercial_fit_score}/100</p>
                  <p className="mt-3 text-xs leading-5 text-black/55">{lead.next_action || "Research the current digital surface and choose a specific hook."}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-[10px] font-semibold text-[#5548d9]">
                    {lead.website && <a href={lead.website} target="_blank" rel="noreferrer">Website ↗</a>}
                    {lead.business_email && <a href={`mailto:${lead.business_email}`}>Email ↗</a>}
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-black/55">{lead.outreach_status}</span>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.11em] text-black/30">{lead.audit_status}</p>
                </div>
              </article>
            ))}
            {!loading && nextLeads.length === 0 && <p className="p-6 text-sm text-black/45">No actionable leads in the registry.</p>}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Opportunities</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Commercial work in motion</h2>
            </div>
            <span className="text-[10px] text-black/35">{loading ? "—" : opportunities.length} tracked</span>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
            {activeOpportunities.map((item, index) => (
              <article key={item.opportunity_id} className={`grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-start ${index > 0 ? "border-t border-black/10" : ""}`}>
                <div>
                  <h3 className="font-semibold tracking-[-0.025em]">{item.buyer_company || item.title}</h3>
                  <p className="mt-1 text-xs text-black/40">{item.title}</p>
                  <p className="mt-3 text-xs leading-5 text-black/55">{item.next_action || "Define the next commercial action."}</p>
                </div>
                <div className="sm:text-right">
                  <span className="rounded-full bg-[#ecebff] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-[#5146d8]">{item.status.replaceAll("_", " ")}</span>
                  <p className="mt-2 text-xs font-semibold">{moneyRange(item)}</p>
                </div>
              </article>
            ))}
            {!loading && activeOpportunities.length === 0 && <p className="p-6 text-sm text-black/45">No active opportunities yet.</p>}
          </div>
        </div>
      </section>
    </>
  )
}
