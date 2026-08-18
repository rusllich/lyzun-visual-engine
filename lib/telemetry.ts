/**
 * Live numbers measured off the visitor's own machine. Nothing here is
 * invented — every value comes from a browser API or the renderer itself.
 */
export const telemetry = {
  fps: 0,
  frameMs: 0,
  drawCalls: 0,
  triangles: 0,
  programs: 0,
  /** Rolling FPS history for the sparkline. */
  history: new Array<number>(64).fill(0),
}

export type DeviceInfo = {
  gpu: string
  cores: number
  memory: string
  dpr: string
  viewport: string
  webgl: string
}

export function readDevice(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      gpu: "—",
      cores: 0,
      memory: "—",
      dpr: "—",
      viewport: "—",
      webgl: "—",
    }
  }

  let gpu = "unavailable"
  let webgl = "none"

  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    if (gl) {
      webgl = canvas.getContext("webgl2") ? "WebGL 2.0" : "WebGL 1.0"
      const dbg = gl.getExtension("WEBGL_debug_renderer_info")
      if (dbg) {
        gpu = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
      }
      const lose = gl.getExtension("WEBGL_lose_context")
      lose?.loseContext()
    }
  } catch {
    gpu = "unavailable"
  }

  const nav = navigator as Navigator & { deviceMemory?: number }

  return {
    gpu: gpu.length > 46 ? `${gpu.slice(0, 44)}…` : gpu,
    cores: navigator.hardwareConcurrency ?? 0,
    memory: nav.deviceMemory ? `${nav.deviceMemory} GB` : "not reported",
    dpr: window.devicePixelRatio.toFixed(2),
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    webgl,
  }
}

/** Real navigation timings, once the load event has settled. */
export function readTimings(): { ttfb: number; domReady: number; loaded: number } | null {
  if (typeof performance === "undefined") return null
  const [nav] = performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[]
  if (!nav) return null

  return {
    ttfb: Math.round(nav.responseStart),
    domReady: Math.round(nav.domContentLoadedEventEnd),
    loaded: Math.round(nav.loadEventEnd || nav.duration),
  }
}
