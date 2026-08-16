type ContactPayload = {
  projectType: string
  goals: string[]
  businessName: string
  level: string
  hasWebsite: string
  websiteUrl: string
  budget: string
  timeline: string
  name: string
  email: string
}

function isValidPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false
  const payload = value as Record<string, unknown>

  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    typeof payload.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
  )
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  if (!isValidPayload(body)) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  console.log("[MORPH] New project enquiry", body)

  return Response.json({ ok: true })
}
