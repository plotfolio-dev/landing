"use client"
import { useEffect, useRef, useState } from "react"
import { useInView, usePrefersReducedMotion } from "../hooks/useInView"

const MONO = { fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" } as const

// ── 01 PLAN: phase list builds row by row, then total bar fills ─────────
const PHASES = [
  { label: "Foundation", pct: "10%" },
  { label: "Structure",  pct: "20%" },
  { label: "MEP",        pct: "25%" },
  { label: "Finishing",  pct: "45%" },
]
export function PlanMicroUI() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  const [bar, setBar] = useState(false)
  useEffect(() => {
    if (!inView) return
    if (reduced) { setTimeout(() => { setCount(PHASES.length); setBar(true) }, 0); return }
    let i = 0
    const run = () => { if (i < PHASES.length) { i++; setCount(i); setTimeout(run, 480) } else setTimeout(() => setBar(true), 320) }
    const t = setTimeout(run, 400)
    return () => clearTimeout(t)
  }, [inView, reduced])
  return (
    <div ref={ref} aria-hidden="true" className="mt-4 rounded-xl bg-surface p-3">
      <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-wider text-violet" style={MONO}>Phase schedule</p>
      <div className="space-y-1.5">
        {PHASES.slice(0, count).map(({ label, pct }) => (
          <div key={label} className="flex items-center justify-between text-[0.75rem]">
            <span className="text-plum/70">{label}</span>
            <span className="font-semibold text-violet" style={MONO}>{pct}</span>
          </div>
        ))}
      </div>
      {count === PHASES.length && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-plum/8">
          <div className="h-full rounded-full bg-lime transition-[width] duration-700" style={{ width: bar ? "100%" : "0%" }} />
        </div>
      )}
    </div>
  )
}

// ── 02 TRACK: monospace log stream + buyers count-up ────────────────────
const LOG = [
  { t: "10:42", txt: "Slab cast · Block B · 3 photos" },
  { t: "10:51", txt: "MEP rough-in · Level 4 · approved" },
  { t: "11:03", txt: "Plaster · Wing A · in progress", hi: true },
]
export function TrackMicroUI() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  const [buyers, setBuyers] = useState(0)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    if (!inView) return
    if (reduced) { setTimeout(() => { setCount(LOG.length); setBuyers(48) }, 0); return }
    let i = 0
    const run = () => {
      if (i < LOG.length) { i++; setCount(i); setTimeout(run, 580) }
      else {
        const s = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - s) / 800, 1); const e = 1 - (1 - p) ** 2
          setBuyers(Math.round(e * 48)); if (p < 1) raf.current = requestAnimationFrame(tick)
        }
        raf.current = requestAnimationFrame(tick)
      }
    }
    const t = setTimeout(run, 300)
    return () => { clearTimeout(t); if (raf.current) cancelAnimationFrame(raf.current) }
  }, [inView, reduced])
  return (
    <div ref={ref} aria-hidden="true" className="mt-4 rounded-xl bg-surface p-3">
      <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-wider text-keeper" style={MONO}>Site log</p>
      <div className="space-y-1">
        {LOG.slice(0, count).map(({ t, txt, hi }) => (
          <div key={t} className={`flex gap-2 rounded px-2 py-1 text-[0.75rem] ${hi ? "bg-lime/20 font-semibold text-olive" : "text-plum/60"}`} style={MONO}>
            <span className="shrink-0 text-muted">[{t}]</span><span>{txt}</span>
          </div>
        ))}
      </div>
      {count === LOG.length && buyers > 0 && (
        <div className="mt-2 rounded-lg bg-lime/15 px-2 py-1 text-[0.75rem] font-semibold text-olive" style={MONO}>
          Buyers notified · {buyers}
        </div>
      )}
    </div>
  )
}

// ── 03 COLLECT: ticking checklist → receipt slides in ───────────────────
const CHECKS = ["Stage signed off", "Demand letter generated", "Sent on WhatsApp"]
export function CollectMicroUI() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [ticked, setTicked] = useState(0)
  const [receipt, setReceipt] = useState(false)
  useEffect(() => {
    if (!inView) return
    if (reduced) { setTimeout(() => { setTicked(CHECKS.length); setReceipt(true) }, 0); return }
    let i = 0
    const run = () => { if (i < CHECKS.length) { i++; setTicked(i); setTimeout(run, 580) } else setTimeout(() => setReceipt(true), 360) }
    const t = setTimeout(run, 400)
    return () => clearTimeout(t)
  }, [inView, reduced])
  return (
    <div ref={ref} aria-hidden="true" className="mt-4 rounded-xl bg-surface p-3">
      <div className="space-y-1.5">
        {CHECKS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 text-[0.75rem]">
            <span className={`flex size-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300 text-[0.6rem] font-bold ${i < ticked ? "bg-lime text-plum" : "border border-plum/15 text-transparent"}`}>✓</span>
            <span className={i < ticked ? "text-plum" : "text-muted"}>{label}</span>
          </div>
        ))}
      </div>
      {receipt && (
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-keeper/20 bg-mint-soft px-2 py-1.5 text-[0.75rem] font-medium text-keeper" style={{ ...MONO, opacity: 1, transition: "opacity 0.4s ease" }}>
          <span>Received ₹12.4 L · NEFT · reconciled</span>
          <span className="ml-auto rounded-full bg-keeper px-2 py-0.5 text-[0.7rem] font-bold text-white">Paid</span>
        </div>
      )}
    </div>
  )
}
