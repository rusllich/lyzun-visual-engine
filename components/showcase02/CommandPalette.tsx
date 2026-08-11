"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

type Props = {
  open: boolean
  onClose: () => void
  onNewDeal: () => void
}

const commands = [
  ["Open pipeline", "Navigate to active opportunities"],
  ["Open accounts", "Review key customer accounts"],
  ["Run AI summary", "Generate today's revenue brief"],
  ["Create report", "Build executive performance report"],
]

export default function CommandPalette({ open, onClose, onNewDeal }: Props) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const filtered = commands.filter(([title, text]) =>
    `${title} ${text}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-5 pt-[14vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#101116] shadow-2xl"
          >
            <div className="border-b border-white/10 p-4">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search AXIS commands..."
                className="w-full bg-transparent px-3 py-3 text-lg text-white outline-none placeholder:text-white/20"
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto p-3">
              <button
                onClick={() => {
                  onClose()
                  onNewDeal()
                }}
                className="mb-2 flex w-full items-center justify-between rounded-2xl bg-violet-500/10 px-4 py-4 text-left transition hover:bg-violet-500/15"
              >
                <div>
                  <p className="text-sm font-medium text-violet-200">Create new deal</p>
                  <p className="mt-1 text-xs text-white/30">Add a new opportunity to pipeline</p>
                </div>
                <span className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-white/30">
                  N
                </span>
              </button>

              {filtered.map(([title, text]) => (
                <button
                  key={title}
                  onClick={onClose}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition hover:bg-white/[0.045]"
                >
                  <div>
                    <p className="text-sm text-white/75">{title}</p>
                    <p className="mt-1 text-xs text-white/30">{text}</p>
                  </div>
                  <span className="text-white/20">↗</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between border-t border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/20">
              <span>AXIS Command Center</span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
