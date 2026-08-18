"use client"

import { useEffect, useRef, useState } from "react"

/** Real excerpts from how this page is actually built. */
const SNIPPETS: { file: string; lines: [string, string][][] }[] = [
  {
    file: "SystemCore.glsl",
    lines: [
      [["kw", "attribute"], ["ty", " vec3"], ["", " aFrom;"]],
      [["kw", "attribute"], ["ty", " vec3"], ["", " aTo;"]],
      [["kw", "uniform"], ["ty", " float"], ["", " uMix;"]],
      [["", ""]],
      [["kw", "void"], ["fn", " main"], ["", "() {"]],
      [["", "  "], ["ty", "float"], ["", " lead = aSeed * "], ["nu", "0.35"], ["", ";"]],
      [["", "  "], ["ty", "float"], ["", " m = "], ["fn", "clamp"], ["", "((uMix - lead) / "], ["nu", "0.65"], ["", ");"]],
      [["", "  m = m * m * ("], ["nu", "3.0"], ["", " - "], ["nu", "2.0"], ["", " * m);"]],
      [["", "  "], ["ty", "vec3"], ["", " base = "], ["fn", "mix"], ["", "(aFrom, aTo, m);"]],
      [["", "}"]],
    ],
  },
  {
    file: "formations.ts",
    lines: [
      [["cm", "// Fibonacci sphere — even coverage, no clumping"]],
      [["kw", "const"], ["", " t = (i + "], ["nu", "0.5"], ["", ") / count;"]],
      [["kw", "const"], ["", " phi = "], ["fn", "Math.acos"], ["", "("], ["nu", "1"], ["", " - "], ["nu", "2"], ["", " * t);"]],
      [["kw", "const"], ["", " theta = "], ["fn", "Math.PI"], ["", " * ("], ["nu", "1"], ["", " + "], ["fn", "Math.sqrt"], ["", "("], ["nu", "5"], ["", ")) * i;"]],
      [["", ""]],
      [["", "out[i * "], ["nu", "3"], ["", "] = "], ["fn", "Math.sin"], ["", "(phi) * "], ["fn", "Math.cos"], ["", "(theta) * shell;"]],
      [["", "out[i * "], ["nu", "3"], ["", " + "], ["nu", "1"], ["", "] = "], ["fn", "Math.cos"], ["", "(phi) * shell;"]],
    ],
  },
  {
    file: "telemetry.ts",
    lines: [
      [["cm", "// Real numbers, straight off the renderer"]],
      [["", "telemetry.fps = frames / elapsed;"]],
      [["", "telemetry.drawCalls = gl.info.render.calls;"]],
      [["", "telemetry.triangles = gl.info.render.triangles;"]],
      [["", ""]],
      [["kw", "const"], ["", " dbg = gl."], ["fn", "getExtension"], ["", "("]],
      [["", "  "], ["st", "\"WEBGL_debug_renderer_info\""], ["", ""]],
      [["", ");"]],
    ],
  },
]

const CLASS: Record<string, string> = {
  kw: "text-[#C6F24E]",
  ty: "text-[#7FB2FF]",
  fn: "text-[#E9EDF2]",
  nu: "text-[#FFB86B]",
  st: "text-[#8DE8C6]",
  cm: "opacity-35",
  "": "opacity-70",
}

export default function CodeStream() {
  const [fileIndex, setFileIndex] = useState(0)
  const [visible, setVisible] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const snippet = SNIPPETS[fileIndex]

    if (visible < snippet.lines.length) {
      timer.current = window.setTimeout(() => setVisible((v) => v + 1), 260)
    } else {
      timer.current = window.setTimeout(() => {
        setFileIndex((f) => (f + 1) % SNIPPETS.length)
        setVisible(0)
      }, 2600)
    }

    return () => window.clearTimeout(timer.current)
  }, [fileIndex, visible])

  const snippet = SNIPPETS[fileIndex]

  return (
    <div className="panel flex h-full flex-col p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.2em] opacity-40">
          Source
        </span>
        <span className="mono text-[10px] text-[var(--signal)]">
          {snippet.file}
        </span>
      </div>

      <pre className="mono flex-1 overflow-hidden text-[11px] leading-[1.75]">
        {snippet.lines.slice(0, visible).map((line, i) => (
          <div key={`${fileIndex}-${i}`} className="flex gap-3">
            <span className="w-4 shrink-0 select-none text-right opacity-20">
              {i + 1}
            </span>
            <span>
              {line.map(([kind, text], t) => (
                <span key={t} className={CLASS[kind] ?? CLASS[""]}>
                  {text}
                </span>
              ))}
              {i === visible - 1 ? (
                <span className="caret ml-0.5 inline-block h-[1em] w-[6px] translate-y-[2px] bg-[var(--signal)]" />
              ) : null}
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}
