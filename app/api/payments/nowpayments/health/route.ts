import { NextResponse } from "next/server"

export async function GET() {
  const configured = Boolean(
    process.env.NOWPAYMENTS_API_KEY?.trim() &&
    process.env.NOWPAYMENTS_IPN_SECRET?.trim() &&
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() &&
    process.env.MORPH_PUBLIC_URL?.trim()
  )

  return NextResponse.json({ provider: "nowpayments", configured }, {
    status: configured ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  })
}
