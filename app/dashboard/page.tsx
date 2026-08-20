import { Bot, CheckCircle2, CircleDollarSign, Inbox, MessageSquareText } from "lucide-react"

const metrics = [
  { label: "Active projects", value: "06", note: "+2 this month" },
  { label: "Awaiting client", value: "03", note: "2 approvals due" },
  { label: "Planned", value: "04", note: "Next 30 days" },
  { label: "Pipeline value", value: "$38.4k", note: "Qualified + proposal" },
]

const stages = [
  { label: "Discovery", count: 2 },
  { label: "Proposal", count: 3 },
  { label: "Scheduled", count: 2 },
  { label: "Production", count: 4 },
  { label: "Client review", count: 2 },
  { label: "Final QA", count: 1 },
]

const projects = [
  { name: "Aster House", client: "Hospitality", stage: "Production", progress: 64, next: "Homepage motion pass", due: "Aug 27" },
  { name: "Linea Dental", client: "Dental care", stage: "Client review", progress: 82, next: "Approve treatment flow", due: "Aug 23" },
  { name: "Form / Function", client: "Interiors", stage: "Discovery", progress: 18, next: "Content + references", due: "Sep 03" },
  { name: "Northline Build", client: "Construction", stage: "Final QA", progress: 94, next: "Mobile acceptance", due: "Aug 22" },
]

const activity = [
  { icon: Bot, title: "PM Agent prepared weekly status", meta: "Aster House · 8 min ago" },
  { icon: MessageSquareText, title: "Client replied with approval notes", meta: "Linea Dental · 34 min ago" },
  { icon: CheckCircle2, title: "Milestone completed", meta: "Northline Build · 1h ago" },
  { icon: Inbox, title: "New project brief received", meta: "Hospitality lead · 2h ago" },
]

export default function DashboardPage() {
  return (
    <>
      <header className="flex flex-col gap-5 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Studio overview</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5vw,5.8rem)] font-semibold leading-[0.88] tracking-[-0.065em]">Control the work.<br />Keep the client calm.</h1>
        </div>
        <button className="min-h-11 rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.13em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">New project +</button>
      </header>

      <section className="grid border-b border-black/10 sm:grid-cols-2 xl:grid-cols-4" aria-label="Studio metrics">
        {metrics.map((item, index) => (
          <article key={item.label} className={`py-7 sm:p-7 ${index > 0 ? "sm:border-l sm:border-black/10" : ""}`}>
            <p className="text-[10px] uppercase tracking-[0.18em] text-black/35">{item.label}</p>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{item.value}</p>
            <p className="mt-3 text-xs text-black/40">{item.note}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-8 py-8 xl:grid-cols-[1.4fr_0.6fr]">
        <section>
          <div className="flex items-center justify-between">
            <div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Projects</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Live delivery board</h2></div>
            <a href="/dashboard/projects" className="text-xs font-medium text-black/45 hover:text-black">View all →</a>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
            {projects.map((project, index) => (
              <article key={project.name} className={`grid gap-5 p-5 sm:grid-cols-[1.25fr_0.7fr_0.8fr] sm:items-center ${index > 0 ? "border-t border-black/10" : ""}`}>
                <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold tracking-[-0.025em]">{project.name}</h3><span className="rounded-full bg-black/[0.045] px-2 py-1 text-[9px] uppercase tracking-[0.13em] text-black/45">{project.client}</span></div><p className="mt-2 text-xs text-black/40">Next · {project.next}</p></div>
                <div><div className="flex justify-between text-[10px] uppercase tracking-[0.14em] text-black/40"><span>{project.stage}</span><span>{project.progress}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.07]"><div className="h-full rounded-full bg-[#cfe72f]" style={{ width: `${project.progress}%` }} /></div></div>
                <div className="sm:text-right"><p className="text-[10px] uppercase tracking-[0.14em] text-black/35">Next deadline</p><p className="mt-2 text-sm font-medium">{project.due}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-[#11120f] p-6 text-white">
          <div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Finance snapshot</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">$18,650 received</h2></div><CircleDollarSign size={20} className="text-[#d7ff19]" aria-hidden="true" /></div>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10"><div className="bg-[#11120f] p-4"><p className="text-[9px] uppercase tracking-[0.15em] text-white/35">Outstanding</p><p className="mt-2 text-xl font-semibold">$9,800</p></div><div className="bg-[#11120f] p-4"><p className="text-[9px] uppercase tracking-[0.15em] text-white/35">Forecast</p><p className="mt-2 text-xl font-semibold">$28.4k</p></div></div>
          <p className="mt-8 text-sm leading-6 text-white/65">2 deposits and 1 final balance are waiting on client action.</p>
        </section>
      </div>

      <div className="grid gap-8 border-t border-black/10 py-8 xl:grid-cols-2">
        <section><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Pipeline</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Where the work is</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{stages.map((stage) => <div key={stage.label} className="rounded-xl border border-black/10 bg-white p-4"><p className="text-[10px] uppercase tracking-[0.13em] text-black/35">{stage.label}</p><p className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{String(stage.count).padStart(2, "0")}</p></div>)}</div></section>
        <section><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Activity</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Studio + agents</h2></div><span className="rounded-full bg-[#eef4c6] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]">3 agents online</span></div><div className="mt-5 rounded-2xl border border-black/10 bg-white">{activity.map(({ icon: Icon, title, meta }, index) => <div key={title} className={`flex gap-4 p-5 ${index > 0 ? "border-t border-black/10" : ""}`}><div className="grid size-9 shrink-0 place-items-center rounded-full bg-black/[0.04]"><Icon size={15} aria-hidden="true" /></div><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-black/35">{meta}</p></div></div>)}</div></section>
      </div>
    </>
  )
}
