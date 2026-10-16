"use client";

import { useState } from "react";
import Image from "next/image";

// ── Animated logo ─────────────────────────────────────────────────────────────

function PlotfolioLogo({ small = false }: { small?: boolean }) {
  const sz = small ? 28 : 32;
  return (
    <div className={`flex items-center ${small ? "gap-2" : "gap-2.5"}`}>
      <svg width={sz} height={sz} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#3E7BFA"/>
        <polyline
          points="6,24 11,17 16,20 23,10"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"
        />
        <circle cx="6"  cy="24" r="2"   fill="white" opacity="0.45"/>
        <circle cx="11" cy="17" r="2"   fill="white" opacity="0.6"/>
        <circle cx="16" cy="20" r="2"   fill="white" opacity="0.6"/>
        <circle cx="23" cy="10" r="2.5" fill="#FF6B35">
          <animate attributeName="r"       values="2.5;4;2.5" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.5;1"   dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="23" cy="10" r="5" fill="none" stroke="#FF6B35" strokeWidth="1.5">
          <animate attributeName="r"       values="3.5;9;3.5"   dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;0;0.7"   dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <span className={`${small ? "text-[14px]" : "text-[16px]"} font-bold tracking-tight text-[#111]`}>
        Plotfolio<span className="text-[#FF6B35]"> AI</span>
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="bg-[#FBF7F0] text-[#111] font-(family-name:--font-space-grotesk) overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#FBF7F0]/92 backdrop-blur-xl border-b border-[#111]/6">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <PlotfolioLogo/>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-semibold text-[#111] bg-[#FFC93C] px-3 py-1 rounded-full">
              Soon™
            </span>
            <a
              href="#waitlist"
              className="bg-[#3E7BFA] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full hover:bg-[#2960E8] active:scale-95 transition-all duration-150"
            >
              Want In?
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-14 bg-[#FBF7F0] canvas-dots">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-[#3E7BFA] mb-5">
          Plotfolio AI
        </p>
        <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#111] max-w-4xl mb-7">
          AI that works as hard as{" "}
          <span className="bg-gradient-to-r from-[#3E7BFA] to-[#FF6B35] bg-clip-text text-transparent">
            the people on the ground.
          </span>
        </h1>
        <p className="text-[1.1rem] text-[#5E6672] max-w-xl leading-relaxed mb-10">
          Two products. One mission: turn photos, voice notes, and work orders
          into payments, dashboards, and peace of mind. Built for the people
          who run built assets from the ground up.
        </p>
        <div id="waitlist" className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          {submitted ? (
            <div className="w-full bg-[#EBF0FE] text-[#3E7BFA] font-semibold py-3.5 px-6 rounded-full text-center text-[15px]">
              You&apos;re on the list. We&apos;ll be in touch soon.
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 border border-[#111]/10 bg-white rounded-full px-5 py-3.5 text-[14px] placeholder:text-[#aaa] focus:outline-none focus:border-[#3E7BFA] focus:ring-3 focus:ring-[#3E7BFA]/15 transition-all"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#3E7BFA] text-white text-[14px] font-semibold px-6 py-3.5 rounded-full hover:bg-[#2960E8] active:scale-95 transition-all duration-150 whitespace-nowrap shadow-lg shadow-[#3E7BFA]/25"
              >
                Notify Me
              </button>
            </>
          )}
        </div>
        <div className="mt-20 flex flex-col items-center gap-1 text-[#bbb] text-xs font-medium select-none">
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
          Explore
        </div>
      </section>

      {/* ── Product: Milestone ── */}
      <section className="bg-white canvas-dots py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#3E7BFA] text-[13px] font-semibold tracking-widest uppercase mb-4">
              Milestone
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#111] mb-6">
              Log it once.{" "}
              <span className="text-[#3E7BFA]">Get paid automatically.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-8 max-w-md">
              Builders capture progress the way they already work. Milestone
              ties each update to a payment milestone and sends the invoice.
              No paperwork, no reminders, no awkward conversations about money.
            </p>
            <ul className="space-y-3">
              {[
                "Milestone-triggered payment releases",
                "Automated invoicing from field updates",
                "Live progress visibility for every stakeholder",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-[#111]">
                  <span className="w-5 h-5 rounded-full bg-[#EBF0FE] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#3E7BFA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="inline-block mt-8 text-xs font-semibold text-[#3E7BFA] bg-[#EBF0FE] px-3 py-1.5 rounded-full border border-[#3E7BFA]/20">
              Coming Soon
            </span>
          </div>

          {/* Mock UI */}
          <div className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#EBF0FE] via-white to-[#F7C6EE] border-2 border-[#3E7BFA]/10 flex flex-col items-center justify-center gap-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,#3E7BFA_0%,transparent_55%)] opacity-[0.05]"/>
            <div className="relative z-10 w-64 bg-white rounded-2xl border border-[#111]/6 p-5 text-left shadow-lg">
              <p className="text-[11px] text-[#5E6672] mb-1 font-medium uppercase tracking-wide">Milestone 3 of 5</p>
              <p className="text-[#111] font-bold text-lg mb-3">Foundation Complete</p>
              <div className="h-1.5 w-full bg-[#EBF0FE] rounded-full overflow-hidden mb-3">
                <div className="h-full w-3/5 bg-[#3E7BFA] rounded-full"/>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#5E6672]">Progress</span>
                <span className="text-[#3E7BFA] font-semibold">60%</span>
              </div>
            </div>
            <div className="relative z-10 w-52 bg-white rounded-2xl border border-[#111]/6 p-4 text-left shadow-md">
              <p className="text-[11px] text-[#5E6672] mb-1">Invoice unlocked</p>
              <p className="text-[#111] font-black text-2xl">$84,500</p>
              <p className="text-[#FF6B35] text-[12px] font-semibold mt-1">AI released automatically ↗</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── People ── */}
      <section className="bg-[#FDF3FB] canvas-dots py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#FF6B35] text-center mb-3">
            The people who make it happen
          </p>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black leading-tight tracking-[-0.03em] text-[#111] text-center mb-12">
            Built for the professionals who keep assets running and deals closing.
          </h2>
          <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-2 border-[#F7C6EE] shadow-md">
            <Image
              src="/property-people-illustration.svg"
              alt="Maya the developer and Ravi the property supervisor"
              width={1600}
              height={900}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ── Product: Keeper ── */}
      <section className="bg-[#FBF7F0] canvas-dots-paper py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Mock UI */}
          <div className="order-2 md:order-1 relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#F7C6EE] to-[#FFD98F] border-2 border-[#FF6B35]/15 flex flex-col items-center justify-center gap-5 overflow-hidden">
            <div className="relative z-10 w-64 bg-white rounded-2xl border border-[#111]/6 p-5 shadow-lg text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-[#FFC93C] rounded-full"/>
                <p className="text-[12px] text-[#5E6672] font-medium">Open · HVAC Unit 4B</p>
              </div>
              <p className="text-[#111] font-bold text-[15px] mb-1">Abnormal noise: inspection required</p>
              <p className="text-[#5E6672] text-[12px] leading-relaxed">Dispatched to Mech Team · Est. $320</p>
            </div>
            <div className="relative z-10 w-56 bg-white rounded-2xl border border-[#111]/6 p-4 shadow-md text-left">
              <p className="text-[11px] text-[#5E6672] mb-1">This month · Maintenance</p>
              <p className="text-[#111] font-black text-2xl">$4,210</p>
              <p className="text-[#2FA866] text-[12px] font-semibold mt-1">↓ 18% vs prior month</p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-[#FF6B35] text-[13px] font-semibold tracking-widest uppercase mb-4">
              Keeper
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#111] mb-6">
              Every asset. Every issue.{" "}
              <span className="text-[#FF6B35]">All in one place.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-8 max-w-md">
              Facility managers field a constant stream of complaints, work
              orders, and repairs. Keeper turns that noise into structured
              records, dispatches the right people, and gives owners the cost
              visibility they actually need.
            </p>
            <ul className="space-y-3">
              {[
                "AI-powered maintenance dispatch",
                "Per-asset cost tracking across your portfolio",
                "Proactive alerts before issues escalate",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-[#111]">
                  <span className="w-5 h-5 rounded-full bg-[#FFD98F]/50 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="inline-block mt-8 text-xs font-semibold text-[#FF6B35] bg-[#FFD98F]/30 px-3 py-1.5 rounded-full border border-[#FF6B35]/20">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white canvas-dots py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#3E7BFA] text-[13px] font-semibold tracking-widest uppercase mb-4">How it works</p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-tight tracking-[-0.03em] text-[#111] max-w-2xl mx-auto">
              Three steps. Your team barely notices.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {([
              {
                n: "01",
                title: "Capture",
                color: "#FF6B35",
                bg: "#FFD98F40",
                desc: "Field teams send a photo, message, or voice note. No forms, no new apps. Just what they already do.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>,
              },
              {
                n: "02",
                title: "Understand",
                color: "#3E7BFA",
                bg: "#EBF0FE",
                desc: "AI reads the input and creates milestones, work orders, or cost records. The boring part, handled.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/>,
              },
              {
                n: "03",
                title: "Act",
                color: "#2FA866",
                bg: "#2FA86618",
                desc: "Invoices go out. Alerts go up. Dashboards update. Owners see what's happening without asking.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>,
              },
            ] as const).map(({ n, title, desc, color, bg, icon }) => (
              <div key={n} className="bg-[#FBF7F0] rounded-3xl p-8 border-2 border-transparent hover:border-[#111]/6 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6" style={{ background: bg }}>
                  <svg className="w-5 h-5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    {icon}
                  </svg>
                </div>
                <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: color + "88" }}>
                  {n}
                </div>
                <h3 className="text-[18px] font-bold text-[#111] mb-2">{title}</h3>
                <p className="text-[14px] text-[#5E6672] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#FBF7F0] canvas-dots py-36 px-6 text-center">
        <p className="text-[#3E7BFA] text-[13px] font-semibold tracking-widest uppercase mb-5">
          Early Access
        </p>
        <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#111] max-w-2xl mx-auto mb-5">
          Get in before the queue gets long.
        </h2>
        <p className="text-[1rem] text-[#5E6672] max-w-md mx-auto mb-10 leading-relaxed">
          Milestone and Keeper are in active development. Leave your email
          and we will reach out when early access opens.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto"
        >
          {submitted ? (
            <div className="w-full bg-[#EBF0FE] text-[#3E7BFA] font-semibold py-3.5 px-6 rounded-full text-center text-[15px]">
              You&apos;re on the list. We&apos;ll be in touch soon.
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 border border-[#111]/10 bg-white rounded-full px-5 py-3.5 text-[14px] placeholder:text-[#aaa] focus:outline-none focus:border-[#3E7BFA] focus:ring-3 focus:ring-[#3E7BFA]/15 transition-all"
              />
              <button
                type="submit"
                className="bg-[#3E7BFA] text-white text-[14px] font-semibold px-6 py-3.5 rounded-full hover:bg-[#2960E8] active:scale-95 transition-all duration-150 whitespace-nowrap shadow-lg shadow-[#3E7BFA]/25"
              >
                Notify Me
              </button>
            </>
          )}
        </form>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#FBF7F0] border-t border-[#111]/6 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <PlotfolioLogo small/>
              <p className="text-[13px] text-[#5E6672] max-w-xs leading-relaxed mt-2">
                AI software for every stage of a built asset&apos;s life.
              </p>
            </div>
            <div className="flex gap-12 text-[13px]">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#111] mb-1">Products</p>
                <span className="text-[#5E6672]">Milestone</span>
                <span className="text-[#5E6672]">Keeper</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#111] mb-1">Company</p>
                <a href="#waitlist" className="text-[#5E6672] hover:text-[#3E7BFA] transition-colors">
                  Early Access
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#111]/8 text-[12px] text-[#5E6672]">
            &copy; 2025 Plotfolio AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
