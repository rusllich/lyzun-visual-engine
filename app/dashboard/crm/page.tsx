import SectionPage from "@/components/dashboard/SectionPage"

export default function CrmPage() {
  return <SectionPage eyebrow="Leads / CRM" title="From enquiry to signed project." description="Keep every lead, conversation state and commercial next step visible before it becomes delivery work." action="Add lead +" stats={[
    { label: "New leads", value: "08", note: "Last 14 days" },
    { label: "Qualified", value: "05", note: "Fit confirmed" },
    { label: "Proposals", value: "03", note: "$24.8k total" },
    { label: "Win rate", value: "42%", note: "Rolling 90 days" },
  ]} rows={[
    { title: "Harbor Stay", meta: "Hospitality · Website redesign", status: "Qualified", detail: "Discovery call Aug 21" },
    { title: "Studio Nueve", meta: "Architecture · Portfolio", status: "Proposal", detail: "$8.5k sent" },
    { title: "Smile Atelier", meta: "Dental · Conversion site", status: "Follow-up", detail: "Reply due today" },
    { title: "Oakline", meta: "Cabinetry · Product experience", status: "New lead", detail: "Brief received" },
  ]} />
}
