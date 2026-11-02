"use client"
import { useState, type FormEvent } from "react"
import { track } from "@vercel/analytics"
export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const email = new FormData(event.currentTarget).get("email")
    setStatus("sending"); setError("")
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source: "pricing" }) })
      if (!response.ok) throw new Error("We couldn’t add you. Please try again.")
      setStatus("success"); track("form_success", { form: "pricing_waitlist" })
    } catch { setStatus("error"); setError("We couldn’t add you. Check your connection and try again.") }
  }
  return <div className="w-full max-w-sm text-white">
    {status === "success" ? <p role="status">You’re on the list!</p> : <form onSubmit={submit} aria-busy={status === "sending"}>
      <label htmlFor="waitlist-email" className="sr-only">Email address</label>
      <div className="flex flex-wrap gap-3"><input id="waitlist-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-describedby="waitlist-error" aria-invalid={status === "error"} placeholder="your@email.com" className="min-w-0 flex-1 rounded-full border border-white/40 bg-plum px-5 py-3 text-sm text-white placeholder:text-white/80" />
      <button type="submit" disabled={status === "sending"} onClick={() => track("cta_click", { cta: "notify_me" })} className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-plum">{status === "sending" ? "Sending…" : "Notify me"}</button></div>
      <p id="waitlist-error" role="alert" className="mt-2 text-sm">{error}</p>
    </form>}
    <p className="mt-3 text-xs">By submitting, you agree to our <a className="underline" href="/privacy">Privacy policy</a> and <a className="underline" href="/terms">Terms</a>.</p>
  </div>
}
