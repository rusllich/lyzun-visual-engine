"use client"

import Link from "next/link"
import { motion } from "motion/react"
import RevenueChart from "@/components/showcase02/RevenueChart"
import Pipeline from "@/components/showcase02/Pipeline"
import ActivityFeed from "@/components/showcase02/ActivityFeed"
import DealsTable from "@/components/showcase02/DealsTable"

const metrics = [
  ["Pipeline value", "$84.2K", "+18.6%"],
  ["Qualified leads", "128", "+12.4%"],
  ["Win rate", "42.8%", "+6.1%"],
  ["Avg. deal", "$9.7K", "+9.3%"],
]

const nav = ["Overview", "Pipeline", "Accounts", "Automation", "Reports"]

export default function Showcase02Page() {
  return (
    <main className="min-h-screen bg-[#07080b] text-white">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="border-b border-white/10 bg-[#090a0e] px-5 py-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Showcase 02
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                  AXIS CRM
                </h1>
              </div>

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
            </div>

            <nav className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1">
              {nav.map((item, index) => (
                <button
                  key={item}
                  className={`rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    index === 0
                      ? "bg-white/[0.07] text-white"
                      : "text-white/35 hover:bg-white/[0.035] hover:text-white/65"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-violet-400/15 bg-violet-400/[0.05] p-4 lg:mt-auto">
              <p className="text-xs font-medium text-violet-200">AI summary</p>
              <p className="mt-2 text-xs leading-5 text-white/35">
                5 deals need attention today. Highest upside: Northstar AI.
              </p>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/25">
                Revenue Operations
              </p>
              <h2 className="mt-1 text-2xl font-medium tracking-[-0.035em]">
                Executive overview
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50">
                Aug 1 — Aug 31
              </button>
              <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
                + New deal
              </button>
              <Link
                href="/"
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50"
              >
                Back to engine
              </Link>
            </div>
          </header>

          <div className="px-6 py-7 sm:px-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map(([label, value, delta], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5"
                >
                  <p className="text-xs text-white/30">{label}</p>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <span className="text-3xl font-medium tracking-[-0.04em]">
                      {value}
                    </span>
                    <span className="text-xs text-emerald-300">{delta}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_.9fr]">
              <RevenueChart />
              <Pipeline />
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_.75fr]">
              <DealsTable />
              <ActivityFeed />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
