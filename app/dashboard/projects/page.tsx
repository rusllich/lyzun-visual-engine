import SectionPage from "@/components/dashboard/SectionPage"

export default function ProjectsPage() {
  return <SectionPage eyebrow="Projects" title="Every project. One operational truth." description="Track delivery stage, ownership, next client action and deadlines without searching through chats or inboxes." action="New project +" stats={[
    { label: "Active", value: "06", note: "Currently in delivery" },
    { label: "Awaiting client", value: "03", note: "Approval or content needed" },
    { label: "Planned", value: "04", note: "Scheduled next" },
    { label: "Blocked", value: "01", note: "Needs intervention" },
  ]} rows={[
    { title: "Aster House", meta: "Hospitality · Website + motion", status: "Production", detail: "64% · Due Aug 27" },
    { title: "Linea Dental", meta: "Dental · Treatment experience", status: "Client review", detail: "82% · Due Aug 23" },
    { title: "Northline Build", meta: "Construction · Lead-gen website", status: "Final QA", detail: "94% · Due Aug 22" },
    { title: "Form / Function", meta: "Interiors · Portfolio system", status: "Discovery", detail: "18% · Due Sep 03" },
    { title: "Cabinetry One", meta: "Custom storage · Product site", status: "Scheduled", detail: "Starts Sep 02" },
  ]} />
}
