"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"

const projectTypes = ["Brand website", "SaaS / web app", "E-commerce", "3D / interactive", "AI / automation", "Something difficult"]
const goals = ["Launch something new", "Look premium", "Explain complexity", "Convert better", "Stand out creatively"]
const levels = ["Focused & refined", "Bold & premium", "Fully custom / experimental"]
const budgets = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+"]
const timelines = ["ASAP", "1–2 months", "3+ months", "Flexible"]

type FormState = {
  projectType: string
  goals: string[]
  businessName: string
  level: string
  hasWebsite: string
  websiteUrl: string
  budget: string
  timeline: string
  name: string
  email: string
}

const initialState: FormState = {
  projectType: "",
  goals: [],
  businessName: "",
  level: "",
  hasWebsite: "",
  websiteUrl: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
}

function Choice({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-12 items-center justify-between gap-5 border px-4 py-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] ${
        active
          ? "border-[var(--signal)] bg-[var(--signal)] text-[#050607]"
          : "border-[var(--line)] bg-transparent opacity-58 hover:border-[var(--line-strong)] hover:opacity-100"
      }`}
    >
      <span>{label}</span>
      <span className="mono text-[9px]" aria-hidden="true">{active ? "●" : "+"}</span>
    </button>
  )
}

const inputClass = "w-full border-b border-[var(--line-strong)] bg-transparent py-4 text-lg tracking-[-0.02em] outline-none placeholder:opacity-25 focus:border-[var(--signal)] focus-visible:ring-1 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--ground)]"

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export default function SystemStart() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle")
  const reducedMotion = useReducedMotion()

  const enterMotion = reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
  const exitMotion = reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
  const doneMotion = reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
  const contactValid = Boolean(form.name.trim()) && isValidEmail(form.email)

  const toggleGoal = (goal: string) => {
    setForm((current) => ({
      ...current,
      goals: current.goals.includes(goal) ? current.goals.filter((item) => item !== goal) : [...current.goals, goal],
    }))
  }

  const canAdvance =
    step === 1 ? Boolean(form.projectType) :
      step === 2 ? Boolean(form.businessName.trim()) && form.goals.length > 0 :
        step === 3 ? Boolean(form.level && form.budget && form.timeline) : true

  const submit = async () => {
    if (!contactValid) return
    setStatus("submitting")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error("Request failed")
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="sys-start" aria-labelledby="project-brief-title" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40 xl:px-16">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid gap-10 border-b border-[var(--line)] pb-16 lg:grid-cols-[0.42fr_1.58fr] lg:items-end lg:pb-24">
          <div>
            <span className="mono text-[9px] uppercase tracking-[0.22em] text-[var(--signal)]">Start / project brief</span>
            <p className="mono mt-5 max-w-xs text-[10px] uppercase leading-5 tracking-[0.15em] opacity-35">Four short steps. Enough context to have a useful first conversation.</p>
          </div>
          <h2 id="project-brief-title" className="max-w-[9.5ch] text-[clamp(3.7rem,9vw,10rem)] font-black uppercase leading-[0.76] tracking-[-0.07em]">
            Bring us something <span className="text-[var(--signal)]">difficult.</span>
          </h2>
        </div>

        {status === "done" ? (
          <motion.div initial={doneMotion} animate={{ opacity: 1, y: 0 }} className="grid min-h-[500px] place-items-center border-b border-[var(--line)] py-20 text-center" role="status" aria-live="polite">
            <div>
              <span className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--signal)]">Brief received</span>
              <h3 className="mt-6 text-[clamp(2.8rem,7vw,7rem)] font-black uppercase leading-[0.8] tracking-[-0.065em]">We&apos;ll read it properly.</h3>
              <p className="mx-auto mt-6 max-w-md text-lg leading-8 opacity-45">We&apos;ll reply to {form.email} with a view on scope, timing and the right level of ambition.</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid border-b border-[var(--line)] lg:grid-cols-[0.42fr_1.58fr]">
            <div className="border-b border-[var(--line)] py-8 lg:border-b-0 lg:border-r lg:py-12 lg:pr-10">
              <div className="sticky top-28">
                <p className="mono text-[9px] uppercase tracking-[0.2em] opacity-30">Progress</p>
                <div className="mt-5 flex gap-2 lg:flex-col lg:gap-3" aria-label="Project brief progress">
                  {[1, 2, 3, 4].map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => number < step && setStep(number)}
                      disabled={number >= step}
                      aria-current={number === step ? "step" : undefined}
                      className={`mono flex items-center gap-3 text-[9px] uppercase tracking-[0.17em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)] ${number === step ? "text-[var(--signal)]" : number < step ? "opacity-60 hover:opacity-100" : "opacity-20"}`}
                    >
                      <span>{String(number).padStart(2, "0")}</span>
                      <span className="hidden lg:inline">{["Project", "Outcome", "Constraints", "Contact"][number - 1]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-h-[560px] py-10 lg:px-12 lg:py-12 xl:px-16">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="one" initial={enterMotion} animate={{ opacity: 1, y: 0 }} exit={exitMotion}>
                    <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--signal)]">01 / What are we making?</p>
                    <h3 className="mt-5 max-w-[13ch] text-[clamp(2.1rem,4vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.055em]">Choose the closest shape. We can redefine it later.</h3>
                    <div className="mt-9 grid gap-3 sm:grid-cols-2">{projectTypes.map((item) => <Choice key={item} label={item} active={form.projectType === item} onClick={() => setForm((current) => ({ ...current, projectType: item }))} />)}</div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="two" initial={enterMotion} animate={{ opacity: 1, y: 0 }} exit={exitMotion}>
                    <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--signal)]">02 / What has to change?</p>
                    <h3 className="mt-5 max-w-[13ch] text-[clamp(2.1rem,4vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.055em]">Give us the business, then the outcome.</h3>
                    <label htmlFor="brief-business" className="sr-only">What does the business or product do?</label>
                    <input id="brief-business" value={form.businessName} onChange={(event) => setForm((current) => ({ ...current, businessName: event.target.value }))} placeholder="What does the business / product do?" autoComplete="organization" className={`${inputClass} mt-9`} />
                    <div className="mt-9 grid gap-3 sm:grid-cols-2">{goals.map((item) => <Choice key={item} label={item} active={form.goals.includes(item)} onClick={() => toggleGoal(item)} />)}</div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="three" initial={enterMotion} animate={{ opacity: 1, y: 0 }} exit={exitMotion}>
                    <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--signal)]">03 / Set the constraints</p>
                    <h3 className="mt-5 max-w-[13ch] text-[clamp(2.1rem,4vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.055em]">Ambition needs a level, budget and timeline.</h3>
                    <p className="mono mb-3 mt-9 text-[9px] uppercase tracking-[0.17em] opacity-30">Creative level</p>
                    <div className="grid gap-3 sm:grid-cols-3">{levels.map((item) => <Choice key={item} label={item} active={form.level === item} onClick={() => setForm((current) => ({ ...current, level: item }))} />)}</div>
                    <p className="mono mb-3 mt-7 text-[9px] uppercase tracking-[0.17em] opacity-30">Budget</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{budgets.map((item) => <Choice key={item} label={item} active={form.budget === item} onClick={() => setForm((current) => ({ ...current, budget: item }))} />)}</div>
                    <p className="mono mb-3 mt-7 text-[9px] uppercase tracking-[0.17em] opacity-30">Timeline</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{timelines.map((item) => <Choice key={item} label={item} active={form.timeline === item} onClick={() => setForm((current) => ({ ...current, timeline: item }))} />)}</div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="four" initial={enterMotion} animate={{ opacity: 1, y: 0 }} exit={exitMotion}>
                    <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--signal)]">04 / Who do we reply to?</p>
                    <h3 className="mt-5 max-w-[13ch] text-[clamp(2.1rem,4vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.055em]">No sales maze. Just a useful reply.</h3>
                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                      <div>
                        <label htmlFor="brief-name" className="sr-only">Your name</label>
                        <input id="brief-name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your name" autoComplete="name" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="brief-email" className="sr-only">Email address</label>
                        <input id="brief-email" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@company.com" autoComplete="email" inputMode="email" aria-invalid={form.email.length > 0 && !isValidEmail(form.email)} className={inputClass} />
                      </div>
                    </div>
                    {form.email.length > 0 && !isValidEmail(form.email) && <p className="mt-4 text-sm text-[var(--signal)]" role="alert">Enter a valid email address.</p>}
                    {status === "error" && <p className="mt-6 text-sm text-[var(--signal)]" role="alert">The brief did not send. Please try again.</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 flex items-center justify-between border-t border-[var(--line)] pt-6">
                <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} className={`mono text-[9px] uppercase tracking-[0.18em] opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)] ${step === 1 ? "invisible" : ""}`}>← Back</button>
                {step < 4 ? (
                  <button type="button" disabled={!canAdvance} onClick={() => setStep((current) => Math.min(4, current + 1))} className="cta disabled:cursor-not-allowed disabled:opacity-20">Continue ↗</button>
                ) : (
                  <button type="button" disabled={!contactValid || status === "submitting"} onClick={submit} className="cta disabled:cursor-not-allowed disabled:opacity-20">{status === "submitting" ? "Sending…" : "Submit brief ↗"}</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
