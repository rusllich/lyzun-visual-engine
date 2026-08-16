"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing"
import { useAdaptiveQuality } from "@/lib/use-adaptive-quality"
import GlassCore from "@/components/three/scene/GlassCore"
import GlassShards from "@/components/three/scene/GlassShards"
import ParticleField from "@/components/three/scene/ParticleField"
import CameraRig from "@/components/three/scene/CameraRig"

export default function LiveBackdrop() {
  const quality = useAdaptiveQuality()
  const [eventSource] = useState<HTMLElement | undefined>(() =>
    typeof document !== "undefined" ? document.body : undefined
  )

  const motionEnabled = !quality.reducedMotion

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <Canvas
        eventSource={eventSource}
        eventPrefix="client"
        camera={{ position: [1.7, 0.15, 6.4], fov: 42 }}
        dpr={quality.dpr}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 6]} intensity={3.2} color="#ffffff" />
        <pointLight position={[-3, 1, 4]} intensity={9} color="#7B68FF" />
        <pointLight position={[3, -3, 1]} intensity={4} color="#FFB067" />

        <group key={quality.tier}>
          <CameraRig motionEnabled={motionEnabled} />
          <GlassCore useTransmission={quality.useTransmission} motionEnabled={motionEnabled} />
          <GlassShards count={quality.shardCount} motionEnabled={motionEnabled} />
          <ParticleField count={quality.particleCount} motionEnabled={motionEnabled} />
        </group>

        {quality.postProcessing && (
          <EffectComposer multisampling={2}>
            <Bloom intensity={0.7} luminanceThreshold={0.55} luminanceSmoothing={0.8} />
            <ChromaticAberration offset={[0.0006, 0.0006]} />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.16} darkness={0.85} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
