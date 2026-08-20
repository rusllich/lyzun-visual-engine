const rules = [
  { title: "Client messages", meta: "External communication", status: "Approval policy", detail: "Send only through the active communication workflow." },
  { title: "Project status updates", meta: "Internal status + summaries", status: "Autonomous", detail: "Allowed when sourced from live project data." },
  { title: "Invoice reminders", meta: "Outstanding deposits / balances", status: "Approval policy", detail: "Prepare from verified payment records only." },
  { title: "Payments / payouts / refunds", meta: "Financial movement", status: "Owner controlled", detail: "Provider events may update state; consequential movement stays gated." },
]

export default function SettingsPage() {
  return (
    <>
      <header className="border-b border-black/10 pb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Settings / operating rules</p>
        <h1 className="mt-3 text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Rules before automation.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">This surface documents current approval boundaries. It does not invent integration counts, active client spaces or configuration states that are not backed by a live registry.</p>
      </header>

      <section className="py-7">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          {rules.map((rule, index) => (
            <article key={rule.title} className={`grid gap-4 p-5 lg:grid-cols-[1fr_0.8fr_0.65fr] lg:items-center ${index > 0 ? "border-t border-black/10" : ""}`}>
              <div><h2 className="font-semibold tracking-[-0.025em]">{rule.title}</h2><p className="mt-1 text-xs text-black/40">{rule.meta}</p></div>
              <p className="text-xs leading-5 text-black/50">{rule.detail}</p>
              <span className="w-fit rounded-full bg-black/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-black/55 lg:justify-self-end">{rule.status}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
