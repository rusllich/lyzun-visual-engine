"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    href: "/showcase-01",
    label: "Concept Work 01",
    title: "A product presence with gravity.",
    text: "A real-time 3D product scene built to make a premium product feel expensive before checkout.",
    tags: ["3D Product Design", "WebGL", "Motion"],
    glow: "radial-gradient(circle at 30% 20%, rgba(123,104,255,0.4), transparent 60%)",
  },
  {
    href: "/showcase-02",
    label: "Concept Work 02",
    title: "AXIS — a CRM that feels premium to run.",
    text: "A full revenue-operations dashboard concept: pipeline intelligence, live data and an interface built for daily use.",
    tags: ["SaaS Dashboard", "Data Visualization", "Design System"],
    glow: "radial-gradient(circle at 70% 25%, rgba(255,176,103,0.32), transparent 60%)",
  },
]

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    el.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-4px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  )
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative px-7 py-32 text-white sm:px-12 lg:px-20 xl:px-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="glass-panel relative mb-16 grid gap-10 rounded-[24px] p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-white/35">
              Selected work
            </p>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.045em] md:text-7xl">
              Proof, not
              <br />
              <span className="text-white/35">promises.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-lg leading-8 text-white/42">
              Two concept builds, made to studio standard, showing how MORPH
              treats a product launch and a SaaS product differently.
              Explore each one in full.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.href}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <TiltCard>
              <Link
                href={project.href}
                className="glass-panel group relative flex min-h-[440px] flex-col overflow-hidden rounded-[32px] p-2 transition-colors hover:border-white/25"
              >
                <div
                  className="glass-panel-strong relative flex min-h-[260px] flex-1 flex-col justify-between overflow-hidden rounded-[26px] p-6"
                  style={{ backgroundImage: project.glow }}
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/35">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    Concept work
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />

                  <span className="relative flex h-12 w-12 items-center justify-center self-end rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                    {project.label}
                  </p>

                  <h3 className="mt-4 text-2xl font-medium tracking-[-0.025em] md:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 max-w-lg leading-7 text-white/40">
                    {project.text}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/35"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-6 text-white/30">
          Both projects above are original concept work created by MORPH to
          demonstrate craft and capability — not commissioned client work.
        </p>
      </div>
    </section>
  )
}
