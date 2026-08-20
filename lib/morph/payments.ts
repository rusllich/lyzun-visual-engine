export const MORPH_DEFAULT_DEPOSIT_PERCENT = 10

export type MorphPaymentProvider = "nowpayments" | "payoneer"
export type MorphPaymentKind = "deposit" | "balance"
export type MorphPaymentStatus = "pending" | "waiting" | "confirming" | "confirmed" | "finished" | "failed" | "expired" | "refunded"

export function paymentAmountCents(budgetCents: number, kind: MorphPaymentKind, depositPercent = MORPH_DEFAULT_DEPOSIT_PERCENT) {
  if (!Number.isInteger(budgetCents) || budgetCents <= 0) throw new Error("Project budget must be a positive integer amount in cents")
  if (!Number.isFinite(depositPercent) || depositPercent <= 0 || depositPercent >= 100) throw new Error("Deposit percent must be between 0 and 100")
  const deposit = Math.round(budgetCents * depositPercent / 100)
  return kind === "deposit" ? deposit : budgetCents - deposit
}

export function isVerifiedPaidStatus(status: string) {
  return status === "confirmed" || status === "finished"
}

export function canStartProduction(paymentStatus: string) {
  return isVerifiedPaidStatus(paymentStatus)
}

export function canReleaseOwnership(balanceStatus: string, ownerApproved: boolean) {
  return isVerifiedPaidStatus(balanceStatus) && ownerApproved
}
