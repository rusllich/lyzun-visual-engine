"use client"

import { useRef, type RefObject } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import DraftLine from "@/components/three/DraftLine"
import { plate, plateBar, type Pt } from "@/lib/draft"
import { LAYERS } from "@/lib/assembly"

const OUTLINE = "#E8E6E1"
const SIGNAL = "#FF4D1C"

const PLATE_W = 5.2
const PLATE_D = 3.4
const MAX_GAP = 1.15

/** Detail lines that make each plate read as a different discipline. */
function plateDetail(index: number, y: number): Pt[][] {
  switch (index) {
    case 0: // performance — a small bar chart
      return [-1.4, -0.6, 0.2, 1.0].map((x, i) => [
        [x, y, 0.9],
        [x, y, 0.9 - (0.5 + i * 0.28)],
      ] as Pt[])
    case 1: // engineering — bracket ticks
      return [
        [
          [-1.9, y, -0.7],
          [-1.5, y, -0.7],
          [-1.5, y, 0.7],
          [-1.9, y, 0.7],
        ],
        [
          [1.9, y, -0.7],
          [1.5, y, -0.7],
          [1.5, y, 0.7],
          [1.9, y, 0.7],
        ],
      ]
    case 2: // motion — a swept path
      return [
        Array.from({ length: 18 }, (_, i) => {
          const t = i / 17
          return [-2.0 + t * 4.0, y, Math.sin(t * Math.PI * 1.4) * 0.85] as Pt
        }),
      ]
    case 3: // interface — nav plus a card row
      return [
        plateBar(-2.2, -1.1, 4.4, y),
        plate(1.2, 1.0, y).map(([x, py, z]) => [x - 1.4, py, z + 0.3] as Pt),
        plate(1.2, 1.0, y).map(([x, py, z]) => [x, py, z + 0.3] as Pt),
        plate(1.2, 1.0, y).map(([x, py, z]) => [x + 1.4, py, z + 0.3] as Pt),
      ]
    case 4: // structure — a stacked block diagram
      return [
        plateBar(-2.2, -0.9, 4.4, y),
        plateBar(-2.2, -0.2, 2.6, y),
        plateBar(-2.2, 0.5, 3.4, y),
        plateBar(-2.2, 1.1, 1.6, y),
      ]
    default: // strategy — a single decisive statement
      return [plateBar(-2.2, 0, 3.2, y)]
  }
}

type SceneProps = {
  progress: RefObject<number>
  active: boolean
  motion: boolean
  hovered: string | null
  /** Mobile has no sticky viewport to scrub, so it gets a fixed exploded view. */
  forceSpread?: boolean
  zoom?: number
}

function Assembly({ progress, active, motion, hovered, forceSpread }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const plates = useRef<(THREE.Group | null)[]>([])

  useFrame((state) => {
    if (!group.current) return

    const spread = forceSpread || !motion ? 1 : progress.current

    plates.current.forEach((node, i) => {
      if (!node) return
      // Layer 0 sits at the top of the stack; they fan apart as the sheet scrolls.
      const target = (i - (LAYERS.length - 1) / 2) * MAX_GAP * spread
      node.position.y += (target - node.position.y) * 0.12
    })

    if (!motion) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = -0.72 + Math.sin(t * 0.14) * 0.07 + state.pointer.x * 0.1
  })

  return (
    <group ref={group} rotation={[-0.52, -0.72, 0]}>
      {LAYERS.map((layer, i) => {
        const isHot = hovered === layer.id
        const color = isHot ? SIGNAL : OUTLINE
        const detail = plateDetail(i, 0)

        return (
          <group
            key={layer.id}
            ref={(node) => {
              plates.current[i] = node
            }}
          >
            <DraftLine
              points={plate(PLATE_W, PLATE_D, 0)}
              active={active}
              instant={!motion}
              delay={0.15 + i * 0.13}
              duration={0.8}
              color={color}
              lineWidth={isHot ? 2 : 1.2}
              opacity={isHot ? 1 : 0.75}
            />

            {detail.map((points, d) => (
              <DraftLine
                key={`${layer.id}-d-${d}`}
                points={points}
                active={active}
                instant={!motion}
                delay={0.5 + i * 0.13 + d * 0.05}
                duration={0.5}
                color={color}
                opacity={isHot ? 0.9 : 0.34}
              />
            ))}
          </group>
        )
      })}

      {/* Centre axis the stack explodes along */}
      <DraftLine
        points={[
          [0, -4.6, 0],
          [0, 4.6, 0],
        ]}
        active={active}
        instant={!motion}
        delay={0}
        duration={1}
        color={OUTLINE}
        opacity={0.14}
      />
    </group>
  )
}

export default function ExplodedAssembly(props: SceneProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 16], zoom: props.zoom ?? 62 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={props.active ? "always" : "demand"}
    >
      <Assembly {...props} />
    </Canvas>
  )
}
