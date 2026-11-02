import type { ReactNode } from "react"

export function LegalDraft({ title, introduction, sections }: {
  title: string
  introduction: string
  sections: { title: string; body: ReactNode }[]
}) {
  return <main className="mx-auto w-full max-w-3xl px-5 py-12 text-plum md:px-10 md:py-20">
    <a href="/" className="text-sm font-semibold underline underline-offset-4">← Back to Plotfolio AI</a>
    <p className="mt-8 font-script text-2xl text-violet">For review</p>
    <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{title}</h1>
    <aside aria-label="Draft status" className="mt-6 rounded-2xl border border-plum/15 bg-surface p-5 text-sm leading-6">
      <strong>Draft — not an approved or effective policy.</strong> Prepared 2 November 2026. This text is proposed for review by the Plotfolio team and its legal adviser. It does not establish new contractual terms or replace any existing agreement.
    </aside>
    <p className="mt-8 leading-7 text-muted">{introduction}</p>
    <div className="mt-10 space-y-9">{sections.map(section => <section key={section.title}>
      <h2 className="font-display text-xl font-semibold">{section.title}</h2>
      <div className="mt-3 space-y-3 text-base leading-7 text-muted">{section.body}</div>
    </section>)}</div>
    <p className="mt-12 border-t border-plum/15 pt-6 text-sm leading-6 text-muted">Questions or feedback on this draft? <a className="text-plum underline underline-offset-4" href="mailto:hello@plotfolioai.com">hello@plotfolioai.com</a></p>
  </main>
}
