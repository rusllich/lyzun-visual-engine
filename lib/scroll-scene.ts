export const scrollProgress = { value: 0 }
export const sceneAccent = { mix: 0 }

type Accent = "cool" | "warm" | "mix"

export type CameraStop = {
  t: number
  position: [number, number, number]
  accent: Accent
}

export const CAMERA_STOPS: CameraStop[] = [
  { t: 0.0, position: [1.7, 0.15, 6.4], accent: "cool" }, // Hero
  { t: 0.13, position: [-1.6, -0.5, 5.6], accent: "mix" }, // BusinessProblems
  { t: 0.3, position: [1.5, 0.4, 5.0], accent: "cool" }, // Capabilities
  { t: 0.47, position: [-1.3, 0.7, 4.7], accent: "warm" }, // Work
  { t: 0.6, position: [1.1, -0.5, 5.3], accent: "mix" }, // InteractiveShowcase
  { t: 0.75, position: [-1.6, 0.2, 5.7], accent: "cool" }, // Process
  { t: 0.9, position: [0.2, -0.3, 6.1], accent: "warm" }, // Contact
  { t: 1.0, position: [0, 0.1, 7.8], accent: "warm" }, // Footer recede
]

const ACCENT_MIX: Record<Accent, number> = {
  cool: 0,
  mix: 0.5,
  warm: 1,
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export type CameraState = {
  position: [number, number, number]
  accentMix: number
}

export function getCameraStateAtProgress(progress: number): CameraState {
  const clamped = Math.min(1, Math.max(0, progress))

  let lower = CAMERA_STOPS[0]
  let upper = CAMERA_STOPS[CAMERA_STOPS.length - 1]

  for (let i = 0; i < CAMERA_STOPS.length - 1; i++) {
    if (clamped >= CAMERA_STOPS[i].t && clamped <= CAMERA_STOPS[i + 1].t) {
      lower = CAMERA_STOPS[i]
      upper = CAMERA_STOPS[i + 1]
      break
    }
  }

  const span = upper.t - lower.t
  const localT = span === 0 ? 0 : (clamped - lower.t) / span

  return {
    position: [
      lerp(lower.position[0], upper.position[0], localT),
      lerp(lower.position[1], upper.position[1], localT),
      lerp(lower.position[2], upper.position[2], localT),
    ],
    accentMix: lerp(ACCENT_MIX[lower.accent], ACCENT_MIX[upper.accent], localT),
  }
}
