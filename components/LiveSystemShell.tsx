"use client"

import { useMemo } from "react"
import LiveScene from "@/components/three/LiveScene"
import { FORMATIONS } from "@/lib/formations"
import { useActiveSection } from "@/lib/use-active-section"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const SECTION_IDS = [
  "sys-hero",
  "sys-outcomes",
  "sys-stack",
  "sys-work",
  "sys-proof",
  "sys-start",
]

function useQuality() {
  return useMemo(() => {
    if (typeof window === "undefined") return { count: 3200, dpr: [1, 1.5] as [number, number] }

    const cores = navigator.hardwareConcurrency ?? 8
    const width = window.innerWidth

    if (width < 640 || cores <= 4) return { count: 1600, dpr: [1, 1] as [number, number] }
    if (width < 1280 || cores <= 7) return { count: 3200, dpr: [1, 1.35] as [number, number] }
    return { count: 6000, dpr: [1, 1.7] as [number, number] }
  }, [])
}

export default function LiveSystemShell({
  children,
}: {
  children: React.ReactNode
}) {
  const active = useActiveSection(SECTION_IDS)
  const reduced = useReducedMotion()
  const quality = useQuality()

  // The last section reuses the chart formation; the swarm should not vanish.
  const formation = Math.min(active, FORMATIONS.length - 1)

  return (
    <>
      {/* One scene for the whole page. Fixed, so sections travel past it. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <LiveScene
          formation={formation}
          count={quality.count}
          motion={!reduced}
          dpr={quality.dpr}
        />
      </div>

      {/* Formation readout — tells you the machine is reacting to you */}
      <div className="pointer-events-none fixed bottom-5 left-5 z-30 hidden items-center gap-3 lg:flex">
        <span className="pulse-dot" />
        <span className="mono text-[10px] uppercase tracking-[0.24em] opacity-45">
          Formation
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.24em] text-[var(--signal)]">
          {FORMATIONS[formation].label}
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.24em] opacity-25">
          {FORMATIONS[formation].caption}
        </span>
      </div>

      <div className="relative z-10">{children}</div>
    </>
  )
}
