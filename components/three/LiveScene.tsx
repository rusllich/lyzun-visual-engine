"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import SystemCore from "@/components/three/SystemCore"
import { telemetry } from "@/lib/telemetry"

/** Samples the real renderer each frame and publishes it to the HUD. */
function TelemetryProbe() {
  const gl = useThree((state) => state.gl)
  const frames = useRef(0)
  const last = useRef(0)
  const cursor = useRef(0)

  useFrame(({ clock }) => {
    frames.current += 1
    const now = clock.getElapsedTime()

    if (last.current === 0) {
      last.current = now
      return
    }

    const elapsed = now - last.current
    if (elapsed < 0.5) return

    const fps = frames.current / elapsed
    telemetry.fps = fps
    telemetry.frameMs = 1000 / fps
    telemetry.drawCalls = gl.info.render.calls
    telemetry.triangles = gl.info.render.triangles
    telemetry.programs = gl.info.programs?.length ?? 0

    telemetry.history[cursor.current % telemetry.history.length] = fps
    cursor.current += 1

    frames.current = 0
    last.current = now
  })

  return null
}

type Props = {
  formation: number
  count: number
  motion: boolean
  dpr: [number, number]
}

export default function LiveScene({ formation, count, motion, dpr }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <TelemetryProbe />
      <SystemCore formation={formation} count={count} motion={motion} />
    </Canvas>
  )
}
