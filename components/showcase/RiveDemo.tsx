"use client"

import { useRive } from "@rive-app/react-canvas"

export default function RiveDemo() {
  const { rive, RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    stateMachines: "bumpy",
    autoplay: true,
  })

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden rounded-[28px]">
      <RiveComponent
        className="h-full min-h-[300px] w-full"
        onMouseEnter={() => rive?.play()}
        onMouseLeave={() => rive?.pause()}
      />

      <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/45 backdrop-blur-xl">
        Rive / State Machine
      </div>
    </div>
  )
}
