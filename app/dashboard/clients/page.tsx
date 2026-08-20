"use client"

import { useEffect, useState } from "react"
import { morphSupabaseQuery } from "@/lib/morph/supabase-public"

const TOKEN_KEY = "morph_owner_access"
type Client = { id: string; display_name: string; company_name: string | null; email: string | null; created_at: string }

export default function ClientsPage() {
  const [clients,setClients]=useState<Client[]>([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState("")
  useEffect(()=>{const token=sessionStorage.getItem(TOKEN_KEY);if(!token){queueMicrotask(()=>setLoading(false));return}morphSupabaseQuery<Client>("morph_clients",token,{select:"id,display_name,company_name,email,created_at",order:"created_at.desc",limit:100}).then(setClients).catch(()=>setError("Live client data is unavailable.")).finally(()=>setLoading(false))},[])
  return <>
    <header className="border-b border-black/10 pb-8"><p className="text-[10px] uppercase tracking-[0.2em] text-black/35">Clients</p><div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Every client.<br />One source of truth.</h1><p className="mt-5 max-w-2xl text-sm leading-6 text-black/45">The owner registry now shows only real MORPH client records. Conversations, projects and payments attach to these identities as the workflow advances.</p></div><a href="/dashboard/messages" className="grid min-h-11 place-items-center rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.13em] text-white">Open messages →</a></div></header>
    <section className="grid border-b border-black/10 sm:grid-cols-2"><article className="py-6 sm:p-6"><p className="text-[9px] uppercase tracking-[0.16em] text-black/35">Total clients</p><p className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{loading?"—":String(clients.length).padStart(2,"0")}</p><p className="mt-2 text-xs text-black/40">Live client registry</p></article><article className="py-6 sm:border-l sm:border-black/10 sm:p-6"><p className="text-[9px] uppercase tracking-[0.16em] text-black/35">Data state</p><p className="mt-4 text-2xl font-semibold tracking-[-0.045em]">{loading?"Loading":"Live"}</p><p className="mt-2 text-xs text-black/40">No demonstration identities</p></article></section>
    <section className="py-7">{error&&<p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}{!loading&&clients.length===0?<div className="rounded-2xl border border-black/10 bg-white p-8"><p className="text-[10px] uppercase tracking-[0.16em] text-black/35">Live registry</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">No clients provisioned yet.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-black/45">Qualified leads become client records only when the delivery workflow provisions them. The dashboard no longer invents examples.</p></div>:<div className="overflow-hidden rounded-2xl border border-black/10 bg-white">{clients.map((client,index)=><article key={client.id} className={`grid gap-3 p-5 lg:grid-cols-[1.2fr_1fr_0.7fr] lg:items-center ${index>0?"border-t border-black/10":""}`}><div><h2 className="font-semibold tracking-[-0.025em]">{client.company_name||client.display_name}</h2><p className="mt-1 text-xs text-black/40">{client.company_name?client.display_name:"Client"}</p></div><p className="text-xs text-black/55">{client.email||"No email stored"}</p><p className="text-xs text-black/40 lg:text-right">Added {new Date(client.created_at).toLocaleDateString()}</p></article>)}</div>}</section>
  </>
}
