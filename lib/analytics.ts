import posthog from "posthog-js"

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>

function analyticsEnabled() {
  return (
    typeof window !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY)
  )
}

export function captureAnalyticsEvent(
  eventName: string,
  properties: AnalyticsProperties = {}
) {
  if (!analyticsEnabled()) return

  posthog.capture(eventName, {
    ...properties,
    path: window.location.pathname,
  })
}

export function captureAnalyticsException(
  error: unknown,
  properties: AnalyticsProperties = {}
) {
  if (!analyticsEnabled()) return

  posthog.captureException(error, {
    ...properties,
    path: window.location.pathname,
  })
}
