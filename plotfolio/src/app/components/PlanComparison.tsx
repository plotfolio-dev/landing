const groups = [
  {
    title: "Plans and limits",
    rows: [
      ["Price", "₹1,499 per month after a 15-day free trial", "₹4,999 per project per month", "₹9,999 per month"],
      ["Products", "Milestone", "Milestone", "Milestone and Keeper"],
      ["Active projects", "1", "Unlimited", "Unlimited"],
      ["Buyer records", "Up to 50", "Unlimited", "Unlimited"],
    ],
  },
  {
    title: "Construction and collections",
    rows: [
      ["Milestone tracking and proof uploads", true, true, true],
      ["Automatic demand letters", true, true, true],
      ["Architect certification workflow", false, true, true],
      ["Bank disbursal tracking", false, true, true],
      ["Payment reconciliation", false, true, true],
      ["Team roles and permissions", false, true, true],
    ],
  },
  {
    title: "Property operations and support",
    rows: [
      ["Keeper facility management", false, false, true],
      ["Handover and asset automation", false, false, true],
      ["Dedicated onboarding team", false, false, true],
      ["Uptime guarantee backed by a service agreement", false, false, true],
    ],
  },
  {
    title: "Integrations",
    rows: [
      ["Messaging, payment links, text recognition and maps", true, true, true],
      ["Speech transcription and accounting sync", false, true, true],
      ["Virtual accounts and connected banking", false, true, true],
      ["Tax invoicing, electronic signatures and identity verification", false, true, true],
      ["Payroll, sales and project scheduling", false, false, true],
      ["Finance, procurement and lending", false, false, true],
      ["Business intelligence export", false, false, true],
    ],
  },
] as const

export function PlanComparison() {
  return (
    <details className="group mt-10 overflow-hidden rounded-[2rem] border border-plum/10 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-plum marker:content-none md:px-8 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block font-display text-xl font-semibold">Compare plans</span>
          <span className="mt-1 block text-sm font-normal text-muted">Find the right fit for your team.</span>
        </span>
        <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-soft text-xl transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="border-t border-plum/10">
        <p className="px-6 py-4 text-xs leading-5 text-muted md:px-8">All plans are coming soon. Features and pricing are previews and remain subject to confirmation at launch.</p>
        <div role="region" aria-label="Plan comparison table. Scroll horizontally to view all plans." tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-violet">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">Compare pricing, limits, features and integrations for Starter, Growth and Suite.</caption>
            <thead>
              <tr className="border-y border-plum/10">
                <th scope="col" className="w-[37%] px-6 py-5 font-semibold text-plum md:pl-8">Feature</th>
                {["Starter", "Growth", "Suite"].map((plan) => (
                  <th scope="col" key={plan} className={`w-[21%] px-4 py-5 font-display text-base font-semibold text-plum ${plan === "Growth" ? "bg-lime-soft" : ""}`}>{plan}</th>
                ))}
              </tr>
            </thead>
            {groups.map(({ title, rows }) => (
              <tbody key={title}>
                <tr className="border-y border-plum/8 bg-surface">
                  <th scope="rowgroup" colSpan={4} className="px-6 py-3 font-semibold text-plum md:pl-8">{title}</th>
                </tr>
                {rows.map(([feature, ...values]) => (
                  <tr key={feature} className="border-b border-plum/8 last:border-b-0">
                    <th scope="row" className="px-6 py-4 font-normal leading-6 text-muted md:pl-8">{feature}</th>
                    {values.map((value, index) => (
                      <td key={index} className={`px-4 py-4 leading-6 text-plum ${index === 1 ? "bg-lime-soft/40" : ""}`}>
                        {typeof value === "boolean" ? (
                          <span className={value ? "font-medium text-keeper" : "text-muted"}>{value ? "Included" : "Not included"}</span>
                        ) : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </details>
  )
}
