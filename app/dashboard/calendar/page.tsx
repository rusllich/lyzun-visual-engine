import SectionPage from "@/components/dashboard/SectionPage"

export default function CalendarPage() {
  return <SectionPage eyebrow="Calendar" title="Deadlines, reviews and client moments." description="A studio calendar focused on milestones that move work forward, not a generic list of meetings." action="Add milestone +" stats={[
    { label: "Today", value: "04", note: "2 client-facing" },
    { label: "This week", value: "11", note: "Milestones + calls" },
    { label: "At risk", value: "02", note: "Needs rescheduling" },
    { label: "Next launch", value: "22 Aug", note: "Northline Build" },
  ]} rows={[
    { title: "Northline Build · Mobile acceptance", meta: "Final QA", status: "Today", detail: "16:00" },
    { title: "Linea Dental · Client review", meta: "Approval call", status: "Tomorrow", detail: "11:30" },
    { title: "Aster House · Motion checkpoint", meta: "Production milestone", status: "Aug 24", detail: "Internal" },
    { title: "Form / Function · Discovery review", meta: "Client workshop", status: "Aug 26", detail: "14:00" },
  ]} />
}
