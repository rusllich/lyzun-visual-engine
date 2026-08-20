export default function FilesPage() {
  return (
    <>
      <header className="border-b border-black/10 pb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Files</p>
        <h1 className="mt-3 text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Client material.<br />No invented storage layer.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">The delivery file registry is not connected to a measured storage source yet, so MORPH does not display placeholder uploads, fake storage usage or sample client assets.</p>
      </header>

      <section className="py-7">
        <div className="rounded-2xl border border-black/10 bg-white p-8">
          <p className="text-[10px] uppercase tracking-[0.16em] text-black/35">Current state</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">File workspace not provisioned.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">Project delivery can operate without this dashboard module. A live storage adapter should be connected only when the first client workflow needs asset exchange or final handoff.</p>
          <a href="/dashboard/projects" className="mt-6 inline-flex text-xs font-semibold text-[#5548d9]">Open live projects →</a>
        </div>
      </section>
    </>
  )
}
