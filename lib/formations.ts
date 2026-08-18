/**
 * Target positions the module swarm morphs between. Every formation returns
 * exactly `count` positions so the shader can lerp instance-for-instance.
 * Deterministic RNG — no Math.random during render.
 */

export type Formation = {
  id: string
  label: string
  caption: string
}

export const FORMATIONS: Formation[] = [
  { id: "core", label: "Core", caption: "System online" },
  { id: "funnel", label: "Funnel", caption: "Attention to enquiry" },
  { id: "network", label: "Network", caption: "Architecture" },
  { id: "page", label: "Page", caption: "The deliverable" },
  { id: "chart", label: "Chart", caption: "Measured" },
]

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Dense lattice shell — the machine at rest, structured but alive. */
function core(count: number, out: Float32Array) {
  const r = rng(9001)
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere keeps the shell evenly covered
    const t = (i + 0.5) / count
    const phi = Math.acos(1 - 2 * t)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const shell = 2.55 + (r() - 0.5) * 0.5

    out[i * 3] = Math.sin(phi) * Math.cos(theta) * shell
    out[i * 3 + 1] = Math.cos(phi) * shell * 1.05
    out[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * shell
  }
}

/** Conversion funnel — wide intake, narrow exit. */
function funnel(count: number, out: Float32Array) {
  const r = rng(4242)
  for (let i = 0; i < count; i++) {
    const t = i / count
    const y = 3.2 - t * 6.2
    // radius collapses toward the bottom, with a hard lip at the mouth
    const radius = 0.18 + Math.pow(1 - t, 2.1) * 3.0
    const angle = r() * Math.PI * 2
    const jitter = 0.9 + r() * 0.1

    out[i * 3] = Math.cos(angle) * radius * jitter
    out[i * 3 + 1] = y
    out[i * 3 + 2] = Math.sin(angle) * radius * jitter
  }
}

/** Node graph — clustered hubs joined by sparse runs of modules. */
function network(count: number, out: Float32Array) {
  const r = rng(7777)
  const hubs = 9
  const hubPos: [number, number, number][] = Array.from({ length: hubs }, () => [
    (r() - 0.5) * 7.2,
    (r() - 0.5) * 4.6,
    (r() - 0.5) * 4.2,
  ])

  for (let i = 0; i < count; i++) {
    const pick = Math.floor(r() * hubs)
    const isEdge = r() > 0.55

    if (isEdge) {
      // Sit along the line between two hubs, forming visible connections
      let other = Math.floor(r() * hubs)
      if (other === pick) other = (other + 1) % hubs
      const t = r()
      const a = hubPos[pick]
      const b = hubPos[other]
      out[i * 3] = a[0] + (b[0] - a[0]) * t + (r() - 0.5) * 0.12
      out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (r() - 0.5) * 0.12
      out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + (r() - 0.5) * 0.12
    } else {
      const h = hubPos[pick]
      const spread = 0.45
      out[i * 3] = h[0] + (r() - 0.5) * spread
      out[i * 3 + 1] = h[1] + (r() - 0.5) * spread
      out[i * 3 + 2] = h[2] + (r() - 0.5) * spread
    }
  }
}

/** The thing being sold: a page resolving out of the swarm. */
function page(count: number, out: Float32Array) {
  const r = rng(1337)
  // Weighted blocks approximating a landing page in elevation
  const blocks = [
    { x: 0, y: 2.75, w: 6.4, h: 0.34, weight: 0.08 }, // nav
    { x: -1.1, y: 1.5, w: 4.0, h: 0.9, weight: 0.2 }, // headline
    { x: -1.5, y: 0.5, w: 3.0, h: 0.45, weight: 0.1 }, // body
    { x: -2.1, y: -0.35, w: 1.5, h: 0.4, weight: 0.09 }, // cta
    { x: -2.15, y: -1.75, w: 1.9, h: 1.5, weight: 0.18 }, // card 1
    { x: 0, y: -1.75, w: 1.9, h: 1.5, weight: 0.18 }, // card 2
    { x: 2.15, y: -1.75, w: 1.9, h: 1.5, weight: 0.17 }, // card 3
  ]

  const total = blocks.reduce((sum, b) => sum + b.weight, 0)
  let index = 0

  blocks.forEach((block, bi) => {
    const share =
      bi === blocks.length - 1
        ? count - index
        : Math.floor((block.weight / total) * count)

    for (let k = 0; k < share && index < count; k++, index++) {
      out[index * 3] = block.x + (r() - 0.5) * block.w
      out[index * 3 + 1] = block.y + (r() - 0.5) * block.h
      out[index * 3 + 2] = (r() - 0.5) * 0.22
    }
  })
}

/** Bar chart — the build, measured. */
function chart(count: number, out: Float32Array) {
  const r = rng(2468)
  const bars = 11
  const heights = [0.35, 0.52, 0.44, 0.68, 0.81, 0.62, 0.95, 0.88, 1.0, 0.74, 0.9]
  const per = Math.floor(count / bars)

  for (let i = 0; i < count; i++) {
    const b = Math.min(bars - 1, Math.floor(i / per))
    const h = heights[b] * 4.4
    const x = (b - (bars - 1) / 2) * 0.62

    out[i * 3] = x + (r() - 0.5) * 0.34
    out[i * 3 + 1] = -2.2 + r() * h
    out[i * 3 + 2] = (r() - 0.5) * 0.34
  }
}

const BUILDERS = [core, funnel, network, page, chart]

export function buildFormations(count: number): Float32Array[] {
  return BUILDERS.map((build) => {
    const out = new Float32Array(count * 3)
    build(count, out)
    return out
  })
}
