"use client"

import { motion } from "motion/react"

const items = [
  {
    number: "01",
    title: "Strategy & positioning",
    text: "We start with your business, not a template — positioning, story and conversion architecture come before a single pixel.",
  },
  {
    number: "02",
    title: "Design & 3D craft",
    text: "Interfaces, motion and real-time 3D built specifically for your brand: custom shaders, spatial typography and interaction, not stock assets.",
  },
  {
    number: "03",
    title: "Frontend engineering",
    text: "Production-grade builds that are fast, accessible and stable — ambitious visuals that never come at the cost of control.",
  },
  {
    number: "04",
    title: "Launch & growth",
    text: "SEO foundations, analytics and support after launch, so the site keeps performing long after it ships.",
  },
]

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative px-7 py-32 text-white sm:px-12 lg:px-20 xl:px-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="glass-panel relative mb-20 grid gap-10 rounded-[24px] p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-white/35">
              How MORPH works
            </p>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.045em] md:text-7xl">
              Not decoration.
              <br />
              <span className="text-white/35">Business choreography.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-lg leading-8 text-white/42">
              Business strategy, creative direction and advanced engineering
              are treated as one discipline — not three separate hand-offs.
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-[24px] px-6">
          {items.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className={`grid gap-6 py-10 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-[100px_1fr_1fr] ${
                index !== items.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <span
                className={`font-mono text-sm ${
                  index === 1 ? "text-[#ffb067]/70" : "text-white/25"
                }`}
              >
                {item.number}
              </span>

              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                {item.title}
              </h3>

              <p className="max-w-xl leading-7 text-white/40">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
