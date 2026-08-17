"use client"

import { useEffect, useState } from "react"

const SHEETS = [
  { href: "#sheet-01", num: "01", label: "Existing" },
  { href: "#sheet-02", num: "02", label: "Assembly" },
  { href: "#sheet-03", num: "03", label: "As-Built" },
  { href: "#sheet-04", num: "04", label: "Sequence" },
  { href: "#sheet-05", num: "05", label: "Tolerances" },
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
          ? "border-b border-[var(--line-outline)] bg-[rgba(11,12,14,0.82)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-7 py-4 sm:px-12 lg:px-16 xl:px-24">
        <a
          href="#sheet-00"
          onClick={(e) => {
            e.preventDefault()
            go("#sheet-00")
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
              className="annotation group flex items-baseline gap-2 opacity-45 transition-opacity hover:opacity-100"
            >
              <span className="text-[var(--signal)]">{sheet.num}</span>
              <span>{sheet.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#sheet-06"
            onClick={(e) => {
              e.preventDefault()
              go("#sheet-06")
            }}
            className="hidden border border-[var(--signal)] px-5 py-2.5 text-xs font-medium text-[var(--signal)] transition-colors hover:bg-[var(--signal)] hover:text-white sm:block"
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
        <div className="border-t border-[var(--line-outline)] bg-[rgba(11,12,14,0.96)] backdrop-blur-md lg:hidden">
          <div className="px-7 py-4 sm:px-12">
            {SHEETS.map((sheet) => (
              <a
                key={sheet.href}
                href={sheet.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(sheet.href)
                }}
                className="annotation flex items-baseline gap-3 border-b border-[var(--line-construction)] py-4 last:border-b-0"
              >
                <span className="text-[var(--signal)]">{sheet.num}</span>
                <span className="opacity-70">{sheet.label}</span>
              </a>
            ))}
            <a
              href="#sheet-06"
              onClick={(e) => {
                e.preventDefault()
                go("#sheet-06")
              }}
              className="mt-4 block border border-[var(--signal)] py-3 text-center text-sm text-[var(--signal)]"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
