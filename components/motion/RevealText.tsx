"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

type RevealTextProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export default function RevealText({
  children,
  delay = 0,
  className = "",
}: RevealTextProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
