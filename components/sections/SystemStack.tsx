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
    headline: "GPU-side geometry, not video",
    body: "Instanced meshes morphed in a vertex shader. Thousands of modules move for the cost of one draw call, which is why the counter beside the hero stays low.",
    code: [
      "float m = clamp((uMix - lead) / 0.65, 0.0, 1.0);",
      "m = m * m * (3.0 - 2.0 * m);",
      "vec3 base = mix(aFrom, aTo, m);",
    ],
  },
  {
    id: "shaders",
    label: "Custom shaders",
    headline: "Materials written, not downloaded",
    body: "Refraction, dissolve, displacement and colour grading authored in GLSL for the specific brand, instead of a preset every other site is also using.",
    code: [
      "float hot = smoothstep(0.82, 1.0, vSeed);",
      "vec3 color = mix(uInk, uSignal, hot);",
      "gl_FragColor = vec4(color, vFade);",
    ],
  },
  {
    id: "perf",
    label: "Performance",
    headline: "Budgets, enforced in code",
    body: "Adaptive quality tiers, instanced draws, demand-driven frameloops. The scene downgrades itself on weak hardware rather than stuttering.",
    code: [
      "const tier = cores <= 4 || saveData",
      "  ? 'minimal'",
      "  : width < 1024 ? 'reduced' : 'full';",
    ],
  },
  {
    id: "motion",
    label: "Motion systems",
    headline: "Scroll as a timeline",
    body: "Lenis driving GSAP ScrollTrigger, so scroll position is a value you can choreograph against rather than a series of jumps.",
    code: [
      "lenis.on('scroll', ScrollTrigger.update);",
      "gsap.ticker.add((t) => lenis.raf(t * 1000));",
      "gsap.ticker.lagSmoothing(0);",
    ],
  },
  {
    id: "a11y",
    label: "Accessibility",
    headline: "The whole thing has an off switch",
    body: "Every animation is gated on prefers-reduced-motion, all text is real DOM, and contrast is checked against the live background, not a flat mock.",
    code: [
      "const reduced = useReducedMotion();",
      "<SystemCore motion={!reduced} />",
    ],
  },
  {
    id: "backend",
    label: "Backend & data",
    headline: "Wired to something real",
    body: "Route handlers, validated payloads, typed schemas and a deployment pipeline. The form on this page posts to a real endpoint that rejects malformed input.",
    code: [
      "export async function POST(req: Request) {",
      "  if (!isValidPayload(body))",
      "    return Response.json({ error }, { status: 400 });",
      "}",
    ],
  },
]

export default function SystemStack() {
  const [open, setOpen] = useState<string>("webgl")

  return (
    <section
      id="sys-stack"
      className="relative flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-14 xl:px-20"
    >
      <div className="mx-auto w-full max-w-[1700px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="readable">
            <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--signal)]">
              Architecture / nodes
            </span>
            <h2 className="mt-6 max-w-[15ch] text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              Open any node. The code is the argument.
            </h2>
          </div>
          <p className="mono max-w-xs text-[11px] leading-5 opacity-35">
            Six subsystems. Select one to inspect what it does and what it is
            written in.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Node list doubles as the navigation — no buttons needed */}
          <div className="panel divide-y divide-[var(--line)]">
            {NODES.map((node, i) => {
              const active = open === node.id
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setOpen(node.id)}
                  aria-expanded={active}
                  className={`flex w-full items-center gap-4 px-5 py-5 text-left transition-colors ${
                    active ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <span
                    className={`mono text-[10px] ${
                      active ? "text-[var(--signal)]" : "opacity-30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      active ? "bg-[var(--signal)]" : "bg-white/20"
                    }`}
                  />
                  <span
                    className={`text-[15px] transition-opacity ${
                      active ? "" : "opacity-55"
                    }`}
                  >
                    {node.label}
                  </span>
                  <span
                    className={`mono ml-auto text-[10px] transition-opacity ${
                      active ? "text-[var(--signal)]" : "opacity-0"
                    }`}
                  >
                    ACTIVE
                  </span>
                </button>
              )
            })}
          </div>

          <div className="panel relative min-h-[420px] overflow-hidden p-7 lg:p-9">
            <AnimatePresence mode="wait">
              {NODES.filter((n) => n.id === open).map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mono text-[10px] uppercase tracking-[0.24em] text-[var(--signal)]">
                    {node.label}
                  </span>

                  <h3 className="mt-5 max-w-[18ch] text-2xl font-medium leading-[1.15] tracking-[-0.02em] md:text-3xl">
                    {node.headline}
                  </h3>

                  <p className="mt-5 max-w-lg leading-7 opacity-50">
                    {node.body}
                  </p>

                  <div className="mt-8 border-t border-[var(--line)] pt-5">
                    <span className="mono text-[10px] uppercase tracking-[0.2em] opacity-30">
                      From this page
                    </span>
                    <pre className="mono mt-3 overflow-x-auto text-[11.5px] leading-[1.9] text-[var(--data)]">
                      {node.code.join("\n")}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
