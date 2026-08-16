"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function createRng(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

type Props = {
  count: number
  motionEnabled: boolean
}

export default function ParticleField({ count, motionEnabled }: Props) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    const rng = createRng(1337)

    for (let i = 0; i < count; i++) {
      const radius = 3.2 + rng() * 6.5
      const angle = rng() * Math.PI * 2

      array[i * 3] = Math.cos(angle) * radius
      array[i * 3 + 1] = (rng() - 0.5) * 7.5
      array[i * 3 + 2] = Math.sin(angle) * radius
    }

    return array
  }, [count])

  useFrame((state) => {
    if (!points.current || !motionEnabled) return
    points.current.rotation.y = state.clock.getElapsedTime() * 0.012
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.017}
        color="#b8abff"
        transparent
        opacity={0.32}
        sizeAttenuation
      />
    </points>
  )
}
