"use client"

import { motion } from "motion/react"

const points = [18, 24, 22, 31, 29, 38, 44, 41, 52, 58, 63, 71]

function linePath(values: number[]) {
  const width = 520
  const height = 180
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - ((value - min) / span) * (height - 20) - 10
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

export default function RevenueChart() {
  const path = linePath(points)

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
            Revenue
          </p>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-4xl font-medium tracking-[-0.04em]">$84.2K</span>
            <span className="mb-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
              +18.6%
            </span>
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/40">
          12 months
        </div>
      </div>

      <div className="relative h-[210px] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-rows-4">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="border-t border-white/[0.06]" />
          ))}
        </div>

        <svg
          viewBox="0 0 520 180"
          className="relative z-10 h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="crmRevenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.28)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>

          <motion.path
            d={`${path} L 520 180 L 0 180 Z`}
            fill="url(#crmRevenueFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.path
            d={path}
            fill="none"
            stroke="rgba(167,139,250,0.95)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
    </div>
  )
}
