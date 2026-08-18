"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { motion } from "motion/react"
import { useInView } from "@/lib/use-in-view"

const WORK = [
  {
    href: "/showcase-01",
    src: "/work/work-01.png",
    index: "01",
    eyebrow: "Interactive commerce / concept build",
    title: "A product presence with gravity.",
    body: "Real-time 3D, cinematic motion and a product-first visual system built to make an expensive object feel expensive before a word is read.",
    tags: ["WebGL", "R3F", "Motion", "Creative direction"],
  },
  {
    href: "/showcase-02",
    src: "/work/work-02.png",
    index: "02",
    eyebrow: "Revenue operations / concept build",
    title: "Complex software without the visual noise.",
    body: "A dense CRM surface turned into a coherent working environment with live data, command patterns and a reusable interface system.",
    tags: ["Product UI", "Data systems", "Design system", "Engineering"],
  },
]

export default function SystemWork() {
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { amount: 0.08 })

  return (
    <section
      id="sys-work"
      ref={section}
      className="relative border-b border-[var(--line)] px-5 py-28 sm:px-8 lg:px-12 lg:py-40 xl:px-16"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:mb-24">
          <div>
            <span className="mono text-[9px] uppercase tracking-[0.22em] text-[var(--signal)]">Selected work / live builds</span>
            <p className="mono mt-5 max-w-xs text-[10px] uppercase leading-5 tracking-[0.15em] opacity-35">
              Concept work built by MORPH to demonstrate the standard — not presented as commissioned client work.
            </p>
          </div>
          <h2 className="max-w-[10ch] text-[clamp(3.4rem,8vw,9rem)] font-black uppercase leading-[0.79] tracking-[-0.065em]">
            Work should hit before it explains.
          </h2>
        </div>

        <div className="space-y-24 lg:space-y-36">
          {WORK.map((item, index) => (
            <motion.article
              key={item.href}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={item.href} className="group block">
                <div className="mb-5 grid gap-4 border-t border-[var(--line)] pt-4 sm:grid-cols-[60px_1fr_auto] sm:items-start lg:grid-cols-[90px_1fr_auto]">
                  <span className="mono text-[9px] text-[var(--signal)]">{item.index}</span>
                  <span className="mono text-[9px] uppercase tracking-[0.18em] opacity-35">{item.eyebrow}</span>
                  <span className="mono text-[9px] uppercase tracking-[0.18em] opacity-35 transition-opacity group-hover:opacity-100">Open live ↗</span>
                </div>

                <div className="relative aspect-[16/9] overflow-hidden border border-[var(--line)] bg-[#0b0c0d] sm:aspect-[16/8] lg:aspect-[16/7]">
                  <Image
                    src={item.src}
                    alt={`${item.title} — screenshot of the live MORPH concept build`}
                    fill
                    sizes="100vw"
                    className="object-cover object-top grayscale-[0.15] transition duration-[1200ms] ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050607]/85 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-6 sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-10 lg:left-10 lg:right-10">
                    <h3 className="max-w-[12ch] text-[clamp(2rem,5vw,6.2rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
                      {item.title}
                    </h3>
                    <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--signal)] text-xl text-[#050607] transition-transform duration-300 group-hover:rotate-45 sm:flex">↗</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                  <p className="max-w-2xl text-base leading-7 opacity-50 sm:text-lg sm:leading-8">{item.body}</p>
                  <div className="mono flex flex-wrap gap-x-6 gap-y-2 text-[9px] uppercase tracking-[0.17em] opacity-35 lg:justify-end">
                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
