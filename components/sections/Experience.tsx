"use client"

import { motion } from "motion/react"

const items = [
  {
    number: "01",
    title: "Cinematic motion",
    text: "Scroll-driven sequences that behave like a directed visual story rather than generic page transitions.",
  },
  {
    number: "02",
    title: "Real-time 3D",
    text: "Interactive WebGL objects, product scenes and visual systems rendered directly inside the browser.",
  },
  {
    number: "03",
    title: "Living interfaces",
    text: "Microinteractions, responsive motion and visual feedback designed around actual user behaviour.",
  },
]

export default function Experience() {
  return (
    <section className="relative bg-[#030303] px-7 py-32 text-white sm:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-[1400px]">

        <div className="mb-20 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">
              Capabilities
            </p>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.045em] md:text-7xl">
              Not decoration.
              <br />
              <span className="text-white/35">
                Digital choreography.
              </span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-lg leading-8 text-white/42">
              Every visual system is built around hierarchy, interaction,
              movement and performance — not around stacking random effects.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
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
              className="grid gap-6 border-b border-white/10 py-10 md:grid-cols-[100px_1fr_1fr]"
            >
              <span className="text-sm text-white/25">
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
