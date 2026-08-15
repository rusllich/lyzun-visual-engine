"use client"

import { motion } from "motion/react"
import RiveDemo from "@/components/showcase/RiveDemo"
import LottieDemo from "@/components/showcase/LottieDemo"
import { Meteors } from "@/components/ui/meteors"
import { HyperText } from "@/components/ui/hyper-text"

const stack = [
  "RIVE",
  "LOTTIE",
  "ACETERNITY",
  "MAGIC UI",
  "GSAP",
  "R3F",
]

export default function InteractiveShowcase() {
  return (
    <section
      id="interactive-showcase"
      className="relative overflow-hidden bg-[#030303] px-7 py-32 text-white sm:px-12 lg:px-20 xl:px-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(95,62,220,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">
              Interactive Layer
            </p>

            <HyperText
              as="h2"
              startOnView
              animateOnHover
              className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.05em] md:text-7xl"
            >
              Motion systems, not random effects.
            </HyperText>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-lg leading-8 text-white/42">
              Vector state machines, lightweight animation runtimes and
              reusable UI effects are composed into one production-ready
              visual system.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.025] p-3"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Meteors number={14} />
            </div>

            <div className="relative h-full overflow-hidden rounded-[28px] border border-white/[0.06] bg-black/35">
              <RiveDemo />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.025] p-3"
          >
            <div className="relative h-full overflow-hidden rounded-[28px] border border-white/[0.06] bg-black/35">
              <LottieDemo />
            </div>
          </motion.div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "State-driven",
              text: "Interactions can react to hover, click, scroll and application state.",
            },
            {
              title: "Reusable",
              text: "Effects live as modules instead of being hard-coded into one landing page.",
            },
            {
              title: "Performance-aware",
              text: "Heavy WebGL and lightweight vector animation are used where each makes sense.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-7"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
              </div>

              <span className="relative text-[10px] uppercase tracking-[0.3em] text-white/25">
                0{index + 1}
              </span>

              <h3 className="relative mt-12 text-2xl font-medium tracking-[-0.025em]">
                {item.title}
              </h3>

              <p className="relative mt-4 leading-7 text-white/40">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden border-y border-white/10 py-5">
          <motion.div
            className="flex w-max gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...stack, ...stack].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-10 text-xs uppercase tracking-[0.35em] text-white/28"
              >
                <span>{item}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
