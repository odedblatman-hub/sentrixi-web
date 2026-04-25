"use client";
import { useState, useEffect, useRef } from "react";

const TIMELINE = [
  { ts: "T – weeks", actor: "ATTACKER", mitre: "T1589.001", title: "Infostealer malware on contractor devices", desc: "Lumma Stealer · credentials stored in Jira unencrypted" },
  { ts: "T + 0s", actor: "AEGIS", mitre: "T1552", title: "Dark Web Intel Agent activated", desc: "47 active Snowflake credentials matched in leaked dumps" },
  { ts: "T + 12h 0.340s", actor: "AEGIS", mitre: "T1078", title: "Anomalous auth — CRITICAL", desc: "Mullvad VPN · new device · no MFA · exposed credential" },
  { ts: "T + 12h 3m 0.180s", actor: "AEGIS", mitre: "T1087", title: "SQL recon 94× behavioral baseline", desc: "FROSTBITE tool · SHOW USERS / SHOW SCHEMAS in bulk" },
  { ts: "T + 12h 8m 0.410s", actor: "KILL CHAIN", mitre: "TA0001–TA0010", title: "UNC5537 campaign matched — P0", desc: "Kill Chain Engine · confidence 0.94 · TA0001–TA0010" },
  { ts: "T + 12h 8m 0.612s", actor: "GUARDIAN", mitre: "", title: "Autonomous containment complete", desc: "Session killed · creds rotated · temp stages dropped · MFA enforced" },
];

const ALERTS = [
  { severity: "P2", title: "Unusual OAuth Grant — Shadow App", source: "cloud-apps", mitre: "T1550.001", status: "MONITORING", color: "#F59E0B" },
  { severity: "P1", title: "MFA Bypass Attempt — Push Fatigue", source: "okta-tenant", mitre: "T1621", status: "BLOCKED", color: "#F97316" },
  { severity: "P0", title: "UNC5537 Campaign Detected", source: "prod-snowflake-01", mitre: "T1552", status: "CONTAINED", color: "#DC2626" },
  { severity: "P0", title: "Credential Exfil via Dark Web IAB", source: "identity-store", mitre: "T1589.001", status: "MITIGATED", color: "#DC2626" },
  { severity: "P1", title: "SQL Recon 94× Baseline", source: "warehouse-cluster", mitre: "T1087", status: "CONTAINED", color: "#F97316" },
  { severity: "P1", title: "Exfil Staging — COPY INTO + GZIP", source: "analytics-db", mitre: "T1074.002", status: "BLOCKED", color: "#F97316" },
];

const AI_LINES = [
  "[THREAT ASSESSMENT]",
  "Campaign ............. UNC5537 / ShinyHunters",
  "Classification ....... Credential-based exfil",
  "Confidence ........... 0.94  Severity: P0",
  "CRITICAL",
  "",
  "[DETECTION CHAIN]",
  "Dark web match → VPN auth anomaly → FROSTBITE",
  "SQL recon → temp stage + COPY INTO → kill chain",
  "",
  "[AUTONOMOUS ACTIONS TAKEN]",
  "✓ Session terminated (T+12h 8m 0.612s)",
  "✓ Credentials force-rotated across 47 accounts",
  "✓ Temp stages dropped · MFA enforced",
  "✓ Evidence package generated · Legal-grade",
  "✓ SIEM enriched · Board report queued",
];

const C = {
  teal: "#0D9488", tealLt: "#CCFBF1",
  navy: "#0F172A", navyMid: "#1E293B",
  red: "#DC2626", redSoft: "#FCA5A5",
  amber: "#F59E0B",
  muted: "#94A3B8", mutedDk: "#64748B",
  success: "#10B981",
  white: "#FFFFFF",
  border: "#1E293B",
};

const PHASE_CINEMATIC = 0;
const PHASE_DASHBOARD = 1;
const PHASE_COMPARE = 2;
const CONTAINER_H = 800;

export default function HybridDemo() {
  useEffect(() => {
    const id = "aegis-demo-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.href = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&family=Instrument+Serif:ital@1&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  const [phase, setPhase] = useState(PHASE_CINEMATIC);
  const [cineSlide, setCineSlide] = useState(0);
  const [tlIdx, setTlIdx] = useState(-1);
  const [alertIdx, setAlertIdx] = useState(-1);
  const [aiLineIdx, setAiLineIdx] = useState(-1);
  const [showCompareCards, setShowCompareCards] = useState(false);
  const [clockTime, setClockTime] = useState("");
  const [email, setEmail] = useState("");
  const timerRef = useRef(null);

  // Live clock
  useEffect(() => {
    const tick = () => setClockTime(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Cinematic auto-advance
  useEffect(() => {
    if (phase !== PHASE_CINEMATIC) return;
    const durations = [4200, 5000, 3500];
    const t = setTimeout(() => {
      if (cineSlide < 2) setCineSlide(s => s + 1);
      else setPhase(PHASE_DASHBOARD);
    }, durations[cineSlide]);
    return () => clearTimeout(t);
  }, [phase, cineSlide]);

  // Dashboard timeline auto-play
  useEffect(() => {
    if (phase !== PHASE_DASHBOARD) return;
    const startDelay = setTimeout(() => {
      setTlIdx(0); setAlertIdx(0);
      let step = 0;
      timerRef.current = setInterval(() => {
        step++;
        if (step < TIMELINE.length) setTlIdx(step);
        if (step < ALERTS.length) setAlertIdx(step);
        if (step >= Math.max(TIMELINE.length, ALERTS.length)) {
          clearInterval(timerRef.current);
          let aiStep = 0;
          timerRef.current = setInterval(() => {
            setAiLineIdx(aiStep);
            aiStep++;
            if (aiStep >= AI_LINES.length) {
              clearInterval(timerRef.current);
              setTimeout(() => setPhase(PHASE_COMPARE), 2500);
            }
          }, 280);
        }
      }, 1800);
    }, 800);
    return () => { clearTimeout(startDelay); clearInterval(timerRef.current); };
  }, [phase]);

  // Compare animation
  useEffect(() => {
    if (phase !== PHASE_COMPARE) return;
    const t = setTimeout(() => setShowCompareCards(true), 400);
    return () => clearTimeout(t);
  }, [phase]);

  const replay = () => {
    clearInterval(timerRef.current);
    setCineSlide(0); setTlIdx(-1); setAlertIdx(-1); setAiLineIdx(-1);
    setShowCompareCards(false); setPhase(PHASE_CINEMATIC);
  };

  const mono = { fontFamily: "'DM Mono', monospace" };
  const sans = { fontFamily: "'DM Sans', sans-serif" };
  const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };

  return (
    <div style={{
      position: "relative", width: "100%", height: `${CONTAINER_H}px`,
      background: C.navy, ...sans, color: C.white,
      overflow: "hidden", borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      <style>{`
        @keyframes hd-fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hd-fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes hd-countUp { from { opacity:0; transform:translateY(16px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes hd-scanline { 0% { transform:translateY(-100%); } 100% { transform:translateY(${CONTAINER_H}px); } }
        @keyframes hd-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes hd-glowTeal { 0%,100% { text-shadow:0 0 8px rgba(13,148,136,0.4); } 50% { text-shadow:0 0 20px rgba(13,148,136,0.7); } }
        .hd-scan { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(13,148,136,0.08),transparent); animation:hd-scanline 6s linear infinite; pointer-events:none; z-index:1; }
        .hd-grid-bg { position:absolute; inset:0; opacity:0.02; background-image:linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px); background-size:48px 48px; pointer-events:none; }
        .hd-tl-item { padding:10px 12px; border-left:2px solid ${C.border}; margin-left:0; opacity:0; transform:translateY(8px); transition:all 0.5s ease; }
        .hd-tl-item.visible { opacity:1; transform:translateY(0); }
        .hd-tl-item.active { border-left-color:${C.teal}; background:rgba(13,148,136,0.04); }
        .hd-tl-item[data-actor="ATTACKER"] { border-left-color:${C.red}; }
        .hd-tl-item[data-actor="ATTACKER"].active { background:rgba(220,38,38,0.04); }
        .hd-tl-item[data-actor="GUARDIAN"].visible { border-left-color:${C.white}; background:rgba(255,255,255,0.03); }
        .hd-alert-row { display:flex; align-items:flex-start; gap:8px; padding:8px 10px; border-bottom:1px solid ${C.border}; opacity:0; transform:translateX(16px); transition:all 0.4s ease; }
        .hd-alert-row.visible { opacity:1; transform:translateX(0); }
        .hd-badge { display:inline-block; padding:1px 6px; border-radius:3px; font-size:10px; font-weight:600; letter-spacing:0.04em; }
        .hd-status { padding:2px 7px; border-radius:3px; font-size:9px; font-weight:600; letter-spacing:0.06em; }
        .hd-sidebar-item { padding:8px 16px; font-size:13px; color:${C.mutedDk}; cursor:default; border-left:2px solid transparent; transition:all 0.2s; }
        .hd-sidebar-item.active { color:${C.white}; border-left-color:${C.teal}; background:rgba(13,148,136,0.06); }
        .hd-ctrl { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08); color:white; border-radius:6px; padding:6px 14px; font-size:11px; cursor:pointer; transition:all 0.2s; }
        .hd-ctrl:hover { background:rgba(255,255,255,0.12); }
        .hd-compare-card { background:rgba(255,255,255,0.03); border:1px solid ${C.border}; border-radius:14px; padding:24px 16px; text-align:center; opacity:0; transform:translateY(20px); transition:all 0.6s ease; }
        .hd-compare-card.show { opacity:1; transform:translateY(0); }
        @media(max-width:900px) {
          .hd-dash-grid { grid-template-columns:1fr!important; }
          .hd-sidebar { display:none!important; }
        }
      `}</style>

      <div className="hd-scan" />
      <div className="hd-grid-bg" />

      {/* ══ PHASE 1: CINEMATIC ══ */}
      {phase === PHASE_CINEMATIC && (
        <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px 28px", textAlign: "center" }}>

          {cineSlide === 0 && (
            <div key="c0" style={{ animation: "hd-fadeUp 0.9s ease both" }}>
              <div style={{ ...mono, fontSize: 11, color: C.mutedDk, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>BASED ON THE REAL 2024 BREACH</div>
              <h2 style={{ fontSize: "clamp(2rem, 6vw, 4.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 14 }}>
                <span style={{ color: C.teal }}>AEGIS</span>{" "}
                <span style={{ ...serif, fontWeight: 400, color: C.mutedDk }}>vs</span>{" "}
                <span style={{ color: C.red }}>UNC5537</span>
              </h2>
              <p style={{ fontSize: "clamp(1rem, 2.4vw, 1.25rem)", color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.5 }}>
                The <span style={{ color: C.amber }}>Snowflake campaign</span> that breached 165 companies.
              </p>
            </div>
          )}

          {cineSlide === 1 && (
            <div key="c1" style={{ maxWidth: 680, width: "100%" }}>
              <div style={{ animation: "hd-fadeIn 0.4s ease both", ...mono, fontSize: 11, color: C.red, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>⚠ WHAT ACTUALLY HAPPENED</div>
              <h2 style={{ animation: "hd-fadeUp 0.6s ease both", animationDelay: "0.1s", fontSize: "clamp(1.5rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>
                40 days undetected. 500M records stolen.
              </h2>
              <p style={{ animation: "hd-fadeUp 0.5s ease both", animationDelay: "0.2s", fontSize: 14, color: C.mutedDk, lineHeight: 1.6, maxWidth: 500, margin: "0 auto 24px" }}>
                No malware. No exploits. Just stolen credentials — some from 2020 — and zero MFA. AT&T paid $370K ransom. Ticketmaster lost 590M records.
              </p>
              <div style={{ animation: "hd-fadeUp 0.5s ease both", animationDelay: "0.35s", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, maxWidth: 520, margin: "0 auto" }}>
                {[["165", "Orgs breached"], ["500M+", "People affected"], ["$370K", "AT&T ransom"], ["40 days", "Undetected"]].map(([n, l], i) => (
                  <div key={l} style={{ animation: `hd-countUp 0.5s ease both`, animationDelay: `${0.4 + i * 0.1}s`, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.1)", borderRadius: 10, padding: "16px 8px", textAlign: "center" }}>
                    <div style={{ ...mono, fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: C.red, fontWeight: 500 }}>{n}</div>
                    <div style={{ fontSize: 11, color: C.mutedDk, marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cineSlide === 2 && (
            <div key="c2" style={{ animation: "hd-fadeUp 0.7s ease both" }}>
              <div style={{ ...mono, fontSize: 11, color: C.teal, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>ENTERING AEGIS SOC</div>
              <h2 style={{ fontSize: "clamp(1.6rem, 4.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>
                Now watch AEGIS <span style={{ color: C.teal, animation: "hd-glowTeal 2s ease-in-out infinite" }}>stop it</span>.
              </h2>
              <p style={{ fontSize: 14, color: C.mutedDk }}>Loading live SOC dashboard...</p>
            </div>
          )}

          <div style={{ position: "absolute", bottom: 28, display: "flex", gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= cineSlide ? C.teal : "rgba(255,255,255,0.12)", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      )}

      {/* ══ PHASE 2: SOC DASHBOARD ══ */}
      {phase === PHASE_DASHBOARD && (
        <div style={{ position: "relative", zIndex: 5, height: "100%", display: "flex", flexDirection: "column", animation: "hd-fadeIn 0.8s ease both" }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `1px solid ${C.border}`, background: "rgba(15,23,42,0.95)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...mono, fontSize: 12, fontWeight: 600, color: C.white, letterSpacing: "0.04em" }}>NODE_ALPHA_04</span>
              <span style={{ ...mono, fontSize: 11, color: "#fff", background: C.red, padding: "1px 8px", borderRadius: 3, fontWeight: 600 }}>UNC5537 · Active Investigation</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ ...mono, fontSize: 11, color: C.success }}>1 P0 ACTIVE</span>
              <span style={{ ...mono, fontSize: 11, color: C.teal }}>AEGIS RUNNING</span>
              <span style={{ ...mono, fontSize: 11, color: C.mutedDk }}>{clockTime}</span>
              <button className="hd-ctrl" onClick={replay} style={{ ...mono }}>↺ Replay</button>
            </div>
          </div>

          {/* Main grid */}
          <div className="hd-dash-grid" style={{ flex: 1, display: "grid", gridTemplateColumns: "140px 1fr 300px", overflow: "hidden" }}>

            {/* Sidebar */}
            <div className="hd-sidebar" style={{ borderRight: `1px solid ${C.border}`, paddingTop: 12, background: "rgba(15,23,42,0.5)" }}>
              <div style={{ ...mono, fontSize: 14, fontWeight: 700, padding: "8px 16px 12px", color: C.white }}>AEGIS</div>
              {["Dashboard", "Threats", "Telemetry", "Investigations", "Settings"].map((item, i) => (
                <div key={item} className={`hd-sidebar-item ${i === 0 ? "active" : ""}`}>{item}</div>
              ))}
            </div>

            {/* Center: stats + timeline */}
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
                {[
                  { label: "RECORDS PROTECTED", value: "590,000,000", sub: "this session", color: C.teal },
                  { label: "MEAN DETECTION", value: "612ms", sub: "vs 40-day avg", color: C.teal },
                  { label: "AUTONOMOUS ACTIONS", value: "8", sub: "zero analyst input", color: C.white },
                  { label: "AGENTS ACTIVE", value: "30+", sub: "MITRE mapped", color: C.teal },
                ].map((s, i) => (
                  <div key={s.label} style={{ padding: "12px 14px", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ ...mono, fontSize: 9, color: C.mutedDk, letterSpacing: "0.06em", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ ...mono, fontSize: "clamp(1rem, 1.8vw, 1.4rem)", fontWeight: 500, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                    <div style={{ ...mono, fontSize: 9, color: C.mutedDk, marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ flex: 1, overflow: "auto", padding: "12px 14px" }}>
                <div style={{ ...mono, fontSize: 11, fontWeight: 600, color: C.white, letterSpacing: "0.06em", marginBottom: 10, textTransform: "uppercase" }}>
                  Attack Reconstruction · UNC5537
                </div>
                {TIMELINE.map((t, i) => (
                  <div
                    key={i}
                    className={`hd-tl-item ${i <= tlIdx ? "visible" : ""} ${i === tlIdx ? "active" : ""}`}
                    data-actor={t.actor}
                    style={{ marginBottom: 4, borderRadius: 4 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
                      <span style={{ ...mono, fontSize: 10, color: C.mutedDk }}>{t.ts}</span>
                      <span className="hd-badge" style={{
                        background: t.actor === "ATTACKER" ? "rgba(220,38,38,0.15)" : t.actor === "GUARDIAN" ? "rgba(255,255,255,0.1)" : "rgba(13,148,136,0.15)",
                        color: t.actor === "ATTACKER" ? C.red : t.actor === "GUARDIAN" ? C.white : C.teal,
                      }}>{t.actor}</span>
                      {t.mitre && <span className="hd-badge" style={{ background: "rgba(255,255,255,0.05)", color: C.mutedDk }}>{t.mitre}</span>}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 2 }}>{t.title}</div>
                    <div style={{ ...mono, fontSize: 11, color: C.mutedDk }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: alerts + AI analyst */}
            <div style={{ borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ flex: 1, overflow: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ ...mono, fontSize: 11, fontWeight: 600, color: C.white, letterSpacing: "0.06em" }}>LIVE ALERTS</span>
                  <span style={{ ...mono, fontSize: 10, color: C.red }}>{Math.min(alertIdx + 1, ALERTS.length)} ACTIVE</span>
                </div>
                {ALERTS.map((a, i) => (
                  <div key={i} className={`hd-alert-row ${i <= alertIdx ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                    <span className="hd-badge" style={{ background: a.color, color: "#fff", flexShrink: 0, marginTop: 2 }}>{a.severity}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.white, lineHeight: 1.3 }}>{a.title}</div>
                      <div style={{ ...mono, fontSize: 10, color: C.mutedDk, marginTop: 2 }}>{a.source} · {a.mitre}</div>
                    </div>
                    <span className="hd-status" style={{
                      flexShrink: 0, marginTop: 2,
                      background: a.status === "BLOCKED" ? "rgba(220,38,38,0.15)" : a.status === "CONTAINED" ? "rgba(13,148,136,0.15)" : a.status === "MITIGATED" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                      color: a.status === "BLOCKED" ? C.red : a.status === "CONTAINED" ? C.teal : a.status === "MITIGATED" ? C.success : C.amber,
                    }}>{a.status}</span>
                  </div>
                ))}
              </div>

              {/* AI Analyst */}
              <div style={{ borderTop: `1px solid ${C.border}`, background: "rgba(0,0,0,0.3)", padding: "10px 12px", maxHeight: 230, overflow: "auto", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ ...mono, fontSize: 10, fontWeight: 600, color: C.teal, letterSpacing: "0.06em" }}>AEGIS AI ANALYST</span>
                  {aiLineIdx >= AI_LINES.length - 1 && <span style={{ ...mono, fontSize: 10, color: C.mutedDk }}>COMPLETE</span>}
                </div>
                <div style={{ ...mono, fontSize: 11, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                  {AI_LINES.map((line, i) => (
                    <div key={i} style={{
                      opacity: i <= aiLineIdx ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      color: line.startsWith("[") ? C.teal : line.startsWith("✓") ? C.success : line === "CRITICAL" ? C.red : C.muted,
                      fontWeight: line.startsWith("[") || line === "CRITICAL" ? 600 : 400,
                    }}>
                      {line || " "}
                    </div>
                  ))}
                  {aiLineIdx >= 0 && aiLineIdx < AI_LINES.length - 1 && (
                    <span style={{ color: C.teal, animation: "hd-blink 1s step-end infinite" }}>▊</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ PHASE 3: COMPARISON + CTA ══ */}
      {phase === PHASE_COMPARE && (
        <div style={{ position: "relative", zIndex: 5, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", textAlign: "center", overflow: "auto", animation: "hd-fadeIn 0.6s ease both" }}>

          <div style={{ ...mono, fontSize: 11, color: C.mutedDk, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>REALITY VS. AEGIS</div>

          <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 24, maxWidth: 600 }}>
            What <span style={{ color: C.red }}>happened</span> without AEGIS — and what <span style={{ color: C.teal }}>would have</span>.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, maxWidth: 720, width: "100%", marginBottom: 28 }}>
            {[
              { bad: "40 days", badSub: "undetected", good: "612ms", goodSub: "total response", delay: 0 },
              { bad: "500M+", badSub: "records stolen", good: "0 bytes", goodSub: "exfiltrated", delay: 0.1 },
              { bad: "$370K", badSub: "ransom (AT&T)", good: "$0", goodSub: "breach cost", delay: 0.2 },
              { bad: "165 orgs", badSub: "compromised", good: "1st login", goodSub: "contained at", delay: 0.3 },
            ].map((c, i) => (
              <div key={i} className={`hd-compare-card ${showCompareCards ? "show" : ""}`} style={{ transitionDelay: `${c.delay}s` }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ ...mono, fontSize: 9, color: C.mutedDk, letterSpacing: "0.06em", marginBottom: 4 }}>WITHOUT AEGIS</div>
                  <div style={{ ...mono, fontSize: "clamp(1rem, 2.2vw, 1.4rem)", color: C.red, fontWeight: 500 }}>{c.bad}</div>
                  <div style={{ fontSize: 11, color: C.mutedDk }}>{c.badSub}</div>
                </div>
                <div style={{ width: 20, height: 1, background: C.border, margin: "0 auto 14px" }} />
                <div>
                  <div style={{ ...mono, fontSize: 9, color: C.mutedDk, letterSpacing: "0.06em", marginBottom: 4 }}>WITH AEGIS</div>
                  <div style={{ ...mono, fontSize: "clamp(1rem, 2.2vw, 1.4rem)", color: C.teal, fontWeight: 500 }}>{c.good}</div>
                  <div style={{ fontSize: 11, color: C.mutedDk }}>{c.goodSub}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ ...mono, fontSize: 12, color: C.mutedDk, marginBottom: 20 }}>
            Every detection. Every containment. Fully autonomous. Zero analysts required.
          </p>

          <div style={{ animation: "hd-fadeUp 0.6s ease both", animationDelay: "0.6s", maxWidth: 420, width: "100%" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input
                type="email"
                placeholder="work@yourcompany.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, padding: "11px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.navyMid, color: C.white, ...sans, fontSize: 14, outline: "none" }}
              />
              <a
                href={`mailto:register@sentrixi.com?subject=Technical Briefing Request&body=Email: ${email}`}
                style={{ padding: "11px 18px", borderRadius: 8, background: C.teal, color: C.white, ...sans, fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                See it live →
              </a>
            </div>
            <p style={{ fontSize: 11, color: C.mutedDk }}>Oded responds personally · No SDRs · 14 days to first detection</p>
          </div>

          <button className="hd-ctrl" onClick={replay} style={{ ...mono, marginTop: 18, fontSize: 11 }}>↺ Watch again</button>
        </div>
      )}
    </div>
  );
}
