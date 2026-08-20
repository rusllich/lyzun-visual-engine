"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import { useInView } from "@/lib/use-in-view"

const STAGES = [
  {
    stage: "01",
    state: "Attention",
    line: "Make them stop.",
    detail: "A first impression strong enough to interrupt the scroll — without hiding behind a pre-rendered hero video.",
  },
  {
    stage: "02",
    state: "Clarity",
    line: "Make it obvious.",
    detail: "Turn complex products, technology and ideas into experiences people can understand in seconds.",
  },
  {
    stage: "03",
    state: "Trust",
    line: "Make it credible.",
    detail: "The work should feel ambitious and still behave like production software: fast, accessible and structurally sound.",
  },
  {
    stage: "04",
    state: "Action",
    line: "Make it convert.",
    detail: "One clear journey from curiosity to proof to enquiry. No tricks, no noise, no friction disguised as creativity.",
  },
]

export default function SystemOutcomes() {
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { amount: 0.15 })

  return (
    <section
      id="sys-outcomes"
      ref={section}
      className="relative border-b border-[var(--line)] px-5 py-28 sm:px-8 lg:px-12 lg:py-40 xl:px-16"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid gap-12 border-b border-[var(--line)] pb-16 lg:grid-cols-[0.48fr_1.52fr] lg:items-end lg:pb-24">
          <div>
            <span className="mono text-[9px] uppercase tracking-[0.22em] text-[var(--signal)]">What MORPH actually sells</span>
            <p className="mono mt-5 max-w-xs text-[10px] uppercase leading-5 tracking-[0.15em] opacity-35">
              Not effects. Not templates. Not technology for its own sake.
            </p>
          </div>

          <h2 className="max-w-[13ch] text-[clamp(3.4rem,8vw,9rem)] font-black uppercase leading-[0.8] tracking-[-0.065em]">
            Attention is cheap.
            <span className="block text-[var(--signal)]">Impact is engineered.</span>
          </h2>
        </div>

        <ol>
          {STAGES.map((item, index) => (
            <motion.li
              key={item.stage}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid gap-6 border-b border-[var(--line)] py-8 sm:grid-cols-[64px_160px_1fr] lg:grid-cols-[90px_220px_1fr] lg:items-start lg:py-11"
            >
              <span className="mono text-[10px] text-[var(--signal)]">{item.stage}</span>
              <span className="mono text-[9px] uppercase tracking-[0.2em] opacity-35 transition-opacity group-hover:opacity-70 sm:pt-1">{item.state}</span>
              <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                <h3 className="text-[clamp(1.8rem,3.5vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.05em]">{item.line}</h3>
                <p className="max-w-xl text-base leading-7 opacity-48 lg:pt-1 lg:text-lg lg:leading-8">{item.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
