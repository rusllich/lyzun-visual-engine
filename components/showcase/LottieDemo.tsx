"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function LottieDemo() {
  return (
    <div className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-[28px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,76,255,0.22),transparent_55%)]" />

      <DotLottieReact
        src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
        loop
        autoplay
        className="relative z-10 h-[260px] w-[260px]"
      />

      <div className="pointer-events-none absolute bottom-5 left-5 z-20 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/45 backdrop-blur-xl">
        dotLottie / Runtime
      </div>
    </div>
  )
}
