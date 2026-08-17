"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import SheetHeader from "@/components/draft/SheetHeader"
import { useInView } from "@/lib/use-in-view"

const DEFECTS = [
  {
    tag: "D-01",
    quote: "We look smaller than we actually are.",
    finding:
      "The site undersells the company. Buyers price you off it before they ever speak to you.",
  },
  {
    tag: "D-02",
    quote: "People land, then leave.",
    finding:
      "Traffic arrives with no route to an enquiry. Attention is spent, not converted.",
  },
  {
    tag: "D-03",
    quote: "Nobody understands what we sell.",
    finding:
      "A genuinely complex product explained in flat paragraphs nobody finishes reading.",
  },
  {
    tag: "D-04",
    quote: "It was fine three years ago.",
    finding:
      "Built once, never revisited. Slow on mobile, awkward to edit, quietly out of date.",
  },
  {
    tag: "D-05",
    quote: "We are launching and have nothing.",
    finding:
      "No site, a date in the calendar, and one chance at a first impression.",
  },
  {
    tag: "D-06",
    quote: "Ours looks like everyone else's.",
    finding:
      "A template the whole category is using. Nothing a visitor could recall an hour later.",
  },
]

export default function SheetExisting() {
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { amount: 0.1 })

  return (
    <section
      id="sheet-01"
      ref={section}
      className="relative border-b border-[var(--line-outline)] px-7 py-28 sm:px-12 lg:px-16 xl:px-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <SheetHeader
          number="01"
          title="Existing Conditions"
          note="Survey of defects"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Before we draw anything, we survey what is there.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-8 opacity-55">
              These are the conditions we are usually called in on. Find yours,
              and you already know what the first conversation is about.
            </p>
          </div>

          <ul>
            {DEFECTS.map((defect, i) => (
              <motion.li
                key={defect.tag}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-[var(--line-construction)] py-6 last:border-b"
              >
                <span className="annotation pt-1.5 text-[var(--signal)]">
                  {defect.tag}
                </span>
                <div>
                  <p className="text-lg leading-7">
                    <span className="text-[var(--signal)]">“</span>
                    {defect.quote}
                    <span className="text-[var(--signal)]">”</span>
                  </p>
                  <p className="mt-2.5 leading-7 opacity-45">
                    {defect.finding}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
