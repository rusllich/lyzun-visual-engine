import SectionPage from "@/components/dashboard/SectionPage"

export default function ActivityPage() {
  return <SectionPage eyebrow="Activity" title="Every meaningful action leaves a trace." description="See what changed across projects, clients, files, finance and AI-agent work without relying on memory or scattered notifications." action="Export log" stats={[
    { label: "Today", value: "34", note: "Recorded actions" },
    { label: "Client actions", value: "09", note: "Replies + approvals" },
    { label: "Agent actions", value: "17", note: "Internal automation" },
    { label: "Needs review", value: "04", note: "Approval-gated" },
  ]} rows={[
    { title: "PM Agent updated project risk", meta: "Aster House", status: "Agent", detail: "8 min ago" },
    { title: "Client approved treatment flow", meta: "Linea Dental", status: "Client", detail: "34 min ago" },
    { title: "Final QA milestone completed", meta: "Northline Build", status: "Studio", detail: "1h ago" },
    { title: "New brief entered CRM", meta: "Harbor Stay", status: "System", detail: "2h ago" },
  ]} />
}
