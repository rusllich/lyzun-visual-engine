const LINKS = [
  ["sys-work", "Work"],
  ["sys-stack", "Capabilities"],
  ["sys-outcomes", "Approach"],
  ["sys-proof", "Performance"],
  ["sys-start", "Start"],
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-5 pb-8 pt-14 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-10 border-b border-[var(--line)] pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[clamp(3.5rem,10vw,11rem)] font-black uppercase leading-[0.72] tracking-[-0.075em]">
              MORPH<span className="text-[var(--signal)]">.</span>
            </p>
            <p className="mt-7 max-w-xl text-lg leading-8 opacity-45">
              A creative engineering company for ambitious digital experiences, products and systems.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:justify-self-end lg:gap-14">
            <div>
              <p className="mono mb-4 text-[9px] uppercase tracking-[0.2em] opacity-30">Navigate</p>
              <ul>
                {LINKS.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="mono block py-1.5 text-[9px] uppercase tracking-[0.18em] opacity-45 transition-opacity hover:opacity-100">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono mb-4 text-[9px] uppercase tracking-[0.2em] opacity-30">Contact</p>
              <a href="mailto:hello@morph.studio" className="text-sm transition-colors hover:text-[var(--signal)]">
                hello@morph.studio
              </a>
              <p className="mono mt-4 text-[9px] uppercase leading-5 tracking-[0.15em] opacity-30">Kyiv / Lviv / Remote</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[9px] uppercase tracking-[0.18em] opacity-28">© {year} MORPH</p>
          <p className="mono text-[9px] uppercase tracking-[0.18em] opacity-28">Creative ambition / production discipline</p>
        </div>
      </div>
    </footer>
  )
}
