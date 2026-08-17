/** The six layers a MORPH build is assembled from — shared by the 3D plates
 *  and the DOM callouts so they can never drift apart. */
export type Layer = {
  id: string
  code: string
  title: string
  body: string
}

export const LAYERS: Layer[] = [
  {
    id: "performance",
    code: "L6",
    title: "Performance & standards",
    body: "Budgets set before the build, then measured against it. Accessibility and SEO are part of the spec, not a pass at the end.",
  },
  {
    id: "engineering",
    code: "L5",
    title: "Engineering",
    body: "Production frontend that stays fast and stable under real traffic, with a deployment pipeline you can hand to anyone.",
  },
  {
    id: "motion",
    code: "L4",
    title: "Motion & 3D",
    body: "Movement that directs attention and explains things. Every effect earns its place or it comes out.",
  },
  {
    id: "interface",
    code: "L3",
    title: "Interface",
    body: "The visual system: type scale, grid, components. Built to look expensive on a phone as well as a 27-inch display.",
  },
  {
    id: "structure",
    code: "L2",
    title: "Structure & conversion path",
    body: "The order a visitor meets your argument in, and the route from landing to enquiry.",
  },
  {
    id: "strategy",
    code: "L1",
    title: "Strategy & positioning",
    body: "What you sell, who to, and why it beats the alternative. Settled before a pixel is drawn.",
  },
]
