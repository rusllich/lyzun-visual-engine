"use client"

import { useEffect } from "react"
import { captureAnalyticsException } from "@/lib/analytics"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    captureAnalyticsException(error, {
      boundary: "app",
      digest: error.digest,
    })
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030303] px-6 text-white">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/35">
          Lyzun Visual Engine
        </p>
        <h1 className="mt-6 text-4xl font-medium tracking-[-0.04em]">
          Something went wrong.
        </h1>
        <p className="mt-4 leading-7 text-white/45">
          The error has been recorded. Retry the experience without losing
          your place.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
