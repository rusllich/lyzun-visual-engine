type Field = {
  label: string
  value: string
}

type Props = {
  fields: Field[]
  className?: string
}

/** The title block in the corner of every drawing sheet. */
export default function TitleBlock({ fields, className = "" }: Props) {
  return (
    <dl
      className={`grid grid-cols-2 border border-[var(--line-outline)] sm:grid-cols-4 ${className}`}
    >
      {fields.map((field) => (
        <div
          key={field.label}
          className="border-b border-r border-[var(--line-construction)] px-4 py-3 last:border-r-0"
        >
          <dt className="annotation opacity-40">{field.label}</dt>
          <dd className="mt-1.5 font-mono text-xs tracking-tight">{field.value}</dd>
        </div>
      ))}
    </dl>
  )
}
