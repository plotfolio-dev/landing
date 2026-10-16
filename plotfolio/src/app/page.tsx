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
  const c = "#3E7BFA", cL = "#EBF0FE", o = "#FF6B35", g = "#2FA866";
  const W = 340, H = 640;
  const f = (d: number) => ({ animation: `wire-fade-in 0.35s ease ${d}s both` });

  return (
    <div ref={ref} className={inView ? "wf-running" : "wf-paused"}>
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="w-full h-auto drop-shadow-xl">
        {/* Phone frame */}
        <rect x="2" y="2" width={W - 4} height={H - 4} rx="28"
          fill="white" stroke={c} strokeWidth="2.5"
          style={{ strokeDasharray: 2100, strokeDashoffset: 2100, animation: "wire-stroke 1.4s ease forwards" }} />

        {/* Status bar */}
        <rect x="2" y="2" width={W - 4} height="52" rx="28" fill={cL} />
        <rect x="2" y="30" width={W - 4} height="24" fill={cL} />
        <rect x="18" y="16" width="32" height="9" rx="4.5" fill={c} opacity="0.28" />
        <rect x={W - 68} y="16" width="16" height="9" rx="4.5" fill={c} opacity="0.18" />
        <rect x={W - 44} y="16" width="16" height="9" rx="4.5" fill={c} opacity="0.18" />
        <rect x={W - 20} y="18" width="12" height="7" rx="3.5" fill={c} opacity="0.18" />

        {/* App nav bar */}
        <g style={f(0.4)}>
          <rect x="18" y="61" width="22" height="9" rx="4.5" fill={c} opacity="0.35" />
          <rect x={W / 2 - 58} y="61" width="116" height="12" rx="6" fill={c} opacity="0.28" />
          <circle cx={W - 28} cy="66" r="3" fill={c} opacity="0.28" />
          <circle cx={W - 20} cy="66" r="3" fill={c} opacity="0.28" />
          <circle cx={W - 12} cy="66" r="3" fill={c} opacity="0.28" />
        </g>

        {/* Project header */}
        <g style={f(0.5)}>
          <rect x="20" y="84" width="185" height="13" rx="6.5" fill={c} opacity="0.32" />
          <rect x="20" y="103" width="120" height="9" rx="4.5" fill={c} opacity="0.18" />
          <rect x={W - 98} y="83" width="78" height="17" rx="8.5" fill={cL} stroke={c} strokeWidth="1" />
          <rect x={W - 87} y="88" width="56" height="7" rx="3.5" fill={c} opacity="0.35" />
        </g>

        {/* Divider + column headers */}
        <line x1="20" y1="124" x2={W - 20} y2="124" stroke={c} strokeWidth="1" opacity="0.14" style={f(0.58)} />
        <g style={f(0.62)}>
          <rect x="58" y="132" width="72" height="8" rx="4" fill={c} opacity="0.18" />
          <rect x={W - 110} y="132" width="44" height="8" rx="4" fill={c} opacity="0.18" />
          <rect x={W - 58} y="132" width="38" height="8" rx="4" fill={c} opacity="0.18" />
        </g>

        {/* Row 1 — done */}
        <g style={f(0.68)}>
          <circle cx="37" cy="160" r="12" fill={cL} stroke={c} strokeWidth="1.5" />
          <polyline points="31,160 35,164 43,156" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "wire-check 0.35s ease 1.12s forwards" }} />
          <rect x="58" y="152" width="155" height="10" rx="5" fill={c} opacity="0.24" />
          <rect x="58" y="168" width="90" height="8" rx="4" fill={c} opacity="0.12" />
          <rect x={W - 108} y="152" width="54" height="10" rx="5" fill={g} opacity="0.38" />
          <rect x={W - 108} y="168" width="38" height="8" rx="4" fill={c} opacity="0.12" />
          <rect x={W - 46} y="152" width="26" height="10" rx="5" fill={c} opacity="0.14" />
        </g>

        {/* Row 2 — done */}
        <g style={f(0.83)}>
          <circle cx="37" cy="200" r="12" fill={cL} stroke={c} strokeWidth="1.5" />
          <polyline points="31,200 35,204 43,196" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "wire-check 0.35s ease 1.28s forwards" }} />
          <rect x="58" y="192" width="170" height="10" rx="5" fill={c} opacity="0.24" />
          <rect x="58" y="208" width="100" height="8" rx="4" fill={c} opacity="0.12" />
          <rect x={W - 108} y="192" width="54" height="10" rx="5" fill={g} opacity="0.38" />
          <rect x={W - 108} y="208" width="38" height="8" rx="4" fill={c} opacity="0.12" />
          <rect x={W - 46} y="192" width="26" height="10" rx="5" fill={c} opacity="0.14" />
        </g>

        {/* Row 3 — in progress */}
        <g style={f(0.98)}>
          <circle cx="37" cy="243" r="12" fill="#FFF0EB" stroke={o} strokeWidth="1.5" />
          <circle cx="37" cy="243" r="5" fill={o} style={{ animation: "wire-dot-pulse 1.6s ease-in-out 1.0s infinite" }} />
          <rect x="58" y="235" width="188" height="10" rx="5" fill={o} opacity="0.28" />
          <rect x="58" y="251" width="108" height="8" rx="4" fill={o} opacity="0.17" />
          <rect x={W - 108} y="235" width="54" height="10" rx="5" fill={o} opacity="0.38" />
          <rect x={W - 108} y="251" width="38" height="8" rx="4" fill={o} opacity="0.17" />
          <rect x={W - 46} y="235" width="26" height="10" rx="5" fill={o} opacity="0.2" />
          {/* Photo attachment */}
          <rect x="58" y="265" width="26" height="20" rx="5" fill={o} opacity="0.15" stroke={o} strokeWidth="1" />
          <rect x="58" y="265" width="26" height="20" rx="5" fill={o} opacity="0.08" />
          <circle cx="65" cy="272" r="3" fill={o} opacity="0.35" />
          <rect x="92" y="269" width="86" height="8" rx="4" fill={o} opacity="0.2" />
          <rect x="92" y="280" width="54" height="6" rx="3" fill={o} opacity="0.13" />
        </g>

        {/* Row 4 — pending */}
        <g style={f(1.13)}>
          <circle cx="37" cy="308" r="12" fill="white" stroke={c} strokeWidth="1.5" opacity="0.35" />
          <rect x="58" y="300" width="140" height="10" rx="5" fill={c} opacity="0.1" />
          <rect x="58" y="316" width="80" height="8" rx="4" fill={c} opacity="0.07" />
          <rect x={W - 108} y="300" width="54" height="10" rx="5" fill={c} opacity="0.09" />
          <rect x={W - 46} y="300" width="26" height="10" rx="5" fill={c} opacity="0.07" />
        </g>

        {/* Divider */}
        <line x1="20" y1="336" x2={W - 20} y2="336" stroke={c} strokeWidth="1" opacity="0.12" style={f(1.2)} />

        {/* Overall progress */}
        <g style={f(1.25)}>
          <rect x="20" y="348" width="96" height="9" rx="4.5" fill={c} opacity="0.22" />
          <rect x={W - 72} y="348" width="52" height="9" rx="4.5" fill={c} opacity="0.36" />
          <rect x="20" y="364" width={W - 40} height="10" rx="5" fill={cL} />
        </g>
        <rect x="20" y="364" width="186" height="10" rx="5" fill={c} opacity="0.72"
          style={{ transformOrigin: "left center", transform: "scaleX(0)", animation: "wire-progress-fill 0.9s ease 1.52s both" }} />

        {/* Collected / Outstanding summary */}
        <g style={f(1.38)}>
          <rect x="20" y="386" width={(W - 48) / 2} height="36" rx="10" fill={cL} />
          <rect x="30" y="393" width="60" height="8" rx="4" fill={c} opacity="0.2" />
          <rect x="30" y="406" width="46" height="10" rx="5" fill={g} opacity="0.45" />
          <rect x={20 + (W - 48) / 2 + 8} y="386" width={(W - 48) / 2} height="36" rx="10" fill="#FFF0EB" />
          <rect x={28 + (W - 48) / 2 + 8} y="393" width="60" height="8" rx="4" fill={o} opacity="0.2" />
          <rect x={28 + (W - 48) / 2 + 8} y="406" width="46" height="10" rx="5" fill={o} opacity="0.45" />
        </g>

        {/* Invoice card */}
        <g style={{ animation: "wire-slide-up 0.65s cubic-bezier(0.34,1.56,0.64,1) 1.88s both" }}>
          <rect x="14" y="434" width={W - 28} height="172" rx="18" fill={cL} stroke={c} strokeWidth="1.5" />
          {/* Header row */}
          <rect x="30" y="452" width="110" height="9" rx="4.5" fill={c} opacity="0.26" />
          <rect x={W - 122} y="452" width="94" height="9" rx="4.5" fill={c} opacity="0.14" />
          {/* Amount */}
          <rect x="30" y="469" width="162" height="26" rx="13" fill={c} opacity="0.45" />
          {/* Trigger label */}
          <rect x="30" y="505" width="148" height="9" rx="4.5" fill={o} opacity="0.42" />
          {/* Send button */}
          <rect x={W - 140} y="495" width="112" height="32" rx="16" fill={c} opacity="0.85" />
          {/* Divider */}
          <line x1="30" y1="537" x2={W - 30} y2="537" stroke={c} strokeWidth="1" opacity="0.14" />
          {/* Sent to row */}
          <rect x="30" y="547" width="62" height="8" rx="4" fill={c} opacity="0.18" />
          <rect x="100" y="547" width="118" height="8" rx="4" fill={c} opacity="0.13" />
          {/* Status chip */}
          <rect x="30" y="561" width="70" height="18" rx="9" fill={g} opacity="0.18" />
          <rect x="43" y="565" width="44" height="10" rx="5" fill={g} opacity="0.5" />
          {/* Timestamp */}
          <rect x={W - 130} y="565" width="96" height="8" rx="4" fill={c} opacity="0.1" />
        </g>

        {/* Bottom tab bar */}
        <g style={f(0.42)}>
          <rect x="2" y={H - 58} width={W - 4} height="56" rx="0" fill="white" />
          <line x1="2" y1={H - 58} x2={W - 2} y2={H - 58} stroke={c} strokeWidth="1" opacity="0.1" />
          <rect x="2" y={H - 4} width={W - 4} height="4" rx="0" fill="white" />
          {[0, 1, 2, 3].map(i => {
            const tx = 34 + i * 68;
            const active = i === 1;
            return (
              <g key={i}>
                <rect x={tx - 14} y={H - 50} width="28" height="20" rx="6"
                  fill={active ? cL : "transparent"} />
                <rect x={tx - 10} y={H - 47} width="20" height="10" rx="5"
                  fill={active ? c : "#bbb"} opacity={active ? 0.45 : 0.2} />
                <rect x={tx - 10} y={H - 32} width="20" height="7" rx="3.5"
                  fill={active ? c : "#bbb"} opacity={active ? 0.3 : 0.12} />
              </g>
            );
          })}
          {/* Home indicator */}
          <rect x={W / 2 - 40} y={H - 8} width="80" height="4" rx="2" fill={c} opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}

// ── Keeper product wireframe ──────────────────────────────────────────────────
function KeeperWireframe() {
  const [ref, inView] = useInView();
  const c = "#FF6B35", cB = "#3E7BFA", cL = "#FFF4EE", cLB = "#EBF0FE", g = "#2FA866";
  const W = 640, H = 460;
  const SB = 82; // sidebar width
  const f = (d: number) => ({ animation: `wire-fade-in 0.35s ease ${d}s both` });

  const barHeights = [48, 68, 40, 82, 58, 72];
  const orders = [
    { dot: "#FFC93C", pri: "#FFC93C", w: 148, asset: 72, date: 44, av: "#3E7BFA" },
    { dot: c,         pri: c,         w: 172, asset: 60, date: 44, av: "#FF6B35" },
    { dot: g,         pri: g,         w: 132, asset: 80, date: 44, av: "#2FA866" },
    { dot: c,         pri: c,         w: 158, asset: 68, date: 44, av: "#FFC93C" },
  ];

  return (
    <div ref={ref} className={inView ? "wf-running" : "wf-paused"}>
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="w-full h-auto drop-shadow-xl">

        {/* ── Outer frame ── */}
        <rect x="2" y="2" width={W - 4} height={H - 4} rx="22"
          fill="white" stroke={cB} strokeWidth="2.5"
          style={{ strokeDasharray: 2200, strokeDashoffset: 2200, animation: "wire-stroke 1.5s ease forwards" }} />

        {/* ── Sidebar ── */}
        <rect x="2" y="2" width={SB} height={H - 4} rx="22" fill={cLB} />
        <rect x={SB} y="2" width="1" height={H - 4} fill={cB} opacity="0.12" />
        <rect x="2" y="2" width={SB - 1} height={H - 4} rx="22" fill={cLB} />
        <rect x={SB} y="2" width="2" height={H - 4} fill={cB} opacity="0.08" />

        {/* Sidebar logo */}
        <g style={f(0.38)}>
          <rect x="18" y="18" width="46" height="18" rx="9" fill={cB} opacity="0.35" />
        </g>

        {/* Sidebar nav items */}
        {[0, 1, 2, 3, 4].map(i => {
          const active = i === 0;
          const ty = 52 + i * 44;
          return (
            <g key={i} style={f(0.42 + i * 0.06)}>
              <rect x="12" y={ty} width={SB - 24} height="30" rx="8"
                fill={active ? cB : "transparent"} opacity={active ? 0.12 : 1} />
              <circle cx="30" cy={ty + 15} r="7"
                fill={active ? cB : cB} opacity={active ? 0.5 : 0.18} />
              <rect x="44" y={ty + 11} width="28" height="8" rx="4"
                fill={active ? cB : cB} opacity={active ? 0.45 : 0.15} />
            </g>
          );
        })}

        {/* Sidebar bottom avatar */}
        <g style={f(0.62)}>
          <circle cx={SB / 2} cy={H - 30} r="16" fill={cB} opacity="0.2" stroke={cB} strokeWidth="1.2" />
          <rect x={SB / 2 - 14} y={H - 25} width="28" height="8" rx="4" fill={cB} opacity="0.25" />
        </g>

        {/* ── Top header bar ── */}
        <rect x={SB + 1} y="2" width={W - SB - 3} height="46" rx="0" fill={cLB} />
        <rect x={W - 18} y="2" width="18" height="46" rx="22" fill={cLB} />
        <line x1={SB} y1="48" x2={W - 2} y2="48" stroke={cB} strokeWidth="1" opacity="0.12" />

        {/* Breadcrumb */}
        <g style={f(0.45)}>
          <rect x={SB + 16} y="17" width="54" height="10" rx="5" fill={cB} opacity="0.2" />
          <rect x={SB + 78} y="19" width="6" height="6" rx="3" fill={cB} opacity="0.18" />
          <rect x={SB + 92} y="17" width="72" height="10" rx="5" fill={cB} opacity="0.3" />
        </g>

        {/* Search bar */}
        <g style={f(0.48)}>
          <rect x={W - 230} y="12" width="138" height="24" rx="12" fill="white" stroke={cB} strokeWidth="1" opacity="0.5" />
          <rect x={W - 220} y="18" width="80" height="8" rx="4" fill={cB} opacity="0.15" />
        </g>

        {/* Notification + avatar */}
        <g style={f(0.5)}>
          <circle cx={W - 70} cy="24" r="12" fill="white" stroke={cB} strokeWidth="1" opacity="0.5" />
          <circle cx={W - 38} cy="24" r="14" fill={cB} opacity="0.2" />
          <circle cx={W - 70} cy="12" r="5" fill={c} style={{ animation: "wire-dot-pulse 1.8s ease-in-out 1.5s infinite" }} />
        </g>

        {/* ── Metric cards ── */}
        {[0, 1, 2].map(i => {
          const x = SB + 16 + i * 176;
          const accent = i === 1 ? c : cB;
          const bg = i === 1 ? cL : cLB;
          return (
            <g key={i} style={f(0.55 + i * 0.1)}>
              <rect x={x} y="62" width="162" height="90" rx="12" fill={bg} stroke={accent} strokeWidth="1.2" />
              {/* Icon circle */}
              <circle cx={x + 20} cy="82" r="10" fill={accent} opacity="0.25" />
              <rect x={x + 13} y="78" width="14" height="8" rx="4" fill={accent} opacity="0.45" />
              {/* Label */}
              <rect x={x + 38} y="76" width="80" height="9" rx="4.5" fill={accent} opacity="0.22" />
              {/* Value */}
              <rect x={x + 14} y="96" width="64" height="22" rx="11" fill={accent} opacity="0.45" />
              {/* Trend */}
              <rect x={x + 14} y="126" width="36" height="8" rx="4" fill={i === 2 ? g : accent} opacity="0.35" />
              <rect x={x + 56} y="126" width="60" height="8" rx="4" fill={accent} opacity="0.13" />
            </g>
          );
        })}

        {/* Alert badge */}
        <circle cx={SB + 16 + 1 * 176 + 162 - 6} cy="62" r="12" fill={c}
          style={{ animation: "wire-fade-in 0.3s ease 1.4s both, wire-dot-pulse 1.8s ease-in-out 1.4s infinite" }} />
        <rect x={SB + 16 + 1 * 176 + 162 - 12} cy="58" width="12" height="8" rx="3" fill="white" opacity="0.85" />

        {/* ── Work orders section ── */}
        {/* Label + view-all */}
        <g style={f(0.88)}>
          <rect x={SB + 16} y="168" width="88" height="10" rx="5" fill={cB} opacity="0.3" />
          <rect x={W - 100} y="168" width="72" height="10" rx="5" fill={cB} opacity="0.16" />
        </g>

        {/* Filter chips */}
        <g style={f(0.92)}>
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={SB + 16 + i * 78} y="184" width="68" height="20" rx="10"
              fill={i === 0 ? cB : "white"} stroke={i === 0 ? cB : cB}
              strokeWidth="1" opacity={i === 0 ? 0.15 : 0.12} />
          ))}
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={SB + 28 + i * 78} y="190" width="44" height="8" rx="4"
              fill={i === 0 ? cB : cB} opacity={i === 0 ? 0.45 : 0.18} />
          ))}
        </g>

        {/* Table header row */}
        <g style={f(0.96)}>
          <line x1={SB + 16} y1="212" x2={W - 16} y2="212" stroke={cB} strokeWidth="1" opacity="0.1" />
          <rect x={SB + 36} y="216" width="60" height="8" rx="4" fill={cB} opacity="0.18" />
          <rect x={SB + 202} y="216" width="50" height="8" rx="4" fill={cB} opacity="0.18" />
          <rect x={SB + 302} y="216" width="40" height="8" rx="4" fill={cB} opacity="0.18" />
          <rect x={SB + 382} y="216" width="40" height="8" rx="4" fill={cB} opacity="0.18" />
          <rect x={SB + 452} y="216" width="30" height="8" rx="4" fill={cB} opacity="0.18" />
          <line x1={SB + 16} y1="230" x2={W - 16} y2="230" stroke={cB} strokeWidth="1" opacity="0.08" />
        </g>

        {/* Work order rows */}
        {orders.map((row, i) => {
          const ry = 238 + i * 38;
          return (
            <g key={i} style={f(1.02 + i * 0.1)}>
              <circle cx={SB + 26} cy={ry + 10} r="6" fill={row.dot} opacity="0.75" />
              {/* Title */}
              <rect x={SB + 40} y={ry + 5} width={row.w} height="10" rx="5" fill={cB} opacity="0.22" />
              <rect x={SB + 40} y={ry + 20} width={row.w - 30} height="8" rx="4" fill={cB} opacity="0.12" />
              {/* Asset chip */}
              <rect x={SB + 202} y={ry + 4} width={row.asset} height="18" rx="9"
                fill={cLB} stroke={cB} strokeWidth="1" opacity="0.7" />
              <rect x={SB + 210} y={ry + 9} width={row.asset - 16} height="8" rx="4" fill={cB} opacity="0.28" />
              {/* Priority chip */}
              <rect x={SB + 302} y={ry + 4} width="44" height="18" rx="9"
                fill={row.pri} opacity="0.12" />
              <rect x={SB + 310} y={ry + 9} width="28" height="8" rx="4" fill={row.pri} opacity="0.45" />
              {/* Date */}
              <rect x={SB + 382} y={ry + 8} width={row.date} height="8" rx="4" fill={cB} opacity="0.15" />
              {/* Assignee avatar */}
              <circle cx={SB + 468} cy={ry + 12} r="11" fill={row.av} opacity="0.25" stroke={row.av} strokeWidth="1" />
              <rect x={SB + 460} y={ry + 8} width="16" height="8" rx="4" fill={row.av} opacity="0.35" />
              <line x1={SB + 16} y1={ry + 34} x2={W - 16} y2={ry + 34} stroke={cB} strokeWidth="1" opacity="0.06" />
            </g>
          );
        })}

        {/* ── Chart panel (right column) ── */}
        {/* Panel bg — overlaps the work orders area on the right */}
        <g style={f(0.9)}>
          <rect x={W - 162} y="162" width="146" height={H - 180} rx="14"
            fill={cL} stroke={c} strokeWidth="1" opacity="0.55" />
          <rect x={W - 150} y="174" width="80" height="10" rx="5" fill={cB} opacity="0.24" />
          <rect x={W - 64} y="174" width="40" height="10" rx="5" fill={c} opacity="0.28" />
        </g>

        {/* Chart baseline + labels */}
        <line x1={W - 150} y1={H - 32} x2={W - 22} y2={H - 32}
          stroke={cB} strokeWidth="1" opacity="0.2"
          style={f(1.0)} />
        {barHeights.map((_, i) => (
          <rect key={i} x={W - 148 + i * 22} y={H - 26} width="14" height="7" rx="3.5"
            fill={cB} opacity="0.14"
            style={f(1.05 + i * 0.04)} />
        ))}

        {/* Chart bars */}
        {barHeights.map((h, i) => (
          <g key={i}>
            {/* Value label above bar */}
            <rect x={W - 148 + i * 22} y={H - 34 - h - 12} width="14" height="7" rx="3.5"
              fill={i === 3 ? c : cB} opacity={i === 3 ? 0.45 : 0.18}
              style={f(1.28 + i * 0.06)} />
            <rect
              x={W - 148 + i * 22} y={H - 32 - h} width="14" height={h} rx="4"
              fill={i === 3 ? c : cB}
              opacity={i === 3 ? 0.65 : 0.28}
              style={{
                transformOrigin: `${W - 148 + i * 22 + 7}px ${H - 32}px`,
                transform: "scaleY(0)",
                animation: `wire-bar-rise 0.55s ease ${1.22 + i * 0.08}s both`,
              }} />
          </g>
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
