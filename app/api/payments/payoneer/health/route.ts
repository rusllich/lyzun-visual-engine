import { NextResponse } from "next/server"

export async function GET() {
  const configured = Boolean(
    process.env.PAYONEER_MERCHANT_CODE?.trim() &&
    process.env.PAYONEER_PAYMENT_TOKEN?.trim() &&
    process.env.PAYONEER_STORE_CODE?.trim() &&
    process.env.PAYONEER_LIST_ENDPOINT?.trim() &&
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() &&
    process.env.MORPH_PUBLIC_URL?.trim()
  )

  return NextResponse.json({ provider: "payoneer", configured }, {
    status: configured ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  })
}
