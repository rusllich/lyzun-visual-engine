import "server-only"

const SUPABASE_URL = "https://riyickhwdsdypujxmdke.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_xC9d6KMqVgVfVn7KqFmMqQ_-C8UBNIw"

function headers(accessToken: string, extra: Record<string, string> = {}) {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    ...extra,
  }
}

function serviceHeaders(extra: Record<string, string> = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured")
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  }
}

function paramsFor(filters: Record<string, string>, select?: string) {
  const params = new URLSearchParams()
  if (select) params.set("select", select)
  for (const [key, value] of Object.entries(filters)) params.set(key, `eq.${value}`)
  return params
}

export async function morphServerSelectOne<T>(table: string, accessToken: string, filters: Record<string, string>, select = "*") {
  const params = paramsFor(filters, select)
  params.set("limit", "1")
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { headers: headers(accessToken), cache: "no-store" })
  if (!response.ok) throw new Error(`MORPH select failed (${response.status})`)
  const rows = await response.json() as T[]
  return rows[0] ?? null
}

export async function morphServerInsert<T>(table: string, accessToken: string, value: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: headers(accessToken, { Prefer: "return=representation" }),
    body: JSON.stringify(value),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`MORPH insert failed (${response.status})`)
  const rows = await response.json() as T[]
  return rows[0] ?? null
}

export async function morphServerPatch<T>(table: string, accessToken: string, filters: Record<string, string>, value: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${paramsFor(filters)}`, {
    method: "PATCH",
    headers: headers(accessToken, { Prefer: "return=representation" }),
    body: JSON.stringify(value),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`MORPH update failed (${response.status})`)
  const rows = await response.json() as T[]
  return rows[0] ?? null
}

export async function morphServiceSelectOne<T>(table: string, filters: Record<string, string>, select = "*") {
  const params = paramsFor(filters, select)
  params.set("limit", "1")
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { headers: serviceHeaders(), cache: "no-store" })
  if (!response.ok) throw new Error(`MORPH service select failed (${response.status})`)
  const rows = await response.json() as T[]
  return rows[0] ?? null
}

export async function morphServiceInsert<T>(table: string, value: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: serviceHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(value),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`MORPH service insert failed (${response.status})`)
  const rows = await response.json() as T[]
  return rows[0] ?? null
}

export async function morphServicePatch<T>(table: string, filters: Record<string, string>, value: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${paramsFor(filters)}`, {
    method: "PATCH",
    headers: serviceHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(value),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`MORPH service update failed (${response.status})`)
  const rows = await response.json() as T[]
  return rows[0] ?? null
}

export function bearerToken(request: Request) {
  const header = request.headers.get("authorization")
  if (!header?.startsWith("Bearer ")) return null
  return header.slice(7).trim() || null
}
