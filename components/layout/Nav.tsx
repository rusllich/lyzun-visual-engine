"use client"

import { useEffect, useState } from "react"

const LINKS = [
  { href: "#sys-work", label: "Work" },
  { href: "#sys-stack", label: "Capabilities" },
  { href: "#sys-outcomes", label: "Approach" },
  { href: "#sys-proof", label: "Proof" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300 ${
        scrolled
          ? "border-[var(--line)] bg-[rgba(5,6,7,0.82)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12 xl:px-16">
        <a
          href="#sys-hero"
          onClick={(e) => {
            e.preventDefault()
            go("#sys-hero")
          }}
          className="text-[15px] font-black tracking-[0.42em]"
        >
          MORPH
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                go(link.href)
              }}
              className="mono text-[9px] uppercase tracking-[0.2em] opacity-45 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#sys-start"
            onClick={(e) => {
              e.preventDefault()
              go("#sys-start")
            }}
            className="mono hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] sm:flex"
          >
            <span>Start something</span>
            <span className="h-2 w-2 rounded-full bg-[var(--signal)] shadow-[0_0_18px_var(--signal)]" />
          </a>

          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-px w-5 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--line)] bg-[rgba(5,6,7,0.96)] backdrop-blur-xl lg:hidden">
          <div className="px-5 py-5 sm:px-8">
            {LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href)
                }}
                className="flex items-baseline gap-4 border-b border-[var(--line)] py-4"
              >
                <span className="mono text-[9px] text-[var(--signal)]">0{index + 1}</span>
                <span className="text-xl font-semibold tracking-[-0.03em]">{link.label}</span>
              </a>
            ))}
            <a href="#sys-start" onClick={(e) => { e.preventDefault(); go("#sys-start") }} className="cta mt-5 w-full justify-between">
              Bring us something difficult
              <span>↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
