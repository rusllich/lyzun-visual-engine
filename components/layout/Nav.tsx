"use client"

import { useEffect, useState } from "react"

const SHEETS = [
  { href: "#sys-outcomes", num: "01", label: "Funnel" },
  { href: "#sys-stack", num: "02", label: "Stack" },
  { href: "#sys-work", num: "03", label: "Work" },
  { href: "#sys-proof", num: "04", label: "Measured" },
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
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[rgba(8,9,11,0.75)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-7 py-4 sm:px-12 lg:px-16 xl:px-24">
        <a
          href="#sys-hero"
          onClick={(e) => {
            e.preventDefault()
            go("#sys-hero")
          }}
          className="text-sm font-semibold tracking-[0.3em]"
        >
          MORPH
        </a>

        {/* Drawing index */}
        <div className="hidden items-center gap-7 lg:flex">
          {SHEETS.map((sheet) => (
            <a
              key={sheet.href}
              href={sheet.href}
              onClick={(e) => {
                e.preventDefault()
                go(sheet.href)
              }}
              className="mono text-[10px] uppercase tracking-[0.2em] group flex items-baseline gap-2 opacity-45 transition-opacity hover:opacity-100"
            >
              <span className="text-[var(--signal)]">{sheet.num}</span>
              <span>{sheet.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#sys-start"
            onClick={(e) => {
              e.preventDefault()
              go("#sys-start")
            }}
            className="cta hidden !px-5 !py-2.5 !text-xs sm:inline-flex"
          >
            Start a project
          </a>

          <button
            type="button"
            aria-label={open ? "Close index" : "Open index"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-px w-5 bg-current transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--line)] bg-[rgba(8,9,11,0.96)] backdrop-blur-md lg:hidden">
          <div className="px-7 py-4 sm:px-12">
            {SHEETS.map((sheet) => (
              <a
                key={sheet.href}
                href={sheet.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(sheet.href)
                }}
                className="mono text-[10px] uppercase tracking-[0.2em] flex items-baseline gap-3 border-b border-[var(--line)] py-4 last:border-b-0"
              >
                <span className="text-[var(--signal)]">{sheet.num}</span>
                <span className="opacity-70">{sheet.label}</span>
              </a>
            ))}
            <a
              href="#sys-start"
              onClick={(e) => {
                e.preventDefault()
                go("#sys-start")
              }}
              className="cta mt-4 w-full !justify-center !py-3 !text-sm"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
