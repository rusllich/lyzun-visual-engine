"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei"
import * as THREE from "three"
import { sceneAccent } from "@/lib/scroll-scene"

const COOL = new THREE.Color("#7B68FF")
const WARM = new THREE.Color("#FFB067")
const tmpColor = new THREE.Color()

type Props = {
  useTransmission: boolean
  motionEnabled: boolean
}

export default function GlassCore({ useTransmission, motionEnabled }: Props) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    tmpColor.copy(COOL).lerp(WARM, sceneAccent.mix)
    const material = core.current?.material as THREE.MeshPhysicalMaterial | undefined
    material?.color.copy(tmpColor)

    if (!group.current || !motionEnabled) return

    group.current.rotation.y += delta * 0.09
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.18) * 0.12
    group.current.rotation.y += state.pointer.x * 0.0006
    group.current.rotation.x += -state.pointer.y * 0.0004
  })

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.5, 2]} />
        {useTransmission ? (
          <MeshTransmissionMaterial
            thickness={1.6}
            roughness={0.1}
            transmission={1}
            ior={1.45}
            chromaticAberration={0.09}
            anisotropy={0.3}
            distortion={0.25}
            distortionScale={0.35}
            temporalDistortion={0.12}
            samples={1}
            resolution={512}
            backside
            backsideThickness={0.4}
            color="#9c8fff"
          />
        ) : (
          <meshPhysicalMaterial
            transmission={0.92}
            thickness={0.6}
            roughness={0.18}
            ior={1.3}
            clearcoat={0.6}
            color="#7B68FF"
          />
        )}
      </mesh>

      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
      </mesh>

      {useTransmission && (
        <Environment frames={1} resolution={256}>
          <Lightformer
            intensity={4}
            position={[3, 2, 2]}
            scale={[1.2, 3, 1]}
            color="#c9c1ff"
          />
          <Lightformer
            intensity={3}
            position={[-3, -1.5, 1.5]}
            scale={[1, 2.4, 1]}
            color="#ffbf87"
          />
          <Lightformer
            intensity={0.6}
            position={[0, 3, -3]}
            scale={[8, 8, 1]}
            color="#0a0612"
          />
          <Lightformer
            intensity={0.5}
            position={[0, -3, -3]}
            scale={[8, 8, 1]}
            color="#0a0612"
          />
        </Environment>
      )}
    </group>
  )
}
