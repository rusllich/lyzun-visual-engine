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

export async function morphServerSelectOne<T>(table: string, accessToken: string, filters: Record<string, string>, select = "*") {
  const params = new URLSearchParams({ select, limit: "1" })
  for (const [key, value] of Object.entries(filters)) params.set(key, `eq.${value}`)
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
  const params = new URLSearchParams()
  for (const [key, filterValue] of Object.entries(filters)) params.set(key, `eq.${filterValue}`)
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    method: "PATCH",
    headers: headers(accessToken, { Prefer: "return=representation" }),
    body: JSON.stringify(value),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`MORPH update failed (${response.status})`)
  const rows = await response.json() as T[]
  return rows[0] ?? null
}

export function bearerToken(request: Request) {
  const header = request.headers.get("authorization")
  if (!header?.startsWith("Bearer ")) return null
  return header.slice(7).trim() || null
}
