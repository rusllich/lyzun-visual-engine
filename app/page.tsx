import SmoothScroll from "@/components/providers/SmoothScroll"
import LiveSystemShell from "@/components/LiveSystemShell"
import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import SystemHero from "@/components/sections/SystemHero"
import SystemOutcomes from "@/components/sections/SystemOutcomes"
import SystemStack from "@/components/sections/SystemStack"
import SystemWork from "@/components/sections/SystemWork"
import SystemProof from "@/components/sections/SystemProof"
import SystemStart from "@/components/sections/SystemStart"

export default function Home() {
  return (
    <SmoothScroll>
      <LiveSystemShell>
        <Nav />
        <main>
          <SystemHero />
          <SystemOutcomes />
          <SystemStack />
          <SystemWork />
          <SystemProof />
          <SystemStart />
        </main>
        <Footer />
      </LiveSystemShell>
    </SmoothScroll>
  )
}
