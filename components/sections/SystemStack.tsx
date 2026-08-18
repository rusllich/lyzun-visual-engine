"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type Node = {
  id: string
  label: string
  headline: string
  body: string
  code: string[]
}

const NODES: Node[] = [
  {
    id: "webgl",
    label: "Real-time 3D",
    headline: "Build the thing that cannot be faked with a video.",
    body: "Interactive geometry, particles and materials rendered in the browser and tied to the experience, not pasted over it.",
    code: ["Instanced geometry", "Custom shaders", "Adaptive quality tiers"],
  },
  {
    id: "motion",
    label: "Motion systems",
    headline: "Movement should explain structure, not decorate it.",
    body: "Scroll, transitions and state changes are choreographed as one motion language with reduced-motion behaviour built in from the start.",
    code: ["GSAP / Motion", "Lenis", "Reduced-motion fallback"],
  },
  {
    id: "product",
    label: "Digital products",
    headline: "Interfaces people can actually live inside.",
    body: "Product surfaces, dashboards, commerce and bespoke tools where visual ambition still has to survive repeated daily use.",
    code: ["Next.js / React", "Typed systems", "Reusable design logic"],
  },
  {
    id: "creative",
    label: "Creative direction",
    headline: "One visual idea strong enough to carry the whole experience.",
    body: "Concept, art direction, typography, composition and interaction are developed together so the final site does not feel assembled from trends.",
    code: ["Concept systems", "Art direction", "Responsive composition"],
  },
  {
    id: "ai",
    label: "AI & automation",
    headline: "Intelligence where it creates leverage, not where it creates noise.",
    body: "AI-assisted workflows, automation and product features are integrated when they improve the actual service or user experience.",
    code: ["Workflow automation", "Model integration", "Operational tooling"],
  },
  {
    id: "performance",
    label: "Performance",
    headline: "Ambition gets a budget.",
    body: "The experience is designed around real constraints: loading, frame time, mobile hardware, accessibility and production reliability.",
    code: ["Core Web Vitals", "Progressive quality", "Accessibility gates"],
  },
]

export default function SystemStack() {
  const [open, setOpen] = useState<string>(NODES[0].id)
  const active = NODES.find((node) => node.id === open) ?? NODES[0]

  return (
    <section
      id="sys-stack"
      className="relative border-b border-[var(--line)] px-5 py-28 sm:px-8 lg:px-12 lg:py-40 xl:px-16"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid gap-10 border-b border-[var(--line)] pb-14 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:pb-20">
          <div>
            <span className="mono text-[9px] uppercase tracking-[0.22em] text-[var(--signal)]">Capabilities / 06</span>
            <p className="mono mt-5 max-w-xs text-[10px] uppercase leading-5 tracking-[0.15em] opacity-35">
              Design, engineering and production are one continuous system.
            </p>
          </div>
          <h2 className="max-w-[10ch] text-[clamp(3.4rem,8vw,9rem)] font-black uppercase leading-[0.79] tracking-[-0.065em]">
            Built for the hard part.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border-r-0 border-[var(--line)] lg:border-r">
            {NODES.map((node, index) => {
              const isActive = node.id === open
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setOpen(node.id)}
                  className="group grid w-full grid-cols-[46px_1fr_auto] items-center gap-3 border-b border-[var(--line)] py-6 pr-4 text-left sm:grid-cols-[72px_1fr_auto] lg:py-8"
                  aria-pressed={isActive}
                >
                  <span className={`mono text-[9px] ${isActive ? "text-[var(--signal)]" : "opacity-25"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[clamp(1.4rem,2.4vw,2.6rem)] font-semibold tracking-[-0.045em] transition-opacity ${isActive ? "opacity-100" : "opacity-45 group-hover:opacity-80"}`}>
                    {node.label}
                  </span>
                  <span className={`text-xl transition-transform ${isActive ? "rotate-45 text-[var(--signal)]" : "opacity-25 group-hover:opacity-70"}`}>+</span>
                </button>
              )
            })}
          </div>

          <div className="relative min-h-[430px] px-0 py-10 sm:py-12 lg:flex lg:min-h-[620px] lg:items-end lg:px-12 lg:py-14 xl:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                <span className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--signal)]">{active.label}</span>
                <h3 className="mt-5 text-[clamp(2.3rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
                  {active.headline}
                </h3>
                <p className="mt-7 max-w-xl text-base leading-7 opacity-48 sm:text-lg sm:leading-8">
                  {active.body}
                </p>
                <div className="mono mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line)] pt-5 text-[9px] uppercase tracking-[0.17em] opacity-35">
                  {active.code.map((item) => <span key={item}>{item}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
