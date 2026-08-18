import type { Metadata } from "next"
import Showcase01Page from "@/components/showcase01/Showcase01Page"

export const metadata: Metadata = {
  title: "Premium Product Experience — Concept Showcase",
  description:
    "A MORPH concept showcase demonstrating cinematic art direction, interactive 3D, motion choreography and premium frontend engineering.",
}

export default function Page() {
  return <Showcase01Page />
}
