import { Bot, CircleDollarSign, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react"
import OwnerLiveStats from "@/components/dashboard/OwnerLiveStats"

const stages = [
  { label: "New lead", count: 19 },
  { label: "Discovery", count: 7 },
  { label: "Proposal", count: 5 },
  { label: "Awaiting deposit", count: 4 },
  { label: "Concept", count: 6 },
  { label: "Client selection", count: 3 },
  { label: "Production", count: 8 },
  { label: "Review / QA", count: 4 },
  { label: "Final payment", count: 2 },
  { label: "Delivered", count: 18 },
]

const projects = [
  { name: "Ocean View Hotel", client: "Hospitality", stage: "Production", progress: 64, next: "Homepage design", money: "10% deposit paid" },
  { name: "Velvet Studio", client: "Brand / web", stage: "Client selection", progress: 38, next: "Choose concept 03/05", money: "Concept deposit paid" },
  { name: "ConstructPro", client: "Construction", stage: "Review / QA", progress: 88, next: "Security + mobile QA", money: "Balance pending" },
  { name: "PureSkin Clinic", client: "Aesthetic care", stage: "Discovery", progress: 16, next: "Assets + treatment flows", money: "No payment due yet" },
]

const agentActivity = [
  { icon: MessageSquareText, title: "Discovery Agent requested missing video assets", meta: "PureSkin Clinic · client conversation" },
  { icon: Sparkles, title: "Creative Director prepared 5 concept directions", meta: "Velvet Studio · ready for client selection" },
  { icon: ShieldCheck, title: "Security Agent opened a release blocker", meta: "ConstructPro · auth boundary review" },
  { icon: Bot, title: "Project Director handed approved brief to production", meta: "Ocean View Hotel · design + engineering" },
]

export default function DashboardPage() {
  return (
    <>
      <header className="flex flex-col gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Owner overview</p>
          <h1 className="mt-3 text-[clamp(2.35rem,5vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Know what is moving.<br />Open the detail when needed.</h1>
        </div>
        <a href="/dashboard/projects" className="grid min-h-11 place-items-center rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.13em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Open projects →</a>
      </header>

      <OwnerLiveStats />

      <div className="grid gap-7 py-7 xl:grid-cols-[1.45fr_0.55fr]">
        <section>
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Projects</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">What needs attention now</h2></div>
            <a href="/dashboard/projects" className="text-xs font-medium text-[#5548d9] hover:text-black">Full project list →</a>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
            {projects.map((project, index) => (
              <article key={project.name} className={`grid gap-4 p-5 lg:grid-cols-[1.15fr_0.7fr_0.85fr] lg:items-center ${index > 0 ? "border-t border-black/10" : ""}`}>
                <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold tracking-[-0.025em]">{project.name}</h3><span className="rounded-full bg-black/[0.045] px-2 py-1 text-[9px] uppercase tracking-[0.13em] text-black/45">{project.client}</span></div><p className="mt-2 text-xs text-black/40">Next · {project.next}</p></div>
                <div><div className="flex justify-between text-[9px] uppercase tracking-[0.13em] text-black/40"><span>{project.stage}</span><span>{project.progress}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.07]"><div className="h-full rounded-full bg-[#6257e8]" style={{ width: `${project.progress}%` }} /></div></div>
                <div className="lg:text-right"><p className="text-[9px] uppercase tracking-[0.13em] text-black/35">Commercial state</p><p className="mt-2 text-xs font-medium">{project.money}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-[#11120f] p-6 text-white">
          <div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Finance snapshot</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Live totals above</h2></div><CircleDollarSign size={20} className="text-[#8d83ff]" aria-hidden="true" /></div>
          <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10"><div className="bg-[#11120f] p-4"><p className="text-[9px] uppercase tracking-[0.15em] text-white/35">Gate</p><p className="mt-2 text-xl font-semibold">Deposit</p></div><div className="bg-[#11120f] p-4"><p className="text-[9px] uppercase tracking-[0.15em] text-white/35">Handoff</p><p className="mt-2 text-xl font-semibold">Paid in full</p></div></div>
          <p className="mt-7 text-sm leading-6 text-white/65">Production starts only after the agreed deposit is verified. Final ownership handoff stays locked until the balance is confirmed.</p>
          <a href="/dashboard/finance" className="mt-6 inline-flex text-xs font-semibold text-[#a9a1ff]">Open finance →</a>
        </section>
      </div>

      <section className="border-t border-black/10 py-7">
        <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Studio pipeline</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">From first message to ownership handoff</h2></div><a href="/dashboard/projects" className="text-xs font-medium text-[#5548d9]">Explore pipeline →</a></div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{stages.map(stage => <article key={stage.label} className="rounded-xl border border-black/10 bg-white p-4"><p className="text-[9px] uppercase tracking-[0.13em] text-black/35">{stage.label}</p><p className="mt-4 text-2xl font-semibold tracking-[-0.05em]">{String(stage.count).padStart(2, "0")}</p></article>)}</div>
      </section>

      <section className="border-t border-black/10 py-7">
        <div className="flex items-center justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">AI workforce</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Latest handoffs between agents</h2></div><a href="/dashboard/agents" className="rounded-full bg-[#ecebff] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#5146d8]">Open agents</a></div>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">{agentActivity.map(({ icon: Icon, title, meta }) => <article key={title} className="flex gap-4 rounded-2xl border border-black/10 bg-white p-5"><div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#ecebff] text-[#5146d8]"><Icon size={15} aria-hidden="true" /></div><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-black/35">{meta}</p></div></article>)}</div>
      </section>
    </>
  )
}
