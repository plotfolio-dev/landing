import { type ReactNode } from "react"

/** 1px horizontal divider with 5px dot nodes at each end */
export function WfDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-px w-full bg-plum/8 ${className}`} aria-hidden="true">
      <span className="absolute left-0 top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plum/12" />
      <span className="absolute right-0 top-1/2 size-[5px] translate-x-1/2 -translate-y-1/2 rounded-full bg-plum/12" />
    </div>
  )
}

/** Three shared-edge column grid (desktop). Cards share vertical borders. */
export function WfGrid3({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-plum/8 ${className}`}>
      <div className="grid md:grid-cols-3">
        {children}
      </div>
    </div>
  )
}

/** A cell in a WfGrid3: right border on non-last children, top border on lower rows */
export function WfCell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border-b border-r border-plum/8 bg-white p-6 [&:last-child]:border-r-0 md:border-b-0 ${className}`}>
      {children}
    </div>
  )
}
