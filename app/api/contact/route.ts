import { morphServiceInsert } from "@/lib/morph/supabase-server"

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

function clean(value: string, max = 500) {
  return value.trim().slice(0, max)
}

function isValidPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false
  const payload = value as Record<string, unknown>

  return (
    typeof payload.projectType === "string" &&
    payload.projectType.trim().length > 0 &&
    Array.isArray(payload.goals) &&
    payload.goals.length > 0 &&
    payload.goals.every((goal) => typeof goal === "string" && goal.trim().length > 0) &&
    typeof payload.businessName === "string" &&
    payload.businessName.trim().length > 0 &&
    typeof payload.level === "string" &&
    payload.level.trim().length > 0 &&
    typeof payload.budget === "string" &&
    payload.budget.trim().length > 0 &&
    typeof payload.timeline === "string" &&
    payload.timeline.trim().length > 0 &&
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    payload.name.trim().length <= 120 &&
    typeof payload.email === "string" &&
    payload.email.trim().length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()) &&
    (typeof payload.websiteUrl === "string" || payload.websiteUrl === undefined)
  )
}

function formatLead(payload: ContactPayload) {
  return [
    "New MORPH project enquiry",
    "",
    `Name: ${clean(payload.name, 120)}`,
    `Email: ${clean(payload.email, 254)}`,
    `Business: ${clean(payload.businessName) || "—"}`,
    `Project type: ${clean(payload.projectType) || "—"}`,
    `Goals: ${payload.goals?.length ? payload.goals.map((goal) => clean(goal, 120)).join(", ") : "—"}`,
    `Level: ${clean(payload.level) || "—"}`,
    `Website: ${clean(payload.websiteUrl || "", 1000) || "—"}`,
    `Budget: ${clean(payload.budget) || "—"}`,
    `Timeline: ${clean(payload.timeline) || "—"}`,
  ].join("\n")
}

async function persistLead(payload: ContactPayload) {
  await morphServiceInsert("morph_intake_submissions", {
    source: "website",
    status: "new",
    build: clean(payload.projectType),
    goal: payload.goals.map((goal) => clean(goal, 120)).join(", "),
    experience: clean(payload.level),
    business: clean(payload.businessName),
    timeline: clean(payload.timeline),
    budget: clean(payload.budget),
    name: clean(payload.name, 120),
    email: clean(payload.email, 254).toLowerCase(),
    website: clean(payload.websiteUrl || "", 1000),
    message: "",
  })
}

async function deliverEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured")

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
      subject: `New MORPH enquiry — ${clean(payload.name, 120)}`,
      text: formatLead(payload),
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend delivery failed (${response.status}): ${error}`)
  }
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
      { error: "Missing or invalid required fields" },
      { status: 400 },
    )
  }

  let crmStored = false
  let emailDelivered = false

  try {
    await persistLead(body)
    crmStored = true
  } catch (error) {
    console.error("[MORPH] CRM intake persistence failed", error)
  }

  try {
    await deliverEmail(body)
    emailDelivered = true
  } catch (error) {
    console.error("[MORPH] Resend delivery failed", error)
  }

  if (!crmStored && !emailDelivered) {
    return Response.json(
      { error: "Contact delivery is temporarily unavailable" },
      { status: 503 },
    )
  }

  return Response.json({ ok: true, crmStored, emailDelivered })
}
