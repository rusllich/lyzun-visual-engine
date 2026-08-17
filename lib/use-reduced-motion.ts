"use client"

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function read(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia(QUERY).matches
}

/**
 * True when the visitor has asked for reduced motion. Every scroll-driven
 * reveal, rotation and parallax in the drawing set is gated on this — the
 * drawings render finished instead of animating.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(read)

  useEffect(() => {
    const query = window.matchMedia(QUERY)
    const onChange = () => setReduced(query.matches)

    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}
