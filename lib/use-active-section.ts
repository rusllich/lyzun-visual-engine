"use client"

import { useEffect, useState } from "react"

/**
 * Reports which registered section owns the viewport right now. Drives the
 * formation the swarm reconfigures into.
 */
export function useActiveSection(ids: string[]): number {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })

        let bestIndex = 0
        let bestRatio = -1
        ids.forEach((id, i) => {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = i
          }
        })

        setActive(bestIndex)
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
