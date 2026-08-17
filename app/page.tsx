import SmoothScroll from "@/components/providers/SmoothScroll"
import CustomCursor from "@/components/effects/CustomCursor"
import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import SheetTitle from "@/components/sections/SheetTitle"
import SheetExisting from "@/components/sections/SheetExisting"
import SheetAssembly from "@/components/sections/SheetAssembly"
import SheetAsBuilt from "@/components/sections/SheetAsBuilt"
import SheetSequence from "@/components/sections/SheetSequence"
import SheetTolerances from "@/components/sections/SheetTolerances"
import SheetProposal from "@/components/sections/SheetProposal"

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Nav />
      <main className="relative">
        <SheetTitle />
        <SheetExisting />
        <SheetAssembly />
        <SheetAsBuilt />
        <SheetSequence />
        <SheetTolerances />
        <SheetProposal />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
