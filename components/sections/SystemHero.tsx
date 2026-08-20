export default function SystemHero() {
  return (
    <section
      id="sys-hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-[var(--line)] px-5 pb-7 pt-28 sm:px-8 sm:pb-10 lg:px-12 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(198,242,78,0.08),transparent_32%),linear-gradient(90deg,rgba(5,6,7,0.96)_0%,rgba(5,6,7,0.82)_44%,rgba(5,6,7,0.12)_74%,rgba(5,6,7,0.58)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:clamp(58px,7vw,112px)_clamp(58px,7vw,112px)]" />

      <div className="relative mx-auto w-full max-w-[1800px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4 lg:mb-10">
          <div className="mono flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-[var(--signal)] shadow-[0_0_24px_var(--signal)]" />
            <span className="opacity-45">Creative engineering / 2026</span>
          </div>
          <div className="mono flex flex-wrap gap-x-6 gap-y-2 text-[9px] uppercase tracking-[0.2em] opacity-40 sm:text-[10px]">
            <span>Design</span>
            <span>Real-time 3D</span>
            <span>Motion</span>
            <span>AI systems</span>
          </div>
        </div>

        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.42fr)_minmax(260px,0.58fr)] lg:gap-10">
          <div className="relative z-10">
            <h1 className="max-w-[10.5ch] text-[clamp(4.2rem,11.8vw,12.5rem)] font-black uppercase leading-[0.73] tracking-[-0.075em] text-[var(--ink)]">
              <span className="block">We make</span>
              <span className="block">impossible</span>
              <span className="relative block">
                possible<span className="text-[var(--signal)]">.</span>
              </span>
            </h1>
          </div>

          <div className="relative z-10 lg:pb-2">
            <div className="border-l border-[var(--signal)] pl-5 sm:pl-6">
              <p className="max-w-sm text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.45] tracking-[-0.02em]">
                Ambitious digital experiences — designed to stop people and engineered to survive production.
              </p>
              <p className="mono mt-5 max-w-xs text-[10px] uppercase leading-5 tracking-[0.16em] opacity-40">
                Real-time 3D / custom motion / digital products / AI automation / performance systems
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#sys-start" className="cta">
                Bring us something difficult
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#sys-work"
                className="mono border-b border-[var(--line-strong)] pb-1 text-[10px] uppercase tracking-[0.18em] opacity-55 transition-opacity hover:opacity-100"
              >
                Selected work
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid border-t border-[var(--line)] pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["60", "FPS target"],
            ["<2.5s", "LCP target"],
            ["AA", "WCAG 2.2 target"],
            ["Live", "Browser-rendered 3D"],
          ].map(([value, label]) => (
            <div key={label} className="border-b border-[var(--line)] py-4 sm:border-r sm:px-5 sm:first:pl-0 lg:border-b-0">
              <div className="text-2xl font-semibold tracking-[-0.04em] text-[var(--signal)] sm:text-3xl">{value}</div>
              <div className="mono mt-1 text-[9px] uppercase tracking-[0.18em] opacity-35">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
