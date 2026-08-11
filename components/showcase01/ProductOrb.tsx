"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function Orb() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = t * 0.12
    mesh.current.rotation.y = t * 0.18 + state.pointer.x * 0.22
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.45}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.55, 18]} />
        <meshPhysicalMaterial
          color="#6f52ff"
          metalness={0.72}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.04}
          emissive="#1b0a5e"
          emissiveIntensity={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function ProductOrb() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={4.2} />
        <pointLight position={[-3, 1, 3]} intensity={7} color="#754dff" />
        <pointLight position={[3, -2, 2]} intensity={4} color="#315cff" />
        <Orb />
      </Canvas>
    </div>
  )
}
