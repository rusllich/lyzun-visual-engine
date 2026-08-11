"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type Props = {
  open: boolean
  onClose: () => void
}

export default function NewDealModal({ open, onClose }: Props) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    window.setTimeout(() => {
      setSaved(false)
      onClose()
    }, 850)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-xl rounded-[30px] border border-white/10 bg-[#101116] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-violet-300/60">
                  Pipeline
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                  Create new deal
                </h3>
              </div>

              <button
                onClick={onClose}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/40 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-7 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs text-white/35">Account</span>
                <input
                  defaultValue="Aether Mobility"
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs text-white/35">Deal value</span>
                  <input
                    defaultValue="$14,500"
                    className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs text-white/35">Stage</span>
                  <select className="rounded-2xl border border-white/10 bg-[#15161b] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40">
                    <option>Qualified</option>
                    <option>Proposal</option>
                    <option>Closing</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs text-white/35">Next action</span>
                <textarea
                  defaultValue="Prepare executive proposal and schedule product walkthrough."
                  rows={3}
                  className="resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/45"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black"
              >
                {saved ? "Saved ✓" : "Create deal"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
