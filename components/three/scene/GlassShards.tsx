"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { sceneAccent } from "@/lib/scroll-scene"

const COOL = new THREE.Color("#7B68FF")
const WARM = new THREE.Color("#FFB067")
const tmpColor = new THREE.Color()

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

export default function GlassShards({ count, motionEnabled }: Props) {
  const shards = useMemo(() => {
    const rng = createRng(482)
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      position: [
        (rng() - 0.5) * 6,
        (rng() - 0.5) * 4,
        (rng() - 0.5) * 3 - 1,
      ] as [number, number, number],
      scale: 0.16 + rng() * 0.22,
      speed: 0.6 + rng() * 0.8,
      floatIntensity: 0.8 + rng() * 1.2,
    }))
  }, [count])

  if (count === 0) return null

  return (
    <group>
      {shards.map(({ id, ...shard }) => (
        <Shard key={id} {...shard} motionEnabled={motionEnabled} />
      ))}
    </group>
  )
}

function Shard({
  position,
  scale,
  speed,
  floatIntensity,
  motionEnabled,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  floatIntensity: number
  motionEnabled: boolean
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    const material = mesh.current?.material as THREE.MeshPhysicalMaterial | undefined
    if (material) {
      tmpColor.copy(WARM).lerp(COOL, sceneAccent.mix)
      material.color.copy(tmpColor)
    }
    if (mesh.current && motionEnabled) {
      mesh.current.rotation.x += delta * 0.15
      mesh.current.rotation.y += delta * 0.11
    }
  })

  return (
    <Float
      speed={motionEnabled ? speed : 0}
      rotationIntensity={motionEnabled ? 0.4 : 0}
      floatIntensity={motionEnabled ? floatIntensity : 0}
      position={position}
    >
      <mesh ref={mesh} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          transmission={0.85}
          thickness={0.4}
          roughness={0.15}
          ior={1.25}
          clearcoat={0.5}
          color="#ffb067"
        />
      </mesh>
    </Float>
  )
}
