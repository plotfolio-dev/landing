"use client";

import { useState } from "react";

// ── Character illustrations ───────────────────────────────────────────────────

function BuilderChar() {
  return (
    <svg viewBox="0 0 120 192" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Hard hat – Spark Lime */}
      <path d="M28 60 Q28 24 60 24 Q92 24 92 60Z" fill="#60a5fa"/>
      <rect x="22" y="58" width="76" height="9" rx="4.5" fill="#4d8ef0"/>
      {/* Head */}
      <circle cx="60" cy="52" r="22" fill="#f5c99a"/>
      {/* Eyes */}
      <circle cx="51" cy="48" r="2.5" fill="#2d1a0e"/>
      <circle cx="69" cy="48" r="2.5" fill="#2d1a0e"/>
      {/* Smile */}
      <path d="M52 57 Q60 64 68 57" stroke="#2d1a0e" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Neck */}
      <rect x="55" y="72" width="10" height="10" rx="2" fill="#f5c99a"/>
      {/* Body – white with Plot Green vest panels */}
      <rect x="34" y="80" width="52" height="56" rx="8" fill="#F7F7F2"/>
      <rect x="34" y="80" width="18" height="56" rx="4" fill="#1a56db" opacity="0.22"/>
      <rect x="68" y="80" width="18" height="56" rx="4" fill="#1a56db" opacity="0.22"/>
      {/* Reflective stripes – Spark Lime */}
      <rect x="34" y="104" width="52" height="5" rx="2.5" fill="#60a5fa" opacity="0.55"/>
      <rect x="34" y="120" width="52" height="5" rx="2.5" fill="#60a5fa" opacity="0.55"/>
      {/* Left arm */}
      <rect x="12" y="82" width="22" height="44" rx="11" fill="#f5c99a"/>
      {/* Phone in left hand – showing progress */}
      <rect x="6" y="118" width="18" height="28" rx="4" fill="#121826"/>
      <rect x="8" y="121" width="14" height="22" rx="2" fill="#1a56db" opacity="0.85"/>
      <rect x="10" y="130" width="10" height="2.5" rx="1.25" fill="#F7F7F2" opacity="0.25"/>
      <rect x="10" y="130" width="7" height="2.5" rx="1.25" fill="#60a5fa"/>
      {/* Right arm */}
      <rect x="86" y="82" width="22" height="40" rx="11" fill="#f5c99a"/>
      <circle cx="97" cy="124" r="9" fill="#f5c99a"/>
      {/* Pants */}
      <rect x="34" y="134" width="23" height="50" rx="5" fill="#5E6672"/>
      <rect x="63" y="134" width="23" height="50" rx="5" fill="#5E6672"/>
      <rect x="57" y="134" width="6" height="8" fill="#5E6672"/>
      {/* Boots */}
      <rect x="28" y="178" width="30" height="16" rx="5" fill="#121826"/>
      <rect x="62" y="178" width="30" height="16" rx="5" fill="#121826"/>
    </svg>
  );
}

function FacilityManagerChar() {
  return (
    <svg viewBox="0 0 120 192" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Head */}
      <circle cx="60" cy="44" r="22" fill="#dba87a"/>
      {/* Hair */}
      <path d="M38 40 Q37 16 60 16 Q83 16 82 40 Q78 30 60 30 Q42 30 38 40Z" fill="#1a0f0a"/>
      {/* Eyes */}
      <circle cx="51" cy="41" r="2.5" fill="#1a0f0a"/>
      <circle cx="69" cy="41" r="2.5" fill="#1a0f0a"/>
      {/* Smile */}
      <path d="M52 52 Q60 58 68 52" stroke="#1a0f0a" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Neck */}
      <rect x="55" y="64" width="10" height="10" rx="2" fill="#dba87a"/>
      {/* Coverall – Ink */}
      <rect x="34" y="72" width="52" height="62" rx="8" fill="#121826"/>
      {/* Zip + chest pocket */}
      <rect x="58" y="72" width="4" height="62" rx="2" fill="#1e2840"/>
      <rect x="62" y="78" width="14" height="16" rx="3" fill="#1e2840"/>
      {/* Belt */}
      <rect x="34" y="122" width="52" height="6" rx="3" fill="#5E6672"/>
      <rect x="55" y="120" width="10" height="10" rx="2" fill="#8a919a"/>
      {/* Left arm */}
      <rect x="12" y="74" width="22" height="46" rx="11" fill="#121826"/>
      {/* Clipboard – Mint */}
      <rect x="4" y="110" width="26" height="34" rx="4" fill="#dbeafe"/>
      <rect x="14" y="106" width="6" height="8" rx="2" fill="#5E6672"/>
      <rect x="8" y="118" width="18" height="2" rx="1" fill="#1a56db" opacity="0.6"/>
      <rect x="8" y="123" width="14" height="2" rx="1" fill="#1a56db" opacity="0.4"/>
      <rect x="8" y="128" width="16" height="2" rx="1" fill="#1a56db" opacity="0.4"/>
      <rect x="8" y="133" width="10" height="2" rx="1" fill="#1a56db" opacity="0.4"/>
      {/* Right arm */}
      <rect x="86" y="74" width="22" height="44" rx="11" fill="#121826"/>
      <circle cx="97" cy="120" r="9" fill="#dba87a"/>
      {/* Wrench in right hand */}
      <rect x="93" y="126" width="5" height="20" rx="2.5" fill="#9aa0a8"/>
      <circle cx="95.5" cy="126" r="5.5" fill="none" stroke="#9aa0a8" strokeWidth="2.5"/>
      <circle cx="95.5" cy="126" r="2" fill="#9aa0a8"/>
      {/* Pants */}
      <rect x="34" y="130" width="23" height="54" rx="5" fill="#1a2235"/>
      <rect x="63" y="130" width="23" height="54" rx="5" fill="#1a2235"/>
      <rect x="57" y="130" width="6" height="8" fill="#1a2235"/>
      {/* Boots */}
      <rect x="28" y="178" width="30" height="16" rx="5" fill="#121826"/>
      <rect x="62" y="178" width="30" height="16" rx="5" fill="#121826"/>
    </svg>
  );
}

// ── Construction material icons ───────────────────────────────────────────────

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="bg-[#F7F7F2] text-[#121826] font-(family-name:--font-geist-sans) overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#F7F7F2]/85 backdrop-blur-xl border-b border-[#121826]/6">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight text-[#121826]">
            Plotfolio<span className="text-[#1a56db]"> AI</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-medium text-[#1a56db] bg-[#dbeafe] px-3 py-1 rounded-full">
              Soon™
            </span>
            <a
              href="#waitlist"
              className="bg-[#1a56db] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full hover:bg-[#1447b8] active:scale-95 transition-all duration-150"
            >
              Want In?
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-14 bg-white">
        <p className="text-[13px] font-semibold tracking-widest uppercase text-[#1a56db] mb-5">
          Plotfolio AI
        </p>
        <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#121826] max-w-4xl mb-7">
          AI software for every stage of a{" "}
          <span className="bg-gradient-to-r from-[#1a56db] to-[#3b82f6] bg-clip-text text-transparent">
            asset&apos;s life.
          </span>
        </h1>
        <p className="text-[1.1rem] text-[#5E6672] max-w-xl leading-relaxed mb-10">
          From the first site visit to the last maintenance call, Plotfolio AI
          turns unstructured field input into revenue, records, and decisions
          that asset owners can actually act on.
        </p>
        <div id="waitlist" className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          {submitted ? (
            <div className="w-full bg-[#dbeafe] text-[#1a56db] font-semibold py-3.5 px-6 rounded-full text-center text-[15px]">
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
                className="flex-1 min-w-0 border border-[#121826]/10 bg-white rounded-full px-5 py-3.5 text-[14px] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a56db] focus:ring-3 focus:ring-[#1a56db]/15 transition-all"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#1a56db] text-white text-[14px] font-semibold px-6 py-3.5 rounded-full hover:bg-[#1447b8] active:scale-95 transition-all duration-150 whitespace-nowrap shadow-lg shadow-[#1a56db]/25"
              >
                Notify Me
              </button>
            </>
          )}
        </div>
        <div className="mt-20 flex flex-col items-center gap-1 text-[#ccc] text-xs font-medium select-none">
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
          Explore
        </div>
      </section>

      {/* ── Product: Milestone ── dark / Ink */}
      <section className="bg-[#121826] text-white py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#1a56db] text-[13px] font-semibold tracking-widest uppercase mb-4">
              Milestone
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] mb-6">
              Progress happens in the field.{" "}
              <span className="text-[#1a56db]">Payments should too.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-8 max-w-md">
              Milestone connects field updates directly to payment milestones.
              Builders log progress the way they already work, and the right
              invoice goes out automatically. No reminders. No paperwork
              archaeology. No awkward calls about money.
            </p>
            <ul className="space-y-3">
              {[
                "Milestone-triggered payment releases",
                "Automated invoicing from field updates",
                "Live progress visibility for every stakeholder",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-white/85">
                  <span className="w-5 h-5 rounded-full bg-[#1a56db]/25 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#1a56db]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="inline-block mt-8 text-xs font-semibold text-[#1a56db] bg-[#1a56db]/12 px-3 py-1.5 rounded-full border border-[#1a56db]/25">
              Coming Soon
            </span>
          </div>

          {/* Mock UI – blueprint grid overlay */}
          <div className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#1a56db]/12 via-[#1a2235] to-[#121826] border border-white/6 flex flex-col items-center justify-center gap-6 overflow-hidden">
            {/* Blueprint grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1a56db" strokeWidth="0.8"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#1a56db_0%,transparent_65%)] opacity-18"/>
            {/* Dashboard card */}
            <div className="relative z-10 w-64 bg-white/8 backdrop-blur rounded-2xl border border-white/10 p-5 text-left shadow-2xl">
              <p className="text-[11px] text-[#5E6672] mb-1 font-medium uppercase tracking-wide">Milestone 3 of 5</p>
              <p className="text-white font-bold text-lg mb-3">Foundation Complete</p>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                <div className="h-full w-3/5 bg-[#1a56db] rounded-full"/>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#5E6672]">Progress</span>
                <span className="text-[#1a56db] font-semibold">60%</span>
              </div>
            </div>
            <div className="relative z-10 w-52 bg-white/8 backdrop-blur rounded-2xl border border-white/10 p-4 text-left shadow-xl">
              <p className="text-[11px] text-[#5E6672] mb-1">Invoice unlocked</p>
              <p className="text-white font-black text-2xl">$84,500</p>
              {/* Spark Lime – AI auto-send moment */}
              <p className="text-[#60a5fa] text-[12px] font-semibold mt-1">AI released automatically ↗</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Characters ── white, between products */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#1a56db] text-center mb-3">
            The people who make it happen
          </p>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black leading-tight tracking-[-0.03em] text-[#121826] text-center mb-14">
            Built for the professionals who run built assets from the ground up.
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Builder */}
            <div className="flex flex-col items-center text-center bg-[#F7F7F2] border border-[#dbeafe] rounded-3xl px-8 pt-10 pb-8">
              <div className="w-36 mb-6 drop-shadow-sm">
                <BuilderChar/>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a56db] mb-2">
                The Builder
              </span>
              <h3 className="text-[18px] font-bold text-[#121826] mb-3">Milestone user</h3>
              <p className="text-[14px] text-[#5E6672] leading-relaxed">
                Runs a crew of 12 across active sites. Spends too much time
                chasing payment approvals and not enough time on the next
                pour. Milestone fixes the second problem first.
              </p>
            </div>
            {/* Facility Manager */}
            <div className="flex flex-col items-center text-center bg-[#F7F7F2] border border-[#dbeafe] rounded-3xl px-8 pt-10 pb-8">
              <div className="w-36 mb-6 drop-shadow-sm">
                <FacilityManagerChar/>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a56db] mb-2">
                The Facility Manager
              </span>
              <h3 className="text-[18px] font-bold text-[#121826] mb-3">Keeper user</h3>
              <p className="text-[14px] text-[#5E6672] leading-relaxed">
                Oversees a portfolio of assets and a near-constant stream of
                maintenance requests. Keeper gives her structured records,
                real cost visibility, and considerably fewer 11pm surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product: Keeper ── Paper bg, with motifs */}
      <section className="bg-[#F7F7F2] py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Illustration panel with Keeper motifs */}
          <div className="order-2 md:order-1 relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe] border border-[#1a56db]/10 flex flex-col items-center justify-center gap-5 overflow-hidden">
            {/* Mock cards */}
            <div className="relative z-10 w-64 bg-white rounded-2xl border border-[#121826]/6 p-5 shadow-lg text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-[#f59e0b] rounded-full"/>
                <p className="text-[12px] text-[#5E6672] font-medium">Open · HVAC Unit 4B</p>
              </div>
              <p className="text-[#121826] font-bold text-[15px] mb-1">Abnormal noise: inspection required</p>
              <p className="text-[#5E6672] text-[12px] leading-relaxed">Dispatched to Mech Team · Est. $320</p>
            </div>
            <div className="relative z-10 w-56 bg-white rounded-2xl border border-[#121826]/6 p-4 shadow-md text-left">
              <p className="text-[11px] text-[#5E6672] mb-1">This month · Maintenance</p>
              <p className="text-[#121826] font-black text-2xl">$4,210</p>
              <p className="text-[#1a56db] text-[12px] font-semibold mt-1">↓ 18% vs prior month ↗</p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-[#1a56db] text-[13px] font-semibold tracking-widest uppercase mb-4">
              Keeper
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#121826] mb-6">
              Every issue, logged.{" "}
              <span className="text-[#1a56db]">Every cost, tracked.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-8 max-w-md">
              Facility teams manage a relentless stream of issues across
              every asset class. Keeper converts voice notes, photos, and
              ad-hoc messages into structured work orders, per-asset cost
              records, and the kind of data owners actually want to see.
            </p>
            <ul className="space-y-3">
              {[
                "AI-powered maintenance dispatch",
                "Per-asset cost tracking across your portfolio",
                "Proactive alerts before issues escalate",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-[#121826]">
                  <span className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#1a56db]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="inline-block mt-8 text-xs font-semibold text-[#1a56db] bg-[#dbeafe] px-3 py-1.5 rounded-full border border-[#1a56db]/15">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* ── How it works ── Ink */}
      <section className="bg-[#121826] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#1a56db] text-[13px] font-semibold tracking-widest uppercase mb-4">How it works</p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-tight tracking-[-0.03em] text-white max-w-2xl mx-auto">
              Three steps. Zero new habits required.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "Capture",
                lime: false,
                desc: "Field teams send a photo, a voice note, or a quick message. No new apps to learn. No forms to fill out.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>,
              },
              {
                n: "02",
                title: "Structure",
                lime: true,
                desc: "AI organises the raw input into milestones, maintenance tickets, and cost records. The tedious part, handled automatically.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/>,
              },
              {
                n: "03",
                title: "Act",
                lime: false,
                desc: "Owners get clean dashboards, payments release on time, and decisions are backed by data instead of email threads.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>,
              },
            ].map(({ n, title, desc, lime, icon }) => (
              <div key={n} className="bg-white/4 border border-white/7 rounded-3xl p-8 hover:bg-white/6 transition-colors">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: lime ? "#60a5fa22" : "#1a56db22" }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: lime ? "#60a5fa" : "#1a56db" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                  >
                    {icon}
                  </svg>
                </div>
                <div
                  className="text-[11px] font-black tracking-widest mb-2"
                  style={{ color: lime ? "#60a5fa66" : "#1a56db66" }}
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

      {/* ── CTA ── */}
      <section className="bg-white py-36 px-6 text-center">
        <p className="text-[#1a56db] text-[13px] font-semibold tracking-widest uppercase mb-5">
          Early Access
        </p>
        <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#121826] max-w-2xl mx-auto mb-5">
          Be the first to know when we launch.
        </h2>
        <p className="text-[1rem] text-[#5E6672] max-w-md mx-auto mb-10 leading-relaxed">
          Milestone and Keeper are in active development. Join the waitlist
          and we will reach out with early access details as soon as they are ready.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto"
        >
          {submitted ? (
            <div className="w-full bg-[#dbeafe] text-[#1a56db] font-semibold py-3.5 px-6 rounded-full text-center text-[15px]">
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
                className="flex-1 min-w-0 border border-[#121826]/10 rounded-full px-5 py-3.5 text-[14px] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a56db] focus:ring-3 focus:ring-[#1a56db]/15 transition-all"
              />
              <button
                type="submit"
                className="bg-[#1a56db] text-white text-[14px] font-semibold px-6 py-3.5 rounded-full hover:bg-[#1447b8] active:scale-95 transition-all duration-150 whitespace-nowrap shadow-lg shadow-[#1a56db]/25"
              >
                Notify Me
              </button>
            </>
          )}
        </form>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#F7F7F2] border-t border-[#121826]/6 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <p className="font-bold text-[15px] text-[#121826] mb-1">
                Plotfolio<span className="text-[#1a56db]"> AI</span>
              </p>
              <p className="text-[13px] text-[#5E6672] max-w-xs leading-relaxed">
                AI software for every stage of a built asset&apos;s life.
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
                <a href="#waitlist" className="text-[#5E6672] hover:text-[#1a56db] transition-colors">
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
