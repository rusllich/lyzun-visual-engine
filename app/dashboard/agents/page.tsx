import SectionPage from "@/components/dashboard/SectionPage"

export default function AgentsPage() {
  return <SectionPage eyebrow="AI Agents" title="A visible workforce, not a hidden chatbot." description="Each agent has a role, current assignment, permission boundary and audit trail so automation stays useful and controllable." action="Create agent +" stats={[
    { label: "Online", value: "03", note: "Working now" },
    { label: "Queued tasks", value: "09", note: "Across projects" },
    { label: "Needs approval", value: "04", note: "External actions" },
    { label: "Completed today", value: "17", note: "Internal actions" },
  ]} rows={[
    { title: "Project Manager Agent", meta: "Milestones · blockers · status", status: "Online", detail: "Aster House" },
    { title: "Client Communication Agent", meta: "Drafts · follow-ups · updates", status: "Approval", detail: "2 drafts waiting" },
    { title: "QA Agent", meta: "Responsive · accessibility · regression", status: "Running", detail: "Northline Build" },
    { title: "Finance Agent", meta: "Invoices · due dates · reminders", status: "Idle", detail: "No autonomous transfers" },
  ]} />
}
