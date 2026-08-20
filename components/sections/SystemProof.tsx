"use client"

import { useEffect, useRef, useState } from "react"
import { telemetry, readTimings } from "@/lib/telemetry"

const COMMITMENTS = [
  ["LCP", "≤ 2.5 s"],
  ["CLS", "≤ 0.1"],
  ["INP", "≤ 200 ms"],
  ["WCAG", "2.2 AA"],
  ["Contrast", "≥ 4.5:1"],
  ["Reduced motion", "Honoured"],
]

export default function SystemProof() {
  const [timings, setTimings] = useState<ReturnType<typeof readTimings>>(null)
  const fpsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const settle = window.setTimeout(() => setTimings(readTimings()), 900)
    let raf = 0

    const tick = () => {
      if (fpsRef.current) fpsRef.current.textContent = telemetry.fps.toFixed(0)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      window.clearTimeout(settle)
      cancelAnimationFrame(raf)
    }
  }, [])

  const live = [
    ["FPS now", <span key="fps" ref={fpsRef}>0</span>, ""],
    ["TTFB", timings?.ttfb ?? "—", "ms"],
    ["DOM ready", timings?.domReady ?? "—", "ms"],
    ["Loaded", timings?.loaded ?? "—", "ms"],
  ] as const

  return (
    <section
      id="sys-proof"
      className="relative border-b border-[var(--line)] px-5 py-28 sm:px-8 lg:px-12 lg:py-40 xl:px-16"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid gap-10 border-b border-[var(--line)] pb-16 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:pb-24">
          <div>
            <span className="mono text-[9px] uppercase tracking-[0.22em] text-[var(--signal)]">Proof / measured here</span>
            <p className="mono mt-5 max-w-xs text-[10px] uppercase leading-5 tracking-[0.15em] opacity-35">
              The page is measuring itself while the live 3D system is running.
            </p>
          </div>
          <h2 className="max-w-[10ch] text-[clamp(3.4rem,8vw,9rem)] font-black uppercase leading-[0.79] tracking-[-0.065em]">
            Performance is part of the art direction.
          </h2>
        </div>

        <div className="grid border-b border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {live.map(([label, value, suffix], index) => (
            <div key={label} className={`py-8 sm:px-6 lg:py-10 ${index > 0 ? "sm:border-l sm:border-[var(--line)]" : ""}`}>
              <div className="flex items-end gap-2 text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-none tracking-[-0.065em] text-[var(--signal)]">
                {value}
                {suffix && <span className="mono mb-1 text-[9px] uppercase tracking-[0.15em] opacity-45">{suffix}</span>}
              </div>
              <p className="mono mt-4 text-[9px] uppercase tracking-[0.18em] opacity-35">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 pt-14 lg:grid-cols-[0.58fr_1.42fr] lg:pt-20">
          <div>
            <span className="mono text-[9px] uppercase tracking-[0.2em] opacity-35">Every production build</span>
            <p className="mt-5 max-w-sm text-xl leading-[1.35] tracking-[-0.025em]">
              We set constraints before the visual ambition gets expensive.
            </p>
          </div>

          <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map(([item, target]) => (
              <div key={item} className="border-t border-[var(--line)] py-6 sm:px-5 sm:odd:border-r lg:border-r lg:odd:border-r lg:last:border-r-0">
                <dt className="mono text-[9px] uppercase tracking-[0.17em] opacity-35">{item}</dt>
                <dd className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{target}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
