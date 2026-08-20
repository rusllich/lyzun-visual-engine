"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let cleanupLenis: (() => void) | null = null

    const sync = () => {
      cleanupLenis?.()
      cleanupLenis = null

      if (reducedMotionQuery.matches) {
        ScrollTrigger.refresh()
        return
      }

      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      })

      lenis.on("scroll", ScrollTrigger.update)

      const update = (time: number) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(update)
      gsap.ticker.lagSmoothing(0)

      cleanupLenis = () => {
        gsap.ticker.remove(update)
        lenis.destroy()
      }

      ScrollTrigger.refresh()
    }

    const onLoad = () => ScrollTrigger.refresh()

    sync()
    window.addEventListener("load", onLoad)
    reducedMotionQuery.addEventListener("change", sync)

    return () => {
      cleanupLenis?.()
      window.removeEventListener("load", onLoad)
      reducedMotionQuery.removeEventListener("change", sync)
    }
  }, [])

  return children
}
