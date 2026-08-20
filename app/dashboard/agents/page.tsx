const agents = [
  { name: "Intake Director", role: "Receives new requests and creates the lead record", handoff: "Discovery Strategist" },
  { name: "Discovery Strategist", role: "Runs client interviews, asset audits and requirement discovery", handoff: "Strategy / Spec" },
  { name: "Strategy & Spec Architect", role: "Turns discovery into scope, IA, creative brief and production specification", handoff: "Creative Director" },
  { name: "Creative Director", role: "Creates distinct concept directions and resolves client feedback", handoff: "UX + Design" },
  { name: "UX / Product Designer", role: "Builds user flows, wireframes, conversion logic and responsive UX", handoff: "Art + Frontend" },
  { name: "Art Director", role: "Owns typography, composition, visual system and concept fidelity", handoff: "Frontend + Motion" },
  { name: "Frontend Engineer", role: "Implements the approved experience in production code", handoff: "QA" },
  { name: "Backend Engineer", role: "Builds APIs, auth, data, integrations and operational services", handoff: "Security + QA" },
  { name: "Motion / 3D Director", role: "Adds motion, WebGL and interaction only where the concept benefits", handoff: "Frontend" },
  { name: "QA Engineer", role: "Checks responsive, browser, forms, regressions and delivery states", handoff: "Security" },
  { name: "Security Engineer", role: "Reviews permissions, auth, APIs, secrets, webhooks and release risk", handoff: "Project Director" },
  { name: "Finance Agent", role: "Tracks deposit, invoices, verified payments and outstanding balances", handoff: "Project Director" },
  { name: "Project Director", role: "Coordinates handoffs, blockers, milestones and client dependencies", handoff: "Owner / Client" },
]

const workflow = [
  "New message",
  "Intake",
  "Deep discovery",
  "Scope + proposal",
  "Deposit gate",
  "Concept direction",
  "Client selection",
  "Production",
  "QA + security",
  "Protected preview",
  "Final payment",
  "Owner handoff",
]

export default function AgentsPage() {
  return (
    <>
      <header className="border-b border-black/10 pb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">AI workforce</p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">A studio of specialists.<br />One visible chain of responsibility.</h1><p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">This page describes the operating roles and handoff model. It does not fabricate current assignments, utilization, quality scores or client activity.</p></div>
          <div className="rounded-full bg-[#ecebff] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5146d8]">13 defined roles</div>
        </div>
      </header>

      <section className="py-7">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Operating chain</p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">{workflow.map((step, index) => <div key={step} className="flex shrink-0 items-center gap-2"><span className="rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] font-medium">{String(index + 1).padStart(2, "0")} · {step}</span>{index < workflow.length - 1 && <span className="text-black/20">→</span>}</div>)}</div>
      </section>

      <section className="border-t border-black/10 py-7">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <article key={agent.name} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="flex items-start justify-between gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ecebff] text-xs font-black text-[#5146d8]">{agent.name.split(" ").map(part => part[0]).slice(0, 2).join("")}</div><span className="rounded-full bg-black/[0.045] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/55">Defined role</span></div>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.035em]">{agent.name}</h2>
              <p className="mt-2 min-h-12 text-xs leading-5 text-black/45">{agent.role}</p>
              <div className="mt-5 rounded-xl bg-[#f7f7f3] px-3 py-3"><p className="text-[8px] uppercase tracking-[0.13em] text-black/30">Next handoff</p><p className="mt-1 text-xs font-medium">→ {agent.handoff}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 border-t border-black/10 py-7 lg:grid-cols-2">
        <article className="rounded-2xl border border-black/10 bg-[#11120f] p-6 text-white"><p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Approval boundaries</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Autonomy where safe. Approval where consequential.</h2><div className="mt-6 grid gap-3 text-sm text-white/65"><p>Internal analysis, summaries, briefs and status updates → autonomous + logged.</p><p>Client-facing messages → workflow policy and audit trail.</p><p>Deposits and payment verification → state updates from verified provider events.</p><p>Refunds, payouts, transfers and final ownership handoff → owner-controlled.</p></div></article>
        <article className="rounded-2xl border border-black/10 bg-white p-6"><p className="text-[10px] uppercase tracking-[0.18em] text-black/35">Runtime state</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Live activity belongs in the live registries.</h2><p className="mt-5 text-sm leading-6 text-black/50">Current leads, opportunities, messages, projects and payments are shown in CRM, Messages, Projects and Finance. Agent cards remain role definitions until a measured assignment registry exists.</p></article>
      </section>
    </>
  )
}
