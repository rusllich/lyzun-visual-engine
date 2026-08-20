import { Bot, CircleDollarSign, ShieldCheck, Sparkles } from "lucide-react"
import OwnerLiveStats from "@/components/dashboard/OwnerLiveStats"

const operatingStages = ["New lead","Discovery","Proposal","Awaiting deposit","Concept","Client selection","Production","Review / QA","Final payment","Delivered"]

const agentActivity = [
  { icon: Sparkles, title: "Discovery → Strategy", meta: "Client context becomes a structured brief before production." },
  { icon: Bot, title: "Strategy → Production", meta: "Approved direction is handed to design, frontend, backend and motion." },
  { icon: ShieldCheck, title: "Production → QA / Security", meta: "Release stays blocked until quality and security gates pass." },
]

export default function DashboardPage() {
  return <>
    <header className="flex flex-col gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Owner overview</p><h1 className="mt-3 text-[clamp(2.35rem,5vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Know what is moving.<br />Open the detail when needed.</h1></div><a href="/dashboard/projects" className="grid min-h-11 place-items-center rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.13em] text-white">Open projects →</a></header>
    <OwnerLiveStats />
    <div className="grid gap-7 py-7 xl:grid-cols-[1.35fr_0.65fr]">
      <section><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Projects</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Live delivery belongs in Projects</h2></div><a href="/dashboard/projects" className="text-xs font-medium text-[#5548d9]">Open live list →</a></div><div className="mt-5 rounded-2xl border border-black/10 bg-white p-6"><p className="text-sm leading-6 text-black/50">Owner metrics above are live. Detailed project rows are intentionally shown only in the Projects workspace so this overview stays compact and never falls back to demo clients.</p></div></section>
      <section className="rounded-2xl border border-black/10 bg-[#11120f] p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Finance</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Live payment registry</h2></div><CircleDollarSign size={20} className="text-[#8d83ff]" aria-hidden="true" /></div><p className="mt-7 text-sm leading-6 text-white/65">Deposits and balances come from the real MORPH payment table. No example revenue is displayed.</p><a href="/dashboard/finance" className="mt-6 inline-flex text-xs font-semibold text-[#a9a1ff]">Open finance →</a></section>
    </div>
    <section className="border-t border-black/10 py-7"><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Studio pipeline</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Operating model</h2><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{operatingStages.map((stage,index)=><article key={stage} className="rounded-xl border border-black/10 bg-white p-4"><p className="text-[9px] uppercase tracking-[0.13em] text-black/35">{String(index+1).padStart(2,"0")}</p><p className="mt-4 text-sm font-semibold">{stage}</p></article>)}</div></section>
    <section className="border-t border-black/10 py-7"><div className="flex items-center justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">AI workforce</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Handoff logic</h2></div><a href="/dashboard/agents" className="rounded-full bg-[#ecebff] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#5146d8]">Open agents</a></div><div className="mt-5 grid gap-3 lg:grid-cols-3">{agentActivity.map(({icon:Icon,title,meta})=><article key={title} className="flex gap-4 rounded-2xl border border-black/10 bg-white p-5"><div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#ecebff] text-[#5146d8]"><Icon size={15} aria-hidden="true" /></div><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs leading-5 text-black/40">{meta}</p></div></article>)}</div></section>
  </>
}
