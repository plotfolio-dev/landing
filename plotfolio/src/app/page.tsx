"use client";
import { useState, useEffect, useRef, type ReactNode } from "react"
import { Mic, MicOff, PhoneOff } from "lucide-react"
import Vapi from "@vapi-ai/web"

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? ""
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ?? ""

type ButtonProps = {
  children: ReactNode
  tone?: "plum" | "lime" | "ghost"
  onClick?: () => void
}

function Button({ children, tone = "plum", onClick }: ButtonProps) {
  const tones = {
    plum: "bg-plum text-white hover:bg-violet",
    lime: "bg-lime text-ink hover:bg-mint",
    ghost: "border border-plum/15 bg-white text-plum hover:border-plum/35",
  }

  return (
    <button
      className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${tones[tone]}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src="/images/logos/plotfolio-ai-app-icon.svg" alt="" className="size-8" />
      <span
        className={`font-display text-lg font-semibold ${
          inverse ? "text-white" : "text-plum"
        }`}
      >
        Plotfolio{" "}
        <span className={inverse ? "text-lime" : "text-violet"}>AI</span>
      </span>
    </div>
  )
}

function Kicker({
  children,
  mint = false,
}: {
  children: ReactNode
  mint?: boolean
}) {
  return (
    <p
      className={`mb-4 font-script text-2xl ${
        mint ? "text-keeper" : "text-violet"
      }`}
    >
      {children}
    </p>
  )
}

function Progress({
  value,
  color = "bg-violet",
}: {
  value: string
  color?: string
}) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-plum/8">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: value }}
      />
    </div>
  )
}

function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -right-7 -top-7 size-40 rounded-[2.5rem] bg-lime" />
      <div className="absolute -bottom-8 -left-8 size-36 rounded-[2.5rem] bg-mint" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white p-4 shadow-dashboard">
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-surface px-4 py-3">
          <div>
            <p className="text-xs text-muted">Portfolio value</p>
            <p className="font-display text-xl font-semibold text-plum">
              ₹18.6 Cr
            </p>
          </div>
          <span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-bold text-olive">
            +12.4%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Green Acres", "Milestone 7 of 10", "82%", "bg-violet"],
            ["Lakeview Villas", "14 active assets", "68%", "bg-keeper"],
          ].map(([name, meta, value, color]) => (
            <div className="rounded-2xl border border-plum/8 p-4" key={name}>
              <div className="mb-4 flex items-center justify-end">
                <span className="text-xs font-bold text-plum">{value}</span>
              </div>
              <p className="font-display text-sm font-semibold text-plum">
                {name}
              </p>
              <p className="mb-3 mt-1 text-xs text-muted">{meta}</p>
              <Progress value={value} color={color} />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-plum p-4 text-white">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/55">Next action</p>
              <p className="mt-1 text-sm font-semibold">
                Foundation payment ready
              </p>
            </div>
            <span className="rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-plum">
              Send update
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-xs">
            <div>
              <b className="block text-base">24</b>
              <span className="text-white/50">Assets</span>
            </div>
            <div>
              <b className="block text-base">8</b>
              <span className="text-white/50">Projects</span>
            </div>
            <div>
              <b className="block text-base">99%</b>
              <span className="text-white/50">On track</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const suiteData = {
  milestone: {
    label: "Milestone",
    eyebrow: "Build & sell",
    title: "Progress tracked. Invoices sent. Collections done.",
    body: "Share progress, send payment requests, and keep buyers happy without awkward calls. Every stage is logged, so when anyone asks, you have the answer.",
    stats: [
      ["₹2,400 Cr", "Collections tracked"],
      ["5 min", "Setup per project"],
      ["42%", "Faster collections"],
    ],
  },
  keeper: {
    label: "Keeper",
    eyebrow: "Run & care",
    title: "Run what you've built, properly.",
    body: "Residents raise issues, vendors pick them up, and nothing gets lost. Keeper keeps the full history of every asset, from installation to its last service date.",
    stats: [
      ["99.1%", "Asset uptime"],
      ["18 hrs", "Avg. resolution"],
      ["57%", "Fewer repeat calls"],
    ],
  },
}

function ProductPreview({ product }: { product: "milestone" | "keeper" }) {
  const isKeeper = product === "keeper"
  return (
    <div
      className={`rounded-[2rem] p-4 md:p-6 ${
        isKeeper ? "bg-mint-soft" : "bg-lime-soft"
      }`}
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-plum/8 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-plum/8 px-5 py-4">
          <div className="flex items-center gap-2">
            <span
              className={`size-2.5 rounded-full ${
                isKeeper ? "bg-keeper" : "bg-violet"
              }`}
            />
            <span className="font-display text-sm font-semibold text-plum">
              {isKeeper ? "Asset command center" : "Green Acres · Phase 1"}
            </span>
          </div>
          <span className="rounded-full bg-surface px-3 py-1 text-[0.65rem] font-bold text-muted">
            LIVE
          </span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-2xl bg-plum p-4 text-white">
            <p className="text-[0.65rem] uppercase tracking-wider text-white/45">
              Overview
            </p>
            <p className="mt-6 font-display text-3xl font-semibold">
              {isKeeper ? "99.1%" : "₹4.1 Cr"}
            </p>
            <p className="mt-1 text-xs text-white/55">
              {isKeeper ? "Portfolio health" : "Due this month"}
            </p>
            <div
              className={`mt-8 h-1.5 rounded-full ${
                isKeeper ? "bg-keeper" : "bg-lime"
              }`}
            />
          </div>
          <div className="space-y-2">
            {(isKeeper
              ? [
                  ["Lift A", "Preventive service", "Healthy"],
                  ["Water pump", "Inspection due", "Thursday"],
                  ["Tower B HVAC", "Vendor assigned", "In progress"],
                ]
              : [
                  ["Structure complete", "Buyer update sent", "100%"],
                  ["MEP rough-in", "48 buyers notified", "76%"],
                  ["Internal plaster", "Payment scheduled", "54%"],
                ]
            ).map(([title, text, badge], index) => (
              <div className="rounded-xl border border-plum/8 p-3" key={title}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-xs font-bold text-plum">{title}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-[0.6rem] font-bold ${
                      index === 1
                        ? "bg-lime-soft text-olive"
                        : "bg-violet-soft text-violet"
                    }`}
                  >
                    {badge}
                  </span>
                </div>
                <p className="text-[0.68rem] text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WireBrowser({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-plum/8 bg-surface px-3 py-2">
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-plum/15" />
        <span className="size-1.5 rounded-full bg-plum/15" />
        <span className="size-1.5 rounded-full bg-plum/15" />
      </div>
      <div className="min-w-0 flex-1 rounded bg-plum/6 px-2 py-0.5 text-center">
        <span className="font-mono text-[0.52rem] text-muted">{path}</span>
      </div>
    </div>
  )
}

function WireCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.1rem] border border-plum/10 bg-white shadow-dashboard">
      {children}
    </div>
  )
}

const milestoneFlow: { label: string; desc: string; card: ReactNode }[] = [
  {
    label: "Site engineer logs the milestone",
    desc: "Suresh marks Slab Cast complete on-site. No phone calls, no paper forms.",
    card: (
      <WireCard>
        <WireBrowser path="milestone.plotfolio.ai / green-acres" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Green Acres · Phase 2</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">LIVE</span>
        </div>
        <div className="p-4">
          <p className="text-[0.58rem] font-bold uppercase tracking-wider text-violet">Stage update</p>
          <div className="mt-2 rounded-xl border border-plum/8 p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-sm font-semibold text-plum">Slab Cast</p>
                <p className="text-[0.58rem] text-muted">Block A · Foundation level</p>
              </div>
              <span className="flex size-5 items-center justify-center rounded-full bg-lime text-[0.6rem] font-bold text-plum">✓</span>
            </div>
            <div className="mt-2">
              <span className="text-[0.58rem] text-muted">Suresh M · Site Engineer · Today 14:32</span>
            </div>
          </div>
          <div className="mt-2 rounded-xl bg-surface p-2.5">
            <div className="mb-1 flex justify-between text-[0.58rem]">
              <span className="text-muted">Project progress</span>
              <span className="font-semibold text-plum">7 / 10 stages</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-plum/8">
              <div className="h-full w-[70%] rounded-full bg-violet" />
            </div>
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="flex-1 rounded-lg bg-violet py-1.5 text-center text-[0.58rem] font-semibold text-white">Add proof</div>
            <div className="flex-1 rounded-lg border border-plum/10 py-1.5 text-center text-[0.58rem] font-semibold text-plum">Notify PM</div>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Proof submitted automatically",
    desc: "The site photo sent via WhatsApp is auto-imported. No manual upload needed.",
    card: (
      <WireCard>
        <WireBrowser path="milestone.plotfolio.ai / proof-submission" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Proof · Slab Cast</span>
          <span className="rounded-full bg-violet-soft px-2 py-0.5 text-[0.52rem] font-bold text-violet">Pending review</span>
        </div>
        <div className="p-4">
          <div className="rounded-xl border border-plum/8 bg-surface p-3">
            <div className="flex items-center gap-2">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-plum/6 text-base">📷</div>
              <div>
                <p className="text-xs font-semibold text-plum">slab_cast_blkA.jpg</p>
                <p className="text-[0.58rem] text-muted">Auto-imported from WhatsApp · 14:33</p>
              </div>
            </div>
          </div>
          <div className="mt-2 rounded-xl border border-plum/8 bg-surface p-3">
            <div className="flex items-center gap-2">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-plum/6 text-base">📷</div>
              <div>
                <p className="text-xs font-semibold text-plum">slab_cast_blkA_2.jpg</p>
                <p className="text-[0.58rem] text-muted">Auto-imported from WhatsApp · 14:35</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-violet-soft px-3 py-2">
            <span className="text-[0.58rem] font-semibold text-violet">Sent to PM for review</span>
            <span className="text-[0.58rem] text-violet/60">Just now</span>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Project manager approves in one click",
    desc: "Rajesh reviews the proof and milestone details, then approves without leaving the app.",
    card: (
      <WireCard>
        <WireBrowser path="milestone.plotfolio.ai / pm-review / WO-482" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">PM Review</span>
          <span className="text-[0.58rem] font-semibold text-plum">Rajesh K</span>
        </div>
        <div className="p-4">
          <p className="text-[0.58rem] text-muted">Milestone · Green Acres · Slab Cast</p>
          <div className="mt-2 space-y-1.5">
            {["Proof verified (2 photos)", "Stage matches schedule", "No open punch items"].map((item) => (
              <div className="flex items-center gap-2 rounded-lg bg-lime-soft px-3 py-1.5" key={item}>
                <span className="text-[0.6rem] font-bold text-olive">✓</span>
                <span className="text-[0.58rem] font-medium text-plum">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-1.5">
            <div className="flex-1 rounded-lg bg-lime py-2 text-center text-[0.6rem] font-bold text-plum">Approve milestone</div>
            <div className="flex-1 rounded-lg border border-plum/10 py-2 text-center text-[0.6rem] font-semibold text-muted">Request more info</div>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Architect certifies and uploads",
    desc: "Inspection is scheduled in-app. The completion certificate goes straight into the milestone record.",
    card: (
      <WireCard>
        <WireBrowser path="milestone.plotfolio.ai / certification / slab-cast" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Architect Certification</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">Uploaded</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between rounded-xl bg-surface p-3">
            <span className="text-[0.58rem] text-muted">Inspection date</span>
            <span className="text-[0.58rem] font-semibold text-plum">Thu 24 Oct · 10:00 AM</span>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-plum/8 p-3">
            <div className="grid size-8 place-items-center rounded-lg bg-violet-soft text-sm">📄</div>
            <div>
              <p className="text-xs font-semibold text-plum">completion_cert_A3.pdf</p>
              <p className="text-[0.58rem] text-muted">Uploaded by Arch. Menon · Today</p>
            </div>
            <span className="ml-auto text-[0.6rem] font-bold text-violet">✓</span>
          </div>
          <div className="mt-3 flex items-center justify-center rounded-xl bg-lime py-2.5">
            <span className="text-[0.65rem] font-bold text-plum">Milestone UNLOCKED — Demand letter ready</span>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Demand letter auto-generated and sent",
    desc: "The moment the milestone is certified, Milestone generates the letter and sends it via email and WhatsApp.",
    card: (
      <WireCard>
        <WireBrowser path="milestone.plotfolio.ai / demand-letter / DL-1204" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Demand Letter · DL-1204</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">Sent</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            ["Buyer", "Sharma Family · Unit 4B"],
            ["Milestone", "Foundation Complete"],
            ["Amount due", "₹24,60,000"],
            ["Due date", "15 Nov 2024"],
          ].map(([label, value]) => (
            <div className="flex items-center justify-between border-b border-plum/6 pb-1.5" key={label}>
              <span className="text-[0.58rem] text-muted">{label}</span>
              <span className="text-[0.58rem] font-semibold text-plum">{value}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[0.52rem] font-bold text-keeper">Email ✓</span>
            <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[0.52rem] font-bold text-keeper">WhatsApp ✓</span>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Buyer pays — bank disbursal tracked",
    desc: "Payment is logged the moment it arrives. If a loan is involved, Milestone tracks the bank query and disbursal too.",
    card: (
      <WireCard>
        <WireBrowser path="milestone.plotfolio.ai / payments / unit-4B" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Payment Received</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">Confirmed</span>
        </div>
        <div className="p-4">
          <div className="rounded-xl bg-plum p-4 text-white">
            <p className="text-[0.58rem] text-white/50">Amount received</p>
            <p className="mt-1 font-display text-2xl font-semibold text-lime">₹24,60,000</p>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[0.58rem]">
              <div><span className="text-white/45">Mode</span><br /><span className="font-semibold">NEFT</span></div>
              <div><span className="text-white/45">Ref</span><br /><span className="font-semibold">TXN9283742</span></div>
              <div><span className="text-white/45">Date</span><br /><span className="font-semibold">12 Nov 2024</span></div>
              <div><span className="text-white/45">Receipt</span><br /><span className="font-semibold text-lime">Auto-issued ✓</span></div>
            </div>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Owner sees the full collection picture",
    desc: "Every payment, every outstanding balance, every buyer's status — in one dashboard updated in real time.",
    card: (
      <WireCard>
        <WireBrowser path="milestone.plotfolio.ai / dashboard" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Collection Overview · Nov 2024</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">9/10 on track</span>
        </div>
        <div className="p-4 space-y-2.5">
          {[
            ["Billed", "₹4.1 Cr", "83%", "bg-violet"],
            ["Collected", "₹3.6 Cr", "73%", "bg-keeper"],
            ["Outstanding", "₹50 L", "10%", "bg-coral"],
          ].map(([label, amount, pct, color]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-[0.58rem]">
                <span className="text-muted">{label}</span>
                <span className="font-semibold text-plum">{amount}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-plum/8">
                <div className={`h-full rounded-full ${color}`} style={{ width: pct }} />
              </div>
            </div>
          ))}
          <div className="mt-1 rounded-xl bg-surface px-3 py-2 text-[0.58rem] text-muted">
            Next milestone payment due in <span className="font-semibold text-plum">3 days</span>
          </div>
        </div>
      </WireCard>
    ),
  },
]

const keeperFlow: { label: string; desc: string; card: ReactNode }[] = [
  {
    label: "Tenant reports an issue",
    desc: "Priya submits from the resident portal. The request lands in Keeper instantly with location and asset context.",
    card: (
      <WireCard>
        <WireBrowser path="keeper.plotfolio.ai / issues / new" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Issue Logged</span>
          <span className="rounded-full bg-coral/15 px-2 py-0.5 text-[0.52rem] font-bold text-coral">High priority</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            ["Property", "Skyview Residences · Tower B"],
            ["Unit", "Floor 4 · Unit 12C"],
            ["Asset", "AC Unit — main split"],
            ["Issue", "No cooling since yesterday"],
            ["Reported by", "Priya S · Resident portal · 09:14"],
          ].map(([label, value]) => (
            <div className="flex items-start justify-between border-b border-plum/6 pb-1.5" key={label}>
              <span className="text-[0.58rem] text-muted">{label}</span>
              <span className="max-w-[55%] text-right text-[0.58rem] font-semibold text-plum">{value}</span>
            </div>
          ))}
        </div>
      </WireCard>
    ),
  },
  {
    label: "Supervisor creates a work order with asset history",
    desc: "The asset is tagged, the full service history is visible, and Ravi is assigned in under a minute.",
    card: (
      <WireCard>
        <WireBrowser path="keeper.plotfolio.ai / work-orders / WO-4821" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">WO-4821 · AC Unit</span>
          <span className="rounded-full bg-violet-soft px-2 py-0.5 text-[0.52rem] font-bold text-violet">Assigned</span>
        </div>
        <div className="p-4">
          <div className="rounded-xl bg-surface p-3 space-y-1.5">
            {[
              ["Asset", "AC-TowerB-F4 · Split unit"],
              ["Prior services", "2 · Last: 3 months ago"],
              ["Warranty", "Valid until Mar 2025"],
              ["Assigned to", "Ravi K · Technician"],
            ].map(([label, value]) => (
              <div className="flex justify-between text-[0.58rem]" key={label}>
                <span className="text-muted">{label}</span>
                <span className="font-semibold text-plum">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-xl border border-keeper/20 bg-mint-soft px-3 py-2">
            <span className="text-[0.6rem] font-bold text-keeper">Service manual attached ✓</span>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Technician diagnoses on-site — with full history",
    desc: "Ravi arrives with the WO on his phone, the asset's full history, and the service manual. No guesswork.",
    card: (
      <WireCard>
        <WireBrowser path="keeper.plotfolio.ai / mobile / WO-4821" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">On-site · WO-4821</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">In progress</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="rounded-xl bg-plum p-3 text-white">
            <p className="text-[0.58rem] text-white/45">Asset</p>
            <p className="font-display text-sm font-semibold">AC Unit · Tower B Fl 4</p>
            <p className="mt-2 text-[0.58rem] text-white/45">Diagnosis</p>
            <p className="text-[0.6rem] text-white/80">Low refrigerant — same as last service</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[["Parts in stock", "✓ R-22 gas"], ["Manual", "✓ Attached"], ["Photos", "3 taken"], ["Est. fix", "1 hr"]].map(([l, v]) => (
              <div className="rounded-lg bg-surface p-2" key={l}>
                <p className="text-[0.52rem] text-muted">{l}</p>
                <p className="text-[0.6rem] font-semibold text-plum">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Job closed out on-site — instantly in the record",
    desc: "Ravi closes the WO from his phone. Notes, photos, and time are captured before he leaves the building.",
    card: (
      <WireCard>
        <WireBrowser path="keeper.plotfolio.ai / mobile / WO-4821 / close" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Close-out · WO-4821</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">Closed</span>
        </div>
        <div className="p-4">
          <div className="rounded-xl border border-plum/8 p-3 space-y-1.5">
            {[
              ["Resolution", "Refrigerant recharged"],
              ["Parts used", "R-22 gas · 500g"],
              ["Labour time", "2 hrs 15 min"],
              ["Closed by", "Ravi K · Today 11:28"],
            ].map(([l, v]) => (
              <div className="flex justify-between border-b border-plum/6 pb-1.5 text-[0.58rem]" key={l}>
                <span className="text-muted">{l}</span>
                <span className="font-semibold text-plum">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-lime py-2 px-3">
            <span className="text-[0.6rem] font-bold text-plum">Asset record updated</span>
            <span className="text-[0.6rem] font-bold text-plum">Cost posted ✓</span>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Vendor invoice auto-matched to the work order",
    desc: "CoolTech's invoice arrives and Keeper matches it to WO-4821 automatically. FM approves in one click.",
    card: (
      <WireCard>
        <WireBrowser path="keeper.plotfolio.ai / invoices / INV-8821" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Invoice · CoolTech Services</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">Matched</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            ["Invoice no.", "INV-8821"],
            ["Vendor", "CoolTech Services"],
            ["Amount", "₹8,400"],
            ["Linked WO", "WO-4821 · AC Unit"],
            ["PO match", "✓ Matched to PO-2391"],
          ].map(([l, v]) => (
            <div className="flex justify-between border-b border-plum/6 pb-1.5 text-[0.58rem]" key={l}>
              <span className="text-muted">{l}</span>
              <span className={`font-semibold ${v.startsWith("✓") ? "text-keeper" : "text-plum"}`}>{v}</span>
            </div>
          ))}
          <div className="flex gap-1.5 pt-1">
            <div className="flex-1 rounded-lg bg-keeper py-1.5 text-center text-[0.58rem] font-bold text-white">Approve payment</div>
            <div className="flex-1 rounded-lg border border-plum/10 py-1.5 text-center text-[0.58rem] font-semibold text-muted">Dispute</div>
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Cost posted to the asset — full lifetime record",
    desc: "Every rupee spent on this AC unit is in the record. Keeper builds a cost history that informs every future decision.",
    card: (
      <WireCard>
        <WireBrowser path="keeper.plotfolio.ai / assets / AC-TowerB-F4" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Asset · AC Unit · Tower B Fl 4</span>
          <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[0.52rem] font-bold text-keeper">Healthy</span>
        </div>
        <div className="p-4">
          <div className="rounded-xl bg-surface p-3 space-y-1.5">
            {[
              ["Installed", "Jan 2022"],
              ["Warranty", "Valid until Mar 2025"],
              ["Today's cost", "₹8,400 (recharged)"],
              ["Lifetime cost", "₹24,200 total"],
              ["Services", "3 logged · next due Apr 2025"],
            ].map(([l, v]) => (
              <div className="flex justify-between text-[0.58rem]" key={l}>
                <span className="text-muted">{l}</span>
                <span className="font-semibold text-plum">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-xl bg-mint-soft px-3 py-2 text-[0.58rem] font-semibold text-keeper">
            Replacement threshold not yet reached
          </div>
        </div>
      </WireCard>
    ),
  },
  {
    label: "Manager sees live portfolio health",
    desc: "Open work orders, spend vs budget, repeat failures — all live. No Excel exports, no waiting for month-end.",
    card: (
      <WireCard>
        <WireBrowser path="keeper.plotfolio.ai / dashboard" />
        <div className="flex items-center justify-between border-b border-plum/8 px-4 py-2">
          <span className="font-display text-xs font-semibold text-plum">Portfolio Health</span>
          <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[0.52rem] font-bold text-olive">99.1% uptime</span>
        </div>
        <div className="p-4 space-y-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {[["Open WOs", "3"], ["Closed / wk", "12"], ["Assets due PM", "2"]].map(([l, v]) => (
              <div className="rounded-xl bg-surface p-2 text-center" key={l}>
                <p className="font-display text-lg font-semibold text-keeper">{v}</p>
                <p className="text-[0.52rem] text-muted leading-tight mt-0.5">{l}</p>
              </div>
            ))}
          </div>
          {[
            ["Spend", "₹2.1 L", "70%", "bg-violet"],
            ["Budget", "₹3 L", "100%", "bg-plum/15"],
          ].map(([l, amt, pct, color]) => (
            <div key={l}>
              <div className="mb-1 flex justify-between text-[0.58rem]">
                <span className="text-muted">{l}</span>
                <span className="font-semibold text-plum">{amt}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-plum/8">
                <div className={`h-full rounded-full ${color}`} style={{ width: pct }} />
              </div>
            </div>
          ))}
        </div>
      </WireCard>
    ),
  },
]

const pipelineData = {
  milestone: [
    {
      num: "01",
      icon: <img src="/images/icons/land-and-plots.svg" alt="" className="size-5" />,
      title: "Plan",
      body: "Define project phases, upload approvals and set payment schedules. Your whole team works from the same source of truth before a brick is laid.",
      tools: [
        { src: "/images/milestone-integration/google-maps.svg", name: "Google Maps" },
        { src: "/images/milestone-integration/google-sheets.svg", name: "Google Sheets" },
      ],
    },
    {
      num: "02",
      icon: <img src="/images/icons/site-progress.svg" alt="" className="size-5" />,
      title: "Track progress",
      body: "Mark construction stages complete, attach site photos and push instant updates to every buyer. Milestone logs every change with a timestamp.",
      tools: [
        { src: "/images/milestone-integration/whatsapp.svg", name: "WhatsApp" },
        { src: "/images/milestone-integration/openai.svg", name: "OpenAI" },
      ],
    },
    {
      num: "03",
      icon: <img src="/images/icons/payments.svg" alt="" className="size-5" />,
      title: "Collect payments",
      body: "Demand letters are auto-generated the moment a stage is signed off. Track receipts, flag overdues and reconcile against your bank all in one place.",
      tools: [
        { src: "/images/milestone-integration/razorpay.svg", name: "Razorpay" },
        { src: "/images/milestone-integration/hdfc-bank.svg", name: "HDFC Bank" },
      ],
    },
  ],
  keeper: [
    {
      num: "01",
      icon: <img src="/images/icons/handover.svg" alt="" className="size-5" />,
      title: "Receive handover",
      body: "Every document, asset register and cost record passes from Milestone automatically. Keeper starts with the full property history from day one.",
      tools: [
        { src: "/images/milestone-integration/google-drive.svg", name: "Google Drive" },
        { src: "/images/milestone-integration/microsoft-sharepoint.svg", name: "SharePoint" },
      ],
    },
    {
      num: "02",
      icon: <img src="/images/icons/work-orders.svg" alt="" className="size-5" />,
      title: "Maintain assets",
      body: "Residents raise issues, vendors pick them up and the full service history of every gate, pump and lift is always a click away.",
      tools: [
        { src: "/images/milestone-integration/whatsapp.svg", name: "WhatsApp" },
        { src: "/images/milestone-integration/sendgrid.svg", name: "SendGrid" },
      ],
    },
    {
      num: "03",
      icon: <img src="/images/icons/assets.svg" alt="" className="size-5" />,
      title: "Report & improve",
      body: "Uptime, resolution times and cost per asset across your entire portfolio. Spot which properties need attention before residents have to ask.",
      tools: [
        { src: "/images/milestone-integration/power-bi.svg", name: "Power BI" },
        { src: "/images/milestone-integration/microsoft-excel.svg", name: "Excel" },
      ],
    },
  ],
}

type CallStatus = "idle" | "connecting" | "active" | "ending"

function VapiCallButton() {
  const vapiRef = useRef<Vapi | null>(null)
  const [status, setStatus] = useState<CallStatus>("idle")
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!VAPI_PUBLIC_KEY) return
    const vapi = new Vapi(VAPI_PUBLIC_KEY)
    vapiRef.current = vapi

    vapi.on("call-start", () => setStatus("active"))
    vapi.on("call-end", () => { setStatus("idle"); setIsMuted(false) })
    vapi.on("error", () => setStatus("idle"))

    return () => { vapi.stop() }
  }, [])

  const startCall = () => {
    if (!VAPI_PUBLIC_KEY || !VAPI_ASSISTANT_ID) return
    setStatus("connecting")
    vapiRef.current?.start(VAPI_ASSISTANT_ID)
  }

  const endCall = () => {
    setStatus("ending")
    vapiRef.current?.stop()
  }

  const toggleMute = () => {
    vapiRef.current?.setMuted(!isMuted)
    setIsMuted((m) => !m)
  }

  if (status === "active") {
    return (
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
          onClick={toggleMute}
          type="button"
        >
          {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          className="flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          onClick={endCall}
          type="button"
        >
          <PhoneOff className="size-4" />
          End call
        </button>
        <span className="flex items-center gap-1.5 text-xs text-white/50">
          <span className="size-1.5 rounded-full bg-lime animate-pulse" />
          Live
        </span>
      </div>
    )
  }

  if (status === "connecting" || status === "ending") {
    return (
      <button
        className="flex cursor-wait items-center gap-2 rounded-full bg-lime/70 px-6 py-3 text-sm font-semibold text-plum"
        disabled
        type="button"
      >
        <span className="size-2 animate-ping rounded-full bg-plum/50" />
        {status === "connecting" ? "Connecting…" : "Ending…"}
      </button>
    )
  }

  return (
    <button
      className="flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-plum transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={!VAPI_PUBLIC_KEY || !VAPI_ASSISTANT_ID}
      onClick={startCall}
      title={!VAPI_PUBLIC_KEY ? "Add NEXT_PUBLIC_VAPI_PUBLIC_KEY and NEXT_PUBLIC_VAPI_ASSISTANT_ID to .env.local" : undefined}
      type="button"
    >
      <Mic className="size-4" />
      Talk to us
    </button>
  )
}

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<"milestone" | "keeper">(
    "milestone",
  )
  const [activePipeline, setActivePipeline] = useState<"milestone" | "keeper">(
    "milestone",
  )
  const [flowStep, setFlowStep] = useState(0)
  const [earlyAccessEmail, setEarlyAccessEmail] = useState("")
  const [earlyAccessSubmitted, setEarlyAccessSubmitted] = useState(false)
  const product = suiteData[activeProduct]

  useEffect(() => { setFlowStep(0) }, [activePipeline])

  useEffect(() => {
    const flow = activePipeline === "milestone" ? milestoneFlow : keeperFlow
    const t = setInterval(() => setFlowStep(s => (s + 1) % flow.length), 4200)
    return () => clearInterval(t)
  }, [activePipeline])

  const scrollToSuite = () =>
    document.getElementById("suite")?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen overflow-hidden bg-canvas text-ink">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted lg:flex">
          <a className="transition hover:text-plum" href="#suite">Products</a>
          <a className="transition hover:text-plum" href="#workflow">How it works</a>
          <a className="transition hover:text-plum" href="#stories">Pricing</a>
          <a className="transition hover:text-plum" href="#company">Contact</a>
        </nav>
        <Button onClick={scrollToSuite}>Demo</Button>
      </header>

      <main className="flex flex-col gap-6 md:gap-10">
        <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10">
            <Kicker>For developers, builders, and property teams</Kicker>
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.97] tracking-[-0.045em] text-plum sm:text-6xl lg:text-7xl">
              From the first brick
              <br />
              <span className="text-violet">to the last work order.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted md:text-lg">
              Selling plots, building villas, or running a warehouse park?
              Plotfolio AI keeps your team, your buyers, and your numbers on the
              same page, so you spend less time chasing and more time
              building.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => document.getElementById("company")?.scrollIntoView({ behavior: "smooth" })}>Tell us about your project</Button>
              <Button
                tone="ghost"
                onClick={() =>
                  document
                    .getElementById("workflow")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See how it works
              </Button>
            </div>
            <div className="mt-7 flex items-center gap-3 text-xs text-muted">
              <div className="flex -space-x-1.5">
                {["bg-violet", "bg-lime", "bg-keeper", "bg-coral"].map(
                  (color) => (
                    <span
                      className={`size-6 rounded-full border-2 border-canvas ${color}`}
                      key={color}
                    />
                  ),
                )}
              </div>
              <span>Trusted across 300+ properties</span>
            </div>
          </div>
          <HeroDashboard />
          <div className="pointer-events-none absolute -right-56 top-0 size-[34rem] rounded-full bg-violet-soft/65 blur-3xl" />
        </section>


        <section className="border-b border-plum/8 bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <p className="mb-10 text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">
              Works for every property type
            </p>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { src: "/images/icons/plotfolio-ai-apartments.svg", label: "Apartments" },
                { src: "/images/icons/plotfolio-ai-villas-and-homes.svg", label: "Villas & Homes" },
                { src: "/images/icons/plotfolio-ai-commercial.svg", label: "Commercial" },
                { src: "/images/icons/plotfolio-ai-warehouses.svg", label: "Warehouses & Plots" },
              ].map(({ src, label }) => (
                <div className="flex flex-col items-center gap-4" key={label}>
                  <img src={src} alt={label} className="size-24" />
                  <p className="text-sm font-semibold text-plum">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32"
          id="suite"
        >
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <Kicker>The Plotfolio suite</Kicker>
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-plum md:text-5xl">
                We stay with you from the first survey to the hundredth tenant.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">
              Real estate is a long game. Plotfolio AI is built to walk every
              step of it with you. Two focused products, one shared property
              record.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <button
              className={`group rounded-[2rem] p-6 text-left transition-all md:p-8 ${
                activeProduct === "milestone"
                  ? "bg-lime text-plum shadow-soft"
                  : "border border-plum/10 bg-white text-plum hover:border-violet/40"
              }`}
              onClick={() => setActiveProduct("milestone")}
              type="button"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-2xl font-semibold">
                  Milestone
                </span>
                <img src="/images/logos/milestone-app-icon.svg" alt="Milestone" className="size-10 rounded-2xl" />
              </div>
              <p className="mt-14 max-w-sm text-sm leading-6 text-plum/70">
                Track construction progress, send payment requests, and keep
                buyers happy without awkward calls.
              </p>
            </button>
            <button
              className={`group rounded-[2rem] p-6 text-left transition-all md:p-8 ${
                activeProduct === "keeper"
                  ? "bg-mint text-plum shadow-soft"
                  : "border border-plum/10 bg-white text-plum hover:border-keeper/40"
              }`}
              onClick={() => setActiveProduct("keeper")}
              type="button"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-2xl font-semibold">
                  Keeper
                </span>
                <img src="/images/logos/keeper-app-icon.svg" alt="Keeper" className="size-10 rounded-2xl" />
              </div>
              <p className="mt-14 max-w-sm text-sm leading-6 text-plum/70">
                Look after every gate, pump, lift, and shed. Know what
                each property really costs.
              </p>
            </button>
          </div>

          <div className="mt-5 grid items-center gap-10 rounded-[2.5rem] bg-plum p-6 text-white md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-14">
            <div>
              <img
                src={`/images/logos/${activeProduct}-logo-on-tint.svg`}
                alt={activeProduct === "keeper" ? "Keeper" : "Milestone"}
                className="mb-5 h-16 w-auto"
              />
              <p
                className={`font-script text-xl ${
                  activeProduct === "keeper" ? "text-mint" : "text-lime"
                }`}
              >
                {product.eyebrow}
              </p>
              <h3 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-5xl">
                {product.title}
              </h3>
              <p className="mt-5 max-w-lg leading-7 text-white/60">
                {product.body}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {product.stats.map(([value, label]) => (
                  <div className="border-t border-white/15 pt-4" key={label}>
                    <p
                      className={`font-display text-xl font-semibold md:text-2xl ${
                        activeProduct === "keeper" ? "text-mint" : "text-lime"
                      }`}
                    >
                      {value}
                    </p>
                    <p className="mt-1 text-[0.65rem] leading-4 text-white/45">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {(activeProduct === "milestone" ? [
                  { src: "/images/icons/milestone-site-progress.svg", label: "Site progress" },
                  { src: "/images/icons/milestone-payments.svg", label: "Payments" },
                  { src: "/images/icons/milestone-demand-letter.svg", label: "Demand letters" },
                  { src: "/images/icons/milestone-whatsapp-updates.svg", label: "WhatsApp updates" },
                  { src: "/images/icons/milestone-land-and-plots.svg", label: "Land & plots" },
                ] : [
                  { src: "/images/icons/keeper-assets.svg", label: "Asset register" },
                  { src: "/images/icons/keeper-work-orders.svg", label: "Work orders" },
                  { src: "/images/icons/keeper-alerts.svg", label: "Alerts" },
                  { src: "/images/icons/keeper-audit-ready.svg", label: "Audit-ready" },
                  { src: "/images/icons/keeper-qr-asset-tags.svg", label: "QR asset tags" },
                ]).map(({ src, label }) => (
                  <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5" key={label}>
                    <img src={src} alt="" className="size-3.5" />
                    <span className="text-[0.68rem] font-medium text-white/70">{label}</span>
                  </div>
                ))}
              </div>

              {/* Works with — integration brand logos */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-white/30">Works with</p>
                <div className="flex flex-wrap gap-2">
                  {(activeProduct === "milestone" ? [
                    { src: "/images/milestone-integration/whatsapp.svg", name: "WhatsApp" },
                    { src: "/images/milestone-integration/razorpay.svg", name: "Razorpay" },
                    { src: "/images/milestone-integration/google-maps.svg", name: "Google Maps" },
                    { src: "/images/milestone-integration/hdfc-bank.svg", name: "HDFC" },
                    { src: "/images/milestone-integration/icici-bank.svg", name: "ICICI" },
                    { src: "/images/milestone-integration/openai.svg", name: "OpenAI" },
                    { src: "/images/milestone-integration/sendgrid.svg", name: "SendGrid" },
                    { src: "/images/milestone-integration/amazon-ses.svg", name: "Amazon SES" },
                  ] : [
                    { src: "/images/milestone-integration/aws.svg", name: "AWS" },
                    { src: "/images/milestone-integration/oracle.svg", name: "Oracle" },
                    { src: "/images/milestone-integration/power-bi.svg", name: "Power BI" },
                    { src: "/images/milestone-integration/microsoft-azure.svg", name: "Azure" },
                    { src: "/images/milestone-integration/google-drive.svg", name: "Google Drive" },
                    { src: "/images/milestone-integration/microsoft-sharepoint.svg", name: "SharePoint" },
                    { src: "/images/milestone-integration/microsoft-excel.svg", name: "Excel" },
                    { src: "/images/milestone-integration/google-cloud.svg", name: "Google Cloud" },
                  ]).map(({ src, name }) => (
                    <div
                      className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-2.5 py-1.5 transition-all duration-200 hover:border-white/25 hover:bg-white/12"
                      key={name}
                      title={name}
                    >
                      <img src={src} alt={name} className="size-4 opacity-70 transition group-hover:opacity-100" />
                      <span className="text-[0.62rem] font-medium text-white/45 transition group-hover:text-white/70">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ProductPreview product={activeProduct} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32" id="workflow">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <Kicker mint>How it works</Kicker>
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-plum md:text-5xl">
                One pipeline, from the first brick to the last work order.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">
              Milestone handles everything while you build. Keeper takes over
              the moment you hand the keys. Together they keep the full
              property record in one place.
            </p>
          </div>

          {/* Product selector */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <button
              className={`rounded-[2rem] p-6 text-left transition-all md:p-8 ${
                activePipeline === "milestone"
                  ? "bg-lime text-plum shadow-soft"
                  : "border border-plum/10 bg-white text-plum hover:border-violet/40"
              }`}
              onClick={() => setActivePipeline("milestone")}
              type="button"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-2xl font-semibold">Milestone</span>
                <img src="/images/logos/milestone-app-icon.svg" alt="Milestone" className="size-10 rounded-2xl" />
              </div>
              <p className="mt-14 max-w-sm text-sm leading-6 text-plum/70">
                Plan your project, track every stage and collect payments the
                moment a milestone is signed off.
              </p>
            </button>
            <button
              className={`rounded-[2rem] p-6 text-left transition-all md:p-8 ${
                activePipeline === "keeper"
                  ? "bg-mint text-plum shadow-soft"
                  : "border border-plum/10 bg-white text-plum hover:border-keeper/40"
              }`}
              onClick={() => setActivePipeline("keeper")}
              type="button"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-2xl font-semibold">Keeper</span>
                <img src="/images/logos/keeper-app-icon.svg" alt="Keeper" className="size-10 rounded-2xl" />
              </div>
              <p className="mt-14 max-w-sm text-sm leading-6 text-plum/70">
                Receive the full handover record, manage every asset and report
                across your entire portfolio.
              </p>
            </button>
          </div>

          {/* Pipeline steps */}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {pipelineData[activePipeline].map((step) => (
              <div className="flex flex-col rounded-[1.5rem] border border-plum/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft" key={step.num}>
                <div className={`mb-4 flex size-10 items-center justify-center rounded-xl ${activePipeline === "keeper" ? "bg-mint-soft" : "bg-lime-soft"}`}>
                  {step.icon}
                </div>
                <p className={`mb-1 text-[0.6rem] font-bold uppercase tracking-wider ${activePipeline === "keeper" ? "text-keeper" : "text-violet"}`}>
                  Step {step.num}
                </p>
                <p className="font-display text-base font-semibold text-plum">{step.title}</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{step.body}</p>
                {step.tools && (
                  <div className="mt-4 flex items-center gap-2 border-t border-plum/8 pt-4">
                    <span className="text-[0.58rem] font-medium uppercase tracking-wider text-muted/60">via</span>
                    {step.tools.map(({ src, name }) => (
                      <div className="flex items-center gap-1 rounded-full border border-plum/8 bg-surface px-2 py-1" key={name} title={name}>
                        <img src={src} alt={name} className="size-3.5" />
                        <span className="text-[0.58rem] font-medium text-plum/50">{name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Animated wireframe player */}
          {(() => {
            const flow = activePipeline === "milestone" ? milestoneFlow : keeperFlow
            const accent = activePipeline === "keeper" ? "text-mint" : "text-lime"
            const accentBg = activePipeline === "keeper" ? "bg-mint" : "bg-lime"
            const accentDot = activePipeline === "keeper" ? "bg-mint" : "bg-lime"
            const step = flow[flowStep]
            return (
              <div className="mt-5 rounded-[2.5rem] bg-plum p-6 text-white md:p-10 lg:p-14">
                <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
                  {/* Step list — desktop sidebar */}
                  <div className="hidden lg:block">
                    <p className={`mb-5 font-script text-xl ${accent}`}>
                      {activePipeline === "keeper" ? "Run & care" : "Build & sell"}
                    </p>
                    <div className="relative space-y-1">
                      <div className="absolute left-[6px] top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
                      {flow.map((s, i) => (
                        <button
                          className={`relative flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors ${
                            i === flowStep ? "bg-white/8" : "hover:bg-white/5"
                          }`}
                          key={i}
                          onClick={() => setFlowStep(i)}
                          type="button"
                        >
                          <span
                            className={`relative z-10 mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border ${
                              i === flowStep
                                ? `${accentBg} border-transparent`
                                : i < flowStep
                                  ? "border-white/30 bg-white/20"
                                  : "border-white/15 bg-transparent"
                            }`}
                          />
                          <span
                            className={`text-[0.65rem] leading-4 ${
                              i === flowStep ? "font-semibold text-white" : "text-white/40"
                            }`}
                          >
                            {s.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wireframe card + label */}
                  <div>
                    {/* Mobile step pills */}
                    <div className="mb-6 flex flex-wrap gap-1.5 lg:hidden">
                      {flow.map((_, i) => (
                        <button
                          className={`h-1.5 rounded-full transition-all ${
                            i === flowStep ? `w-8 ${accentBg}` : "w-1.5 bg-white/20"
                          }`}
                          key={i}
                          onClick={() => setFlowStep(i)}
                          type="button"
                        />
                      ))}
                    </div>

                    {/* Wireframe card */}
                    <div className="card-enter" key={`${activePipeline}-${flowStep}`}>
                      <div className="max-w-sm">{step.card}</div>
                    </div>

                    {/* Step label + description */}
                    <div className="mt-6">
                      <p className={`text-[0.6rem] font-bold uppercase tracking-[0.16em] ${accent}`}>
                        Step {flowStep + 1} of {flow.length}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold leading-snug text-white">
                        {step.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/55">{step.desc}</p>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6 h-px w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`step-progress h-full rounded-full ${accentDot}`}
                        key={`${activePipeline}-${flowStep}-bar`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </section>


        {/* ── Integrations & Tools ─────────────────────────────────── */}
        <section className="overflow-hidden bg-surface py-24" id="integrations">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="mb-14 text-center">
              <Kicker>Integrations & Tools</Kicker>
              <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-plum md:text-5xl">
                Built to connect with every tool your team already uses.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
                From Indian banking rails to global cloud infrastructure — Plotfolio AI slots in without replacing what already works.
              </p>
            </div>
          </div>

          {/* Two-row infinite marquee */}
          <div className="space-y-3">
            {/* Row 1 — scrolls left */}
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee-track">
                {[
                  { src: "/images/milestone-integration/whatsapp.svg", name: "WhatsApp" },
                  { src: "/images/milestone-integration/razorpay.svg", name: "Razorpay" },
                  { src: "/images/milestone-integration/google-maps.svg", name: "Google Maps" },
                  { src: "/images/milestone-integration/openai.svg", name: "OpenAI" },
                  { src: "/images/milestone-integration/hdfc-bank.svg", name: "HDFC Bank" },
                  { src: "/images/milestone-integration/icici-bank.svg", name: "ICICI Bank" },
                  { src: "/images/milestone-integration/aws.svg", name: "AWS" },
                  { src: "/images/milestone-integration/sendgrid.svg", name: "SendGrid" },
                  { src: "/images/milestone-integration/power-bi.svg", name: "Power BI" },
                  { src: "/images/milestone-integration/google-sheets.svg", name: "Google Sheets" },
                  /* duplicate for seamless loop */
                  { src: "/images/milestone-integration/whatsapp.svg", name: "WhatsApp-2" },
                  { src: "/images/milestone-integration/razorpay.svg", name: "Razorpay-2" },
                  { src: "/images/milestone-integration/google-maps.svg", name: "Google Maps-2" },
                  { src: "/images/milestone-integration/openai.svg", name: "OpenAI-2" },
                  { src: "/images/milestone-integration/hdfc-bank.svg", name: "HDFC Bank-2" },
                  { src: "/images/milestone-integration/icici-bank.svg", name: "ICICI Bank-2" },
                  { src: "/images/milestone-integration/aws.svg", name: "AWS-2" },
                  { src: "/images/milestone-integration/sendgrid.svg", name: "SendGrid-2" },
                  { src: "/images/milestone-integration/power-bi.svg", name: "Power BI-2" },
                  { src: "/images/milestone-integration/google-sheets.svg", name: "Google Sheets-2" },
                ].map(({ src, name }) => (
                  <div
                    className="mx-2 flex shrink-0 items-center gap-2.5 rounded-2xl border border-plum/8 bg-white px-5 py-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-violet/20 hover:shadow-md"
                    key={name}
                  >
                    <img src={src} alt={name.replace(/-\d$/, "")} className="size-6" />
                    <span className="whitespace-nowrap text-sm font-medium text-plum/65">{name.replace(/-\d$/, "")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee-track-reverse">
                {[
                  { src: "/images/milestone-integration/microsoft-azure.svg", name: "Microsoft Azure" },
                  { src: "/images/milestone-integration/oracle.svg", name: "Oracle" },
                  { src: "/images/milestone-integration/google-cloud.svg", name: "Google Cloud" },
                  { src: "/images/milestone-integration/microsoft-excel.svg", name: "Microsoft Excel" },
                  { src: "/images/milestone-integration/meta.svg", name: "Meta" },
                  { src: "/images/milestone-integration/amazon-ses.svg", name: "Amazon SES" },
                  { src: "/images/milestone-integration/axis-bank.svg", name: "Axis Bank" },
                  { src: "/images/milestone-integration/microsoft-sharepoint.svg", name: "SharePoint" },
                  { src: "/images/milestone-integration/google-drive.svg", name: "Google Drive" },
                  { src: "/images/milestone-integration/resend.svg", name: "Resend" },
                  /* duplicate for seamless loop */
                  { src: "/images/milestone-integration/microsoft-azure.svg", name: "Microsoft Azure-2" },
                  { src: "/images/milestone-integration/oracle.svg", name: "Oracle-2" },
                  { src: "/images/milestone-integration/google-cloud.svg", name: "Google Cloud-2" },
                  { src: "/images/milestone-integration/microsoft-excel.svg", name: "Microsoft Excel-2" },
                  { src: "/images/milestone-integration/meta.svg", name: "Meta-2" },
                  { src: "/images/milestone-integration/amazon-ses.svg", name: "Amazon SES-2" },
                  { src: "/images/milestone-integration/axis-bank.svg", name: "Axis Bank-2" },
                  { src: "/images/milestone-integration/microsoft-sharepoint.svg", name: "SharePoint-2" },
                  { src: "/images/milestone-integration/google-drive.svg", name: "Google Drive-2" },
                  { src: "/images/milestone-integration/resend.svg", name: "Resend-2" },
                ].map(({ src, name }) => (
                  <div
                    className="mx-2 flex shrink-0 items-center gap-2.5 rounded-2xl border border-plum/8 bg-white px-5 py-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-keeper/20 hover:shadow-md"
                    key={name}
                  >
                    <img src={src} alt={name.replace(/-\d$/, "")} className="size-6" />
                    <span className="whitespace-nowrap text-sm font-medium text-plum/65">{name.replace(/-\d$/, "")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="mx-auto mt-16 max-w-7xl px-5 md:px-10">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  accent: "bg-lime-soft text-olive",
                  kicker: "Payments & Banking",
                  title: "Collect faster with Indian rails.",
                  body: "UPI, NEFT, RTGS, and bank-linked demand letters — connected directly to HDFC, ICICI, Axis and Razorpay so collections arrive and reconcile automatically.",
                  logos: [
                    { src: "/images/milestone-integration/razorpay.svg", name: "Razorpay" },
                    { src: "/images/milestone-integration/hdfc-bank.svg", name: "HDFC Bank" },
                    { src: "/images/milestone-integration/icici-bank.svg", name: "ICICI Bank" },
                    { src: "/images/milestone-integration/axis-bank.svg", name: "Axis Bank" },
                  ],
                },
                {
                  accent: "bg-mint-soft text-keeper",
                  kicker: "Communication & AI",
                  title: "Updates through channels buyers open.",
                  body: "Send milestone notifications, demand letters and work-order status over WhatsApp, email, and SMS. OpenAI powers OCR, transcription and smart document parsing.",
                  logos: [
                    { src: "/images/milestone-integration/whatsapp.svg", name: "WhatsApp" },
                    { src: "/images/milestone-integration/sendgrid.svg", name: "SendGrid" },
                    { src: "/images/milestone-integration/amazon-ses.svg", name: "Amazon SES" },
                    { src: "/images/milestone-integration/openai.svg", name: "OpenAI" },
                    { src: "/images/milestone-integration/meta.svg", name: "Meta" },
                    { src: "/images/milestone-integration/resend.svg", name: "Resend" },
                  ],
                },
                {
                  accent: "bg-violet-soft text-violet",
                  kicker: "Cloud & Enterprise",
                  title: "Your data, your infrastructure.",
                  body: "Export to Excel, sync to SharePoint, push to Power BI or keep everything in Google Drive. Run on AWS, Azure, GCP or Oracle Cloud — your call.",
                  logos: [
                    { src: "/images/milestone-integration/aws.svg", name: "AWS" },
                    { src: "/images/milestone-integration/microsoft-azure.svg", name: "Azure" },
                    { src: "/images/milestone-integration/google-cloud.svg", name: "Google Cloud" },
                    { src: "/images/milestone-integration/oracle.svg", name: "Oracle" },
                    { src: "/images/milestone-integration/power-bi.svg", name: "Power BI" },
                    { src: "/images/milestone-integration/microsoft-excel.svg", name: "Excel" },
                    { src: "/images/milestone-integration/microsoft-sharepoint.svg", name: "SharePoint" },
                    { src: "/images/milestone-integration/google-drive.svg", name: "Drive" },
                    { src: "/images/milestone-integration/google-sheets.svg", name: "Sheets" },
                    { src: "/images/milestone-integration/google-maps.svg", name: "Maps" },
                  ],
                },
              ].map(({ accent, kicker, title, body, logos }) => (
                <div
                  className="fade-up flex flex-col rounded-[2rem] border border-plum/8 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                  key={kicker}
                >
                  <span className={`inline-flex w-fit rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider ${accent}`}>
                    {kicker}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-plum">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">{body}</p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-plum/8 pt-5">
                    {logos.map(({ src, name }) => (
                      <div
                        className="group flex items-center gap-1.5 rounded-full border border-plum/8 bg-surface px-2.5 py-1.5 transition-all duration-200 hover:border-plum/20 hover:bg-white"
                        key={name}
                      >
                        <img src={src} alt={name} className="size-4 opacity-60 transition group-hover:opacity-100" />
                        <span className="text-[0.62rem] font-medium text-plum/50 transition group-hover:text-plum/80">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32"
          id="stories"
        >
          <div className="mb-12 grid items-end gap-8 lg:grid-cols-2">
            <div>
              <Kicker>Pricing</Kicker>
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-plum md:text-5xl">
                Simple plans, no surprises.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">
              Start free for 15 days, then pay only for what you need. Milestone and Keeper are priced separately so you're never paying for tools you don't use.
            </p>
          </div>

          {/* Pricing cards — preview/locked */}
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Starter */}
            <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-plum/10 bg-white p-8 transition-transform duration-200 hover:-translate-y-1 md:p-10">
              <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-muted">
                <span className="size-1.5 animate-pulse rounded-full bg-violet" />
                Coming soon
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src="/images/logos/milestone-app-icon.svg" alt="Milestone" className="size-5 rounded-md" />
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-olive">Milestone · Starter</p>
                </div>
                <p className="mt-2 font-display text-3xl font-semibold text-plum">Free Trial</p>
              </div>
              <div className="mt-6 border-t border-plum/8 pt-6">
                <div className="flex items-end gap-2">
                  <p className="font-display text-5xl font-semibold text-plum">₹0</p>
                  <p className="mb-1.5 text-sm text-muted">for 15 days</p>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-surface px-4 py-2.5">
                  <span className="text-[0.65rem] text-muted">Then</span>
                  <span className="font-display text-lg font-semibold text-plum">₹1,499</span>
                  <span className="text-[0.65rem] text-muted">/ month</span>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {["1 active project", "Up to 50 buyer records", "Milestone tracking & proof upload", "Auto demand letter generation"].map((item) => (
                  <li className="flex items-start gap-2.5 text-sm" key={item}>
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-lime-soft text-[0.55rem] font-bold text-olive">✓</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-plum/8 pt-5">
                <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-wider text-muted">Integrations included</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { cat: "Messaging", name: "WhatsApp Business" },
                    { cat: "Messaging", name: "SMS & email fallback" },
                    { cat: "Payments", name: "Payment links (UPI)" },
                    { cat: "AI", name: "OCR" },
                    { cat: "Location", name: "Maps & geofencing" },
                  ].map(({ cat, name }) => (
                    <span className="flex items-center gap-1 rounded-full border border-plum/10 bg-surface px-2.5 py-1 text-[0.65rem] text-plum/70" key={name}>
                      <span className="font-semibold text-violet">{cat}</span>
                      <span className="text-plum/40">·</span>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full cursor-not-allowed rounded-full border border-plum/15 py-3 text-sm font-semibold text-muted" disabled type="button">
                  Available at launch
                </button>
              </div>
            </div>

            {/* Pro */}
            <div className="relative flex flex-col overflow-hidden rounded-[2rem] bg-plum p-8 ring-2 ring-lime ring-offset-2 ring-offset-canvas transition-transform duration-200 hover:-translate-y-1 md:p-10 lg:-my-4 lg:rounded-[2.25rem] lg:shadow-dashboard">
              <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-lime">
                <span className="size-1.5 animate-pulse rounded-full bg-lime" />
                Coming soon
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src="/images/logos/milestone-app-icon.svg" alt="Milestone" className="size-5 rounded-md" />
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-lime">Milestone · Pro</p>
                </div>
                <p className="mt-2 font-display text-3xl font-semibold text-white">Growth</p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex items-end gap-2">
                  <p className="font-display text-5xl font-semibold text-lime">₹4,999</p>
                  <p className="mb-1.5 text-sm text-white/50">/ project / month</p>
                </div>
                <p className="mt-2 text-[0.68rem] text-white/35">Unlimited buyers · All Milestone features</p>
              </div>
              <ul className="mt-6 space-y-3">
                {["Everything in Free Trial", "Unlimited projects & buyers", "Architect certification workflow", "Bank disbursal tracking", "Payment reconciliation", "Team roles and permissions"].map((item) => (
                  <li className="flex items-start gap-2.5 text-sm" key={item}>
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-lime text-[0.55rem] font-bold text-plum">✓</span>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-wider text-white/40">Integrations included</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { cat: "AI", name: "Speech-to-text" },
                    { cat: "Accounting", name: "Tally sync" },
                    { cat: "Payments", name: "Virtual accounts" },
                    { cat: "Tax", name: "GST & e-invoicing" },
                    { cat: "Documents", name: "eSign & e-stamping" },
                    { cat: "KYC", name: "Buyer KYC" },
                    { cat: "Banking", name: "Connected banking" },
                  ].map(({ cat, name }) => (
                    <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[0.65rem] text-white/60" key={name}>
                      <span className="font-semibold text-lime">{cat}</span>
                      <span className="text-white/25">·</span>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full cursor-not-allowed rounded-full border border-white/20 py-3 text-sm font-semibold text-white/50" disabled type="button">
                  Available at launch
                </button>
              </div>
            </div>

            {/* Suite */}
            <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-plum/10 bg-white p-8 transition-transform duration-200 hover:-translate-y-1 md:p-10">
              <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-muted">
                <span className="size-1.5 animate-pulse rounded-full bg-keeper" />
                Coming soon
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <img src="/images/logos/milestone-app-icon.svg" alt="Milestone" className="size-5 rounded-md" />
                  <span className="text-[0.6rem] font-bold text-muted/50">+</span>
                  <img src="/images/logos/keeper-app-icon.svg" alt="Keeper" className="size-5 rounded-md" />
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-keeper">Milestone + Keeper</p>
                </div>
                <p className="mt-2 font-display text-3xl font-semibold text-plum">Suite</p>
              </div>
              <div className="mt-6 border-t border-plum/8 pt-6">
                <div className="flex items-end gap-2">
                  <p className="font-display text-4xl font-semibold text-plum">₹9,999</p>
                  <p className="mb-1 text-sm text-muted">/ month</p>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-surface px-4 py-2.5">
                  <span className="text-[0.65rem] text-muted">Enterprise pricing available</span>
                  <span className="ml-auto text-[0.65rem] font-semibold text-keeper">Talk to us →</span>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {["Everything in Growth", "Keeper facility management", "Full handover & asset automation", "Dedicated onboarding team", "SLA-backed uptime guarantee"].map((item) => (
                  <li className="flex items-start gap-2.5 text-sm" key={item}>
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-mint-soft text-[0.55rem] font-bold text-keeper">✓</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-plum/8 pt-5">
                <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-wider text-muted">Integrations included</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { cat: "HR", name: "Payroll & labour" },
                    { cat: "Sales", name: "CRM" },
                    { cat: "Sales", name: "Property portals" },
                    { cat: "Planning", name: "Project schedules" },
                    { cat: "Finance", name: "Embedded finance" },
                    { cat: "Procurement", name: "Material marketplace" },
                    { cat: "Lending", name: "Home-loan tracking" },
                    { cat: "Reporting", name: "BI export" },
                  ].map(({ cat, name }) => (
                    <span className="flex items-center gap-1 rounded-full border border-plum/10 bg-surface px-2.5 py-1 text-[0.65rem] text-plum/70" key={name}>
                      <span className="font-semibold text-keeper">{cat}</span>
                      <span className="text-plum/40">·</span>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full cursor-not-allowed rounded-full border border-plum/15 py-3 text-sm font-semibold text-muted" disabled type="button">
                  Available at launch
                </button>
              </div>
            </div>
          </div>

          {/* Not integrable note */}
          <p className="mt-5 text-center text-xs text-muted">
            Buyer TDS (Form 26QB) and RERA portal submissions require manual handling — these cannot be automated via API.
          </p>

          {/* Early access bar */}
          <div className="mt-8 overflow-hidden rounded-[2rem] bg-plum px-8 py-8 md:px-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-semibold text-white">Get early access pricing.</p>
                <p className="mt-1 text-sm text-white/50">Be first in line when we launch.</p>
              </div>
              {earlyAccessSubmitted ? (
                <div className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-lime/25 bg-lime/10 px-5 py-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-[0.55rem] font-bold text-plum">✓</span>
                  <p className="text-sm font-semibold text-white">You're on the list!</p>
                </div>
              ) : (
                <form
                  className="flex w-full max-w-sm flex-col gap-2.5 sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (earlyAccessEmail) setEarlyAccessSubmitted(true)
                  }}
                >
                  <input
                    className="flex-1 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm text-white placeholder-white/35 outline-none transition focus:border-lime/50 focus:bg-white/12"
                    onChange={(e) => setEarlyAccessEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    type="email"
                    value={earlyAccessEmail}
                  />
                  <button
                    className="shrink-0 rounded-full bg-lime px-6 py-2.5 text-sm font-semibold text-plum transition hover:-translate-y-0.5"
                    type="submit"
                  >
                    Notify me
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="bg-plum" id="company">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-script text-xl text-lime">Ready when you are</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-5xl">
                Tell us about your project. We'll listen first.
              </h2>
            </div>
            <VapiCallButton />
          </div>
          <footer className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/10 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
            <Logo inverse />
            <p className="text-xs text-white/40">
              © 2025 Plotfolio AI.
            </p>
          </footer>
        </section>
      </main>
    </div>
  )
}
