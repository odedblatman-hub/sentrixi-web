"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const STAGES = [
  { id: 0, type: "INTRO", ts: "", title: "AEGIS vs. Scattered Spider", sub: "Live autonomous detection · Watch it happen", detail: "", mitre: "", agent: "" },
  { id: 1, type: "ATTACKER", ts: "T + 0s", title: "SMS Phishing Lure Deployed", sub: "47 employees targeted across 3 business units", detail: "Credential-harvesting SMS routed through EvilProxy AiTM infrastructure.", mitre: "T1566.002", agent: "" },
  { id: 2, type: "ATTACKER", ts: "T + 4m 12s", title: "Session Hijack via EvilProxy", sub: "3 employees clicked — session cookies captured", detail: "Reverse-proxy intercepts authentication in real time.", mitre: "T1539", agent: "" },
  { id: 3, type: "AEGIS", ts: "T + 4m 12.087s", title: "AiTM Pattern Detected", sub: "Phish-to-auth timing anomaly flagged", detail: "3 authentications within 4ms of click — impossible without proxy interception.", mitre: "T1557", agent: "AiTM Agent" },
  { id: 4, type: "ATTACKER", ts: "T + 4m 51s", title: "MFA Fatigue Attack", sub: "23 push requests in 90 seconds", detail: "Classic Scattered Spider playbook to exhaust user patience.", mitre: "T1621", agent: "" },
  { id: 5, type: "AEGIS", ts: "T + 4m 51.320s", title: "MFA Velocity Anomaly — CRITICAL", sub: "Push rate 23× baseline", detail: "Okta session risk elevated to CRITICAL. Multi-signal fusion engaged.", mitre: "T1621", agent: "Identity Agent" },
  { id: 6, type: "ATTACKER", ts: "T + 5m 03s", title: "MFA Bypass Successful", sub: "1 user approved under fatigue", detail: "Session cookie exfiltrated. Persistent access established.", mitre: "T1539", agent: "" },
  { id: 7, type: "AEGIS", ts: "T + 5m 03.240s", title: "Kill Chain: Scattered Spider", sub: "Campaign hypothesis — Confidence 0.78 → P0", detail: "TTP chain matched: SMS phish → AiTM → MFA fatigue → cookie theft.", mitre: "TA0001–TA0010", agent: "Kill Chain Engine" },
  { id: 8, type: "AEGIS", ts: "T + 5m 18s", title: "OAuth Grant Anomaly", sub: "4 unauthorized app grants in 15 seconds", detail: "Shadow AI Agent flags potential persistence mechanism.", mitre: "T1550.001", agent: "Shadow AI Agent" },
  { id: 9, type: "ATTACKER", ts: "T + 5m 44s", title: "SharePoint Data Staging", sub: "2,400 files staged for exfiltration", detail: "Lateral pivot using stolen session to 3 sensitive document libraries.", mitre: "T1530", agent: "" },
  { id: 10, type: "AEGIS", ts: "T + 5m 44.180s", title: "Exfiltration Staging Detected", sub: "Volume 47× the 30-day baseline", detail: "Bulk enumeration pattern consistent with data exfil staging.", mitre: "T1048", agent: "Data Exfil Agent" },
  { id: 11, type: "GUARDIAN", ts: "T + 5m 58s", title: "Autonomous Containment", sub: "Session killed · Account locked · Evidence preserved", detail: "SIEM enriched. Legal-grade forensic package auto-generated.", mitre: "", agent: "Guardian" },
  { id: 12, type: "RESOLVED", ts: "T + 5m 58.487s", title: "Threat Neutralized", sub: "Zero impact. Zero analysts. Full evidence chain.", detail: "", mitre: "", agent: "" },
  { id: 13, type: "SCORE", ts: "", title: "", sub: "", detail: "", mitre: "", agent: "" },
];

const STAGE_DURATION = 3200;

const C = {
  teal: "#0D9488", tealLight: "#CCFBF1",
  navy: "#0F172A", navyMid: "#1E293B",
  red: "#DC2626", redSoft: "#FCA5A5", redBg: "#450A0A",
  muted: "#94A3B8", mutedDk: "#64748B",
  success: "#10B981", successBg: "#064E3B",
  white: "#FFFFFF",
};

export default function CinematicDemo() {
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

  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const total = STAGES.length;

  const advance = useCallback(() => {
    setIdx(prev => {
      if (prev >= total - 1) { clearInterval(timer.current); return prev; }
      return prev + 1;
    });
    setAnimKey(k => k + 1);
  }, [total]);

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(advance, STAGE_DURATION);
  }, [advance]);

  useEffect(() => {
    if (!paused) startTimer();
    return () => clearInterval(timer.current);
  }, [paused, startTimer]);

  const replay = () => { setIdx(0); setAnimKey(k => k + 1); setPaused(false); };
  const toggle = () => setPaused(p => !p);
  const goTo = (i) => { setIdx(i); setAnimKey(k => k + 1); };

  const s = STAGES[idx];
  const progress = idx / (total - 1);

  const bg = s.type === "ATTACKER" ? `radial-gradient(ellipse at 50% 40%, ${C.redBg} 0%, ${C.navy} 70%)`
    : s.type === "AEGIS" ? `radial-gradient(ellipse at 50% 40%, rgba(13,148,136,0.15) 0%, ${C.navy} 70%)`
    : s.type === "GUARDIAN" ? `radial-gradient(ellipse at 50% 40%, rgba(15,23,42,0.9) 0%, #000 70%)`
    : s.type === "RESOLVED" ? `radial-gradient(ellipse at 50% 40%, ${C.successBg} 0%, ${C.navy} 70%)`
    : s.type === "SCORE" ? `radial-gradient(ellipse at 50% 30%, rgba(13,148,136,0.12) 0%, ${C.navy} 70%)`
    : `radial-gradient(ellipse at 50% 40%, ${C.navyMid} 0%, ${C.navy} 70%)`;

  const accent = s.type === "ATTACKER" ? C.red : s.type === "AEGIS" ? C.teal : s.type === "GUARDIAN" ? C.white : s.type === "RESOLVED" ? C.success : C.teal;
  const mono = { fontFamily: "'DM Mono', monospace" };
  const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };

  return (
    <div style={{ position: "relative", width: "100%", height: "700px", background: C.navy, fontFamily: "'DM Sans', sans-serif", color: C.white, overflow: "hidden", userSelect: "none", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <style>{`
        @keyframes cd-fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cd-fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes cd-scaleIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        @keyframes cd-countUp { from { opacity:0; transform:translateY(20px) scale(0.9); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes cd-scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(700px); } }
        @keyframes cd-pulseGlow { 0%,100% { box-shadow: 0 0 20px rgba(13,148,136,0.3); } 50% { box-shadow: 0 0 40px rgba(13,148,136,0.6); } }
        .cd-scan { position:absolute; left:0; right:0; height:2px; background: linear-gradient(90deg, transparent, rgba(13,148,136,0.15), transparent); animation: cd-scanline 4s linear infinite; pointer-events:none; z-index:1; }
        .cd-pip { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.15); cursor:pointer; transition:all 0.3s; flex-shrink:0; }
        .cd-pip:hover { background:rgba(255,255,255,0.5); transform:scale(1.5); }
        .cd-pip.done { background:${C.teal}; }
        .cd-pip.active { background:${C.white}; transform:scale(1.6); box-shadow:0 0 8px rgba(255,255,255,0.4); }
        .cd-pip.attacker.done { background:${C.red}; }
        .cd-ctrl { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); color:white; border-radius:8px; padding:7px 14px; font-family:'DM Mono',monospace; font-size:11px; cursor:pointer; transition:all 0.2s; }
        .cd-ctrl:hover { background:rgba(255,255,255,0.15); }
      `}</style>

      <div style={{ position: "absolute", inset: 0, background: bg, transition: "background 1s ease" }} />
      <div className="cd-scan" />
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
          <span style={{ ...mono, fontSize: 10, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>AEGIS · Live Simulation</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="cd-ctrl" onClick={toggle}>{paused ? "▶ Play" : "❚❚ Pause"}</button>
          <button className="cd-ctrl" onClick={replay}>↺ Replay</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.05)", zIndex: 20 }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: `linear-gradient(90deg, ${accent}, ${C.teal})`, transition: "width 0.6s ease", boxShadow: `0 0 12px ${accent}` }} />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "72px 28px 90px", textAlign: "center" }}>

        {s.type === "INTRO" && (
          <div key={animKey} style={{ animation: "cd-fadeUp 0.8s ease both" }}>
            <div style={{ ...mono, fontSize: 11, color: C.teal, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 18 }}>SENTRIXI PRESENTS</div>
            <h2 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 14 }}>
              AEGIS <span style={{ ...serif, fontWeight: 400, color: C.muted }}>vs.</span> <span style={{ color: C.red }}>Scattered Spider</span>
            </h2>
            <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)", color: C.muted, maxWidth: 460, margin: "0 auto", lineHeight: 1.5 }}>
              A nation-grade attack. <span style={{ color: C.white }}>Neutralized in 487ms.</span>
            </p>
          </div>
        )}

        {(s.type === "ATTACKER" || s.type === "AEGIS" || s.type === "GUARDIAN") && (
          <div key={animKey} style={{ maxWidth: 640, width: "100%" }}>
            <div style={{ animation: "cd-fadeIn 0.5s ease both", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
              <span style={{ ...mono, fontSize: 12, color: C.muted }}>{s.ts}</span>
              <span style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 6, background: s.type === "ATTACKER" ? "rgba(220,38,38,0.15)" : s.type === "GUARDIAN" ? "rgba(255,255,255,0.1)" : "rgba(13,148,136,0.15)", color: accent, border: `1px solid ${s.type === "ATTACKER" ? "rgba(220,38,38,0.25)" : s.type === "GUARDIAN" ? "rgba(255,255,255,0.15)" : "rgba(13,148,136,0.25)"}` }}>
                {s.type === "AEGIS" ? "AEGIS AGENT" : s.type}
              </span>
              {s.mitre && <span style={{ ...mono, fontSize: 10, color: C.mutedDk, background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: 6 }}>{s.mitre}</span>}
            </div>
            <h2 style={{ animation: "cd-fadeUp 0.6s ease both", animationDelay: "0.1s", fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12, color: s.type === "ATTACKER" ? C.redSoft : C.white }}>{s.title}</h2>
            <p style={{ animation: "cd-fadeUp 0.6s ease both", animationDelay: "0.2s", fontSize: "clamp(0.95rem, 2.2vw, 1.25rem)", color: C.muted, lineHeight: 1.5, marginBottom: 10, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>{s.sub}</p>
            {s.detail && <p style={{ animation: "cd-fadeUp 0.6s ease both", animationDelay: "0.3s", fontSize: 13, color: C.mutedDk, lineHeight: 1.6, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>{s.detail}</p>}
            {s.agent && (
              <div style={{ animation: "cd-scaleIn 0.5s ease both, cd-pulseGlow 2.5s ease-in-out infinite", animationDelay: "0.4s", marginTop: 26, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(13,148,136,0.1)", border: "1px solid rgba(13,148,136,0.2)", borderRadius: 100, padding: "7px 18px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.type === "GUARDIAN" ? C.white : C.teal }} />
                <span style={{ ...mono, fontSize: 12, color: s.type === "GUARDIAN" ? C.white : C.tealLight }}>⚡ {s.agent}</span>
              </div>
            )}
          </div>
        )}

        {s.type === "RESOLVED" && (
          <div key={animKey} style={{ maxWidth: 560 }}>
            <div style={{ animation: "cd-fadeIn 0.5s ease both", ...mono, fontSize: 12, color: C.success, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>✓ THREAT NEUTRALIZED</div>
            <h2 style={{ animation: "cd-fadeUp 0.7s ease both", animationDelay: "0.15s", fontSize: "clamp(1.8rem, 5.5vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 14, color: C.success }}>{s.title}</h2>
            <p style={{ animation: "cd-fadeUp 0.6s ease both", animationDelay: "0.3s", fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)", color: C.muted, lineHeight: 1.5 }}>{s.sub}</p>
          </div>
        )}

        {s.type === "SCORE" && (
          <div key={animKey} style={{ maxWidth: 680, width: "100%" }}>
            <div style={{ animation: "cd-fadeIn 0.5s ease both", ...mono, fontSize: 11, color: C.teal, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>MISSION COMPLETE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
              {[
                { num: "487ms", label: "Total response", delay: "0.1s" },
                { num: "0 bytes", label: "Data exfiltrated", delay: "0.25s" },
                { num: "0", label: "Analysts required", delay: "0.4s" },
                { num: "12", label: "MITRE techniques", delay: "0.55s" },
              ].map(c => (
                <div key={c.label} style={{ animation: `cd-countUp 0.7s ease both`, animationDelay: c.delay, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "24px 10px", textAlign: "center" }}>
                  <div style={{ ...mono, fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)", fontWeight: 500, color: C.teal, marginBottom: 5 }}>{c.num}</div>
                  <div style={{ fontSize: 11, color: C.mutedDk }}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ animation: "cd-fadeUp 0.6s ease both", animationDelay: "0.7s" }}>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 4 }}>
                Average SOC response: <span style={{ color: C.red, fontWeight: 600 }}>4.2 hours</span>
                <span style={{ margin: "0 10px", color: C.mutedDk }}>·</span>
                AEGIS: <span style={{ color: C.teal, fontWeight: 600 }}>487ms</span>
              </p>
              <p style={{ fontSize: 12, color: C.mutedDk }}>Autonomous response · Full evidence chain preserved · Zero analyst intervention</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "16px 20px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "linear-gradient(transparent, rgba(15,23,42,0.8))" }}>
        {STAGES.map((st, i) => {
          const pipType = st.type === "ATTACKER" ? "attacker" : "";
          const state = i < idx ? "done" : i === idx ? "active" : "";
          return <div key={i} className={`cd-pip ${pipType} ${state}`} onClick={() => goTo(i)} title={st.title || "Intro"} />;
        })}
      </div>
    </div>
  );
}
