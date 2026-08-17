"use client"

import Link from "next/link"
import SheetHeader from "@/components/draft/SheetHeader"

const PROJECTS = [
  {
    href: "/showcase-01",
    ref: "AB-01",
    title: "A product presence with gravity",
    body: "A real-time 3D product scene built to make a premium object feel expensive well before checkout.",
    spec: [
      ["Type", "Product launch"],
      ["Layers", "L1 – L6"],
      ["Build", "WebGL, real-time"],
      ["Status", "Concept work"],
    ],
  },
  {
    href: "/showcase-02",
    ref: "AB-02",
    title: "AXIS, a CRM that feels premium to run",
    body: "A revenue-operations dashboard: pipeline intelligence, live data, and an interface built to be used every day rather than demoed once.",
    spec: [
      ["Type", "SaaS product"],
      ["Layers", "L2 – L5"],
      ["Build", "Design system, data UI"],
      ["Status", "Concept work"],
    ],
  },
]

export default function SheetAsBuilt() {
  return (
    <section
      id="sheet-03"
      className="relative border-b border-[var(--line-outline)] px-7 py-28 sm:px-12 lg:px-16 xl:px-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <SheetHeader number="03" title="As-Built" note="Drawings of record" />

        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="max-w-[14ch] text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Two builds, drawn to the same standard.
          </h2>
          <p className="max-w-md self-end text-lg leading-8 opacity-55">
            Both are original concept work, built by MORPH to show the standard
            rather than to fill a portfolio. Neither is a commissioned client
            project, and we do not present them as one.
          </p>
        </div>

        <div className="grid gap-px border border-[var(--line-outline)] bg-[var(--line-construction)] lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              className="group relative flex flex-col bg-[var(--ground)] p-8 transition-colors hover:bg-[#0f1013] lg:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="annotation text-[var(--signal)]">
                  {project.ref}
                </span>
                <span className="annotation opacity-40 transition-opacity group-hover:opacity-100">
                  Open drawing →
                </span>
              </div>

              <h3 className="mt-10 max-w-[18ch] text-2xl font-medium leading-[1.15] tracking-[-0.02em] md:text-3xl">
                {project.title}
              </h3>

              <p className="mt-5 max-w-md leading-7 opacity-45">
                {project.body}
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-px border-t border-[var(--line-construction)] pt-6 sm:grid-cols-4">
                {project.spec.map(([label, value]) => (
                  <div key={label}>
                    <dt className="annotation opacity-35">{label}</dt>
                    <dd className="mt-1.5 font-mono text-xs">{value}</dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
