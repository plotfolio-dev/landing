import type { Metadata } from "next"
import { LegalDraft } from "../components/LegalDraft"
import { analyticsEnabled } from "@/lib/analytics"
export const metadata: Metadata = {
  title: "Draft Privacy Notice | Plotfolio AI",
  description: "Privacy notice draft for review, covering the Plotfolio AI landing page and early-access enquiries.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
}
export default function Page() {
  return <LegalDraft title="Privacy notice" introduction="This draft concerns the Plotfolio AI marketing website, early-access waitlist, project enquiries and optional voice assistant. It does not describe processing inside a future customer product." sections={[
    { title: "Information submitted through the website", body: <>
      <p>The waitlist collects your email address, the plan selected if any, and the page location from which you joined. A submission timestamp is included in the email sent to our team.</p>
      <p>The enquiry form collects your name, work email, company, product interest, project type, project size and message. A phone number is optional. Please share only information needed to discuss your project, and avoid uploading or entering buyer records, bank credentials or sensitive personal information.</p>
    </> },
    { title: "How submissions are used and delivered", body: <p>The proposed purposes are responding to enquiries, arranging requested demonstrations and providing early-access or launch updates. The current submission backend sends details to the Plotfolio team through Google Workspace email. Joining the waitlist does not create a paid account or authorise a payment.</p> },
    { title: "Hosting and website analytics", body: <>
      <p>The website is hosted on Vercel. Hosting and security services may process technical request information, such as an IP address and browser information, to serve and protect the website. The team must verify the provider settings and retention arrangements before approving this notice.</p>
      <p>{analyticsEnabled ? "Website analytics is enabled in this build. The configured events cover CTA clicks and successful form submissions, with plan and source labels. Form email addresses and enquiry contents are not included in those event properties." : "The optional Vercel Web Analytics loader is disabled in this build. If it is enabled later, this notice must be reviewed to describe the resulting processing."}</p>
    </> },
    { title: "Optional voice assistant", body: <p>The voice assistant uses ElevenLabs and requests microphone access when you start a session. Audio is processed to support the conversation. You can end a call or contact us by email instead. Recording, transcript retention, model-training settings and any additional service providers require confirmation before the final notice is approved. Do not share confidential project or financial details during a call.</p> },
    { title: "Service providers and international processing", body: <p>Google Workspace, Vercel and ElevenLabs support the functions described above. Their processing locations, contractual safeguards and any further recipients must be checked by the team. This draft does not promise that all information stays within India.</p> },
    { title: "Retention, requests and communication preferences", body: <p>You may email hello@plotfolioai.com to ask about information you submitted, request a correction or deletion, or ask the team to stop early-access messages. The team may need to verify that a request relates to you. Applicable rights, the response process, retention periods, backup handling and any necessary legal exceptions must be confirmed before publication.</p> },
    { title: "Security and updates", body: <p>The proposed approach is to limit access to people and providers who need it and use appropriate safeguards. The final notice must reflect the controls actually in place; this draft does not guarantee absolute security. An approved notice should identify its effective date and explain how material changes will be communicated.</p> },
  ]} />
}
