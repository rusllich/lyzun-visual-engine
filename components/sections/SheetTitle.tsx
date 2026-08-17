"use client"

import { useRef } from "react"
import TitleDrawing from "@/components/three/TitleDrawing"
import TitleBlock from "@/components/draft/TitleBlock"
import DimensionLine from "@/components/draft/DimensionLine"
import { useInView } from "@/lib/use-in-view"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export default function SheetTitle() {
  const section = useRef<HTMLElement>(null)
  const inView = useInView(section, { amount: 0.15 })
  const reduced = useReducedMotion()

  return (
    <section
      id="sheet-00"
      ref={section}
      className="graph-paper relative min-h-screen border-b border-[var(--line-outline)]"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-center px-7 pb-14 pt-28 sm:px-12 lg:px-16 lg:pb-16 lg:pt-32 xl:px-24">
          <div className="mb-10 flex items-center gap-4">
            <span className="annotation text-[var(--signal)]">Sheet 00</span>
            <span className="h-px w-10 bg-[var(--line-outline)]" />
            <span className="annotation opacity-45">Title / General Arrangement</span>
          </div>

          <h1 className="max-w-[15ch] text-[clamp(2.7rem,5vw,4.7rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            Most websites are decorated.
            <span className="block text-[var(--signal)]">
              Yours should be engineered.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 opacity-55 md:text-lg md:leading-8">
            MORPH designs and builds websites and digital products for founders
            and companies who need the thing to actually perform. Strategy,
            interface, motion and engineering, specified up front and measured
            on delivery.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#sheet-06"
              className="group relative inline-flex items-center gap-3 border border-[var(--signal)] bg-[var(--signal)] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-[var(--signal)]"
            >
              Start a project
              <span className="h-px w-5 bg-current transition-all group-hover:w-8" />
            </a>

            <a
              href="#sheet-02"
              className="inline-flex items-center gap-3 border border-[var(--line-outline)] px-7 py-3.5 text-sm transition-colors hover:border-[var(--ink)]"
            >
              Read the drawings
            </a>
          </div>

          <TitleBlock
            className="mt-12 max-w-2xl"
            fields={[
              { label: "Client", value: "[ to be assigned ]" },
              { label: "Sheet", value: "00 of 06" },
              { label: "Revision", value: "Rev A" },
              { label: "Drawn by", value: "MORPH" },
            ]}
          />
        </div>

        <div className="relative min-h-[62vh] border-t border-[var(--line-outline)] lg:min-h-screen lg:border-l lg:border-t-0">
          <div className="absolute inset-0">
            <TitleDrawing active={inView} motion={!reduced} />
          </div>

          <span className="annotation absolute left-6 top-6 opacity-40">
            Fig. 1 — General arrangement, axonometric
          </span>

          <DimensionLine
            label="Above the fold"
            className="absolute inset-x-10 bottom-10 opacity-70"
          />
        </div>
      </div>
    </section>
  )
}
