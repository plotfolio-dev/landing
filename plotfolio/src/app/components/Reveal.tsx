"use client"
import { type ReactNode, type CSSProperties } from "react"
import { useInView, usePrefersReducedMotion } from "../hooks/useInView"

export function Reveal({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; className?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const style: CSSProperties = reduced ? {} : {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(16px)",
    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  }
  return <div ref={ref} className={className} style={style}>{children}</div>
}
