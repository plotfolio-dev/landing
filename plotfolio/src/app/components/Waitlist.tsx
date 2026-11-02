"use client"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { track } from "@/lib/analytics"
import type { Plan, Source } from "./AccessFlow"
export function WaitlistDialog({ plan, source, onClose }: { plan?: Plan; source: Source; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const controller = useRef<AbortController | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")
  useEffect(() => {
    dialog.current?.showModal()
    return () => controller.current?.abort()
  }, [])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const email = new FormData(event.currentTarget).get("email")
    setStatus("sending"); setError("")
    const abort = new AbortController(); controller.current = abort
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, plan: plan || null, source }), signal: abort.signal })
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        throw new Error(result.error || "We couldn’t add you. Please try again.")
      }
      setStatus("success"); track("waitlist_success", { plan: plan || "unspecified", source })
    } catch (err) {
      if (abort.signal.aborted) return
      setStatus("error"); setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "We couldn’t add you. Check your connection and try again.")
    }
  }
  return <dialog ref={dialog} onClose={onClose} aria-labelledby="waitlist-title" aria-describedby="waitlist-description" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-[2rem] border border-plum/10 bg-canvas p-6 text-plum shadow-dashboard backdrop:bg-ink/75">
    <div className="flex items-start justify-between gap-4"><h2 id="waitlist-title" className="font-display text-2xl font-semibold">Join early access</h2><button type="button" onClick={() => dialog.current?.close()} className="rounded-full border border-plum/20 px-4 py-2 text-sm">Close</button></div>
    <p id="waitlist-description" className="mt-4 text-sm leading-6 text-muted">Leave your email for launch updates.{plan && ` Selected plan: ${plan}.`}</p>
    {status === "success" ? <p role="status" className="mt-6 rounded-xl bg-mint-soft p-4">You’re on the list!</p> : <form onSubmit={submit} aria-busy={status === "sending"} className="mt-6">
      <label htmlFor="waitlist-email" className="text-sm font-medium">Email address</label>
      <input id="waitlist-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-describedby="waitlist-error" aria-invalid={status === "error"} className="mt-2 w-full rounded-xl border border-plum/20 bg-white px-4 py-3 text-sm" />
      <p id="waitlist-error" role="alert" className="mt-3 text-sm text-red-800">{error}</p>
      <button type="submit" disabled={status === "sending"} className="mt-4 rounded-full bg-plum px-5 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70">{status === "sending" ? "Sending…" : "Join early access"}</button>
    </form>}
  </dialog>
}
