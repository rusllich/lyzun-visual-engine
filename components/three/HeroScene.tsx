"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing"
import { useMemo, useRef } from "react"
import * as THREE from "three"

function CoreObject() {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!group.current || !core.current) return

    const t = state.clock.getElapsedTime()

    group.current.rotation.y = t * 0.12 + state.pointer.x * 0.18
    group.current.rotation.x =
      Math.sin(t * 0.24) * 0.1 - state.pointer.y * 0.08

    core.current.rotation.x = t * 0.14
    core.current.rotation.z = t * 0.07
  })

  return (
    <Float speed={1.35} rotationIntensity={0.2} floatIntensity={0.7}>
      <group ref={group}>
        <mesh ref={core}>
          <torusKnotGeometry args={[1.24, 0.39, 220, 40]} />
          <meshPhysicalMaterial
            color="#6f52ff"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.025}
            emissive="#1b0758"
            emissiveIntensity={0.8}
          />
        </mesh>

        <mesh scale={1.055}>
          <torusKnotGeometry args={[1.24, 0.39, 180, 24]} />
          <meshBasicMaterial
            color="#b7a7ff"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>

        <mesh rotation={[1.1, 0.55, 0.2]}>
          <torusGeometry args={[2.35, 0.009, 12, 240]} />
          <meshBasicMaterial
            color="#8e75ff"
            transparent
            opacity={0.22}
          />
        </mesh>

        <mesh rotation={[-0.45, 0.7, 1.3]}>
          <torusGeometry args={[2.78, 0.006, 12, 240]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.09}
          />
        </mesh>
      </group>
    </Float>
  )
}

function createRng(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const amount = 550
    const array = new Float32Array(amount * 3)
    const rng = createRng(1337)

    for (let i = 0; i < amount; i++) {
      const radius = 3 + rng() * 6
      const angle = rng() * Math.PI * 2

      array[i * 3] = Math.cos(angle) * radius
      array[i * 3 + 1] = (rng() - 0.5) * 7
      array[i * 3 + 2] = Math.sin(angle) * radius
    }

    return array
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.getElapsedTime() * 0.015
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#b8abff"
        transparent
        opacity={0.38}
        sizeAttenuation
      />
    </points>
  )
}

export default function HeroScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6.3], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 6]} intensity={4} color="#ffffff" />
        <pointLight position={[-3, 1, 4]} intensity={10} color="#6f4cff" />
        <pointLight position={[3, -3, 1]} intensity={5} color="#294cff" />

        <CoreObject />
        <ParticleField />

        <EffectComposer multisampling={4}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.8}
          />
          <Noise opacity={0.018} />
          <Vignette eskil={false} offset={0.16} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
