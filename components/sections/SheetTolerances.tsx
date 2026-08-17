"use client"

import SheetHeader from "@/components/draft/SheetHeader"

const SPEC = [
  {
    group: "Performance",
    rows: [
      ["Largest Contentful Paint", "≤ 2.5 s", "Field, 75th percentile"],
      ["Cumulative Layout Shift", "≤ 0.1", "Field, 75th percentile"],
      ["Interaction to Next Paint", "≤ 200 ms", "Field, 75th percentile"],
      ["Images", "Responsive, lazy", "Below the fold"],
    ],
  },
  {
    group: "Accessibility",
    rows: [
      ["Conformance target", "WCAG 2.2 AA", "Reviewed before launch"],
      ["Text contrast", "≥ 4.5:1", "Body copy"],
      ["Keyboard", "All controls reachable", "Visible focus states"],
      ["Reduced motion", "Honoured", "prefers-reduced-motion"],
    ],
  },
  {
    group: "Engineering",
    rows: [
      ["Transport", "HTTPS with HSTS", "Enforced"],
      ["Form input", "Validated server-side", "No secrets client-side"],
      ["Browsers", "Last 2 major versions", "Plus current mobile Safari"],
      ["Handover", "Repo + pipeline", "Yours to keep"],
    ],
  },
]

export default function SheetTolerances() {
  return (
    <section
      id="sheet-05"
      className="sheet-paper relative border-b border-[var(--line-outline)] px-7 py-28 sm:px-12 lg:px-16 xl:px-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <SheetHeader
          number="05"
          title="Tolerances & Standards"
          note="Issued for construction"
        />

        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="max-w-[16ch] text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            The parts nobody demos, written down as numbers.
          </h2>
          <p className="max-w-md self-end text-lg leading-8 opacity-60">
            Anyone can promise quality. These are the budgets and standards
            MORPH builds to, agreed before work starts and checked before
            launch. They are targets we commit to, not results borrowed from
            somebody else&apos;s project.
          </p>
        </div>

        <div className="border-t border-[var(--line-outline)]">
          {SPEC.map((block) => (
            <div key={block.group} className="border-b border-[var(--line-outline)]">
              <div className="grid grid-cols-1 lg:grid-cols-[12rem_1fr]">
                <h3 className="annotation py-6 text-[var(--signal)] lg:py-8">
                  {block.group}
                </h3>

                <dl className="pb-6 lg:pb-8 lg:pt-8">
                  {block.rows.map(([item, value, note]) => (
                    <div
                      key={item}
                      className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-[var(--line-construction)] py-4 last:border-b-0 sm:grid-cols-[1fr_11rem_13rem]"
                    >
                      <dt className="text-[15px]">{item}</dt>
                      <dd className="font-mono text-[13px] text-[var(--signal)]">
                        {value}
                      </dd>
                      <dd className="annotation opacity-45">{note}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>

        <p className="annotation mt-8 opacity-45">
          Figures are commitments for the build, verified on delivery.
        </p>
      </div>
    </section>
  )
}
