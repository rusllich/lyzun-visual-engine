"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const links = [
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
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

  const handleNavigate = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#030303]/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-7 py-5 text-white sm:px-12 lg:px-20 xl:px-28">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            handleNavigate("#top")
          }}
          className="text-sm font-semibold tracking-[0.28em]"
        >
          MORPH
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault()
                handleNavigate(link.href)
              }}
              className="text-xs uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              handleNavigate("#contact")
            }}
            className="hidden rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-transform hover:-translate-y-0.5 sm:block"
          >
            Start a project
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-5 bg-white transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-white transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-[#030303]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-7 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavigate(link.href)
                  }}
                  className="py-3 text-sm uppercase tracking-[0.2em] text-white/60"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault()
                  handleNavigate("#contact")
                }}
                className="mt-3 rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-black"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
