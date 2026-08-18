"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

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

const STEP_TITLES = [
  "Scope of works",
  "The business",
  "Level & constraints",
  "Point of contact",
]

function Option({
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
      aria-pressed={active}
      className={`group flex items-center gap-3 border px-4 py-3 text-sm transition-colors ${
        active
          ? "border-[var(--signal)] text-[var(--signal)]"
          : "border-[var(--line)] opacity-70 hover:border-[var(--line-strong)] hover:opacity-100"
      }`}
    >
      {/* Filled square marker, the way a spec sheet is ticked */}
      <span
        className={`h-2.5 w-2.5 shrink-0 border transition-colors ${
          active
            ? "border-[var(--signal)] bg-[var(--signal)]"
            : "border-[var(--line-strong)]"
        }`}
      />
      {label}
    </button>
  )
}

const fieldClass =
  "w-full border-b border-[var(--line-strong)] bg-transparent px-1 py-3 text-[15px] outline-none transition-colors placeholder:opacity-30 focus:border-[var(--signal)]"

export default function SystemStart() {
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
    if (step === 3)
      return form.level !== "" && form.budget !== "" && form.timeline !== ""
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
      id="sys-start"
      className="relative flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-14 xl:px-20"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="readable mb-12">
          <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--signal)]">
            Input required
          </span>
          <h2 className="mt-6 max-w-[13ch] text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            Tell the system what to build.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-8 opacity-55">
            Four questions. We reply within one business day with a view on
            scope, timeline and cost.
          </p>
        </div>

        <div className="panel">
          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start px-8 py-20 lg:px-12"
            >
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--signal)]">
                Received — logged for review
              </span>
              <h3 className="mt-6 text-3xl font-medium tracking-[-0.02em]">
                Thanks{form.name.trim() ? `, ${form.name.split(" ")[0]}` : ""}.
              </h3>
              <p className="mt-4 max-w-md leading-7 opacity-50">
                Your brief is with us. We will read it properly and reply within
                one business day, to {form.email || "the address you gave"}.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Sheet tabs double as the progress indicator */}
              <div className="grid grid-cols-4 border-b border-[var(--line-strong)]">
                {STEP_TITLES.map((title, i) => {
                  const index = i + 1
                  const isDone = index < step
                  const isCurrent = index === step
                  return (
                    <div
                      key={title}
                      className={`border-r border-[var(--line)] px-4 py-4 last:border-r-0 ${
                        isCurrent ? "bg-white/[0.05]" : ""
                      }`}
                    >
                      <span
                        className={`mono text-[10px] uppercase tracking-[0.2em] ${
                          isCurrent
                            ? "text-[var(--signal)]"
                            : isDone
                              ? "opacity-70"
                              : "opacity-30"
                        }`}
                      >
                        {String(index).padStart(2, "0")}
                      </span>
                      <p
                        className={`mt-1.5 hidden text-xs sm:block ${
                          isCurrent ? "" : "opacity-40"
                        }`}
                      >
                        {title}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Fixed height keeps total document height stable between steps */}
              <div className="min-h-[440px] px-8 py-10 lg:px-12">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mb-7 text-lg">What are you building?</p>
                      <div className="flex flex-wrap gap-3">
                        {projectTypes.map((type) => (
                          <Option
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
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label
                        htmlFor="rfp-business"
                        className="mono text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-45"
                      >
                        What does your business do?
                      </label>
                      <input
                        id="rfp-business"
                        value={form.businessName}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            businessName: event.target.value,
                          }))
                        }
                        placeholder="e.g. We sell handmade furniture online"
                        className={`${fieldClass} mb-10`}
                      />

                      <p className="mb-7 text-lg">
                        What should it achieve?{" "}
                        <span className="mono text-[10px] uppercase tracking-[0.2em] opacity-40">
                          select any
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {goals.map((goal) => (
                          <Option
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
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mono text-[10px] uppercase tracking-[0.2em] mb-4 opacity-45">Level</p>
                      <div className="mb-9 flex flex-wrap gap-3">
                        {levels.map((level) => (
                          <Option
                            key={level}
                            label={level}
                            active={form.level === level}
                            onClick={() => setForm((prev) => ({ ...prev, level }))}
                          />
                        ))}
                      </div>

                      <p className="mono text-[10px] uppercase tracking-[0.2em] mb-4 opacity-45">
                        Approximate budget
                      </p>
                      <div className="mb-9 flex flex-wrap gap-3">
                        {budgets.map((budget) => (
                          <Option
                            key={budget}
                            label={budget}
                            active={form.budget === budget}
                            onClick={() => setForm((prev) => ({ ...prev, budget }))}
                          />
                        ))}
                      </div>

                      <p className="mono text-[10px] uppercase tracking-[0.2em] mb-4 opacity-45">Timeline</p>
                      <div className="flex flex-wrap gap-3">
                        {timelines.map((timeline) => (
                          <Option
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
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mb-8 text-lg">
                        Last one. Where do we send the reply?
                      </p>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="rfp-name"
                            className="mono text-[10px] uppercase tracking-[0.2em] mb-1 block opacity-45"
                          >
                            Name
                          </label>
                          <input
                            id="rfp-name"
                            value={form.name}
                            onChange={(event) =>
                              setForm((prev) => ({
                                ...prev,
                                name: event.target.value,
                              }))
                            }
                            placeholder="Your name"
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="rfp-email"
                            className="mono text-[10px] uppercase tracking-[0.2em] mb-1 block opacity-45"
                          >
                            Email
                          </label>
                          <input
                            id="rfp-email"
                            value={form.email}
                            onChange={(event) =>
                              setForm((prev) => ({
                                ...prev,
                                email: event.target.value,
                              }))
                            }
                            type="email"
                            placeholder="you@company.com"
                            className={fieldClass}
                          />
                        </div>
                      </div>

                      {status === "error" && (
                        <p className="mt-8 text-sm text-[var(--signal)]">
                          That did not send. Try again, or email
                          hello@morph.studio directly.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--line-strong)] px-8 py-5 lg:px-12">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className={`mono text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-100 ${
                    step === 1 ? "invisible" : "opacity-50"
                  }`}
                >
                  ← Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    disabled={!canAdvance()}
                    onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
                    className="cta !px-7 !py-3 !text-sm disabled:cursor-not-allowed disabled:border-[var(--line)] disabled:bg-transparent disabled:text-current disabled:opacity-25"
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
                    className="cta !px-7 !py-3 !text-sm disabled:cursor-not-allowed disabled:border-[var(--line)] disabled:bg-transparent disabled:text-current disabled:opacity-25"
                  >
                    {status === "submitting" ? "Sending…" : "Submit brief"}
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
