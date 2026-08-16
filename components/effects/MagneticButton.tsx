"use client"

import { useRef } from "react"
import { motion } from "motion/react"

type Props = {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  href?: string
  onClick?: () => void
  className?: string
}

export default function MagneticButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  const handleMove = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (href && href.startsWith("#")) {
      event.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
    onClick?.()
  }

  const style =
    variant === "primary"
      ? "bg-white text-black"
      : "border border-white/15 bg-white/[0.025] text-white/70 backdrop-blur-xl"

  const sharedClassName = `inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition-transform duration-200 will-change-transform ${style} ${className}`

  if (href) {
    const MotionAnchor = motion.a
    return (
      <MotionAnchor
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
        className={sharedClassName}
      >
        {children}
      </MotionAnchor>
    )
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className={sharedClassName}
    >
      {children}
    </motion.button>
  )
}
