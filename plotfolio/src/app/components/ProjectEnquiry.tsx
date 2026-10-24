"use client"

import { useRef, useState, type FormEvent } from "react"

const fieldClass = "mt-2 w-full rounded-xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum outline-none focus:border-violet focus:ring-2 focus:ring-violet/15"

export function ProjectEnquiry() {
  const dialog = useRef<HTMLDialogElement>(null)
  const controller = useRef<AbortController | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setStatus("sending")
    setError("")
    const abort = new AbortController()
    controller.current = abort
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), signal: abort.signal,
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Please try again.")
      setStatus("success")
    } catch (err) {
      if (abort.signal.aborted) return
      setStatus("error")
      setError(err instanceof Error ? err.message : "We could not send your enquiry. Please try again.")
    }
  }

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className="rounded-full bg-plum px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet">Tell us about your project</button>
      <dialog ref={dialog} aria-labelledby="enquiry-title" aria-describedby="enquiry-description" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-[2rem] border border-plum/10 bg-canvas p-0 text-plum shadow-dashboard backdrop:bg-ink/75">
        <div className="p-6 md:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-3 font-script text-2xl text-violet">Let’s find the right fit</p>
              <h2 id="enquiry-title" className="font-display text-2xl font-semibold">Tell us about your project</h2>
            </div>
            <button type="button" onClick={() => dialog.current?.close()} className="rounded-full border border-plum/15 px-4 py-2 text-sm">Close</button>
          </div>
          <p id="enquiry-description" className="mt-3 text-sm leading-6 text-muted">Share a few details so our team can discuss the right tools for your project. All fields are required except phone number.</p>
          {status === "success" ? (
            <div role="status" className="mt-6 rounded-2xl bg-mint-soft p-6">
              <h3 className="font-display text-xl font-semibold">Thanks for sharing your project.</h3>
              <p className="mt-2 text-sm leading-6">Our team will contact you to discuss your project.</p>
              <button type="button" onClick={() => dialog.current?.close()} className="mt-5 rounded-full bg-plum px-5 py-3 text-sm font-semibold text-white">Done</button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6" aria-busy={status === "sending"}>
              <fieldset disabled={status === "sending"} className="grid gap-5 disabled:opacity-70 sm:grid-cols-2">
                <legend className="sr-only">Project enquiry details</legend>
                <label className="text-sm font-medium">Name<input autoComplete="name" name="name" required maxLength={120} className={fieldClass} /></label>
                <label className="text-sm font-medium">Work email<input type="email" autoComplete="email" name="email" required maxLength={254} className={fieldClass} /></label>
                <label className="text-sm font-medium">Company name<input autoComplete="organization" name="company" required maxLength={160} className={fieldClass} /></label>
                <label className="text-sm font-medium">Interested in<select name="product" required defaultValue="" className={fieldClass}><option value="" disabled>Select a product</option><option>Milestone</option><option>Keeper</option><option value="Both">Milestone and Keeper</option></select></label>
                <label className="text-sm font-medium">Project type<select name="projectType" required defaultValue="" className={fieldClass}><option value="" disabled>Select a project type</option>{["Residential development", "Commercial development", "Property management", "Facility management", "Other"].map(type => <option key={type}>{type}</option>)}</select></label>
                <label className="text-sm font-medium">Project size<input name="size" required maxLength={160} placeholder="For example, 120 homes or 3 properties" className={fieldClass} /></label>
                <label className="text-sm font-medium sm:col-span-2">What would you like help with?<textarea name="message" required maxLength={3000} rows={4} className={fieldClass} /></label>
                <label className="text-sm font-medium sm:col-span-2">Phone number <span className="font-normal text-muted">(optional)</span><input type="tel" autoComplete="tel" name="phone" maxLength={40} className={fieldClass} /></label>
              </fieldset>
              {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
              <p className="mt-5 text-xs leading-5 text-muted">We’ll use these details to respond to your enquiry.</p>
              <button type="submit" disabled={status === "sending"} className="mt-4 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Sending enquiry…" : "Request a callback"}</button>
            </form>
          )}
        </div>
      </dialog>
    </>
  )
}
