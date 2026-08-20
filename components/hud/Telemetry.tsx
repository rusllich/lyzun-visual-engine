"use client"

import { useEffect, useRef, useState } from "react"
import { telemetry, readDevice, readTimings, type DeviceInfo } from "@/lib/telemetry"

function Sparkline() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext("2d")
    if (!ctx) return

    let raf = 0
    let intersecting = typeof IntersectionObserver === "undefined"

    const draw = () => {
      if (!intersecting || document.visibilityState !== "visible") {
        raf = 0
        return
      }

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
        const y = h - (Math.min(value, max) / max) * h
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.strokeStyle = "#C6F24E"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      const ref = h - (60 / max) * h
      ctx.moveTo(0, ref)
      ctx.lineTo(w, ref)
      ctx.strokeStyle = "rgba(233,237,242,0.16)"
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }

    const sync = () => {
      const shouldRun = intersecting && document.visibilityState === "visible"
      if (shouldRun && raf === 0) raf = requestAnimationFrame(draw)
      if (!shouldRun && raf !== 0) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            intersecting = entry.isIntersecting
            sync()
          })

    observer?.observe(el)
    document.addEventListener("visibilitychange", sync)
    sync()

    return () => {
      observer?.disconnect()
      document.removeEventListener("visibilitychange", sync)
      if (raf !== 0) cancelAnimationFrame(raf)
    }
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
  const panelRef = useRef<HTMLDivElement>(null)
  const fpsRef = useRef<HTMLSpanElement>(null)
  const msRef = useRef<HTMLSpanElement>(null)
  const callsRef = useRef<HTMLSpanElement>(null)
  const trisRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const settle = window.setTimeout(() => {
      setDevice(readDevice())
      setTimings(readTimings())
    }, 700)

    const panel = panelRef.current
    let raf = 0
    let intersecting = typeof IntersectionObserver === "undefined"

    const tick = () => {
      if (!intersecting || document.visibilityState !== "visible") {
        raf = 0
        return
      }

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

    const sync = () => {
      const shouldRun = intersecting && document.visibilityState === "visible"
      if (shouldRun && raf === 0) raf = requestAnimationFrame(tick)
      if (!shouldRun && raf !== 0) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const observer =
      panel && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            intersecting = entry.isIntersecting
            sync()
          })
        : null

    if (panel) observer?.observe(panel)
    document.addEventListener("visibilitychange", sync)
    sync()

    return () => {
      observer?.disconnect()
      document.removeEventListener("visibilitychange", sync)
      if (raf !== 0) cancelAnimationFrame(raf)
      window.clearTimeout(settle)
    }
  }, [])

  return (
    <div ref={panelRef} className="panel p-4">
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
