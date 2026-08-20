import SectionPage from "@/components/dashboard/SectionPage"

export default function MessagesPage() {
  return <SectionPage eyebrow="Messages" title="Client communication without losing context." description="Every conversation stays attached to the right client and project, with clear visibility into what needs a reply and what is waiting on approval." action="New message +" stats={[
    { label: "Unread", value: "07", note: "Across active projects" },
    { label: "Needs reply", value: "04", note: "2 due today" },
    { label: "Awaiting client", value: "05", note: "Content or approval" },
    { label: "Internal notes", value: "12", note: "This week" },
  ]} rows={[
    { title: "Linea Dental", meta: "Client · Treatment flow feedback", status: "Needs reply", detail: "34 min ago" },
    { title: "Aster House", meta: "Client · New photography uploaded", status: "Received", detail: "1h ago" },
    { title: "Northline Build", meta: "Internal · QA handoff notes", status: "Internal", detail: "2h ago" },
    { title: "Form / Function", meta: "Client · Discovery questions", status: "Awaiting client", detail: "Yesterday" },
  ]} />
}
