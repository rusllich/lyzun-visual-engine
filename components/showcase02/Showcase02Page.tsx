"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import RevenueChart from "@/components/showcase02/RevenueChart"
import Pipeline from "@/components/showcase02/Pipeline"
import ActivityFeed from "@/components/showcase02/ActivityFeed"
import DealsTable from "@/components/showcase02/DealsTable"
import AIInsights from "@/components/showcase02/AIInsights"
import CommandPalette from "@/components/showcase02/CommandPalette"
import NewDealModal from "@/components/showcase02/NewDealModal"

const metrics = [
  ["Pipeline value", "$84.2K", "+18.6%"],
  ["Qualified leads", "128", "+12.4%"],
  ["Win rate", "42.8%", "+6.1%"],
  ["Avg. deal", "$9.7K", "+9.3%"],
]

const nav = ["Overview", "Pipeline", "Accounts", "Automation", "Reports"]

export default function Showcase02Page() {
  const [activeNav, setActiveNav] = useState("Overview")
  const [commandOpen, setCommandOpen] = useState(false)
  const [dealOpen, setDealOpen] = useState(false)
  const [range, setRange] = useState("Aug 1 — Aug 31")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen((value) => !value)
      }

      if (event.key.toLowerCase() === "n" && !commandOpen) {
        const target = event.target as HTMLElement | null
        const isTyping =
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.tagName === "SELECT"

        if (!isTyping) setDealOpen(true)
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [commandOpen])

  const subtitle = useMemo(() => {
    const map: Record<string, string> = {
      Overview: "Executive overview",
      Pipeline: "Pipeline intelligence",
      Accounts: "Account health",
      Automation: "Revenue automation",
      Reports: "Performance reports",
    }

    return map[activeNav]
  }, [activeNav])

  return (
    <main className="min-h-screen bg-[#07080b] text-white">
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNewDeal={() => setDealOpen(true)}
      />

      <NewDealModal open={dealOpen} onClose={() => setDealOpen(false)} />

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

            <button
              onClick={() => setCommandOpen(true)}
              className="mt-6 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 text-left text-xs text-white/30 transition hover:bg-white/[0.05]"
            >
              <span>Search commands</span>
              <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[9px]">
                ⌘K
              </span>
            </button>

            <nav className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-1">
              {nav.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    activeNav === item
                      ? "bg-white/[0.07] text-white"
                      : "text-white/35 hover:bg-white/[0.035] hover:text-white/65"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-violet-400/15 bg-violet-400/[0.05] p-4 lg:mt-auto">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-violet-200">AI summary</p>
                <span className="text-[10px] text-violet-300/35">LIVE</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/35">
                5 deals need attention today. Highest upside: Northstar AI.
              </p>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07080b]/85 px-6 py-5 backdrop-blur-2xl sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/25">
                  Revenue Operations / {activeNav}
                </p>
                <h2 className="mt-1 text-2xl font-medium tracking-[-0.035em]">
                  {subtitle}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search accounts..."
                    className="w-[180px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/35"
                  />
                  {search && (
                    <span className="absolute -bottom-6 left-3 text-[10px] text-white/25">
                      Searching: {search}
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    setRange((value) =>
                      value === "Aug 1 — Aug 31" ? "Last 90 days" : "Aug 1 — Aug 31"
                    )
                  }
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50"
                >
                  {range}
                </button>

                <button
                  onClick={() => setDealOpen(true)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02]"
                >
                  + New deal
                </button>

                <Link
                  href="/"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50"
                >
                  Back to engine
                </Link>
              </div>
            </div>
          </header>

          <div className="px-6 py-7 sm:px-8">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map(([label, value, delta], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 transition-colors hover:bg-white/[0.04]"
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

              <div className="mt-4">
                <AIInsights />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
