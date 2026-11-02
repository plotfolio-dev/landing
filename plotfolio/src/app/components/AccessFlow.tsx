"use client"
import { createContext, useContext, useRef, useState, type ReactNode } from "react"
import { track } from "@/lib/analytics"
import { WaitlistDialog } from "./Waitlist"
import { ProjectEnquiry } from "./ProjectEnquiry"
export type Plan = "Starter" | "Growth" | "Suite"
export type Source = "header" | "hero" | "pricing"
type Selection = { kind: "waitlist" | "enquiry"; plan?: Plan; source: Source; serial: number }
const AccessContext = createContext<((selection: Omit<Selection, "serial">) => void) | null>(null)
export function AccessFlow({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  function close() { setSelection(null); trigger.current?.focus() }
  return <AccessContext.Provider value={next => {
    trigger.current = document.activeElement as HTMLElement
    setSelection({ ...next, serial: Date.now() })
  }}>
    {children}
    {selection?.kind === "waitlist" && <WaitlistDialog key={selection.serial} plan={selection.plan} source={selection.source} onClose={close} />}
    {selection?.kind === "enquiry" && <ProjectEnquiry key={selection.serial} plan={selection.plan} onClose={close} />}
  </AccessContext.Provider>
}
export function AccessButton({ label = "Join early access", plan, source, kind = "waitlist", className = "" }: {
  label?: string; plan?: Plan; source: Source; kind?: Selection["kind"]; className?: string
}) {
  const open = useContext(AccessContext)
  return <button type="button" onClick={() => {
    track("cta_click", { cta: label, plan: plan || "unspecified", source })
    open?.({ kind, plan, source })
  }} className={`rounded-full bg-plum px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet ${className}`}>{label}</button>
}
