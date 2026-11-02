import type { Metadata } from "next"
import { LegalDraft } from "../components/LegalDraft"
export const metadata: Metadata = {
  title: "Draft Website Terms | Plotfolio AI",
  description: "Website terms draft for review for the Plotfolio AI landing page and early-access programme.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
}
export default function Page() {
  return <LegalDraft title="Website terms" introduction="These proposed terms concern browsing the Plotfolio AI website and submitting early-access or project enquiries. Paid product access would require separate, approved service terms." sections={[
    { title: "Website information and product previews", body: <p>The website introduces Milestone and Keeper. Dashboard images, sample transactions and workflow demonstrations illustrate intended use. They are not records of your project, evidence of customer results or a guarantee of performance.</p> },
    { title: "Early access and demonstrations", body: <p>Joining early access expresses interest in receiving updates. It does not create a subscription, confirm a launch date, reserve capacity or guarantee admission to a programme. A demonstration request allows the team to contact you about your project. No payment is collected by these forms.</p> },
    { title: "Plans, trials and integrations", body: <p>Prices, trial descriptions and features shown for launch are indicative proposals. Final pricing, applicable taxes, billing units, eligibility, trial conditions and cancellation terms must be presented before any purchase. Integrations marked as planned at launch are not represented as currently available. Third-party approvals or accounts may be required.</p> },
    { title: "Information you provide", body: <p>Please submit accurate contact details and only information you are authorised to share. Do not submit bank passwords, payment-card details, confidential buyer records or another person’s sensitive information through the website forms or voice assistant.</p> },
    { title: "Acceptable use", body: <p>The proposed rules prohibit fraudulent submissions, impersonation, attempts to obtain unauthorised access, interference with the website and automated abuse of its forms. Security testing should be coordinated with the team rather than performed against live visitor data.</p> },
    { title: "Content and third-party services", body: <p>Plotfolio branding, website content and product designs may be protected by intellectual-property rights. Third-party names and logos identify the relevant providers and do not by themselves establish a partnership or endorsement. Any permissions for reuse, ownership provisions and licences require confirmation in the final terms.</p> },
    { title: "Automated assistance and decisions", body: <p>The voice assistant can help explain the product, but its responses may be incomplete or inaccurate. Confirm pricing, contractual commitments and product availability with the Plotfolio team. Website content and automated responses should not be relied on as legal, tax, financial or regulatory advice for a project.</p> },
    { title: "Availability and responsibility", body: <p>The final terms should explain maintenance, interruptions, warranties and responsibility for losses, with any exclusions subject to applicable law. No liability cap, indemnity or waiver has been assumed in this draft. Any non-excludable statutory rights must remain protected.</p> },
    { title: "Operator, applicable law and disputes", body: <p>The registered operator, business address, applicable law, dispute process and any permitted jurisdiction clause remain subject to founder and legal review. This draft does not assign a city or court, and does not impose arbitration.</p> },
    { title: "Changes and contact", body: <p>Approved terms should state an effective date and how material changes will be communicated. Questions about the website or early access can be sent to hello@plotfolioai.com. This draft does not make clicking a CTA or submitting a form acceptance of unapproved terms.</p> },
  ]} />
}
