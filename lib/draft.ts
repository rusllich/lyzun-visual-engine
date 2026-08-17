export type Pt = [number, number, number]

/** World-space length of a polyline — needed to size the dash reveal. */
export function polylineLength(points: Pt[]): number {
  let total = 0
  for (let i = 1; i < points.length; i++) {
    const [ax, ay, az] = points[i - 1]
    const [bx, by, bz] = points[i]
    total += Math.hypot(bx - ax, by - ay, bz - az)
  }
  return total
}

/** Closed rectangle on the XY plane at depth z. */
export function rect(w: number, h: number, z = 0): Pt[] {
  const x = w / 2
  const y = h / 2
  return [
    [-x, -y, z],
    [x, -y, z],
    [x, y, z],
    [-x, y, z],
    [-x, -y, z],
  ]
}

/** Horizontal bar, drawn left-to-right so the reveal reads as writing. */
export function bar(x: number, y: number, w: number, z = 0): Pt[] {
  return [
    [x, y, z],
    [x + w, y, z],
  ]
}

/** Closed rectangle lying flat on the XZ plane at height y — an exploded plate. */
export function plate(w: number, d: number, y = 0): Pt[] {
  const x = w / 2
  const z = d / 2
  return [
    [-x, y, -z],
    [x, y, -z],
    [x, y, z],
    [-x, y, z],
    [-x, y, -z],
  ]
}

/** Horizontal detail rule lying on a plate. */
export function plateBar(
  x: number,
  z: number,
  w: number,
  y = 0
): Pt[] {
  return [
    [x, y, z],
    [x + w, y, z],
  ]
}

/** Evenly spaced horizontal rules — stands in for a block of body copy. */
export function textBlock(
  x: number,
  y: number,
  width: number,
  lines: number,
  gap: number,
  z = 0
): Pt[][] {
  return Array.from({ length: lines }, (_, i) => {
    // last line runs short, the way a real paragraph does
    const w = i === lines - 1 ? width * 0.62 : width
    return bar(x, y - i * gap, w, z)
  })
}
