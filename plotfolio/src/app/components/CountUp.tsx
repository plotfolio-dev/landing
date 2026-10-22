"use client"
import { useEffect, useRef, useState } from "react"
import { useInView, usePrefersReducedMotion } from "../hooks/useInView"

function parse(raw: string) {
  const m = raw.match(/^([+₹]?)([0-9,]+\.?[0-9]*)(.*)$/)
  if (!m) return { prefix: "", numStr: "0", suffix: raw, numeric: 0, decimals: 0 }
  const numStr = m[2].replace(/,/g, "")
  const numeric = parseFloat(numStr)
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0
  return { prefix: m[1], numStr: m[2], suffix: m[3], numeric, decimals }
}

function fmt(n: number, decimals: number, originalNumStr: string): string {
  if (decimals > 0) return n.toFixed(decimals)
  // replicate the comma-grouping pattern of the original string
  const rounded = Math.round(n).toString()
  if (!originalNumStr.includes(",")) return rounded
  // Indian thousands: last 3 then groups of 2
  if (rounded.length <= 3) return rounded
  const last3 = rounded.slice(-3)
  const rest = rounded.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3
}

export function CountUp({ value, duration = 1200, className = "" }: {
  value: string; duration?: number; className?: string
}) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(value)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    if (reduced) { setTimeout(() => setDisplay(value), 0); return }
    const { prefix, numStr, suffix, numeric, decimals } = parse(value)
    if (!numeric) { setTimeout(() => setDisplay(value), 0); return }
    startRef.current = null
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const p = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = eased * numeric
      setDisplay(`${prefix}${fmt(cur, decimals, numStr)}${suffix}`)
      if (p < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, value, duration, reduced])

  return <span ref={ref} className={className}>{display}</span>
}
