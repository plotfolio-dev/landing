import { isSameOrigin } from "@/lib/submission-origin"
import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Submission not allowed." }, { status: 403 })
  if (Number(request.headers.get("content-length")) > 2000) return NextResponse.json({ error: "Submission too long." }, { status: 413 })
  let data
  try { data = await request.json() } catch { return NextResponse.json({ error: "Invalid submission." }, { status: 400 }) }
  const email = typeof data?.email === "string" ? data.email.trim() : ""
  const plan = data?.plan
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !["header", "hero", "pricing"].includes(data.source) || (plan != null && !["Starter", "Growth", "Suite"].includes(plan))) return NextResponse.json({ error: "Invalid email or plan." }, { status: 400 })
  const user = process.env.GOOGLE_WORKSPACE_EMAIL
  const pass = process.env.GOOGLE_WORKSPACE_APP_PASSWORD?.replace(/\s/g, "")
  if (!user || !pass) return NextResponse.json({ error: "Waitlist unavailable. Please try later." }, { status: 503 })
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000, disableFileAccess: true, disableUrlAccess: true })
  try {
    const result = await transport.sendMail({ from: { name: "Plotfolio AI Website", address: user }, to: "hello@plotfolioai.com", replyTo: email, subject: "New early access waitlist record", text: JSON.stringify({ email, plan, source: data.source, submitted: new Date().toISOString() }, null, 2) })
    if (!result.accepted?.length) throw new Error("Recipient not accepted")
    return NextResponse.json({ success: true }, { status: 201 })
  } catch { return NextResponse.json({ error: "Could not save your waitlist record." }, { status: 502 }) }
  finally { transport.close() }
}
