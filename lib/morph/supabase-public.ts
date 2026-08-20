const SUPABASE_URL = "https://riyickhwdsdypujxmdke.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_xC9d6KMqVgVfVn7KqFmMqQ_-C8UBNIw"

type QueryOptions = {
  select?: string
  filters?: Record<string, string>
  order?: string
  limit?: number
}

export async function morphSupabaseQuery<T>(table: string, accessToken: string, options: QueryOptions = {}): Promise<T[]> {
  const params = new URLSearchParams({ select: options.select ?? "*" })
  for (const [key, value] of Object.entries(options.filters ?? {})) params.set(key, `eq.${value}`)
  if (options.order) params.set("order", options.order)
  if (options.limit) params.set("limit", String(options.limit))

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  })

  if (!response.ok) throw new Error(`MORPH data request failed (${response.status})`)
  return response.json() as Promise<T[]>
}

export async function morphSignIn(email: string, password: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) throw new Error("Invalid email or password")
  return response.json() as Promise<{ access_token: string; expires_in: number }>
}
