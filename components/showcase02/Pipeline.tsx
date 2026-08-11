"use client"

import { motion } from "motion/react"

const stages = [
  { label: "New leads", value: 18, amount: "$31.8K" },
  { label: "Qualified", value: 12, amount: "$24.4K" },
  { label: "Proposal", value: 8, amount: "$16.9K" },
  { label: "Closing", value: 5, amount: "$11.2K" },
]

export default function Pipeline() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
            Sales pipeline
          </p>
          <h3 className="mt-2 text-xl font-medium">Active opportunities</h3>
        </div>
        <span className="text-sm text-white/30">43 total</span>
      </div>

      <div className="space-y-5">
        {stages.map((stage, index) => (
          <div key={stage.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-white/65">{stage.label}</span>
              <div className="flex gap-4 text-white/35">
                <span>{stage.value}</span>
                <span>{stage.amount}</span>
              </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${100 - index * 18}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
