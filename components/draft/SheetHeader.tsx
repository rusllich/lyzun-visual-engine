type Props = {
  number: string
  title: string
  note?: string
}

/** Every section opens like a drawing sheet: number, title, revision note. */
export default function SheetHeader({ number, title, note }: Props) {
  return (
    <header className="mb-14 border-b border-[var(--line-outline)] pb-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <div className="flex items-baseline gap-5">
          <span className="annotation text-[var(--signal)]">Sheet {number}</span>
          <span className="annotation opacity-45">{title}</span>
        </div>
        {note ? <span className="annotation opacity-35">{note}</span> : null}
      </div>
    </header>
  )
}
