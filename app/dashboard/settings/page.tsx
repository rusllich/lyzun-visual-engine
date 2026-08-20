import SectionPage from "@/components/dashboard/SectionPage"

export default function SettingsPage() {
  return <SectionPage eyebrow="Settings" title="Rules for the studio operating system." description="Control studio identity, permissions, integrations and approval boundaries before live data and payments are connected." action="Save settings" stats={[
    { label: "Studio users", value: "01", note: "Admin access" },
    { label: "Client spaces", value: "04", note: "Active portals" },
    { label: "Integrations", value: "03", note: "Email · GitHub · Resend" },
    { label: "Approval rules", value: "05", note: "Sensitive actions gated" },
  ]} rows={[
    { title: "Client messages", meta: "AI may draft external communication", status: "Approval required", detail: "Before send" },
    { title: "Project status updates", meta: "Internal status + summaries", status: "Autonomous", detail: "Logged automatically" },
    { title: "Invoice reminders", meta: "Prepare reminders for due invoices", status: "Approval required", detail: "Before send" },
    { title: "Payments / payouts / refunds", meta: "Financial movement", status: "Locked", detail: "Manual approval only" },
  ]} />
}
