"use client"

import { useEffect, useState } from "react"

export type QualityTier = "full" | "reduced" | "minimal"

export type AdaptiveQuality = {
  tier: QualityTier
  reducedMotion: boolean
  dpr: [number, number]
  particleCount: number
  shardCount: number
  useTransmission: boolean
  postProcessing: boolean
}

const TIER_CONFIG: Record<QualityTier, Omit<AdaptiveQuality, "tier" | "reducedMotion">> = {
  full: {
    dpr: [1, 1.75],
    particleCount: 550,
    shardCount: 5,
    useTransmission: true,
    postProcessing: true,
  },
  reduced: {
    dpr: [1, 1.25],
    particleCount: 250,
    shardCount: 3,
    useTransmission: false,
    postProcessing: true,
  },
  minimal: {
    dpr: [1, 1],
    particleCount: 100,
    shardCount: 0,
    useTransmission: false,
    postProcessing: false,
  },
}

function computeTier(): { tier: QualityTier; reducedMotion: boolean } {
  if (typeof window === "undefined") {
    return { tier: "reduced", reducedMotion: false }
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean }
  }
  const saveData = Boolean(nav.connection?.saveData)
  const cores = navigator.hardwareConcurrency ?? 8
  const width = window.innerWidth

  if (reducedMotion || saveData || width < 640 || cores <= 4) {
    return { tier: "minimal", reducedMotion }
  }

  if (width < 1024 || cores <= 7) {
    return { tier: "reduced", reducedMotion }
  }

  return { tier: "full", reducedMotion }
}

export function useAdaptiveQuality(): AdaptiveQuality {
  const [state, setState] = useState<{ tier: QualityTier; reducedMotion: boolean }>(
    computeTier
  )

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setState(computeTier())

    motionQuery.addEventListener("change", onChange)
    return () => motionQuery.removeEventListener("change", onChange)
  }, [])

  return {
    tier: state.tier,
    reducedMotion: state.reducedMotion,
    ...TIER_CONFIG[state.tier],
  }
}
