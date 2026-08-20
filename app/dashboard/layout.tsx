import type { ReactNode } from "react"
import DashboardNav from "@/components/dashboard/DashboardNav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#11120f]">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <DashboardNav />
        <main className="px-5 py-6 sm:px-8 lg:px-10 xl:px-14 xl:py-10">{children}</main>
      </div>
    </div>
  )
}
