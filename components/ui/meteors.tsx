"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type MeteorsProps = {
  number?: number
}

function seeded(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function Meteors({ number = 20 }: MeteorsProps) {
  const meteors = Array.from({ length: number }, (_, index) => {
    const spread =
      number <= 1 ? 0 : -400 + (800 / (number - 1)) * index

    const delay = 0.25 + seeded(index, 1) * 4
    const duration = 5 + Math.floor(seeded(index, 2) * 5)

    return {
      left: `${spread}px`,
      delay: `${delay.toFixed(3)}s`,
      duration: `${duration}s`,
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((meteor, idx) => (
        <span
          key={`meteor-${idx}`}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-slate-500 before:to-transparent before:content-['']"
          )}
          style={{
            top: "-40px",
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </motion.div>
  )
}
