"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Check } from "lucide-react"

const projectTypes = [
  "Landing page",
  "Business website",
  "SaaS / web app",
  "E-commerce",
  "3D / interactive experience",
  "Something else",
]

const goals = [
  "Launch a new business",
  "Look more premium",
  "Convert more visitors",
  "Explain a complex product",
  "Stand out creatively",
]

const levels = [
  "Clean & minimal",
  "Bold & premium",
  "Fully custom / experimental",
]

const budgets = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+"]
const timelines = ["ASAP", "1–2 months", "3+ months", "Flexible"]

type FormState = {
  projectType: string
  goals: string[]
  businessName: string
  level: string
  hasWebsite: "yes" | "no" | ""
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

const totalSteps = 4

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm transition-colors ${
        active
          ? "border border-white bg-white text-black"
          : "glass-panel text-white/60 hover:text-white"
      }`}
    >
      {label}
    </button>
  )
}

export default function Contact() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  )

  const toggleGoal = (goal: string) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }))
  }

  const canAdvance = () => {
    if (step === 1) return form.projectType !== ""
    if (step === 2) return form.goals.length > 0 && form.businessName.trim() !== ""
    if (step === 3) return form.level !== "" && form.budget !== "" && form.timeline !== ""
    return true
  }

  const handleSubmit = async () => {
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
    <section
      id="contact"
      className="relative overflow-hidden px-7 py-32 text-white sm:px-12 lg:px-20 xl:px-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(123,104,255,0.14),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(255,176,103,0.1),transparent_40%)]" />

      <div className="relative mx-auto max-w-[900px]">
        <div className="mb-14 text-center">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-white/35">
            Start a project
          </p>
          <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:text-6xl">
            Tell us what you&apos;re building.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-white/42">
            A few quick questions — no giant forms, no obligation.
          </p>
        </div>

        <div className="glass-panel-strong rounded-[32px] p-6 sm:p-10">
          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-12 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.02em]">
                Got it, {form.name.split(" ")[0] || "thanks"}.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">
                We&apos;ll review what you&apos;ve shared and reply within one
                business day.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-10 flex items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      index < step ? "bg-white" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <div className="min-h-[420px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="mb-6 text-lg text-white/70">
                      What are you building?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {projectTypes.map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          active={form.projectType === type}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, projectType: type }))
                          }
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <label className="mb-2 block text-sm text-white/45">
                      What does your business do?
                    </label>
                    <input
                      value={form.businessName}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          businessName: event.target.value,
                        }))
                      }
                      placeholder="e.g. We sell handmade furniture online"
                      className="glass-panel mb-8 w-full rounded-2xl px-5 py-3.5 text-white outline-none placeholder:text-white/20 focus:border-[#7b68ff]/40"
                    />

                    <p className="mb-6 text-lg text-white/70">
                      What should the website achieve?{" "}
                      <span className="text-sm text-white/30">
                        (select all that apply)
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {goals.map((goal) => (
                        <Chip
                          key={goal}
                          label={goal}
                          active={form.goals.includes(goal)}
                          onClick={() => toggleGoal(goal)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="mb-6 text-lg text-white/70">
                      What level of experience do you want?
                    </p>
                    <div className="mb-8 flex flex-wrap gap-3">
                      {levels.map((level) => (
                        <Chip
                          key={level}
                          label={level}
                          active={form.level === level}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, level }))
                          }
                        />
                      ))}
                    </div>

                    <p className="mb-6 text-lg text-white/70">
                      Approximate budget
                    </p>
                    <div className="mb-8 flex flex-wrap gap-3">
                      {budgets.map((budget) => (
                        <Chip
                          key={budget}
                          label={budget}
                          active={form.budget === budget}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, budget }))
                          }
                        />
                      ))}
                    </div>

                    <p className="mb-6 text-lg text-white/70">Timeline</p>
                    <div className="flex flex-wrap gap-3">
                      {timelines.map((timeline) => (
                        <Chip
                          key={timeline}
                          label={timeline}
                          active={form.timeline === timeline}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, timeline }))
                          }
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="mb-6 text-lg text-white/70">
                      Last step — how do we reach you?
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        value={form.name}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            name: event.target.value,
                          }))
                        }
                        placeholder="Your name"
                        className="glass-panel rounded-2xl px-5 py-3.5 text-white outline-none placeholder:text-white/20 focus:border-[#7b68ff]/40"
                      />
                      <input
                        value={form.email}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }))
                        }
                        type="email"
                        placeholder="Email address"
                        className="glass-panel rounded-2xl px-5 py-3.5 text-white outline-none placeholder:text-white/20 focus:border-[#7b68ff]/40"
                      />
                    </div>

                    {status === "error" && (
                      <p className="mt-4 text-sm text-red-300/80">
                        Something went wrong sending that — please try again.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className={`text-sm text-white/40 transition-colors hover:text-white ${
                    step === 1 ? "invisible" : ""
                  }`}
                >
                  Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    disabled={!canAdvance()}
                    onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
                    className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity disabled:opacity-30"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={
                      form.name.trim() === "" ||
                      form.email.trim() === "" ||
                      status === "submitting"
                    }
                    onClick={handleSubmit}
                    className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity disabled:opacity-30"
                  >
                    {status === "submitting" ? "Sending…" : "Send project brief"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
