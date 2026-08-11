"use client"

import { motion } from "motion/react"

const signals = [
  ["Northstar AI", "High intent", "Proposal opened 4× today"],
  ["Nova Systems", "Risk", "No reply for 3 business days"],
  ["Kairo Studio", "Upsell", "Usage exceeded Growth plan"],
]

export default function AIInsights() {
  return (
    <div className="rounded-[28px] border border-violet-400/15 bg-[linear-gradient(145deg,rgba(139,92,246,0.10),rgba(255,255,255,0.02))] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-violet-300/60">
            AI Revenue Copilot
          </p>
          <h3 className="mt-2 text-xl font-medium">Priority signals</h3>
        </div>

        <span className="rounded-full border border-violet-300/15 bg-violet-300/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-200/60">
          Live
        </span>
      </div>

      <div className="mt-6 space-y-2">
        {signals.map(([company, type, detail], index) => (
          <motion.div
            key={company}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-white/[0.07] bg-black/15 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-white/75">{company}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-violet-300/60">
                {type}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/30">{detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
