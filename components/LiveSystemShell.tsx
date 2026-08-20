"use client"

import { useEffect, useState } from "react"
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

type Quality = {
  count: number
  dpr: [number, number]
}

const DEFAULT_QUALITY: Quality = { count: 3200, dpr: [1, 1.35] }

function readQuality(): Quality {
  const cores = navigator.hardwareConcurrency ?? 8
  const width = window.innerWidth
  const coarse = window.matchMedia("(pointer: coarse)").matches

  if (coarse || width < 640 || cores <= 4) return { count: 1400, dpr: [1, 1] }
  if (width < 1280 || cores <= 7) return { count: 3000, dpr: [1, 1.25] }
  return { count: 5600, dpr: [1, 1.5] }
}

function sameQuality(a: Quality, b: Quality) {
  return a.count === b.count && a.dpr[0] === b.dpr[0] && a.dpr[1] === b.dpr[1]
}

function useQuality() {
  const [quality, setQuality] = useState<Quality>(DEFAULT_QUALITY)

  useEffect(() => {
    const coarseQuery = window.matchMedia("(pointer: coarse)")
    let frame = 0

    const sync = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const next = readQuality()
        setQuality((current) => (sameQuality(current, next) ? current : next))
      })
    }

    sync()
    window.addEventListener("resize", sync, { passive: true })
    coarseQuery.addEventListener("change", sync)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", sync)
      coarseQuery.removeEventListener("change", sync)
    }
  }, [])

  return quality
}

export default function LiveSystemShell({
  children,
}: {
  children: React.ReactNode
}) {
  const active = useActiveSection(SECTION_IDS)
  const reduced = useReducedMotion()
  const quality = useQuality()
  const formation = Math.min(active, FORMATIONS.length - 1)

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <LiveScene
          formation={formation}
          count={quality.count}
          motion={!reduced}
          dpr={quality.dpr}
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none fixed bottom-5 left-5 z-30 hidden items-center gap-3 lg:flex">
        <span className="pulse-dot" />
        <span className="mono text-[10px] uppercase tracking-[0.24em] opacity-45">Formation</span>
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
