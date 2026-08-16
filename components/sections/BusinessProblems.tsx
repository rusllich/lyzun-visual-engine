"use client"

import { motion } from "motion/react"

const situations = [
  {
    problem: "I’m launching my business and need a strong first impression.",
    response: "A brand-grade launch site built to convert from day one.",
  },
  {
    problem: "My website makes my company look cheaper than it actually is.",
    response: "A complete visual upgrade that matches what you deliver.",
  },
  {
    problem: "I have traffic, but it isn’t turning into enquiries.",
    response: "Conversion architecture built around how people decide.",
  },
  {
    problem: "My product or service is genuinely hard to explain.",
    response: "Interactive storytelling that makes complexity feel simple.",
  },
  {
    problem: "I’m building a SaaS product and need an interface people trust.",
    response: "Product design and engineering built for scale and trust.",
  },
  {
    problem: "I want something my competitors haven’t seen before.",
    response: "Original 3D, motion and interaction design, built from scratch.",
  },
]

export default function BusinessProblems() {
  return (
    <section className="relative px-7 py-32 text-white sm:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="glass-panel relative mb-16 grid gap-10 rounded-[24px] p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-white/35">
              Sound familiar?
            </p>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.045em] md:text-7xl">
              You recognise
              <br />
              <span className="text-white/35">the problem.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-lg leading-8 text-white/42">
              Every project starts with a business reality, not a template.
              Here is what MORPH builds for it.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {situations.map((item, index) => {
            const warm = index % 2 === 1
            const radius = index % 3 === 0 ? "rounded-[16px]" : "rounded-[28px]"

            return (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className={`glass-panel group relative flex min-h-[240px] flex-col justify-between overflow-hidden p-7 ${radius}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${
                      warm ? "bg-[#ffb067]/12" : "bg-[#7b68ff]/14"
                    }`}
                  />
                </div>

                <p className="relative text-lg leading-7 text-white/70">
                  “{item.problem}”
                </p>

                <div className="relative mt-8 border-t border-white/10 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
                    MORPH builds
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {item.response}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
