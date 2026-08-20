const agents = [
  { name: "Intake Director", role: "Receives new requests and creates the lead record", status: "Online", assignment: "3 new enquiries", handoff: "Discovery Strategist", quality: "98%" },
  { name: "Discovery Strategist", role: "Runs deep client interviews, asset audits and requirement discovery", status: "Live", assignment: "PureSkin Clinic", handoff: "Strategy / Spec", quality: "96%" },
  { name: "Strategy & Spec Architect", role: "Turns discovery into scope, IA, creative brief and production specification", status: "Working", assignment: "Ocean View Hotel", handoff: "Creative Director", quality: "94%" },
  { name: "Creative Director", role: "Creates five distinct concept directions and resolves client feedback", status: "Review", assignment: "Velvet Studio", handoff: "UX + Design", quality: "95%" },
  { name: "UX / Product Designer", role: "Builds user flows, wireframes, conversion logic and responsive UX", status: "Working", assignment: "Ocean View Hotel", handoff: "Art + Frontend", quality: "93%" },
  { name: "Art Director", role: "Owns typography, composition, visual system and concept fidelity", status: "Working", assignment: "Ocean View Hotel", handoff: "Frontend + Motion", quality: "97%" },
  { name: "Frontend Engineer", role: "Implements the approved experience in production code", status: "Working", assignment: "ConstructPro", handoff: "QA", quality: "95%" },
  { name: "Backend Engineer", role: "Builds APIs, auth, data, integrations and operational services", status: "Queued", assignment: "ConstructPro", handoff: "Security + QA", quality: "94%" },
  { name: "Motion / 3D Director", role: "Adds motion, WebGL and interaction only where the concept benefits", status: "Idle", assignment: "Available", handoff: "Frontend", quality: "92%" },
  { name: "QA Engineer", role: "Checks responsive, browser, forms, regressions and delivery states", status: "Running", assignment: "ConstructPro", handoff: "Security", quality: "98%" },
  { name: "Security Engineer", role: "Reviews permissions, auth, APIs, secrets, webhooks and release risk", status: "Blocker", assignment: "ConstructPro", handoff: "Project Director", quality: "99%" },
  { name: "Finance Agent", role: "Tracks deposit, invoices, verified payments and outstanding balances", status: "Watching", assignment: "6 payment states", handoff: "Project Director", quality: "99%" },
  { name: "Project Director", role: "Coordinates handoffs, blockers, milestones and client dependencies", status: "Online", assignment: "6 active projects", handoff: "Owner / Client", quality: "97%" },
]

const workflow = [
  "New message",
  "Intake",
  "Deep discovery",
  "Scope + proposal",
  "Deposit gate",
  "5 concepts",
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
          <div><h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">A studio of specialists.<br />One visible chain of responsibility.</h1><p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">Every agent owns a narrow job, records its actions and hands structured context to the next specialist. External communication and financial movement keep explicit approval boundaries.</p></div>
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
              <div className="flex items-start justify-between gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ecebff] text-xs font-black text-[#5146d8]">{agent.name.split(" ").map(part => part[0]).slice(0, 2).join("")}</div><span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${agent.status === "Blocker" ? "bg-red-50 text-red-700" : "bg-black/[0.045] text-black/55"}`}>{agent.status}</span></div>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.035em]">{agent.name}</h2>
              <p className="mt-2 min-h-12 text-xs leading-5 text-black/45">{agent.role}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-black/10 pt-4"><div><dt className="text-[8px] uppercase tracking-[0.13em] text-black/30">Current</dt><dd className="mt-1 text-xs font-medium">{agent.assignment}</dd></div><div><dt className="text-[8px] uppercase tracking-[0.13em] text-black/30">Quality signal</dt><dd className="mt-1 text-xs font-medium">{agent.quality}</dd></div></dl>
              <div className="mt-4 rounded-xl bg-[#f7f7f3] px-3 py-3"><p className="text-[8px] uppercase tracking-[0.13em] text-black/30">Next handoff</p><p className="mt-1 text-xs font-medium">→ {agent.handoff}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 border-t border-black/10 py-7 lg:grid-cols-2">
        <article className="rounded-2xl border border-black/10 bg-[#11120f] p-6 text-white"><p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Approval boundaries</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Autonomy where safe. Approval where consequential.</h2><div className="mt-6 grid gap-3 text-sm text-white/65"><p>Internal analysis, summaries, briefs and status updates → autonomous + logged.</p><p>Client-facing messages → draft / approval policy according to workflow.</p><p>Deposits and payment verification → automatic state update from verified provider events.</p><p>Refunds, payouts, transfers and final ownership handoff → owner approval required.</p></div></article>
        <article className="rounded-2xl border border-black/10 bg-white p-6"><p className="text-[10px] uppercase tracking-[0.18em] text-black/35">Learning layer</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Improve reasoning without copying client work.</h2><p className="mt-5 text-sm leading-6 text-black/50">After delivery, the system can record reusable lessons: missed discovery questions, revision causes, accepted concept principles, QA failures, estimate accuracy and performance/security findings. Those lessons inform future decisions while client-specific assets and designs stay isolated.</p></article>
      </section>
    </>
  )
}
