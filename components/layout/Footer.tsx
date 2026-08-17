const LINKS = [
  ["sys-outcomes", "Funnel"],
  ["sys-stack", "Stack"],
  ["sys-work", "Work"],
  ["sys-proof", "Measured"],
  ["sys-start", "Start a project"],
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--line)] px-7 pb-10 pt-20 sm:px-12 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em]">MORPH</p>
            <p className="mt-5 max-w-xs leading-7 opacity-45">
              A web engineering studio. Real-time 3D, custom shaders and
              interfaces built to perform under real traffic.
            </p>
          </div>

          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] mb-5 opacity-40">Navigate</p>
            <ul>
              {LINKS.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="mono text-[10px] uppercase tracking-[0.2em] flex items-baseline gap-3 py-1.5 opacity-55 transition-opacity hover:opacity-100"
                  >
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] mb-5 opacity-40">Contact</p>
            <a
              href="mailto:hello@morph.studio"
              className="text-sm transition-colors hover:text-[var(--signal)]"
            >
              hello@morph.studio
            </a>
            <p className="mt-4 max-w-[22ch] leading-7 opacity-40">
              Replies within one business day.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[10px] uppercase tracking-[0.2em] opacity-35">
            &copy; {year} MORPH
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.2em] opacity-35">Designed and engineered by MORPH</p>
        </div>
      </div>
    </footer>
  )
}
