"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  Bot,
  CalendarDays,
  CircleDollarSign,
  ContactRound,
  Files,
  FolderKanban,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Users,
} from "lucide-react"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads / CRM", href: "/dashboard/crm", icon: Users },
  { label: "Clients", href: "/dashboard/clients", icon: ContactRound },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquareText },
  { label: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
  { label: "Files", href: "/dashboard/files", icon: Files },
  { label: "Finance", href: "/dashboard/finance", icon: CircleDollarSign },
  { label: "AI Agents", href: "/dashboard/agents", icon: Bot },
  { label: "Activity", href: "/dashboard/activity", icon: Activity },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <aside className="border-b border-black/10 bg-white px-5 py-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between lg:block">
        <div>
          <Link href="/dashboard" className="text-xl font-black tracking-[-0.06em]">MORPH</Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-black/35">Studio OS</p>
        </div>
        <span className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-black/45">Owner</span>
      </div>

      <nav className="mt-8 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1" aria-label="Dashboard navigation">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${active ? "bg-[#ecebff] font-semibold text-[#5146d8]" : "text-black/55 hover:bg-black/[0.035] hover:text-black"}`}
            >
              <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 border-t border-black/10 pt-5 lg:absolute lg:bottom-5 lg:left-5 lg:right-5">
        <Link href="/dashboard/settings" className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-black/55 hover:bg-black/[0.035] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
          <Settings size={16} strokeWidth={1.7} aria-hidden="true" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
