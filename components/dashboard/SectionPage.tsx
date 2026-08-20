type Stat = { label: string; value: string; note: string }
type Row = { title: string; meta: string; status: string; detail: string }

export default function SectionPage({ eyebrow, title, description, stats, rows, action }: { eyebrow: string; title: string; description: string; stats: Stat[]; rows: Row[]; action: string }) {
  return (
    <>
      <header className="flex flex-col gap-5 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">{eyebrow}</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5vw,5.2rem)] font-semibold leading-[0.9] tracking-[-0.06em]">{title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-black/50">{description}</p>
        </div>
        <button className="min-h-11 rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.13em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">{action}</button>
      </header>

      <section className="grid border-b border-black/10 sm:grid-cols-2 xl:grid-cols-4" aria-label={`${eyebrow} metrics`}>
        {stats.map((item, index) => (
          <article key={item.label} className={`py-7 sm:p-7 ${index > 0 ? "sm:border-l sm:border-black/10" : ""}`}>
            <p className="text-[10px] uppercase tracking-[0.18em] text-black/35">{item.label}</p>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{item.value}</p>
            <p className="mt-3 text-xs text-black/40">{item.note}</p>
          </article>
        ))}
      </section>

      <section className="py-8">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          {rows.map((row, index) => (
            <article key={`${row.title}-${index}`} className={`grid gap-4 p-5 sm:grid-cols-[1.2fr_0.8fr_0.8fr] sm:items-center ${index > 0 ? "border-t border-black/10" : ""}`}>
              <div><h2 className="font-semibold tracking-[-0.025em]">{row.title}</h2><p className="mt-1 text-xs text-black/40">{row.meta}</p></div>
              <div><span className="inline-flex rounded-full bg-[#eef4c6] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.13em]">{row.status}</span></div>
              <p className="text-sm text-black/50 sm:text-right">{row.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
