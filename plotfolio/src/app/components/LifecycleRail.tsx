"use client"
import { useInView, usePrefersReducedMotion } from "../hooks/useInView"

const MILESTONE_STAGES = ["Survey", "Build", "Sell", "Handover", "Operate"]
const KEEPER_STAGES = ["Receive", "Register", "Maintain", "Resolve", "Report"]

const W = 760; const H = 72; const PX = 40; const CY = 32
const nx = (stages: string[], i: number) => PX + (i / (stages.length - 1)) * (W - 2 * PX)

export function LifecycleRail({ product = "milestone" }: { product?: "milestone" | "keeper" }) {
  const [ref, inView] = useInView<SVGSVGElement>()
  const reduced = usePrefersReducedMotion()
  const vis = reduced || inView
  const lineLen = W - 2 * PX
  const STAGES = product === "keeper" ? KEEPER_STAGES : MILESTONE_STAGES
  const accentColor = product === "keeper" ? "rgb(0,206,177)" : "rgb(184,245,30)"

  return (
    <div className="relative my-8" aria-hidden="true">
      <p className="sr-only">Property lifecycle: {STAGES.join(" → ")}</p>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 72 }} aria-hidden="true">
        {/* Track */}
        <line x1={PX} y1={CY} x2={W - PX} y2={CY} stroke="rgba(40,18,61,0.08)" strokeWidth="1" />
        {/* Animated fill */}
        <line
          x1={PX} y1={CY} x2={W - PX} y2={CY}
          stroke={accentColor} strokeWidth="1.5"
          strokeDasharray={lineLen} strokeDashoffset={vis ? 0 : lineLen}
          style={{ transition: reduced ? "none" : "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s" }}
        />
        {STAGES.map((s, i) => {
          const x = nx(STAGES, i); const d = `${0.1 + i * 0.18}s`
          return (
            <g key={s}>
              <circle cx={x} cy={CY} r={7}
                fill={vis ? accentColor : "transparent"}
                stroke={vis ? accentColor : "rgba(40,18,61,0.15)"}
                strokeWidth="1.5"
                style={{ transition: reduced ? "none" : `fill 0.3s ease ${d}, stroke 0.3s ease ${d}` }}
              />
              <circle cx={x} cy={CY} r={2.5}
                fill={vis ? "rgb(40,18,61)" : "transparent"}
                style={{ transition: reduced ? "none" : `fill 0.25s ease calc(${d} + 0.1s)` }}
              />
              <text x={x} y={H - 6} textAnchor="middle" fontSize="9.5"
                fontFamily="ui-monospace,SFMono-Regular,Menlo,monospace"
                letterSpacing="0.07em"
                fill={vis ? "rgba(40,18,61,0.5)" : "transparent"}
                style={{ transition: reduced ? "none" : `fill 0.3s ease calc(${d} + 0.15s)` }}
              >
                {s.toUpperCase()}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
