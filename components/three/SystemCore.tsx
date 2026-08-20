"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { buildFormations } from "@/lib/formations"

const VERTEX = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aScale;
  attribute float aSeed;

  uniform float uMix;
  uniform float uTime;

  varying float vSeed;
  varying float vFade;

  void main() {
    float lead = aSeed * 0.35;
    float m = clamp((uMix - lead) / 0.65, 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);

    vec3 base = mix(aFrom, aTo, m);

    float drift = sin(uTime * 0.7 + aSeed * 6.2831) * 0.035;
    base.y += drift;
    base.x += cos(uTime * 0.5 + aSeed * 4.1) * 0.025;

    float travel = sin(m * 3.14159);
    float scale = aScale * (1.0 + travel * 0.55);

    vec4 mv = modelViewMatrix * vec4(position * scale + base, 1.0);
    vFade = clamp(1.0 - (-mv.z - 6.0) / 16.0, 0.15, 1.0);
    vSeed = aSeed + travel * 0.45;

    gl_Position = projectionMatrix * mv;
  }
`

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform vec3 uInk;
  uniform vec3 uSignal;

  varying float vSeed;
  varying float vFade;

  void main() {
    float hot = smoothstep(0.82, 1.0, vSeed);
    vec3 color = mix(uInk, uSignal, hot);
    gl_FragColor = vec4(color, vFade * (0.26 + hot * 0.6));
  }
`

type Props = {
  formation: number
  count: number
  motion: boolean
}

export default function SystemCore({ formation, count, motion }: Props) {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const mixTarget = useRef(1)
  const invalidate = useThree((state) => state.invalidate)

  const formations = useMemo(() => buildFormations(count), [count])

  const geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(0.055, 0.055, 0.055)
    const geo = new THREE.InstancedBufferGeometry()
    geo.index = box.index
    geo.attributes.position = box.attributes.position
    geo.instanceCount = count

    const scales = new Float32Array(count)
    const seeds = new Float32Array(count)
    let s = 20250817
    for (let i = 0; i < count; i++) {
      s = (s * 1664525 + 1013904223) >>> 0
      const a = s / 4294967296
      s = (s * 1664525 + 1013904223) >>> 0
      const b = s / 4294967296
      scales[i] = 0.55 + a * 1.5
      seeds[i] = b
    }

    geo.setAttribute("aFrom", new THREE.InstancedBufferAttribute(formations[0].slice(), 3))
    geo.setAttribute("aTo", new THREE.InstancedBufferAttribute(formations[0].slice(), 3))
    geo.setAttribute("aScale", new THREE.InstancedBufferAttribute(scales, 1))
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1))

    box.dispose()
    return geo
  }, [count, formations])

  useEffect(() => {
    const geo = geometry
    const from = geo.getAttribute("aFrom") as THREE.InstancedBufferAttribute
    const to = geo.getAttribute("aTo") as THREE.InstancedBufferAttribute
    const next = formations[Math.min(formation, formations.length - 1)]
    const mat = material.current
    if (!mat) return

    const held = mat.uniforms.uMix.value as number
    const fromArr = from.array as Float32Array
    const toArr = to.array as Float32Array
    for (let i = 0; i < fromArr.length; i++) {
      fromArr[i] = fromArr[i] + (toArr[i] - fromArr[i]) * held
      toArr[i] = next[i]
    }
    from.needsUpdate = true
    to.needsUpdate = true

    mat.uniforms.uMix.value = 0
    mixTarget.current = 1

    if (!motion) {
      mat.uniforms.uMix.value = 1
      invalidate()
    }
  }, [formation, formations, geometry, invalidate, motion])

  useEffect(() => {
    if (motion) return
    const mat = material.current
    if (!mat) return
    mat.uniforms.uMix.value = 1
    mixTarget.current = 1
    invalidate()
  }, [invalidate, motion])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, delta) => {
    const mat = material.current
    if (!mat) return

    if (!motion) {
      if (mat.uniforms.uMix.value !== 1) mat.uniforms.uMix.value = 1
      return
    }

    const step = Math.min(delta, 0.05)
    mat.uniforms.uMix.value +=
      (mixTarget.current - mat.uniforms.uMix.value) * step * 1.9
    mat.uniforms.uTime.value = state.clock.getElapsedTime()

    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.055
    mesh.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.18) * 0.08 - state.pointer.y * 0.12
  })

  return (
    <mesh ref={mesh} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uMix: { value: 1 },
          uTime: { value: 0 },
          uInk: { value: new THREE.Color("#8FA3B8") },
          uSignal: { value: new THREE.Color("#C6F24E") },
        }}
      />
    </mesh>
  )
}
