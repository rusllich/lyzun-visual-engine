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

const LEADS_TO = "founder.morph@gmail.com"
const LEADS_FROM = "MORPH Leads <leads@auth.lyzuncompany.com>"

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

function formatLead(payload: ContactPayload) {
  return [
    "New MORPH project enquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Business: ${payload.businessName || "—"}`,
    `Project type: ${payload.projectType || "—"}`,
    `Goals: ${payload.goals?.length ? payload.goals.join(", ") : "—"}`,
    `Level: ${payload.level || "—"}`,
    `Has website: ${payload.hasWebsite || "—"}`,
    `Website: ${payload.websiteUrl || "—"}`,
    `Budget: ${payload.budget || "—"}`,
    `Timeline: ${payload.timeline || "—"}`,
  ].join("\n")
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

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error("[MORPH] RESEND_API_KEY is not configured")
    return Response.json(
      { error: "Contact delivery is temporarily unavailable" },
      { status: 503 }
    )
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "morph-web/1.0",
    },
    body: JSON.stringify({
      from: LEADS_FROM,
      to: [LEADS_TO],
      subject: `New MORPH enquiry — ${body.name.trim()}`,
      text: formatLead(body),
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("[MORPH] Resend delivery failed", response.status, error)
    return Response.json(
      { error: "Contact delivery failed" },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}
