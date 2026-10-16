"use client";
import { useState, useRef, useEffect } from "react";

// ── Trigger wireframe animation when section enters viewport ──────────────────
function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// ── Milestone product wireframe ───────────────────────────────────────────────
function MilestoneWireframe() {
  const [ref, inView] = useInView();
  const c = "#3E7BFA", cL = "#EBF0FE", o = "#FF6B35";
  const W = 340, H = 490;

  return (
    <div ref={ref} className={inView ? "wf-running" : "wf-paused"}>
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="w-full h-auto drop-shadow-xl">
        {/* Phone frame */}
        <rect x="2" y="2" width={W - 4} height={H - 4} rx="26"
          fill="white" stroke={c} strokeWidth="2.5"
          style={{ strokeDasharray: 1700, strokeDashoffset: 1700, animation: "wire-stroke 1.3s ease forwards" }} />

        {/* Status bar */}
        <rect x="2" y="2" width={W - 4} height="54" rx="26" fill={cL} />
        <rect x="2" y="30" width={W - 4} height="26" fill={cL} />
        <rect x={W / 2 - 32} y="14" width="64" height="8" rx="4" fill={c} opacity="0.18" />

        {/* App header title */}
        <rect x={W / 2 - 52} y="21" width="104" height="11" rx="5.5"
          fill={c} opacity="0.28"
          style={{ animation: "wire-fade-in 0.4s ease 0.45s both" }} />

        {/* Project title block */}
        <rect x="20" y="68" width="190" height="12" rx="6"
          fill={c} opacity="0.32"
          style={{ animation: "wire-fade-in 0.4s ease 0.55s both" }} />
        <rect x="20" y="87" width="110" height="9" rx="4.5"
          fill={c} opacity="0.18"
          style={{ animation: "wire-fade-in 0.4s ease 0.6s both" }} />

        {/* Section divider */}
        <line x1="20" y1="110" x2={W - 20} y2="110" stroke={c} strokeWidth="1" opacity="0.18"
          style={{ animation: "wire-fade-in 0.3s ease 0.65s both" }} />

        {/* Milestone row 1 — done */}
        <g style={{ animation: "wire-fade-in 0.35s ease 0.7s both" }}>
          <circle cx="38" cy="132" r="11" fill={cL} stroke={c} strokeWidth="1.5" />
          <polyline points="32,132 36,136 44,128" stroke={c} strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "wire-check 0.35s ease 1.1s forwards" }} />
          <rect x="60" y="126" width="172" height="11" rx="5.5" fill={c} opacity="0.22" />
          <rect x={W - 78} y="126" width="58" height="11" rx="5.5" fill={c} opacity="0.16" />
        </g>

        {/* Milestone row 2 — done */}
        <g style={{ animation: "wire-fade-in 0.35s ease 0.85s both" }}>
          <circle cx="38" cy="168" r="11" fill={cL} stroke={c} strokeWidth="1.5" />
          <polyline points="32,168 36,172 44,164" stroke={c} strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "wire-check 0.35s ease 1.25s forwards" }} />
          <rect x="60" y="162" width="196" height="11" rx="5.5" fill={c} opacity="0.22" />
          <rect x={W - 78} y="162" width="58" height="11" rx="5.5" fill={c} opacity="0.16" />
        </g>

        {/* Milestone row 3 — in progress */}
        <g style={{ animation: "wire-fade-in 0.35s ease 1.0s both" }}>
          <circle cx="38" cy="204" r="11" fill="#FFF0EB" stroke={o} strokeWidth="1.5" />
          <circle cx="38" cy="204" r="4" fill={o}
            style={{ animation: "wire-dot-pulse 1.6s ease-in-out 1.0s infinite" }} />
          <rect x="60" y="198" width="205" height="11" rx="5.5" fill={o} opacity="0.28" />
          <rect x={W - 78} y="198" width="58" height="11" rx="5.5" fill={o} opacity="0.22" />
        </g>

        {/* Milestone row 4 — pending */}
        <g style={{ animation: "wire-fade-in 0.35s ease 1.15s both" }}>
          <circle cx="38" cy="240" r="11" fill="white" stroke={c} strokeWidth="1.5" opacity="0.4" />
          <rect x="60" y="234" width="152" height="11" rx="5.5" fill={c} opacity="0.12" />
          <rect x={W - 78} y="234" width="58" height="11" rx="5.5" fill={c} opacity="0.1" />
        </g>

        {/* Divider */}
        <line x1="20" y1="265" x2={W - 20} y2="265" stroke={c} strokeWidth="1" opacity="0.14"
          style={{ animation: "wire-fade-in 0.3s ease 1.25s both" }} />

        {/* Progress label + track */}
        <g style={{ animation: "wire-fade-in 0.4s ease 1.3s both" }}>
          <rect x="20" y="280" width="72" height="9" rx="4.5" fill={c} opacity="0.22" />
          <rect x={W - 82} y="280" width="62" height="9" rx="4.5" fill={c} opacity="0.32" />
          <rect x="20" y="298" width={W - 40} height="10" rx="5" fill={cL} />
        </g>
        {/* Progress fill */}
        <rect x="20" y="298" width="186" height="10" rx="5" fill={c} opacity="0.72"
          style={{ transformOrigin: "left center", transform: "scaleX(0)", animation: "wire-progress-fill 0.9s ease 1.55s both" }} />

        {/* Invoice card */}
        <g style={{ animation: "wire-slide-up 0.65s cubic-bezier(0.34,1.56,0.64,1) 1.9s both" }}>
          <rect x="14" y="328" width={W - 28} height="150" rx="18"
            fill={cL} stroke={c} strokeWidth="1.5" />
          <rect x="30" y="348" width="136" height="10" rx="5" fill={c} opacity="0.26" />
          <rect x="30" y="367" width="168" height="22" rx="11" fill={c} opacity="0.44" />
          <rect x="30" y="402" width="94" height="10" rx="5" fill={o} opacity="0.45" />
          <rect x={W - 134} y="392" width="110" height="32" rx="16" fill={c} opacity="0.85" />
          <rect x="30" y="432" width="188" height="8" rx="4" fill={c} opacity="0.14" />
          <rect x="30" y="447" width="130" height="8" rx="4" fill={c} opacity="0.1" />
        </g>
      </svg>
    </div>
  );
}

// ── Keeper product wireframe ──────────────────────────────────────────────────
function KeeperWireframe() {
  const [ref, inView] = useInView();
  const c = "#FF6B35", cB = "#3E7BFA", cL = "#FFF4EE", cLB = "#EBF0FE";
  const W = 520, H = 390;
  const barHeights = [52, 72, 44, 80, 62];

  return (
    <div ref={ref} className={inView ? "wf-running" : "wf-paused"}>
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="w-full h-auto drop-shadow-xl">
        {/* Tablet frame */}
        <rect x="2" y="2" width={W - 4} height={H - 4} rx="22"
          fill="white" stroke={cB} strokeWidth="2.5"
          style={{ strokeDasharray: 1900, strokeDashoffset: 1900, animation: "wire-stroke 1.4s ease forwards" }} />

        {/* Header bar */}
        <rect x="2" y="2" width={W - 4} height="46" rx="22" fill={cLB} />
        <rect x="2" y="26" width={W - 4} height="22" fill={cLB} />
        <rect x="18" y="16" width="108" height="13" rx="6.5"
          fill={cB} opacity="0.28"
          style={{ animation: "wire-fade-in 0.4s ease 0.4s both" }} />
        <rect x={W - 148} y="16" width="44" height="13" rx="6.5"
          fill={cB} opacity="0.18"
          style={{ animation: "wire-fade-in 0.4s ease 0.45s both" }} />
        <rect x={W - 96} y="16" width="78" height="13" rx="6.5"
          fill={c} opacity="0.55"
          style={{ animation: "wire-fade-in 0.4s ease 0.5s both" }} />

        {/* 3 metric cards */}
        {[0, 1, 2].map(i => (
          <g key={i} style={{ animation: `wire-fade-in 0.4s ease ${0.55 + i * 0.1}s both` }}>
            <rect x={18 + i * 166} y="60" width="152" height="82" rx="12"
              fill={i === 1 ? cL : cLB}
              stroke={i === 1 ? c : cB}
              strokeWidth="1.2" />
            <rect x={30 + i * 166} y="74" width="84" height="10" rx="5"
              fill={i === 1 ? c : cB} opacity="0.22" />
            <rect x={30 + i * 166} y="93" width="60" height="20" rx="10"
              fill={i === 1 ? c : cB} opacity="0.45" />
            <rect x={30 + i * 166} y="120" width="95" height="9" rx="4.5"
              fill={i === 1 ? c : cB} opacity="0.14" />
          </g>
        ))}

        {/* Alert badge on 2nd card */}
        <circle cx={18 + 166 + 152 - 10} cy="60" r="12" fill={c}
          style={{ animation: "wire-fade-in 0.3s ease 1.5s both, wire-dot-pulse 1.8s ease-in-out 1.5s infinite" }} />

        {/* Work orders label */}
        <rect x="18" y="158" width="84" height="10" rx="5"
          fill={cB} opacity="0.28"
          style={{ animation: "wire-fade-in 0.4s ease 0.85s both" }} />

        {/* Work order rows */}
        {[
          { dot: "#FFC93C", w1: 164, w2: 82 },
          { dot: c,         w1: 196, w2: 70 },
          { dot: "#2FA866", w1: 144, w2: 90 },
          { dot: c,         w1: 178, w2: 78 },
        ].map((row, i) => (
          <g key={i} style={{ animation: `wire-fade-in 0.35s ease ${0.95 + i * 0.1}s both` }}>
            <circle cx="32" cy={178 + i * 31} r="6" fill={row.dot} opacity="0.75" />
            <rect x="48" y={172 + i * 31} width={row.w1} height="10" rx="5" fill={cB} opacity="0.2" />
            <rect x={48 + row.w1 + 12} y={172 + i * 31} width={row.w2} height="10" rx="5" fill={cB} opacity="0.12" />
          </g>
        ))}

        {/* Chart panel */}
        <rect x="362" y="154" width={W - 382} height={H - 174} rx="12"
          fill={cL} stroke={c} strokeWidth="1" opacity="0.6"
          style={{ animation: "wire-fade-in 0.4s ease 0.9s both" }} />
        <rect x="374" y="165" width="84" height="10" rx="5"
          fill={cB} opacity="0.24"
          style={{ animation: "wire-fade-in 0.4s ease 0.95s both" }} />

        {/* Chart baseline */}
        <line x1="372" y1={H - 34} x2={W - 22} y2={H - 34}
          stroke={cB} strokeWidth="1" opacity="0.22"
          style={{ animation: "wire-fade-in 0.3s ease 1.0s both" }} />

        {/* Chart bars */}
        {barHeights.map((h, i) => (
          <rect key={i}
            x={378 + i * 26} y={H - 34 - h} width="18" height={h} rx="5"
            fill={i === 3 ? c : cB}
            opacity={i === 3 ? 0.62 : 0.3}
            style={{
              transformOrigin: `${378 + i * 26 + 9}px ${H - 34}px`,
              transform: "scaleY(0)",
              animation: `wire-bar-rise 0.55s ease ${1.2 + i * 0.08}s both`,
            }} />
        ))}
      </svg>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white text-[#111] font-(family-name:--font-space-grotesk) overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#111]/8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <img src="/images/plotfolio-ai-static-dark-ink.svg" alt="Plotfolio AI" className="h-10 w-auto logo-drop" />
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#5E6672]">
            <a href="#milestone" className="hover:text-[#111] transition-colors">Products</a>
            <a href="#how" className="hover:text-[#111] transition-colors">How it works</a>
            <a href="#waitlist" className="hover:text-[#111] transition-colors">Early access</a>
          </div>
          <a
            href="#waitlist"
            className="bg-[#3E7BFA] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#2960E8] active:scale-95 transition-all"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-16 bg-white canvas-dots">
        <div className="inline-flex items-center gap-2 bg-[#EBF0FE] text-[#3E7BFA] text-[12px] font-semibold px-4 py-1.5 rounded-full mb-8 border border-[#3E7BFA]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3E7BFA] animate-pulse" />
          Now in development · Join the waitlist
        </div>

        <img
          src="/images/plotfolio-ai-static-dark-ink.svg"
          alt="Plotfolio AI"
          className="h-14 w-auto mb-9 logo-drop"
        />

        <h1 className="text-[clamp(2.6rem,7vw,5.8rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#111] max-w-4xl mb-7">
          AI software for every stage<br className="hidden sm:block" />
          of a{" "}
          <span className="bg-gradient-to-r from-[#3E7BFA] to-[#FF6B35] bg-clip-text text-transparent">
            built asset&apos;s life.
          </span>
        </h1>

        <p className="text-[1.1rem] text-[#5E6672] max-w-xl leading-relaxed mb-10">
          From the moment ground breaks to the day maintenance runs like clockwork.
          Plotfolio AI turns field updates and work orders into payments, records, and decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center mb-16">
          <a
            href="#waitlist"
            className="bg-[#3E7BFA] text-white text-[15px] font-semibold px-8 py-3.5 rounded-full hover:bg-[#2960E8] active:scale-95 transition-all shadow-lg shadow-[#3E7BFA]/25"
          >
            Join the waitlist
          </a>
          <a
            href="#milestone"
            className="text-[#111] text-[15px] font-semibold px-8 py-3.5 rounded-full border border-[#111]/15 hover:border-[#111]/28 hover:bg-[#f9f9f9] transition-all"
          >
            See the products ↓
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2.5 bg-[#EBF0FE] border border-[#3E7BFA]/15 px-4 py-2.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#3E7BFA]" />
            <span className="text-[13px] font-bold text-[#3E7BFA]">Milestone</span>
            <span className="text-[12px] text-[#5E6672]">Construction → Payments</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#FFF0EB] border border-[#FF6B35]/15 px-4 py-2.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            <span className="text-[13px] font-bold text-[#FF6B35]">Keeper</span>
            <span className="text-[12px] text-[#5E6672]">Facilities → Done</span>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-1 text-[#ccc] text-xs font-medium select-none">
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          Scroll to explore
        </div>
      </section>

      {/* ── Product: Milestone ── */}
      <section id="milestone" className="py-28 px-6 bg-white border-t border-[#111]/6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBF0FE] text-[#3E7BFA] text-[11px] font-black px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase border border-[#3E7BFA]/15">
              Milestone
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#111] mb-6">
              Log it once.<br />
              <span className="text-[#3E7BFA]">Get paid automatically.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-9 max-w-md">
              Builders capture progress the way they already work — a photo, a message, a voice note.
              Milestone ties each update to a payment milestone and sends the invoice without the paperwork chase.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Milestone-triggered payment releases",
                "Automated invoicing from field updates",
                "Live progress visibility for every stakeholder",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-[#111]">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#EBF0FE] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#3E7BFA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 bg-[#3E7BFA] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2960E8] active:scale-95 transition-all"
              >
                Get early access →
              </a>
              <span className="text-[12px] text-[#5E6672] bg-[#F5F5F5] px-3 py-1.5 rounded-full border border-[#111]/8 font-medium">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Wireframe */}
          <div className="bg-[#F2F6FF] rounded-3xl p-8 border border-[#3E7BFA]/10 flex items-center justify-center min-h-[480px]">
            <MilestoneWireframe />
          </div>
        </div>
      </section>

      {/* ── Product: Keeper ── */}
      <section id="keeper" className="py-28 px-6 bg-[#FAFAFA] border-t border-[#111]/6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Wireframe */}
          <div className="order-2 md:order-1 bg-[#FFF4EE] rounded-3xl p-8 border border-[#FF6B35]/10 flex items-center justify-center min-h-[380px]">
            <KeeperWireframe />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-[#FFF0EB] text-[#FF6B35] text-[11px] font-black px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase border border-[#FF6B35]/15">
              Keeper
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#111] mb-6">
              Every asset. Every issue.<br />
              <span className="text-[#FF6B35]">All in one place.</span>
            </h2>
            <p className="text-[1rem] text-[#5E6672] leading-relaxed mb-9 max-w-md">
              Facility managers field a constant stream of complaints, work orders, and repairs.
              Keeper turns that noise into structured records, dispatches the right people, and gives owners the cost visibility they need.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "AI-powered maintenance dispatch",
                "Per-asset cost tracking across your portfolio",
                "Proactive alerts before issues escalate",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-[#111]">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FFF0EB] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 bg-[#FF6B35] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#E85A26] active:scale-95 transition-all"
              >
                Get early access →
              </a>
              <span className="text-[12px] text-[#5E6672] bg-[#F5F5F5] px-3 py-1.5 rounded-full border border-[#111]/8 font-medium">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-28 px-6 bg-white border-t border-[#111]/6 canvas-dots">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#3E7BFA] text-[12px] font-black tracking-widest uppercase mb-4">
              How it works
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-tight tracking-[-0.03em] text-[#111] max-w-2xl mx-auto">
              Three steps. Your team barely notices.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {(
              [
                {
                  n: "01",
                  title: "Capture",
                  color: "#FF6B35",
                  bg: "#FFF0EB",
                  desc: "Field teams send a photo, message, or voice note. No forms, no new apps. Just what they already do.",
                  icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
                },
                {
                  n: "02",
                  title: "Understand",
                  color: "#3E7BFA",
                  bg: "#EBF0FE",
                  desc: "AI reads the input and creates milestones, work orders, or cost records. The boring part, handled.",
                  icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
                },
                {
                  n: "03",
                  title: "Act",
                  color: "#2FA866",
                  bg: "#E6F5EE",
                  desc: "Invoices go out. Alerts go up. Dashboards update. Owners see what's happening without asking.",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                },
              ] as const
            ).map(({ n, title, desc, color, bg, icon }) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-8 border border-[#111]/8 hover:border-[#111]/16 hover:shadow-lg transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: bg }}
                >
                  <svg className="w-5 h-5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: color + "88" }}>
                  {n}
                </div>
                <h3 className="text-[20px] font-bold text-[#111] mb-3">{title}</h3>
                <p className="text-[14px] text-[#5E6672] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Waitlist ── */}
      <section id="waitlist" className="py-28 px-6 bg-[#EBF0FE] border-t border-[#3E7BFA]/15">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[#3E7BFA] text-[12px] font-black tracking-widest uppercase mb-5">
            Early Access
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.6rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#111] mb-5">
            Get in before the queue gets long.
          </h2>
          <p className="text-[1rem] text-[#5E6672] max-w-md mx-auto mb-10 leading-relaxed">
            Milestone and Keeper are in active development. Leave your email and we&apos;ll reach out when early access opens.
          </p>
          {submitted ? (
            <div className="bg-white text-[#3E7BFA] font-semibold py-4 px-8 rounded-full text-[15px] shadow-md">
              You&apos;re on the list. We&apos;ll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 border border-[#111]/12 bg-white rounded-full px-5 py-3.5 text-[14px] placeholder:text-[#aaa] focus:outline-none focus:border-[#3E7BFA] focus:ring-3 focus:ring-[#3E7BFA]/15 transition-all"
              />
              <button
                type="submit"
                className="bg-[#3E7BFA] text-white text-[14px] font-semibold px-7 py-3.5 rounded-full hover:bg-[#2960E8] active:scale-95 transition-all whitespace-nowrap shadow-lg shadow-[#3E7BFA]/25"
              >
                Notify me
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-[#111]/6 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <img src="/images/plotfolio-ai-static-dark-ink.svg" alt="Plotfolio AI" className="h-6 w-auto mb-3" />
              <p className="text-[13px] text-[#5E6672] max-w-xs leading-relaxed">
                AI software for every stage of a built asset&apos;s life.
              </p>
            </div>
            <div className="flex gap-12 text-[13px]">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#111] mb-1">Products</p>
                <a href="#milestone" className="text-[#5E6672] hover:text-[#3E7BFA] transition-colors">
                  Milestone
                </a>
                <a href="#keeper" className="text-[#5E6672] hover:text-[#FF6B35] transition-colors">
                  Keeper
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#111] mb-1">Company</p>
                <a href="#waitlist" className="text-[#5E6672] hover:text-[#3E7BFA] transition-colors">
                  Early Access
                </a>
                <a href="#how" className="text-[#5E6672] hover:text-[#3E7BFA] transition-colors">
                  How it works
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
