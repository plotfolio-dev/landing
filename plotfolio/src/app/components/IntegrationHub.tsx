"use client"
import { useEffect, useRef, useState } from "react"
import { useInView, usePrefersReducedMotion } from "../hooks/useInView"

interface HNode { id: string; label: string; angle: number }
const NODES: HNode[] = [
  { id: "razorpay",  label: "Razorpay",    angle: -90  },
  { id: "hdfc",      label: "HDFC",         angle: -45  },
  { id: "whatsapp",  label: "WhatsApp",     angle: 0    },
  { id: "openai",    label: "OpenAI",       angle: 45   },
  { id: "aws",       label: "AWS",          angle: 90   },
  { id: "power-bi",  label: "Power BI",     angle: 135  },
  { id: "azure",     label: "Azure",        angle: 180  },
  { id: "gcloud",    label: "Google Cloud", angle: -135 },
]
const CX = 250, CY = 195, RI = 48, RO = 150
const rad = (d: number) => (d * Math.PI) / 180
const np = (ang: number, r = RO) => ({ x: CX + r * Math.cos(rad(ang)), y: CY + r * Math.sin(rad(ang)) })
const dist = (a: {x:number;y:number}, b: {x:number;y:number}) => Math.hypot(b.x - a.x, b.y - a.y)

export function IntegrationHub() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [drawn, setDrawn] = useState(0)
  const [dotIdx, setDotIdx] = useState<number | null>(null)
  const [dotPos, setDotPos] = useState<{x:number;y:number}|null>(null)
  const visRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null)

  useEffect(() => {
    if (!inView) return
    visRef.current = true
    if (reduced) { setTimeout(() => setDrawn(NODES.length), 0); return }
    let i = 0
    const iv = setInterval(() => { i++; setDrawn(i); if (i >= NODES.length) clearInterval(iv) }, 110)
    const dotStart = setTimeout(() => {
      let active = 0
      timerRef.current = setInterval(() => {
        if (!visRef.current) return
        active = (active + 1) % NODES.length
        setDotIdx(active)
        const inner = np(NODES[active].angle, RI + 6)
        const outer = np(NODES[active].angle)
        setDotPos(inner)
        let t = 0; const STEPS = 60
        const anim = setInterval(() => {
          t++; const p = t / STEPS
          setDotPos({ x: inner.x + (outer.x - inner.x) * p, y: inner.y + (outer.y - inner.y) * p })
          if (t >= STEPS) { clearInterval(anim); setDotIdx(null) }
        }, 12)
      }, 2500)
    }, NODES.length * 110 + 800)
    return () => { clearInterval(iv); clearTimeout(dotStart); if (timerRef.current) clearInterval(timerRef.current); visRef.current = false }
  }, [inView, reduced])

  useEffect(() => {
    const h = () => { visRef.current = !document.hidden }
    document.addEventListener("visibilitychange", h)
    return () => document.removeEventListener("visibilitychange", h)
  }, [])

  return (
    <div ref={ref} className="hidden md:block" aria-hidden="true">
      <p className="sr-only">Plotfolio AI connects to: {NODES.map(n => n.label).join(", ")}, and more.</p>
      <svg viewBox="0 0 500 390" className="mx-auto w-full max-w-xl" style={{ height: 320 }} aria-hidden="true">
        {NODES.map((node, i) => {
          const outer = np(node.angle); const inner = np(node.angle, RI + 6)
          const len = dist(inner, outer)
          const vis = i < drawn
          return (
            <g key={node.id}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
                stroke="rgba(40,18,61,0.1)" strokeWidth="1"
                strokeDasharray={len} strokeDashoffset={vis ? 0 : len}
                style={{ transition: reduced ? "none" : `stroke-dashoffset 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.11}s` }}
              />
              <circle cx={outer.x} cy={outer.y} r={22} fill="white"
                stroke="rgba(40,18,61,0.08)" strokeWidth="1"
                style={{ opacity: vis ? 1 : 0, filter: "drop-shadow(0 2px 8px rgba(40,18,61,0.07))", transition: reduced ? "none" : `opacity 0.3s ease ${i * 0.11 + 0.35}s` }}
              />
              {(() => { const lp = np(node.angle, RO + 30); return (
                <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9.5"
                  fontFamily="ui-monospace,SFMono-Regular,Menlo,monospace" fill="rgba(40,18,61,0.45)"
                  style={{ opacity: vis ? 1 : 0, transition: reduced ? "none" : `opacity 0.3s ease ${i * 0.11 + 0.5}s` }}>
                  {node.label}
                </text>
              )})()}
            </g>
          )
        })}
        {dotPos && dotIdx !== null && !reduced && (
          <circle cx={dotPos.x} cy={dotPos.y} r={4} fill="rgb(184,245,30)"
            style={{ filter: "drop-shadow(0 0 5px rgb(184,245,30))" }} />
        )}
        <circle cx={CX} cy={CY} r={RI} fill="rgb(40,18,61)" />
        <circle cx={CX} cy={CY} r={RI - 1} fill="none" stroke="rgba(184,245,30,0.25)" strokeWidth="1" />
        <image href="/images/logos/plotfolio-ai-app-icon.svg" x={CX - 20} y={CY - 20} width="40" height="40" />
      </svg>
    </div>
  )
}
