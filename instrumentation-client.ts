import posthog from "posthog-js"

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (projectToken) {
  try {
    posthog.init(projectToken, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      defaults: "2026-05-30",
      capture_exceptions: true,
      capture_pageleave: true,
      person_profiles: "identified_only",
      debug: process.env.NODE_ENV === "development",
    })
  } catch {
    // Analytics must never prevent the application from hydrating.
  }
}
