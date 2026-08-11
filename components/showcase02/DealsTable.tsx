"use client"

const deals = [
  ["Northstar AI", "Enterprise", "$18,400", "Closing", "Sep 12"],
  ["Nova Systems", "Growth", "$12,800", "Proposal", "Sep 15"],
  ["Kairo Studio", "Studio", "$9,600", "Qualified", "Sep 18"],
  ["Orbit Commerce", "Growth", "$7,900", "New lead", "Sep 21"],
]

export default function DealsTable() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
            Deal desk
          </p>
          <h3 className="mt-2 text-xl font-medium">Priority deals</h3>
        </div>
        <button className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/55">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.07] text-[10px] uppercase tracking-[0.2em] text-white/25">
              <th className="px-6 py-4 font-medium">Account</th>
              <th className="px-6 py-4 font-medium">Plan</th>
              <th className="px-6 py-4 font-medium">Value</th>
              <th className="px-6 py-4 font-medium">Stage</th>
              <th className="px-6 py-4 font-medium">Close</th>
            </tr>
          </thead>
          <tbody>
            {deals.map(([account, plan, value, stage, close]) => (
              <tr
                key={account}
                className="border-b border-white/[0.05] text-sm text-white/60 last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4 font-medium text-white/80">{account}</td>
                <td className="px-6 py-4">{plan}</td>
                <td className="px-6 py-4">{value}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-violet-400/10 px-2.5 py-1 text-xs text-violet-300">
                    {stage}
                  </span>
                </td>
                <td className="px-6 py-4">{close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
