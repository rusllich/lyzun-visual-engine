"use client"

import { useEffect, useRef, useState } from "react"
import { telemetry, readTimings } from "@/lib/telemetry"

const COMMITMENTS = [
  ["Largest Contentful Paint", "≤ 2.5 s"],
  ["Cumulative Layout Shift", "≤ 0.1"],
  ["Interaction to Next Paint", "≤ 200 ms"],
  ["Conformance target", "WCAG 2.2 AA"],
  ["Text contrast", "≥ 4.5:1"],
  ["Reduced motion", "Fully honoured"],
]

/** Counts a real measured number up from zero when it scrolls into view. */
function Metric({
  label,
  value,
  suffix,
}: {
  label: string
  value: number | null
  suffix: string
}) {
  return (
    <div className="border-t border-[var(--line)] py-6">
      <p className="mono text-[10px] uppercase tracking-[0.2em] opacity-35">
        {label}
      </p>
      <p className="mono mt-3 text-3xl text-[var(--signal)] md:text-4xl">
        {value === null ? "—" : value.toLocaleString("en-US")}
        <span className="ml-1.5 text-sm opacity-50">{suffix}</span>
      </p>
    </div>
  )
}

export default function SystemProof() {
  const [timings, setTimings] = useState<ReturnType<typeof readTimings>>(null)
  const fpsRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const settle = window.setTimeout(() => setTimings(readTimings()), 900)

    let raf = 0
    const tick = () => {
      if (fpsRef.current) {
        fpsRef.current.textContent = telemetry.fps.toFixed(0)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(settle)
    }
  }, [])

  return (
    <section
      id="sys-proof"
      className="relative flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-14 xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1700px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="readable">
          <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--signal)]">
            Measurement / this session
          </span>
          <h2 className="mt-6 max-w-[14ch] text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            Numbers from your machine, not our brochure.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-8 opacity-55">
            Anyone can claim their sites are fast. These are the real timings
            this page just recorded in your browser, while running everything
            you have scrolled through.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8">
            <div className="border-t border-[var(--line)] py-6">
              <p className="mono text-[10px] uppercase tracking-[0.2em] opacity-35">
                Current framerate
              </p>
              <p
                ref={fpsRef}
                className="mono mt-3 text-3xl text-[var(--signal)] md:text-4xl"
              >
                0
              </p>
            </div>
            <Metric
              label="Time to first byte"
              value={timings?.ttfb ?? null}
              suffix="ms"
            />
            <Metric
              label="DOM ready"
              value={timings?.domReady ?? null}
              suffix="ms"
            />
            <Metric
              label="Fully loaded"
              value={timings?.loaded ?? null}
              suffix="ms"
            />
          </div>
        </div>

        <div className="panel self-center p-7 lg:p-9">
          <div className="mb-6 flex items-center justify-between">
            <span className="mono text-[10px] uppercase tracking-[0.2em] opacity-40">
              Build commitments
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--signal)]">
              Every project
            </span>
          </div>

          <dl>
            {COMMITMENTS.map(([item, target]) => (
              <div
                key={item}
                className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-4 last:border-b-0"
              >
                <dt className="text-[15px] opacity-70">{item}</dt>
                <dd className="mono shrink-0 text-[12px] text-[var(--signal)]">
                  {target}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[11px] leading-5 opacity-30">
            Targets the build is held to and verified against before launch.
            Stated as commitments, not as results borrowed from other people&apos;s
            projects.
          </p>
        </div>
      </div>
    </section>
  )
}
