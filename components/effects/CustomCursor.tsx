"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

/**
 * A drafting crosshair with a live coordinate readout, in place of a pointer.
 * Hidden entirely for coarse pointers and reduced-motion users, both of whom
 * get the native cursor back via globals.css.
 */
export default function CustomCursor() {
  const root = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return

    const node = root.current
    const label = readout.current
    if (!node || !label) return

    const x = gsap.quickTo(node, "x", { duration: 0.08, ease: "power3.out" })
    const y = gsap.quickTo(node, "y", { duration: 0.08, ease: "power3.out" })

    let frame = 0
    const onMove = (event: MouseEvent) => {
      x(event.clientX)
      y(event.clientY)

      // Throttle the text write to one per frame; it is the expensive part.
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        label.textContent = `X ${String(Math.round(event.clientX)).padStart(4, "0")}  Y ${String(
          Math.round(event.clientY)
        ).padStart(4, "0")}`
      })
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
    >
      {/* Crosshair arms, leaving a gap at the exact point like a real reticle */}
      <span className="absolute left-[7px] top-[-1px] h-px w-3 bg-[var(--signal)]" />
      <span className="absolute left-[-19px] top-[-1px] h-px w-3 bg-[var(--signal)]" />
      <span className="absolute left-[-1px] top-[7px] h-3 w-px bg-[var(--signal)]" />
      <span className="absolute left-[-1px] top-[-19px] h-3 w-px bg-[var(--signal)]" />
      <span
        ref={readout}
        className="annotation absolute left-[14px] top-[12px] whitespace-nowrap text-[var(--signal)] opacity-70"
      />
    </div>
  )
}
