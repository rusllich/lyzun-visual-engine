import SectionPage from "@/components/dashboard/SectionPage"

export default function FinancePage() {
  return <SectionPage eyebrow="Finance" title="Know what is contracted, paid and still at risk." description="Project finance stays tied to delivery so deposits, balances and expected revenue are visible without running a separate spreadsheet." action="New invoice +" stats={[
    { label: "Contracted", value: "$42.8k", note: "Active + scheduled" },
    { label: "Received", value: "$18.7k", note: "Settled to date" },
    { label: "Outstanding", value: "$9.8k", note: "Issued invoices" },
    { label: "Forecast", value: "$28.4k", note: "Next 60 days" },
  ]} rows={[
    { title: "Aster House · Deposit", meta: "INV-104 · $6,000", status: "Paid", detail: "Received Aug 12" },
    { title: "Linea Dental · Milestone 02", meta: "INV-108 · $3,200", status: "Due", detail: "Due Aug 23" },
    { title: "Northline Build · Final balance", meta: "INV-109 · $4,800", status: "Awaiting", detail: "Due on launch" },
    { title: "Form / Function · Deposit", meta: "Draft · $2,500", status: "Draft", detail: "Send after scope approval" },
  ]} />
}
