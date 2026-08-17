"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import { Line } from "@react-three/drei"
import type { Line2 } from "three-stdlib"
import type { LineMaterial } from "three-stdlib"
import gsap from "gsap"
import { polylineLength, type Pt } from "@/lib/draft"

type Props = {
  points: Pt[]
  /** Flips true when the sheet scrolls into view. */
  active: boolean
  /** Stagger within the drawing, in seconds. */
  delay?: number
  duration?: number
  color?: string
  lineWidth?: number
  opacity?: number
  /** Skips the reveal entirely — reduced-motion draws everything finished. */
  instant?: boolean
}

export default function DraftLine({
  points,
  active,
  delay = 0,
  duration = 0.9,
  color = "#E8E6E1",
  lineWidth = 1,
  opacity = 1,
  instant = false,
}: Props) {
  const ref = useRef<Line2>(null)
  const length = useMemo(() => polylineLength(points), [points])

  useLayoutEffect(() => {
    const line = ref.current
    if (!line) return

    const material = line.material as LineMaterial

    if (instant) {
      material.dashOffset = 0
      return
    }

    // dashOffset === length hides the line; 0 draws it fully.
    if (!active) {
      material.dashOffset = length
      return
    }

    const state = { value: length }
    material.dashOffset = length

    const tween = gsap.to(state, {
      value: 0,
      duration,
      delay,
      ease: "power2.inOut",
      onUpdate: () => {
        material.dashOffset = state.value
      },
    })

    return () => {
      tween.kill()
    }
  }, [active, delay, duration, instant, length])

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={lineWidth}
      transparent={opacity < 1}
      opacity={opacity}
      dashed
      // dashSize/gapSize stay static; only dashOffset is animated imperatively
      // so a React re-render can never stomp the in-flight reveal.
      dashSize={length}
      gapSize={length}
    />
  )
}
