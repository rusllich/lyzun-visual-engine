"use client"

import type { FormEvent, ReactNode } from "react"
import { useEffect, useState } from "react"
import DashboardNav from "@/components/dashboard/DashboardNav"
import { morphSignIn, morphSupabaseQuery } from "@/lib/morph/supabase-public"

const TOKEN_KEY = "morph_owner_access"

type StudioMember = { role: "owner" | "admin" | "member" }

export default function DashboardGate({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY)
    if (!stored) {
      queueMicrotask(() => setReady(true))
      return
    }

    async function verify(accessToken: string) {
      try {
        const members = await morphSupabaseQuery<StudioMember>("morph_studio_members", accessToken, { select: "role", limit: 1 })
        if (!members.some(member => member.role === "owner" || member.role === "admin")) throw new Error("Owner access required")
        setToken(accessToken)
      } catch {
        sessionStorage.removeItem(TOKEN_KEY)
        setError("This account does not have MORPH owner access.")
      } finally {
        setReady(true)
      }
    }

    void verify(stored)
  }, [])

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError("")
    try {
      const session = await morphSignIn(String(form.get("email") ?? "").trim(), String(form.get("password") ?? ""))
      const members = await morphSupabaseQuery<StudioMember>("morph_studio_members", session.access_token, { select: "role", limit: 1 })
      if (!members.some(member => member.role === "owner" || member.role === "admin")) throw new Error("Owner access required")
      sessionStorage.setItem(TOKEN_KEY, session.access_token)
      setToken(session.access_token)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign in")
    }
  }

  if (!ready) return <main className="grid min-h-screen place-items-center bg-[#f4f4ef] text-sm text-black/40">Opening MORPH OS…</main>

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f4ef] px-5 text-[#11120f]">
        <form onSubmit={signIn} className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-7 sm:p-10">
          <p className="text-xl font-black tracking-[-0.06em]">MORPH</p>
          <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-black/35">Owner workspace</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em]">Control the studio.<br />See every handoff.</h1>
          <div className="mt-8 grid gap-3">
            <label className="text-xs font-medium">Email<input name="email" type="email" autoComplete="email" required className="mt-2 min-h-12 w-full rounded-xl border border-black/10 px-4 outline-none focus:border-[#6257e8]" /></label>
            <label className="text-xs font-medium">Password<input name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-12 w-full rounded-xl border border-black/10 px-4 outline-none focus:border-[#6257e8]" /></label>
          </div>
          {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
          <button className="mt-6 min-h-12 w-full rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white">Open owner dashboard</button>
        </form>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#11120f]">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <DashboardNav />
        <main className="px-5 py-6 sm:px-8 lg:px-10 xl:px-14 xl:py-10">{children}</main>
      </div>
    </div>
  )
}
