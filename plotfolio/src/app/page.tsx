"use client";
import { useState, type ReactNode } from "react"
import { Receipt, Layers, Users, Banknote, Globe, Cpu } from "lucide-react"

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
      <span
        className={`grid size-8 place-items-center rounded-xl ${
          inverse ? "bg-lime" : "bg-violet"
        }`}
      >
        <span
          className={`size-3 rounded-[0.2rem] border-[0.2rem] ${
            inverse ? "border-plum" : "border-white"
          }`}
        />
      </span>
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
    <div
      className={`mb-4 inline-flex rounded-full px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.15em] ${
        mint ? "bg-mint-soft text-keeper" : "bg-violet-soft text-violet"
      }`}
    >
      {children}
    </div>
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
              <div className="mb-4 flex items-center justify-between">
                <span className={`size-2.5 rounded-full ${color}`} />
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

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<"milestone" | "keeper">(
    "milestone",
  )
  const product = suiteData[activeProduct]

  const scrollToSuite = () =>
    document.getElementById("suite")?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen overflow-hidden bg-canvas text-ink">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted lg:flex">
          <a className="transition hover:text-plum" href="#suite">
            Products
          </a>
          <a className="transition hover:text-plum" href="#workflow">
            How it works
          </a>
          <a className="transition hover:text-plum" href="#integrations">
            Integrations
          </a>
          <a className="transition hover:text-plum" href="#stories">
            Customers
          </a>
          <a className="transition hover:text-plum" href="#company">
            Company
          </a>
        </nav>
        <Button onClick={scrollToSuite}>Book a walkthrough</Button>
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
              <Button onClick={scrollToSuite}>Tell us about your project</Button>
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

        <section className="border-y border-plum/8 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 md:grid-cols-4 md:px-10">
            {[
              ["300+", "developers & promoters"],
              ["1,100+", "projects, big and small"],
              ["9 in 10", "buyers pay on time"],
              ["24", "cities across India"],
            ].map(([number, label]) => (
              <div className="px-3 py-10 text-center" key={label}>
                <p className="font-display text-3xl font-semibold text-violet">
                  {number}
                </p>
                <p className="mt-2 text-xs text-muted">{label}</p>
              </div>
            ))}
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
                <span className="grid size-10 place-items-center rounded-full bg-plum text-lg text-lime">
                  01
                </span>
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
                <span className="grid size-10 place-items-center rounded-full bg-plum text-lg text-mint">
                  02
                </span>
              </div>
              <p className="mt-14 max-w-sm text-sm leading-6 text-plum/70">
                Look after every gate, pump, lift, and shed. Know what
                each property really costs.
              </p>
            </button>
          </div>

          <div className="mt-5 grid items-center gap-10 rounded-[2.5rem] bg-plum p-6 text-white md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-14">
            <div>
              <p
                className={`text-xs font-bold uppercase tracking-[0.16em] ${
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
            </div>
            <ProductPreview product={activeProduct} />
          </div>
        </section>

        <section className="bg-white py-24 md:py-32" id="workflow">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Kicker mint>The journey</Kicker>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-plum md:text-5xl">
                Built around the people who make projects happen.
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [
                    "01",
                    "Plan",
                    "Survey data, approvals, and budgets in one place, so everyone starts from the same facts.",
                  ],
                  [
                    "02",
                    "Build & sell",
                    "Share progress, send payment requests, and keep buyers in the loop. No back-and-forth.",
                  ],
                  [
                    "03",
                    "Hand over",
                    "Every asset, document, and cost record passes cleanly from the site team to the facilities team.",
                  ],
                  [
                    "04",
                    "Run & care",
                    "Maintenance, vendors, and resident requests stay organised long after the last unit is sold.",
                  ],
                ].map(([number, title, body], index) => (
                  <div
                    className={`rounded-2xl p-6 ${
                      index === 0
                        ? "bg-lime"
                        : index === 3
                          ? "bg-mint-soft"
                          : "bg-surface"
                    }`}
                    key={number}
                  >
                    <span className="font-display text-sm font-semibold text-violet">
                      {number}
                    </span>
                    <p className="mt-9 font-display text-lg font-semibold text-plum">
                      {title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-plum py-24 text-white md:py-32" id="integrations">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.75fr]">
              <div>
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-lime">
                  Integrations & ecosystem
                </div>
                <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-5xl">
                  Works with the tools your teams already rely on.
                </h2>
              </div>
              <p className="max-w-xl leading-7 text-white/60 lg:justify-self-end">
                Plotfolio AI connects to the software your finance, sales, and
                site teams use every day, giving you one view without
                replacing what works.
              </p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  {
                    icon: <Receipt className="size-5" />,
                    name: "Tally",
                    description: "Accounting & ledger sync",
                    tone: "bg-violet-soft text-violet",
                    wide: false,
                  },
                  {
                    icon: <Layers className="size-5" />,
                    name: "SAP",
                    description: "ERP & project finance",
                    tone: "bg-lime-soft text-olive",
                    wide: false,
                  },
                  {
                    icon: <Users className="size-5" />,
                    name: "Zoho + Salesforce",
                    description: "CRM & buyer journeys",
                    tone: "bg-mint-soft text-keeper",
                    wide: false,
                  },
                  {
                    icon: <Banknote className="size-5" />,
                    name: "Razorpay + banks",
                    description: "Payments & virtual accounts",
                    tone: "bg-white text-plum",
                    wide: false,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ),
                    name: "WhatsApp Business",
                    description: "Automated buyer updates",
                    tone: "bg-mint-soft text-keeper",
                    wide: false,
                  },
                  {
                    icon: <Globe className="size-5" />,
                    name: "Property portals",
                    description: "Inventory & listing sync",
                    tone: "bg-violet-soft text-violet",
                    wide: false,
                  },
                  {
                    icon: <Cpu className="size-5" />,
                    name: "IoT + BMS sensors",
                    description: "Meters, assets & alerts",
                    tone: "bg-lime-soft text-olive",
                    wide: true,
                  },
                ] as const
              ).map(({ icon, name, description, tone, wide }) => (
                <div
                  className={`group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:bg-white/10 ${
                    wide ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                  key={name}
                >
                  <div className={`grid size-11 place-items-center rounded-xl ${tone}`}>
                    {icon}
                  </div>
                  <p className="mt-8 font-display text-base font-semibold">{name}</p>
                  <p className="mt-2 text-sm text-white/50">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem] bg-violet p-7 md:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
                      Plotfolio API
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                      Connect your tools to every property event.
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/70">
                    REST + webhooks
                  </span>
                </div>
                <p className="mt-4 max-w-xl leading-7 text-white/65">
                  Create projects, sync units and assets, trigger payment
                  workflows, or get notified when milestones and work orders
                  change. Build what your team needs on a reliable property
                  record.
                </p>
                <div className="mt-8 rounded-2xl bg-plum p-5 font-mono text-xs leading-6 text-white/60">
                  <p>
                    <span className="text-lime">POST</span>{" "}
                    /v1/projects/green-acres/milestones
                  </p>
                  <p>
                    <span className="text-mint">EVENT</span>{" "}
                    payment.collection_ready
                  </p>
                  <p>
                    <span className="text-violet-soft">WEBHOOK</span>{" "}
                    work_order.resolved
                  </p>
                </div>
                <div className="mt-7">
                  <Button
                    tone="lime"
                    onClick={() =>
                      document
                        .getElementById("company")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore the API
                  </Button>
                </div>
              </div>

              <div className="rounded-[2rem] bg-mint-soft p-7 text-plum md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-keeper">
                  Partner network
                </p>
                <h3 className="mt-3 max-w-lg font-display text-2xl font-semibold md:text-3xl">
                  Work with us to serve your clients better.
                </h3>
                <p className="mt-4 max-w-xl leading-7 text-plum/60">
                  We partner with the people who sell, launch, maintain, and
                  improve real estate, and give them the tools to do it well.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Channel partners", "Bring Plotfolio AI to the developers and promoters you already work with."],
                    ["FM vendors", "Manage SLAs, asset care, and field teams from one view."],
                    ["System integrators", "Connect enterprise systems to a live property record."],
                    ["Proptech builders", "Build specialised tools on top of our API."],
                  ].map(([title, description]) => (
                    <div className="rounded-2xl bg-white/70 p-4" key={title}>
                      <span className="mb-5 block size-2.5 rounded-full bg-keeper" />
                      <p className="font-display text-sm font-semibold">{title}</p>
                      <p className="mt-2 text-xs leading-5 text-plum/55">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-7">
                  <Button
                    onClick={() =>
                      document
                        .getElementById("company")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Become a partner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32"
          id="stories"
        >
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-violet p-8 text-white lg:col-span-2 md:p-12">
              <div className="flex size-12 items-center justify-center rounded-full bg-lime font-display text-xl font-bold text-plum">
                &ldquo;
              </div>
              <blockquote className="mt-16 max-w-3xl font-display text-3xl font-medium leading-tight tracking-[-0.025em] md:text-4xl">
                We sell plots in one town and run a mall in another. For years
                it felt like two different companies. With Plotfolio AI, it
                finally feels like one team.
              </blockquote>
              <div className="mt-10 border-t border-white/15 pt-6">
                <p className="font-semibold">Meera Iyer</p>
                <p className="mt-1 text-sm text-white/55">
                  Founder, Sunfield Realty
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[2rem] bg-lime p-8 text-plum md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em]">
                Made for real people
              </p>
              <div className="py-14">
                <p className="font-display text-6xl font-semibold tracking-tight">
                  42%
                </p>
                <p className="mt-3 max-w-xs leading-6 text-plum/65">
                  faster payment follow-up reported across active projects.
                </p>
              </div>
              <p className="text-sm font-semibold">
                Built for teams on the ground.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-plum" id="company">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime">
                Ready when you are
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-5xl">
                Tell us about your project. We'll listen first.
              </h2>
            </div>
            <Button
              tone="lime"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Book a chat
            </Button>
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
