"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import DraftLine from "@/components/three/DraftLine"
import { bar, rect, textBlock, type Pt } from "@/lib/draft"

const OUTLINE = "#E8E6E1"
const CONSTRUCTION = "#E8E6E1"
const SIGNAL = "#FF4D1C"

type SceneProps = {
  active: boolean
  motion: boolean
}

function Drawing({ active, motion }: SceneProps) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current || !motion) return
    const t = state.clock.getElapsedTime()

    // Axonometric hold with a slow drift — a drawing being turned on the table,
    // never a full spin.
    group.current.rotation.y = -0.62 + Math.sin(t * 0.16) * 0.09 + state.pointer.x * 0.12
    group.current.rotation.x = -0.3 + Math.cos(t * 0.13) * 0.04 - state.pointer.y * 0.07
  })

  const headline = textBlock(-2.2, 1.5, 3.6, 3, 0.62)
  const body = textBlock(-2.2, -0.6, 2.6, 3, 0.3)

  // Card row sits behind the page plane so the drawing reads as a solid.
  const cards: Pt[][] = [-1.5, 0, 1.5].map((x) =>
    rect(1.25, 1.5, -0.9).map(([px, py, pz]) => [px + x, py - 2.4, pz] as Pt)
  )

  return (
    <group ref={group} rotation={[-0.3, -0.62, 0]}>
      {/* Construction axes — drafted first, kept faint, as on a real sheet */}
      <DraftLine
        points={[
          [-4.6, 0, 0],
          [4.6, 0, 0],
        ]}
        active={active}
        instant={!motion}
        delay={0}
        duration={0.7}
        color={CONSTRUCTION}
        opacity={0.16}
      />
      <DraftLine
        points={[
          [0, -5.4, 0],
          [0, 5.4, 0],
        ]}
        active={active}
        instant={!motion}
        delay={0.08}
        duration={0.7}
        color={CONSTRUCTION}
        opacity={0.16}
      />

      {/* Page outline */}
      <DraftLine
        points={rect(6.4, 8.6)}
        active={active}
        instant={!motion}
        delay={0.3}
        duration={1.1}
        color={OUTLINE}
        lineWidth={1.4}
      />

      {/* Nav band */}
      <DraftLine
        points={bar(-3.2, 3.5, 6.4)}
        active={active}
        instant={!motion}
        delay={0.9}
        duration={0.5}
        color={OUTLINE}
        opacity={0.6}
      />
      <DraftLine
        points={rect(0.8, 0.26, 0).map(([x, y, z]) => [x - 2.6, y + 3.95, z] as Pt)}
        active={active}
        instant={!motion}
        delay={1.0}
        duration={0.4}
        color={OUTLINE}
        opacity={0.75}
      />

      {/* Headline */}
      {headline.map((points, i) => (
        <DraftLine
          key={`h-${i}`}
          points={points}
          active={active}
          instant={!motion}
          delay={1.15 + i * 0.11}
          duration={0.55}
          color={OUTLINE}
          lineWidth={3}
        />
      ))}

      {/* Body copy */}
      {body.map((points, i) => (
        <DraftLine
          key={`b-${i}`}
          points={points}
          active={active}
          instant={!motion}
          delay={1.55 + i * 0.07}
          duration={0.4}
          color={OUTLINE}
          opacity={0.42}
        />
      ))}

      {/* Primary call to action — the one element carrying the signal colour */}
      <DraftLine
        points={rect(1.7, 0.56, 0).map(([x, y, z]) => [x - 1.35, y - 2.0, z] as Pt)}
        active={active}
        instant={!motion}
        delay={1.85}
        duration={0.5}
        color={SIGNAL}
        lineWidth={1.6}
      />

      {/* Depth layer: card row set behind the page plane */}
      {cards.map((points, i) => (
        <DraftLine
          key={`c-${i}`}
          points={points}
          active={active}
          instant={!motion}
          delay={2.05 + i * 0.12}
          duration={0.6}
          color={OUTLINE}
          opacity={0.35}
        />
      ))}

      {/* Depth ties — connect the card layer back to the page plane */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <DraftLine
          key={`t-${i}`}
          points={[
            [x, -2.4, -0.9],
            [x, -2.4, 0],
          ]}
          active={active}
          instant={!motion}
          delay={2.45 + i * 0.06}
          duration={0.35}
          color={CONSTRUCTION}
          opacity={0.2}
        />
      ))}
    </group>
  )
}

export default function TitleDrawing({ active, motion }: SceneProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 14], zoom: 52 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active && motion ? "always" : "demand"}
    >
      <Drawing active={active} motion={motion} />
    </Canvas>
  )
}
