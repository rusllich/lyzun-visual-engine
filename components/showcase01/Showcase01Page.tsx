"use client"

import { motion } from "motion/react"
import Link from "next/link"
import ProductOrb from "@/components/showcase01/ProductOrb"

const specs = [
  ["Realtime", "WebGL product object"],
  ["Motion", "GSAP / Motion choreography"],
  ["System", "Reusable interaction modules"],
]

export default function Showcase01Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="relative min-h-screen px-7 sm:px-12 lg:px-20 xl:px-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(111,82,255,0.22),transparent_34%)]" />

        <div className="relative mx-auto grid min-h-screen max-w-[1500px] items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="pt-24 lg:pt-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 text-[11px] uppercase tracking-[0.38em] text-white/35"
            >
              Showcase 01 / Product Experience
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.06 }}
              className="max-w-4xl text-[clamp(4.2rem,8vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.065em]"
            >
              A product
              <br />
              presence
              <br />
              <span className="text-white/[0.38]">with gravity.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-9 max-w-xl text-lg leading-8 text-white/45"
            >
              A fictional premium product concept built to demonstrate
              cinematic presentation, interactive 3D and high-end frontend
              art direction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="#story"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:-translate-y-1"
              >
                Explore concept
              </a>

              <Link
                href="/"
                className="rounded-full border border-white/15 bg-white/[0.025] px-7 py-3.5 text-sm text-white/70 backdrop-blur-xl transition-colors hover:bg-white/[0.07]"
              >
                Back to MORPH
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.12 }}
            className="relative h-[58vh] min-h-[520px] lg:h-[82vh]"
          >
            <ProductOrb />
          </motion.div>
        </div>
      </section>

      <section id="story" className="border-t border-white/10 px-7 py-28 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
                Product Story
              </p>
              <h2 className="max-w-3xl text-5xl font-medium leading-[0.94] tracking-[-0.045em] md:text-7xl">
                Designed to feel
                <br />
                <span className="text-white/35">expensive before checkout.</span>
              </h2>
            </div>

            <div className="flex items-end">
              <p className="max-w-xl text-lg leading-8 text-white/42">
                The layout treats motion, depth and pacing as part of the brand
                system. The goal is not visual noise — it is controlled
                attention.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {specs.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-[28px] border border-white/10 bg-white/[0.025] p-7"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                  0{index + 1}
                </span>
                <h3 className="mt-14 text-2xl font-medium tracking-[-0.025em]">
                  {title}
                </h3>
                <p className="mt-4 leading-7 text-white/40">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-7 py-28 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(111,82,255,0.18),rgba(255,255,255,0.02)_40%,rgba(255,255,255,0.015)_100%)] p-8 md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
                Commercial Direction
              </p>
              <h2 className="max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.045em] md:text-6xl">
                Built as a client-facing proof of premium frontend capability.
              </h2>
            </div>

            <div className="flex items-end">
              <p className="text-base leading-7 text-white/42">
                This route can later be reskinned into luxury tech, automotive,
                fashion, hardware, AI product or launch campaign concepts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
