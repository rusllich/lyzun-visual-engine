import Hero from "@/components/sections/Hero"
import Experience from "@/components/sections/Experience"
import SmoothScroll from "@/components/providers/SmoothScroll"
import CustomCursor from "@/components/effects/CustomCursor"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#030303]">
        <CustomCursor />
        <Hero />
        <Experience />
      </main>
    </SmoothScroll>
  )
}
