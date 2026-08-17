const SHEETS = [
  ["00", "Title"],
  ["01", "Existing conditions"],
  ["02", "Exploded assembly"],
  ["03", "As-built"],
  ["04", "Sequence of works"],
  ["05", "Tolerances & standards"],
  ["06", "Request for proposal"],
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--line-outline)] px-7 pb-10 pt-20 sm:px-12 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em]">MORPH</p>
            <p className="mt-5 max-w-xs leading-7 opacity-45">
              A web design and engineering studio. We specify, build and
              measure websites for people who need them to work.
            </p>
          </div>

          <div>
            <p className="annotation mb-5 opacity-40">Drawing index</p>
            <ul>
              {SHEETS.map(([num, label]) => (
                <li key={num}>
                  <a
                    href={`#sheet-${num}`}
                    className="annotation flex items-baseline gap-3 py-1.5 opacity-55 transition-opacity hover:opacity-100"
                  >
                    <span className="text-[var(--signal)]">{num}</span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="annotation mb-5 opacity-40">Contact</p>
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

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--line-construction)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="annotation opacity-35">
            &copy; {year} MORPH — Rev A — Issued for review
          </p>
          <p className="annotation opacity-35">Drawn and built by MORPH</p>
        </div>
      </div>
    </footer>
  )
}
