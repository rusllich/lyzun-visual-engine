"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import SheetHeader from "@/components/draft/SheetHeader"
import { useInView } from "@/lib/use-in-view"

const PHASES = [
  {
    code: "P1",
    name: "Discover",
    span: "Week 1",
    deliverable: "Positioning, audience, conversion goal, scope",
    gate: "Signed scope",
  },
  {
    code: "P2",
    name: "Draw",
    span: "Weeks 2–3",
    deliverable: "Structure, visual system, motion direction, working prototype",
    gate: "Design approved",
  },
  {
    code: "P3",
    name: "Build",
    span: "Weeks 3–6",
    deliverable: "Production frontend, integrations, content load, QA",
    gate: "Staging review",
  },
  {
    code: "P4",
    name: "Commission",
    span: "Week 6",
    deliverable: "Performance pass, SEO, analytics, deployment",
    gate: "Live",
  },
  {
    code: "P5",
    name: "Operate",
    span: "Ongoing",
    deliverable: "Support, changes, measurement against the budgets in Sheet 05",
    gate: "Reviewed quarterly",
  },
]

export default function SheetSequence() {
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { amount: 0.15 })

  return (
    <section
      id="sheet-04"
      ref={section}
      className="graph-paper-coarse relative border-b border-[var(--line-outline)] px-7 py-28 sm:px-12 lg:px-16 xl:px-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <SheetHeader
          number="04"
          title="Sequence of Works"
          note="Indicative, six weeks"
        />

        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="max-w-[14ch] text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Ambitious work, run on a schedule.
          </h2>
          <p className="max-w-md self-end text-lg leading-8 opacity-55">
            Every phase ends at a gate with something you can look at and sign
            off. You never have to ask where the project is.
          </p>
        </div>

        {/* Sequence bar — phases as a run of gates, not a stack of cards */}
        <div className="hidden border-t border-[var(--line-outline)] lg:block">
          <div className="grid grid-cols-5">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.code}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative border-r border-[var(--line-construction)] pr-6 pt-6 last:border-r-0"
              >
                {/* Gate marker on the schedule line */}
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full border border-[var(--signal)] bg-[var(--ground)]" />
                <span className="annotation text-[var(--signal)]">
                  {phase.code} / {phase.span}
                </span>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.02em]">
                  {phase.name}
                </h3>
                <p className="mt-4 min-h-[5.5rem] text-sm leading-6 opacity-45">
                  {phase.deliverable}
                </p>
                <p className="annotation mt-2 opacity-70">
                  Gate: {phase.gate}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stacked schedule on narrow screens */}
        <div className="lg:hidden">
          {PHASES.map((phase) => (
            <div
              key={phase.code}
              className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-[var(--line-construction)] py-6 last:border-b"
            >
              <span className="annotation pt-1.5 text-[var(--signal)]">
                {phase.code}
              </span>
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-[-0.02em]">
                    {phase.name}
                  </h3>
                  <span className="annotation opacity-40">{phase.span}</span>
                </div>
                <p className="mt-3 text-sm leading-6 opacity-45">
                  {phase.deliverable}
                </p>
                <p className="annotation mt-2.5 opacity-70">
                  Gate: {phase.gate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
