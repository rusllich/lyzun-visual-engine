import type { Metadata } from "next"
import Showcase02Page from "@/components/showcase02/Showcase02Page"

export const metadata: Metadata = {
  title: "Interactive Revenue CRM — Product UI Showcase",
  description:
    "A MORPH product UI concept demonstrating responsive dashboard architecture, pipeline visualization, interactive workflows and polished frontend engineering.",
}

export default function Page() {
  return <Showcase02Page />
}
