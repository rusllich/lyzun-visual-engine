import SectionPage from "@/components/dashboard/SectionPage"

export default function FilesPage() {
  return <SectionPage eyebrow="Files" title="Client material and deliverables in one place." description="Keep source assets, approved content and final delivery files attached to the project they belong to." action="Upload files +" stats={[
    { label: "Files", value: "184", note: "Across active projects" },
    { label: "New this week", value: "27", note: "Client + studio uploads" },
    { label: "Awaiting approval", value: "06", note: "Final assets" },
    { label: "Storage", value: "3.8 GB", note: "Project workspace" },
  ]} rows={[
    { title: "Aster House photography", meta: "23 JPG · Client upload", status: "New", detail: "612 MB" },
    { title: "Linea Dental copy v3", meta: "DOCX · Content", status: "Approved", detail: "4.2 MB" },
    { title: "Northline launch package", meta: "ZIP · Final delivery", status: "Ready", detail: "188 MB" },
    { title: "Form / Function references", meta: "PDF + images · Discovery", status: "In review", detail: "94 MB" },
  ]} />
}
