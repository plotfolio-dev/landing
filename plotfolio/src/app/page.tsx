"use client";

import { useState } from "react";

// Brand tokens
// Ink     #121826  text · dark surfaces
// Green   #12805C  primary · actions
// Lime    #B8F25C  AI moments · ≤5%
// Mint    #E3F5EC  tints · highlights
// Paper   #F7F7F2  canvas
// Slate   #5E6672  secondary text

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="bg-[#F7F7F2] text-[#121826] font-(family-name:--font-geist-sans) overflow-x-hidden">

      {/* ── Nav ── frosted glass */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#F7F7F2]/85 backdrop-blur-xl border-b border-[#121826]/6">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight text-[#121826]">
            Plotfolio<span className="text-[#12805C]"> AI</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-medium text-[#12805C] bg-[#E3F5EC] px-3 py-1 rounded-full">
              Coming Soon
            </span>
            <a
              href="#waitlist"
              className="bg-[#12805C] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full hover:bg-[#0e6b4e] active:scale-95 transition-all duration-150"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-14 bg-white">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-[#12805C] mb-5">
          Introducing Plotfolio AI
        </p>
        <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#121826] max-w-4xl mb-7">
          AI software for every stage of a{" "}
          <span className="bg-gradient-to-r from-[#12805C] to-[#1aab7a] bg-clip-text text-transparent">
            building&apos;s life.
          </span>
        </h1>
        <p className="text-[1.1rem] text-[#5E6672] max-w-xl leading-relaxed mb-10">
          From breaking ground to daily operations — Plotfolio AI captures
          messy field updates and turns them into money and decisions for
          owners.
        </p>

        <div id="waitlist" className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          {submitted ? (
            <div className="w-full bg-[#E3F5EC] text-[#12805C] font-semibold py-3.5 px-6 rounded-full text-center text-[15px]">
              You&apos;re on the list — we&apos;ll be in touch.
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 border border-[#121826]/10 bg-white rounded-full px-5 py-3.5 text-[14px] placeholder:text-[#aaa] focus:outline-none focus:border-[#12805C] focus:ring-3 focus:ring-[#12805C]/15 transition-all"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#12805C] text-white text-[14px] font-semibold px-6 py-3.5 rounded-full hover:bg-[#0e6b4e] active:scale-95 transition-all duration-150 whitespace-nowrap shadow-lg shadow-[#12805C]/25"
              >
                Notify Me
              </button>
            </>
          )}
        </div>

        <div className="mt-20 flex flex-col items-center gap-1 text-[#ccc] text-xs font-medium select-none">
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          Scroll
        </div>
      </section>

      {/* ── Product: Milestone ── dark / Ink surface */}
      <section className="bg-[#121826] text-white py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#12805C] text-[13px] font-semibold tracking-widest uppercase mb-4">
              Milestone
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] mb-6">
              Turn progress into{" "}
              <span className="text-[#12805C]">payments.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-8 max-w-md">
              Builders capture field updates the way they already work — a
              photo, a voice note, a quick message. Milestone ties each update
              to a payment milestone and unlocks the invoice automatically.
            </p>
            <ul className="space-y-3">
              {[
                "Progress-triggered payment releases",
                "Field-to-invoice in minutes",
                "Real-time visibility for owners",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-white/85">
                  <span className="w-5 h-5 rounded-full bg-[#12805C]/25 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#12805C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="inline-block mt-8 text-xs font-semibold text-[#12805C] bg-[#12805C]/12 px-3 py-1.5 rounded-full border border-[#12805C]/25">
              Coming Soon
            </span>
          </div>

          {/* Mock UI */}
          <div className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#12805C]/12 via-[#1a2235] to-[#121826] border border-white/6 flex flex-col items-center justify-center gap-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#12805C_0%,transparent_65%)] opacity-18" />
            <div className="relative z-10 w-64 bg-white/8 backdrop-blur rounded-2xl border border-white/10 p-5 text-left shadow-2xl">
              <p className="text-[11px] text-[#5E6672] mb-1 font-medium uppercase tracking-wide">Milestone 3 of 5</p>
              <p className="text-white font-bold text-lg mb-3">Foundation Complete</p>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                <div className="h-full w-3/5 bg-[#12805C] rounded-full" />
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#5E6672]">Progress</span>
                <span className="text-[#12805C] font-semibold">60%</span>
              </div>
            </div>
            <div className="relative z-10 w-52 bg-white/8 backdrop-blur rounded-2xl border border-white/10 p-4 text-left shadow-xl">
              <p className="text-[11px] text-[#5E6672] mb-1">Invoice unlocked</p>
              <p className="text-white font-black text-2xl">$84,500</p>
              {/* Spark Lime — AI moment: auto-processing signal */}
              <p className="text-[#B8F25C] text-[12px] font-semibold mt-1">AI sent automatically ↗</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product: Keeper ── Paper surface */}
      <section className="bg-[#F7F7F2] py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Mock UI */}
          <div className="order-2 md:order-1 relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#E3F5EC] to-[#ddeee6] border border-[#12805C]/10 flex flex-col items-center justify-center gap-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,#12805C_0%,transparent_60%)] opacity-6" />
            <div className="relative z-10 w-64 bg-white rounded-2xl border border-[#121826]/6 p-5 shadow-lg text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-[#f59e0b] rounded-full" />
                <p className="text-[12px] text-[#5E6672] font-medium">Open · HVAC Unit 4B</p>
              </div>
              <p className="text-[#121826] font-bold text-[15px] mb-1">Unusual noise reported</p>
              <p className="text-[#5E6672] text-[12px] leading-relaxed">Dispatched to Mech Team · Est. $320</p>
            </div>
            <div className="relative z-10 w-56 bg-white rounded-2xl border border-[#121826]/6 p-4 shadow-md text-left">
              <p className="text-[11px] text-[#5E6672] mb-1">This month · Maintenance</p>
              <p className="text-[#121826] font-black text-2xl">$4,210</p>
              <p className="text-[#12805C] text-[12px] font-semibold mt-1">↓ 18% vs last month</p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-[#12805C] text-[13px] font-semibold tracking-widest uppercase mb-4">
              Keeper
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#121826] mb-6">
              Keep buildings running.{" "}
              <span className="text-[#12805C]">Cut the chaos.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-8 max-w-md">
              Facility teams log issues the way they talk. Keeper turns every
              complaint, work order, and repair into a structured record — with
              costs tracked, decisions surfaced, and downtime reduced.
            </p>
            <ul className="space-y-3">
              {[
                "AI-powered maintenance dispatch",
                "Per-asset cost tracking",
                "Proactive downtime alerts",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-[#121826]">
                  <span className="w-5 h-5 rounded-full bg-[#E3F5EC] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#12805C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="inline-block mt-8 text-xs font-semibold text-[#12805C] bg-[#E3F5EC] px-3 py-1.5 rounded-full border border-[#12805C]/15">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* ── How it works ── Ink surface */}
      <section className="bg-[#121826] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#12805C] text-[13px] font-semibold tracking-widest uppercase mb-4">How it works</p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-tight tracking-[-0.03em] text-white max-w-2xl mx-auto">
              Built for the way the field actually works.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "Capture",
                desc: "Field teams send a photo, voice memo, or quick text — no forms, no training needed.",
                lime: false,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                ),
              },
              {
                n: "02",
                title: "Structure",
                desc: "AI parses the raw input and maps it to milestones, maintenance tickets, and cost records.",
                lime: true, // AI moment — Spark Lime
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
                ),
              },
              {
                n: "03",
                title: "Act",
                desc: "Owners get clear dashboards, automatic payment releases, and decisions — without digging through emails.",
                lime: false,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
              },
            ].map(({ n, title, desc, lime, icon }) => (
              <div key={n} className="bg-white/4 border border-white/7 rounded-3xl p-8 hover:bg-white/6 transition-colors">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: lime ? "#B8F25C22" : "#12805C22" }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: lime ? "#B8F25C" : "#12805C" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    {icon}
                  </svg>
                </div>
                <div
                  className="text-[11px] font-black tracking-widest mb-2"
                  style={{ color: lime ? "#B8F25C66" : "#12805C66" }}
                >
                  {n}
                </div>
                <h3 className="text-[18px] font-bold text-white mb-2">{title}</h3>
                <p className="text-[14px] text-[#5E6672] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── white */}
      <section className="bg-white py-36 px-6 text-center">
        <p className="text-[#12805C] text-[13px] font-semibold tracking-widest uppercase mb-5">
          Early Access
        </p>
        <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#121826] max-w-2xl mx-auto mb-5">
          Be first when we launch.
        </h2>
        <p className="text-[1rem] text-[#5E6672] max-w-md mx-auto mb-10 leading-relaxed">
          Milestone and Keeper are both coming soon. Join the waitlist and
          we&apos;ll reach out when early access opens.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto"
        >
          {submitted ? (
            <div className="w-full bg-[#E3F5EC] text-[#12805C] font-semibold py-3.5 px-6 rounded-full text-center text-[15px]">
              You&apos;re on the list — we&apos;ll be in touch.
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 border border-[#121826]/10 rounded-full px-5 py-3.5 text-[14px] placeholder:text-[#aaa] focus:outline-none focus:border-[#12805C] focus:ring-3 focus:ring-[#12805C]/15 transition-all"
              />
              <button
                type="submit"
                className="bg-[#12805C] text-white text-[14px] font-semibold px-6 py-3.5 rounded-full hover:bg-[#0e6b4e] active:scale-95 transition-all duration-150 whitespace-nowrap shadow-lg shadow-[#12805C]/25"
              >
                Notify Me
              </button>
            </>
          )}
        </form>
      </section>

      {/* ── Footer ── Paper */}
      <footer className="bg-[#F7F7F2] border-t border-[#121826]/6 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <p className="font-bold text-[15px] text-[#121826] mb-1">
                Plotfolio<span className="text-[#12805C]"> AI</span>
              </p>
              <p className="text-[13px] text-[#5E6672] max-w-xs leading-relaxed">
                AI software for every stage of a building&apos;s life.
              </p>
            </div>
            <div className="flex gap-12 text-[13px]">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#121826] mb-1">Products</p>
                <span className="text-[#5E6672]">Milestone</span>
                <span className="text-[#5E6672]">Keeper</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#121826] mb-1">Company</p>
                <a href="#waitlist" className="text-[#5E6672] hover:text-[#12805C] transition-colors">
                  Early Access
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#121826]/8 text-[12px] text-[#5E6672]">
            &copy; 2025 Plotfolio AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
