"use client"
import { useEffect, useState } from "react"
import { useInView, usePrefersReducedMotion } from "../hooks/useInView"

const MONO = { fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" } as const

// Payments & Banking: bank feed stream
const FEED = [
  { t: "11:02", txt: "Instant payment · ₹2,50,000 · Plot A-14",     status: "matched ✓"     },
  { t: "11:05", txt: "Bank transfer · HDFC · ₹8,40,000",          status: "reconciled ✓", hi: true },
  { t: "11:09", txt: "Instant payment · ₹1,20,000 · Plot B-03",      status: "matched ✓"     },
]
export function PaymentsMicroUI({ product = "milestone" }: { product?: "milestone" | "keeper" }) {
  const feed = product === "keeper" ? [
    { t: "11:02", txt: "Instant payment · Maintenance · A-14", status: "matched ✓" },
    { t: "11:05", txt: "Bank transfer · Vendor payment", status: "reconciled ✓", hi: true },
    { t: "11:09", txt: "Instant payment · Maintenance · B-03", status: "matched ✓" },
  ] : FEED
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduced) { setTimeout(() => setCount(FEED.length), 0); return }
    let i = 0; const run = () => { if (i < FEED.length) { i++; setCount(i); setTimeout(run, 680) } }
    const t = setTimeout(run, 350); return () => clearTimeout(t)
  }, [inView, reduced])
  return (
    <div ref={ref} aria-hidden="true" className="mt-5 rounded-xl bg-surface p-3">
      <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-wider text-olive" style={MONO}>Bank feed</p>
      <div className="space-y-1">
        {feed.slice(0, count).map(({ t, txt, status, hi }) => (
          <div key={t} className={`flex items-center gap-1.5 rounded px-2 py-1 text-[0.75rem] ${hi ? "bg-lime/20 text-olive" : "text-plum/60"}`} style={MONO}>
            <span className="shrink-0 text-muted">[{t}]</span>
            <span className="flex-1 truncate">{txt}</span>
            <span className="shrink-0 font-semibold">{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Communication & AI: WhatsApp-style thread
export function CommsMicroUI({ product = "milestone" }: { product?: "milestone" | "keeper" }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduced) { setTimeout(() => setPhase(4), 0); return }
    const ts = [350, 950, 1200, 1850, 2600]
    const timers = ts.map((t, i) => setTimeout(() => setPhase(i + 1), t))
    return () => timers.forEach(clearTimeout)
  }, [inView, reduced])
  return (
    <div ref={ref} aria-hidden="true" className="mt-5 rounded-xl bg-surface p-3">
      <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-wider text-keeper" style={MONO}>{product === "keeper" ? "Resident update" : "Buyer update"}</p>
      {phase === 1 && (
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[0.75rem] text-muted shadow-soft">
          {[0,1,2].map(i => <span key={i} className="inline-block size-1.5 animate-bounce rounded-full bg-plum/30" style={{ animationDelay: `${i * 0.15}s` }} />)}
        </div>
      )}
      {phase >= 2 && (
        <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[0.75rem] shadow-soft">
          <p className="leading-5 text-plum">{product === "keeper" ? "Tower B lift serviced. service report attached" : "Slab casting done for Tower B . photos attached"}</p>
          {phase >= 3 && <div className="mt-1 flex justify-end text-[0.7rem] text-keeper">✓✓</div>}
        </div>
      )}
      {phase >= 4 && (
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-keeper/20 bg-mint-soft px-2 py-1.5 text-[0.75rem] text-keeper">
          <span>{product === "keeper" ? "Service report.pdf → 6 fields extracted" : "Allotment letter.pdf → 6 fields extracted"}</span>
        </div>
      )}
    </div>
  )
}

// Cloud & Enterprise: sync-jobs list
const JOBS = ["Excel export", "SharePoint sync", "Power BI refresh"]
export function CloudMicroUI({ product = "milestone" }: { product?: "milestone" | "keeper" }) {
  const jobs = product === "keeper" ? ["Asset register export", "Service report sync", "Portfolio dashboard refresh"] : JOBS
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [done, setDone] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduced) { setTimeout(() => setDone(JOBS.length), 0); return }
    let i = 0; const run = () => { if (i < JOBS.length) { i++; setDone(i); setTimeout(run, 780) } }
    const t = setTimeout(run, 400); return () => clearTimeout(t)
  }, [inView, reduced])
  return (
    <div ref={ref} aria-hidden="true" className="mt-5 rounded-xl bg-surface p-3">
      <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-wider text-violet" style={MONO}>Sync jobs</p>
      <div className="space-y-1.5">
        {jobs.map((label, i) => (
          <div key={label} className="flex items-center justify-between text-[0.75rem]">
            <span className="text-plum/70">{label}</span>
            <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-bold transition-colors duration-500 ${i < done ? "bg-lime-soft text-olive" : "bg-plum/6 text-muted"}`}>
              {i < done ? "✓ synced" : "pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
