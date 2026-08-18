"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import { useInView } from "@/lib/use-in-view"

const STAGES = [
  {
    stage: "01",
    state: "ATTENTION",
    line: "They arrive and something makes them stop.",
    detail:
      "Real-time 3D and motion that loads fast enough to actually be seen, not a hero video that buffers.",
  },
  {
    stage: "02",
    state: "COMPREHENSION",
    line: "Thirty seconds in, they understand what you sell.",
    detail:
      "Interactive explanation instead of three paragraphs nobody finishes. Complexity made visual.",
  },
  {
    stage: "03",
    state: "TRUST",
    line: "It feels built by people who know what they are doing.",
    detail:
      "Because it is. Performance, accessibility and structure are visible in how the thing behaves.",
  },
  {
    stage: "04",
    state: "ENQUIRY",
    line: "They contact you without being chased.",
    detail:
      "One route through the page, one action at the end of it. No popups, no exit-intent traps.",
  },
]

export default function SystemOutcomes() {
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { amount: 0.2 })

  return (
    <section
      id="sys-outcomes"
      ref={section}
      className="relative flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-14 xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1700px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="readable lg:sticky lg:top-32 lg:self-start">
          <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--signal)]">
            Process / funnel
          </span>
          <h2 className="mt-6 max-w-[13ch] text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            Traffic is not the problem.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-8 opacity-55">
            Getting people to the page is the easy half. This is the part most
            sites drop, stage by stage.
          </p>
        </div>

        <ol className="space-y-3">
          {STAGES.map((item, i) => (
            <motion.li
              key={item.stage}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="panel group relative overflow-hidden p-6 lg:p-7"
              // Each stage is narrower than the last, mirroring the funnel
              style={{ marginRight: `${i * 3}%` }}
            >
              <div className="flex items-baseline gap-4">
                <span className="mono text-[11px] text-[var(--signal)]">
                  {item.stage}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.24em] opacity-35">
                  {item.state}
                </span>
                <span className="ml-auto h-px flex-1 bg-[var(--line)]" />
              </div>

              <p className="mt-5 text-xl leading-[1.35] tracking-[-0.015em] md:text-2xl">
                {item.line}
              </p>
              <p className="mt-3 max-w-lg leading-7 opacity-45">
                {item.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
