type Props = {
  /** Text sitting on the dimension, e.g. "LCP ≤ 2.5s" or "PHASE 01". */
  label: string
  orientation?: "horizontal" | "vertical"
  className?: string
}

/**
 * A real dimension: extension lines, tick-slash terminators, and the
 * measurement breaking the line. Drafting convention, not decoration.
 */
export default function DimensionLine({
  label,
  orientation = "horizontal",
  className = "",
}: Props) {
  if (orientation === "vertical") {
    return (
      <div className={`flex flex-col items-center ${className}`} aria-hidden="true">
        <span className="h-px w-3 bg-[var(--signal)]" />
        <span className="w-px flex-1 bg-[var(--signal)] opacity-60" />
        <span className="annotation rotate-180 py-2 text-[var(--signal)] [writing-mode:vertical-rl]">
          {label}
        </span>
        <span className="w-px flex-1 bg-[var(--signal)] opacity-60" />
        <span className="h-px w-3 bg-[var(--signal)]" />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-3 w-px bg-[var(--signal)]" />
      <span className="h-px flex-1 bg-[var(--signal)] opacity-60" />
      <span className="annotation whitespace-nowrap text-[var(--signal)]">
        {label}
      </span>
      <span className="h-px flex-1 bg-[var(--signal)] opacity-60" />
      <span className="h-3 w-px bg-[var(--signal)]" />
    </div>
  )
}
