"use client"

import { useEffect, useRef, useState } from "react"
import { telemetry, readDevice, readTimings, type DeviceInfo } from "@/lib/telemetry"

/** Real FPS history, drawn to canvas. No sample is fabricated. */
function Sparkline() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext("2d")
    if (!ctx) return

    let raf = 0
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = el.clientWidth
      const h = el.clientHeight
      if (el.width !== w * dpr || el.height !== h * dpr) {
        el.width = w * dpr
        el.height = h * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const data = telemetry.history
      const max = 75

      ctx.beginPath()
      data.forEach((value, i) => {
        const x = (i / (data.length - 1)) * w
        const y = h - Math.min(value, max) / max * h
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.strokeStyle = "#C6F24E"
      ctx.lineWidth = 1
      ctx.stroke()

      // 60fps reference
      ctx.beginPath()
      const ref = h - (60 / max) * h
      ctx.moveTo(0, ref)
      ctx.lineTo(w, ref)
      ctx.strokeStyle = "rgba(233,237,242,0.16)"
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvas} className="h-10 w-full" aria-hidden="true" />
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-2 last:border-b-0">
      <span className="mono text-[10px] uppercase tracking-[0.16em] opacity-40">
        {label}
      </span>
      <span className="mono text-[11px] text-[var(--signal)]">{value}</span>
    </div>
  )
}

export default function Telemetry() {
  const [device, setDevice] = useState<DeviceInfo | null>(null)
  const [timings, setTimings] = useState<ReturnType<typeof readTimings>>(null)
  const fpsRef = useRef<HTMLSpanElement>(null)
  const msRef = useRef<HTMLSpanElement>(null)
  const callsRef = useRef<HTMLSpanElement>(null)
  const trisRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Deferred: readDevice() spins up a throwaway WebGL context, and the
    // navigation timings are not final until after load settles.
    const settle = window.setTimeout(() => {
      setDevice(readDevice())
      setTimings(readTimings())
    }, 700)

    // Written straight to the DOM — running this through React state would
    // re-render the tree twice a second for nothing.
    let raf = 0
    const tick = () => {
      if (fpsRef.current)
        fpsRef.current.textContent = telemetry.fps.toFixed(0).padStart(2, "0")
      if (msRef.current)
        msRef.current.textContent = `${telemetry.frameMs.toFixed(1)} ms`
      if (callsRef.current)
        callsRef.current.textContent = String(telemetry.drawCalls)
      if (trisRef.current)
        trisRef.current.textContent = telemetry.triangles.toLocaleString("en-US")
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(settle)
    }
  }, [])

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.2em] opacity-40">
          Live telemetry
        </span>
        <span className="flex items-center gap-1.5">
          <span className="pulse-dot" />
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--signal)]">
            Reading
          </span>
        </span>
      </div>

      <div className="flex items-end gap-3">
        <span
          ref={fpsRef}
          className="mono text-4xl leading-none text-[var(--signal)]"
        >
          00
        </span>
        <span className="mono pb-1 text-[10px] uppercase tracking-[0.2em] opacity-40">
          fps
        </span>
        <span ref={msRef} className="mono ml-auto pb-1 text-[11px] opacity-50">
          0 ms
        </span>
      </div>

      <Sparkline />

      <div className="mt-2">
        <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] opacity-40">
            Draw calls
          </span>
          <span ref={callsRef} className="mono text-[11px] text-[var(--signal)]">
            0
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] opacity-40">
            Triangles
          </span>
          <span ref={trisRef} className="mono text-[11px] text-[var(--signal)]">
            0
          </span>
        </div>
        {device ? (
          <>
            <Row label="GPU" value={device.gpu} />
            <Row label="Context" value={device.webgl} />
            <Row label="Threads" value={String(device.cores)} />
            <Row label="DPR" value={device.dpr} />
          </>
        ) : null}
        {timings ? <Row label="TTFB" value={`${timings.ttfb} ms`} /> : null}
      </div>

      <p className="mt-3 text-[10px] leading-4 opacity-30">
        Measured on your machine, this session. Not a mock-up.
      </p>
    </div>
  )
}
