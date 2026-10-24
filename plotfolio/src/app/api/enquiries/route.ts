import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Submission not allowed." }, { status: 403 })
  }
  if (Number(request.headers.get("content-length")) > 16000) {
    return NextResponse.json({ error: "Your enquiry is too long." }, { status: 413 })
  }
  let data: Record<string, unknown>
  try {
    const body = await request.json()
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error()
    data = body
  } catch {
    return NextResponse.json({ error: "Please check your enquiry and try again." }, { status: 400 })
  }
  const limits = { name: 120, email: 254, company: 160, product: 20, projectType: 40, size: 160, message: 3000, phone: 40 }
  const enquiry: Record<string, string> = {}
  for (const [field, limit] of Object.entries(limits)) {
    const value = typeof data[field] === "string" ? data[field].trim() : ""
    if ((field !== "phone" && !value) || value.length > limit) {
      return NextResponse.json({ error: "Please complete all required fields within the allowed length." }, { status: 400 })
    }
    enquiry[field] = value
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) || !["Milestone", "Keeper", "Both"].includes(enquiry.product) || !["Residential development", "Commercial development", "Property management", "Facility management", "Other"].includes(enquiry.projectType)) {
    return NextResponse.json({ error: "Please check your email and project details." }, { status: 400 })
  }
  const user = process.env.GOOGLE_WORKSPACE_EMAIL
  const password = process.env.GOOGLE_WORKSPACE_APP_PASSWORD?.replace(/\s/g, "")
  if (!user || !password) {
    return NextResponse.json({ error: "Enquiry submission is not available yet. Please try again later. Your enquiry has not been sent." }, { status: 503 })
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  try {
    const result = await transporter.sendMail({
      from: { name: "Plotfolio AI Website", address: user },
      to: "hello@plotfolioai.com",
      replyTo: enquiry.email,
      subject: `New project enquiry: ${enquiry.product}`,
      text: [
        "New project enquiry from the Plotfolio AI website",
        "",
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Company: ${enquiry.company}`,
        `Interested in: ${enquiry.product}`,
        `Project type: ${enquiry.projectType}`,
        `Project size: ${enquiry.size}`,
        `Phone: ${enquiry.phone || "Not provided"}`,
        "",
        "What they need help with:",
        enquiry.message,
        "",
        `Submitted: ${new Date().toISOString()}`,
      ].join("\n"),
    })
    if (!result.accepted?.length) throw new Error("Recipient not accepted")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "We could not send your enquiry. Please try again." }, { status: 502 })
  } finally {
    transporter.close()
  }
}
