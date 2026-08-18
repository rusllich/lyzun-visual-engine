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
    title: "A product presence with gravity",
    body: "Real-time 3D product scene. Physically based materials, cinematic camera, built to make an expensive object read as expensive.",
    tags: ["WebGL", "R3F", "Motion"],
  },
  {
    href: "/showcase-02",
    src: "/work/work-02.png",
    index: "02",
    title: "AXIS — revenue operations",
    body: "A full CRM surface: pipeline intelligence, live charts, command palette, modals. Interface work that survives daily use.",
    tags: ["Product UI", "Data viz", "Design system"],
  },
]

export default function SystemWork() {
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { amount: 0.15 })

  return (
    <section
      id="sys-work"
      ref={section}
      className="relative flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-14 xl:px-20"
    >
      <div className="mx-auto w-full max-w-[1700px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="readable">
            <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--signal)]">
              Output / builds
            </span>
            <h2 className="mt-6 max-w-[14ch] text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              Things that actually run.
            </h2>
          </div>
          <p className="mono max-w-sm text-[11px] leading-5 opacity-35">
            Both are concept builds by MORPH, made to show the standard. Not
            commissioned client work, and not presented as such. Open either one
            and it runs live.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {WORK.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={item.href}
                className="panel group block overflow-hidden transition-colors hover:border-[var(--signal)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--line)]">
                  <Image
                    src={item.src}
                    alt={`${item.title} — screenshot of the live build`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                  {/* Scanline wash keeps the shot part of the system, not a sticker */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-transparent opacity-80" />

                  <span className="mono absolute left-4 top-4 border border-[var(--line-strong)] bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                    Concept build {item.index}
                  </span>

                  <span className="mono absolute bottom-4 right-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--signal)] opacity-0 transition-opacity group-hover:opacity-100">
                    Open live
                    <span className="text-sm leading-none">→</span>
                  </span>
                </div>

                <div className="p-6 lg:p-7">
                  <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-7 opacity-45">
                    {item.body}
                  </p>
                  <div className="mono mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.18em] opacity-35">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
