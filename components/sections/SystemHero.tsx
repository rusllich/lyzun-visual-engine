"use client"

import Telemetry from "@/components/hud/Telemetry"
import CodeStream from "@/components/hud/CodeStream"

export default function SystemHero() {
  return (
    <section
      id="sys-hero"
      className="relative flex min-h-screen items-center px-6 pb-16 pt-28 sm:px-10 lg:px-14 xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1700px] items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="readable">
          <div className="mb-7 flex items-center gap-3">
            <span className="pulse-dot" />
            <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--signal)]">Creative frontend / AI</span>
            <span className="h-px w-12 bg-[var(--line-strong)]" />
            <span className="mono text-[10px] uppercase tracking-[0.28em] opacity-35">MORPH engineering</span>
          </div>
          <h1 className="max-w-[16ch] text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
            Digital experiences<br /><span className="text-[var(--signal)]">engineered to move</span><br />people and business.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 opacity-55 md:text-lg md:leading-8">
            Premium React and Next.js experiences with art-directed motion, real-time 3D and high-value AI integrations. We combine design and frontend engineering into fast, accessible products built to earn attention, trust and action.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#sys-start" className="cta"><span className="relative z-10">Start a project</span><span className="relative z-10 text-lg leading-none">→</span></a>
            <span className="mono text-[11px] opacity-35">React · Next.js · TypeScript · GSAP · Three.js · AI</span>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[560px] lg:justify-self-end">
          <Telemetry />
          <div className="min-h-[280px]"><CodeStream /></div>
        </div>
      </div>
    </section>
  )
}
