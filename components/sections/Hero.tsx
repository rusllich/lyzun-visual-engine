"use client"

import { useRef } from "react"
import MagneticButton from "@/components/effects/MagneticButton"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import RevealText from "@/components/motion/RevealText"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const section = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!section.current || !content.current) return

      gsap.to(content.current, {
        y: -80,
        opacity: 0.22,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=130%",
          scrub: 1.2,
          pin: true,
        },
      })
    },
    { scope: section }
  )

  return (
    <section
      id="top"
      ref={section}
      className="relative min-h-screen overflow-hidden text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-center px-7 py-24 sm:px-12 lg:px-20 xl:px-28">
        <div
          ref={content}
          className="relative max-w-3xl rounded-[32px] p-2"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-[32px]"
            style={{
              background:
                "radial-gradient(ellipse 120% 100% at 20% 30%, rgba(3,3,8,0.72), transparent 68%)",
            }}
          />

          <div className="p-6 sm:p-8">
            <RevealText>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-12 bg-white/30" />
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-white/45">
                  MORPH — Digital Experience Studio
                </p>
              </div>
            </RevealText>

            <RevealText delay={0.08}>
              <h1 className="text-[clamp(4rem,8vw,8.8rem)] font-medium leading-[0.82] tracking-[-0.065em]">
                Websites that
                <br />
                make your business
                <br />
                <span className="text-white/43">
                  impossible to ignore.
                </span>
              </h1>
            </RevealText>

            <RevealText delay={0.25}>
              <p className="mt-9 max-w-xl text-base leading-7 text-white/45 md:text-lg">
                MORPH designs and builds premium websites and digital
                products for founders and businesses who need to be taken
                seriously online — strategy, design, 3D and engineering,
                combined.
              </p>
            </RevealText>

            <RevealText delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton variant="primary" href="#contact">
                  Start a project
                </MagneticButton>

                <MagneticButton variant="secondary" href="#work">
                  See the work
                </MagneticButton>
              </div>
            </RevealText>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-7 z-20 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30 sm:flex lg:left-20 xl:left-28">
        <span>Scroll to explore</span>
        <span className="h-px w-10 bg-white/20" />
      </div>
    </section>
  )
}
