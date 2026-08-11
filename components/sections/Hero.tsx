"use client"

import { useRef } from "react"
import { motion } from "motion/react"
import MagneticButton from "@/components/effects/MagneticButton"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import HeroScene from "@/components/three/HeroScene"
import RevealText from "@/components/motion/RevealText"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const section = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!section.current || !content.current || !scene.current) return

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=130%",
          scrub: 1.2,
          pin: true,
        },
      })

      timeline
        .to(
          content.current,
          {
            y: -80,
            opacity: 0.22,
            scale: 0.94,
            ease: "none",
          },
          0
        )
        .to(
          scene.current,
          {
            scale: 1.32,
            xPercent: -12,
            rotate: -3,
            ease: "none",
          },
          0
        )
    },
    { scope: section }
  )

  return (
    <section
      ref={section}
      className="relative min-h-screen overflow-hidden bg-[#030303] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 65% 45%, rgba(105,72,255,0.23), transparent 31%), radial-gradient(circle at 30% 65%, rgba(54,34,130,0.15), transparent 42%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030303_100%)] opacity-70" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[1.02fr_.98fr]">
        <div
          ref={content}
          className="flex min-h-[70vh] items-center px-7 py-24 sm:px-12 lg:min-h-screen lg:px-20 xl:px-28"
        >
          <div className="max-w-4xl">
            <RevealText>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-12 bg-white/30" />
                <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-white/45">
                  Lyzun Visual Engine
                </p>
              </div>
            </RevealText>

            <RevealText delay={0.08}>
              <h1 className="text-[clamp(4rem,8vw,8.8rem)] font-medium leading-[0.82] tracking-[-0.065em]">
                Digital
                <br />
                experiences
                <br />
                <span className="text-white/43">
                  that feel alive.
                </span>
              </h1>
            </RevealText>

            <RevealText delay={0.25}>
              <p className="mt-9 max-w-xl text-base leading-7 text-white/45 md:text-lg">
                Interactive interfaces, cinematic motion and real-time 3D
                experiences engineered for modern digital products.
              </p>
            </RevealText>

            <RevealText delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton variant="primary">
                  Explore the engine
                </MagneticButton>

                <MagneticButton variant="secondary">
                  View capabilities
                </MagneticButton>
              </div>
            </RevealText>
          </div>
        </div>

        <motion.div
          ref={scene}
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative h-[55vh] min-h-[500px] lg:h-screen"
        >
          <HeroScene />
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-7 z-20 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30 sm:flex lg:left-20 xl:left-28">
        <span>Scroll to explore</span>
        <span className="h-px w-10 bg-white/20" />
      </div>
    </section>
  )
}
