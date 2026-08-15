"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import {
  captureAnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/analytics"

type Props = {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  analyticsEvent?: string
  analyticsProperties?: AnalyticsProperties
  onClick?: () => void
}

export default function MagneticButton({
  children,
  variant = "primary",
  analyticsEvent,
  analyticsProperties,
  onClick,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2

    el.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "translate3d(0, 0, 0)"
  }

  const handleClick = () => {
    if (analyticsEvent) {
      captureAnalyticsEvent(analyticsEvent, analyticsProperties)
    }

    onClick?.()
  }

  const style =
    variant === "primary"
      ? "bg-white text-black"
      : "border border-white/15 bg-white/[0.025] text-white/70 backdrop-blur-xl"

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      className={`rounded-full px-7 py-3.5 text-sm font-medium transition-transform duration-200 will-change-transform ${style}`}
    >
      {children}
    </motion.button>
  )
}
