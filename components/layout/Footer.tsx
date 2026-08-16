const links = [
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Start a project" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="glass-panel-strong relative border-x-0 border-b-0 px-7 pb-10 pt-20 text-white sm:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold tracking-[0.28em]">MORPH</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
              We design and build premium websites and digital products for
              founders and businesses who need to be taken seriously online.
            </p>
          </div>

          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
              Navigate
            </p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
              Get in touch
            </p>
            <a
              href="mailto:hello@morph.studio"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              hello@morph.studio
            </a>
            <p className="mt-4 text-sm leading-6 text-white/30">
              Replies within one business day.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} MORPH. All rights reserved.</p>
          <p>Designed and built by MORPH.</p>
        </div>
      </div>
    </footer>
  )
}
