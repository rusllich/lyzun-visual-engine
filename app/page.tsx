import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import BusinessProblems from "@/components/sections/BusinessProblems"
import Capabilities from "@/components/sections/Capabilities"
import Work from "@/components/sections/Work"
import InteractiveShowcase from "@/components/sections/InteractiveShowcase"
import Process from "@/components/sections/Process"
import Contact from "@/components/sections/Contact"
import SmoothScroll from "@/components/providers/SmoothScroll"
import CustomCursor from "@/components/effects/CustomCursor"
import LiveBackdrop from "@/components/three/LiveBackdrop"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#030303]">
        <LiveBackdrop />
        <CustomCursor />
        <Nav />
        <Hero />
        <BusinessProblems />
        <Capabilities />
        <Work />
        <InteractiveShowcase />
        <Process />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
