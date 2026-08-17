"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import ExplodedAssembly from "@/components/three/ExplodedAssembly"
import SheetHeader from "@/components/draft/SheetHeader"
import { LAYERS } from "@/lib/assembly"
import { useInView } from "@/lib/use-in-view"
import { useReducedMotion } from "@/lib/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export default function SheetAssembly() {
  const section = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [hovered, setHovered] = useState<string | null>(null)
  const inView = useInView(section, { amount: 0.05 })
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!section.current || reduced) return

      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress
        },
      })

      return () => trigger.kill()
    },
    { scope: section, dependencies: [reduced] }
  )

  return (
    <section
      id="sheet-02"
      ref={section}
      className="relative border-b border-[var(--line-outline)]"
    >
      <div className="mx-auto max-w-[1600px] px-7 pt-24 sm:px-12 lg:px-16 xl:px-24">
        <SheetHeader
          number="02"
          title="Exploded Assembly"
          note="Scale 1:1 — six layers"
        />
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[1fr_1fr]">
        {/* Drawing holds still while the schedule scrolls past it */}
        <div className="sticky top-0 hidden h-screen lg:block">
          <ExplodedAssembly
            progress={progress}
            active={inView}
            motion={!reduced}
            hovered={hovered}
          />
          <span className="annotation absolute bottom-8 left-8 opacity-40">
            Fig. 2 — Exploded assembly, layers L1 to L6
          </span>
        </div>

        {/* Mobile gets one fixed exploded view instead of a sticky viewport */}
        <div className="relative h-[58vh] lg:hidden">
          <ExplodedAssembly
            progress={progress}
            active={inView}
            motion={!reduced}
            hovered={hovered}
            forceSpread
            zoom={34}
          />
        </div>

        {/* Tall column gives the sticky drawing real travel to explode across */}
        <div className="px-7 pb-28 sm:px-12 lg:px-16 lg:pb-[55vh] xl:px-24">
          <p className="max-w-lg pt-6 text-lg leading-8 opacity-55 lg:pt-[22vh]">
            A website is not one thing you buy. It is six layers that have to
            agree with each other. Here is what MORPH assembles, top to bottom.
          </p>

          <ol className="mt-14">
            {LAYERS.map((layer) => (
              <li
                key={layer.id}
                onMouseEnter={() => setHovered(layer.id)}
                onMouseLeave={() => setHovered(null)}
                className="group grid grid-cols-[3rem_1fr] gap-x-5 border-t border-[var(--line-construction)] py-7 transition-colors last:border-b hover:border-[var(--signal)] lg:py-10"
              >
                <span className="annotation pt-1.5 text-[var(--signal)]">
                  {layer.code}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.015em] transition-colors group-hover:text-[var(--signal)] md:text-2xl">
                    {layer.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-7 opacity-45">
                    {layer.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
