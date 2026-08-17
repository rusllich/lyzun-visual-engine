"use client"

import { useEffect, useState, type RefObject } from "react"

type Options = {
  /** Fraction of the element that must be visible to trip. */
  amount?: number
  /** Stay true once tripped — drawings should not redraw on every pass. */
  once?: boolean
  rootMargin?: string
}

/**
 * Drives both the draft-on reveals and the WebGL frameloop gate, so offscreen
 * sheets cost nothing.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { amount = 0.25, once = true, rootMargin = "0px" }: Options = {}
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: amount, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, amount, once, rootMargin])

  return inView
}
