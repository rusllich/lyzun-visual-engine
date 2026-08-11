"use client"

const activities = [
  ["Nova Systems", "Proposal opened", "2 min"],
  ["Altura Labs", "Moved to Qualified", "18 min"],
  ["Kairo Studio", "New note added", "43 min"],
  ["Northstar AI", "Meeting booked", "1 h"],
  ["Orbit Commerce", "Deal value updated", "2 h"],
]

export default function ActivityFeed() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
          Activity
        </p>
        <h3 className="mt-2 text-xl font-medium">Live workspace</h3>
      </div>

      <div className="space-y-1">
        {activities.map(([company, action, time]) => (
          <div
            key={`${company}-${action}`}
            className="grid grid-cols-[10px_1fr_auto] items-start gap-3 rounded-2xl px-2 py-3 transition-colors hover:bg-white/[0.03]"
          >
            <span className="mt-2 h-2 w-2 rounded-full bg-violet-400" />
            <div>
              <p className="text-sm text-white/75">{company}</p>
              <p className="mt-1 text-xs text-white/35">{action}</p>
            </div>
            <span className="text-xs text-white/25">{time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
