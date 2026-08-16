"use client"

import { useFrame } from "@react-three/fiber"
import {
  scrollProgress,
  sceneAccent,
  getCameraStateAtProgress,
  CAMERA_STOPS,
} from "@/lib/scroll-scene"

type Props = {
  motionEnabled: boolean
}

const RESTING_POSITION = CAMERA_STOPS[0].position

export default function CameraRig({ motionEnabled }: Props) {
  useFrame((state) => {
    if (!motionEnabled) {
      state.camera.position.set(...RESTING_POSITION)
      state.camera.lookAt(0, 0, 0)
      return
    }

    const target = getCameraStateAtProgress(scrollProgress.value)
    sceneAccent.mix = target.accentMix

    const [tx, ty, tz] = target.position
    const px = state.pointer.x * 0.35
    const py = state.pointer.y * 0.2

    state.camera.position.x += (tx + px - state.camera.position.x) * 0.045
    state.camera.position.y += (ty + py - state.camera.position.y) * 0.045
    state.camera.position.z += (tz - state.camera.position.z) * 0.045

    state.camera.lookAt(0, 0, 0)
  })

  return null
}
