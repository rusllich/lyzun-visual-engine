const clients = [
  { name: "Ocean View Hotel", contact: "James Wilson", stage: "Production", projects: 1, conversation: "Homepage design ready for review", payment: "10% deposit paid", agent: "Project Director", unread: 2 },
  { name: "Velvet Studio", contact: "Maya Chen", stage: "Client selection", projects: 1, conversation: "Comparing concept 03 and 05", payment: "Concept deposit paid", agent: "Creative Director", unread: 3 },
  { name: "ConstructPro", contact: "Daniel Novak", stage: "Review / QA", projects: 1, conversation: "Waiting on security fix confirmation", payment: "Final balance pending", agent: "Security Engineer", unread: 1 },
  { name: "PureSkin Clinic", contact: "Dr. Emma Davis", stage: "Discovery", projects: 0, conversation: "Uploading treatment photos and brand files", payment: "No payment due", agent: "Discovery Strategist", unread: 5 },
]

export default function ClientsPage() {
  return (
    <>
      <header className="border-b border-black/10 pb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Clients</p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Every client.<br />Every conversation. One place.</h1><p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">Open a client to see their full message history, active projects, discovery context, files, payment state, assigned agents and next action.</p></div>
          <a href="/dashboard/messages" className="grid min-h-11 place-items-center rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.13em] text-white">Open messages →</a>
        </div>
      </header>

      <section className="grid border-b border-black/10 sm:grid-cols-2 xl:grid-cols-4" aria-label="Client metrics">
        {[{label:"Total clients",value:"24",note:"Active + historical"},{label:"Active now",value:"06",note:"Projects in motion"},{label:"In discovery",value:"07",note:"Potential projects"},{label:"Unread threads",value:"11",note:"Needs review"}].map((item,index)=><article key={item.label} className={`py-6 sm:p-6 ${index>0?"sm:border-l sm:border-black/10":""}`}><p className="text-[9px] uppercase tracking-[0.16em] text-black/35">{item.label}</p><p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{item.value}</p><p className="mt-2 text-xs text-black/40">{item.note}</p></article>)}
      </section>

      <section className="py-7">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="hidden grid-cols-[1.1fr_0.7fr_1.25fr_0.9fr_0.8fr] gap-4 border-b border-black/10 px-5 py-3 text-[8px] uppercase tracking-[0.14em] text-black/30 lg:grid"><span>Client</span><span>Stage</span><span>Latest conversation</span><span>Commercial</span><span>Responsible</span></div>
          {clients.map((client,index)=><article key={client.name} className={`grid gap-4 p-5 lg:grid-cols-[1.1fr_0.7fr_1.25fr_0.9fr_0.8fr] lg:items-center ${index>0?"border-t border-black/10":""}`}><div><div className="flex items-center gap-2"><h2 className="font-semibold tracking-[-0.025em]">{client.name}</h2>{client.unread>0&&<span className="grid size-5 place-items-center rounded-full bg-[#6257e8] text-[9px] font-bold text-white">{client.unread}</span>}</div><p className="mt-1 text-xs text-black/40">{client.contact} · {client.projects} active project</p></div><p className="text-xs font-medium">{client.stage}</p><p className="text-xs leading-5 text-black/55">{client.conversation}</p><p className="text-xs font-medium">{client.payment}</p><div><p className="text-xs font-medium">{client.agent}</p><a href="/dashboard/messages" className="mt-2 inline-block text-[10px] font-semibold text-[#5548d9]">Open thread →</a></div></article>)}
        </div>
      </section>

      <section className="grid gap-5 border-t border-black/10 py-7 lg:grid-cols-3">
        <article className="rounded-2xl border border-black/10 bg-white p-5"><p className="text-[9px] uppercase tracking-[0.14em] text-black/35">Discovery context</p><h2 className="mt-3 text-xl font-semibold tracking-[-0.04em]">Brief + assets + constraints</h2><p className="mt-3 text-sm leading-6 text-black/45">Business goals, requested pages, references, brand files, photos, video, integrations, languages, budget and timeline stay attached to the client and project.</p></article>
        <article className="rounded-2xl border border-black/10 bg-white p-5"><p className="text-[9px] uppercase tracking-[0.14em] text-black/35">Communication</p><h2 className="mt-3 text-xl font-semibold tracking-[-0.04em]">Human-readable audit trail</h2><p className="mt-3 text-sm leading-6 text-black/45">Owner can inspect what the client said, what an agent asked, what was promised, what changed and which handoff happened next.</p></article>
        <article className="rounded-2xl border border-black/10 bg-white p-5"><p className="text-[9px] uppercase tracking-[0.14em] text-black/35">Commercial state</p><h2 className="mt-3 text-xl font-semibold tracking-[-0.04em]">Deposit → balance → handoff</h2><p className="mt-3 text-sm leading-6 text-black/45">Commercial status is visible beside the conversation so production never starts or ownership transfers without the correct verified payment gate.</p></article>
      </section>
    </>
  )
}
