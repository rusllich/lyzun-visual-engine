"use client"

import { motion } from "motion/react"
import {
  Gauge,
  ShieldCheck,
  SearchCheck,
  Accessibility,
  Rocket,
  MessageCircle,
} from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "We learn your business, your customers and what the site actually needs to achieve — before any design starts.",
  },
  {
    number: "02",
    title: "Design",
    text: "Strategy becomes a visual system: layout, motion, 3D and copy direction, shown as a working prototype.",
  },
  {
    number: "03",
    title: "Build",
    text: "Production engineering — fast, accessible, tested across devices — with regular checkpoints, not a black box.",
  },
  {
    number: "04",
    title: "Launch",
    text: "We ship with SEO foundations in place, performance verified, and analytics wired up from day one.",
  },
  {
    number: "05",
    title: "Support",
    text: "Post-launch support so the site keeps working as your business changes — not a project that ends at handoff.",
  },
]

const trust = [
  {
    icon: Gauge,
    title: "Performance",
    text: "Adaptive rendering, lazy loading and optimized assets so ambition never costs you speed.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    text: "Sensible defaults for forms, data handling and infrastructure from the first commit.",
  },
  {
    icon: SearchCheck,
    title: "SEO foundations",
    text: "Semantic structure, metadata and clean markup so the site is built to be found.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    text: "Reduced-motion support, keyboard navigation and readable contrast, by default.",
  },
  {
    icon: Rocket,
    title: "Tested & deployed",
    text: "Cross-device QA and a clean deployment pipeline before anything goes live.",
  },
  {
    icon: MessageCircle,
    title: "Clear communication",
    text: "You always know what stage the project is at and what happens next.",
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="relative bg-[#030303] px-7 py-32 text-white sm:px-12 lg:px-20 xl:px-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">
              How we work together
            </p>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.045em] md:text-7xl">
              Wild creativity.
              <br />
              <span className="text-white/35">Zero chaos.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-lg leading-8 text-white/42">
              Ambitious design and a controlled process aren&apos;t opposites.
              Here&apos;s exactly how a project with MORPH runs.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative rounded-[24px] border border-white/10 bg-white/[0.025] p-6"
            >
              <span className="text-xs text-white/25">{step.number}</span>
              <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/40">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <p className="mb-10 text-xs uppercase tracking-[0.35em] text-white/35">
            Built to be trusted
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trust.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/[0.02] p-6"
              >
                <item.icon className="mt-1 h-5 w-5 shrink-0 text-white/45" />
                <div>
                  <h3 className="text-base font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/40">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
