"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const STAGES = [
  { id: 0, type: "INTRO", ts: "", title: "", sub: "", detail: "", mitre: "", agent: "" },
  {
    id: 1, type: "CONTEXT", ts: "",
    title: "What Actually Happened",
    sub: "The Snowflake breach (2024) was the largest cloud data theft of the decade.",
    detail: "165 organizations compromised. 500M+ individuals affected. AT&T, Ticketmaster, Santander, Neiman Marcus, Advance Auto Parts — all breached through one campaign. No malware. No exploits. Just stolen credentials.",
    mitre: "", agent: "",
    stats: [
      { num: "165", label: "Organizations hit" },
      { num: "500M+", label: "Individuals affected" },
      { num: "$370K", label: "AT&T ransom paid" },
      { num: "40 days", label: "Undetected access" },
    ],
  },
  { id: 2, type: "ATTACKER", ts: "Months before", title: "Infostealer Malware Deployed", sub: "Contractor devices infected with Lumma Stealer, Vidar, RedLine", detail: "Credentials harvested from contractor systems used for both work and personal activity. Snowflake passwords stored unencrypted in Jira.", mitre: "T1589.001", agent: "" },
  { id: 3, type: "ATTACKER", ts: "Weeks before", title: "Stolen Credentials Hit the Dark Web", sub: "Snowflake usernames + passwords sold to UNC5537 via Initial Access Brokers", detail: "80% of compromised accounts had prior credential exposure. Some credentials dated back to 2020 — never rotated, never expired. None had MFA enabled.", mitre: "T1552", agent: "" },
  { id: 4, type: "AEGIS", ts: "T + 0s", title: "Credential Exposure Detected", sub: "Dark web monitoring matches Snowflake credentials to active accounts", detail: "AEGIS Dark Web Intel Agent cross-references leaked credential dumps against active identity inventory. 47 credentials flagged as exposed. Automated rotation queued.", mitre: "T1589.001", agent: "Dark Web Intel Agent" },
  { id: 5, type: "ATTACKER", ts: "T + 12h", title: "Login via SnowSight — No MFA", sub: "UNC5537 authenticates using stolen credentials from Mullvad VPN", detail: "Attacker logs in via Snowflake's native web UI from a VPN IP. Account has no MFA, no network allow-list. Standard authentication succeeds.", mitre: "T1078", agent: "" },
  { id: 6, type: "AEGIS", ts: "T + 12h 0.340s", title: "Anomalous Authentication — CRITICAL", sub: "New device · VPN IP (Mullvad) · No MFA · Credential flagged as exposed", detail: "Identity Agent correlates: previously-exposed credential + first-time device fingerprint + commercial VPN egress (AS16276) + no MFA. Session risk elevated to CRITICAL.", mitre: "T1078", agent: "Identity Agent" },
  { id: 7, type: "ATTACKER", ts: "T + 12h 3m", title: "FROSTBITE Recon Tool Deployed", sub: "SQL reconnaissance: listing users, roles, schemas, session IDs", detail: "Custom tool (FROSTBITE) connects via Snowflake .NET driver. Enumerates all users, current roles, IP addresses, organization names. Maps every database and schema.", mitre: "T1087", agent: "" },
  { id: 8, type: "AEGIS", ts: "T + 12h 3m 0.180s", title: "SQL Reconnaissance Anomaly", sub: "Schema enumeration 94× baseline — SHOW USERS, SHOW SCHEMAS in bulk", detail: "Cloud Data Agent detects mass metadata queries from a session already flagged as CRITICAL. Behavioral pattern matches known cloud data exfil playbooks. Confidence: 0.72.", mitre: "T1087", agent: "Cloud Data Agent" },
  { id: 9, type: "ATTACKER", ts: "T + 12h 8m", title: "Data Staging via Temporary Stages", sub: "CREATE TEMPORARY STAGE + COPY INTO — 590M records queued", detail: "Attacker creates temporary staging tables, uses COPY INTO to compress data as GZIP. Targets customer PII, call metadata, payment records, and government-issued IDs.", mitre: "T1074.002", agent: "" },
  { id: 10, type: "AEGIS", ts: "T + 12h 8m 0.220s", title: "Exfiltration Staging Detected", sub: "Temporary stage creation + bulk COPY INTO from CRITICAL session", detail: "Data Exfil Agent detects: temporary stage creation (never used by this account before) + bulk COPY INTO commands + GZIP compression. Volume: 340× 30-day baseline.", mitre: "T1074.002", agent: "Data Exfil Agent" },
  { id: 11, type: "AEGIS", ts: "T + 12h 8m 0.410s", title: "Kill Chain: UNC5537 Snowflake Campaign", sub: "Campaign hypothesis formed — Confidence 0.94 → P0", detail: "Kill Chain Engine matches full TTP chain: infostealer creds → no MFA → SnowSight login → FROSTBITE recon → temp stage + COPY INTO. Matches UNC5537 playbook exactly.", mitre: "TA0001–TA0010", agent: "Kill Chain Engine" },
  { id: 12, type: "GUARDIAN", ts: "T + 12h 8m 0.612s", title: "Autonomous Containment", sub: "Session killed · Credentials rotated · Network policy enforced", detail: "All active sessions terminated. Password force-rotated. MFA enforcement applied. Network allow-list locked to corporate IPs only. Temporary stages dropped. Legal evidence package generated.", mitre: "", agent: "Guardian" },
  { id: 13, type: "RESOLVED", ts: "T + 12h 8m 0.612s", title: "Zero Records Exfiltrated", sub: "Zero bytes sold · Zero ransom paid · Full evidence chain preserved", detail: "", mitre: "", agent: "" },
  { id: 14, type: "COMPARE", ts: "", title: "", sub: "", detail: "", mitre: "", agent: "" },
  { id: 15, type: "SCORE", ts: "", title: "", sub: "", detail: "", mitre: "", agent: "" },
];

const STAGE_DURATION = 3800;

const C = {
  teal: "#0D9488", tealDark: "#0F766E", tealLight: "#CCFBF1",
  navy: "#0F172A", navyMid: "#1E293B",
  red: "#DC2626", redSoft: "#FCA5A5", redBg: "#450A0A",
  amber: "#F59E0B", amberBg: "#78350F",
  muted: "#94A3B8", mutedDk: "#64748B",
  success: "#10B981", successBg: "#064E3B",
  white: "#FFFFFF",
};

export default function SnowflakeDemo() {
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

  const bgMap = {
    INTRO: `radial-gradient(ellipse at 50% 40%, ${C.navyMid} 0%, #000 70%)`,
    CONTEXT: `radial-gradient(ellipse at 50% 30%, ${C.amberBg} 0%, ${C.navy} 70%)`,
    ATTACKER: `radial-gradient(ellipse at 50% 40%, ${C.redBg} 0%, ${C.navy} 70%)`,
    AEGIS: `radial-gradient(ellipse at 50% 40%, rgba(13,148,136,0.15) 0%, ${C.navy} 70%)`,
    GUARDIAN: `radial-gradient(ellipse at 50% 40%, rgba(15,23,42,0.95) 0%, #000 70%)`,
    RESOLVED: `radial-gradient(ellipse at 50% 40%, ${C.successBg} 0%, ${C.navy} 70%)`,
    COMPARE: `radial-gradient(ellipse at 50% 30%, ${C.redBg} 0%, ${C.navy} 70%)`,
    SCORE: `radial-gradient(ellipse at 50% 30%, rgba(13,148,136,0.12) 0%, ${C.navy} 70%)`,
  };

  const accentMap = {
    INTRO: C.teal, CONTEXT: C.amber, ATTACKER: C.red, AEGIS: C.teal,
    GUARDIAN: C.white, RESOLVED: C.success, COMPARE: C.red, SCORE: C.teal,
  };

  const bg = bgMap[s.type] || bgMap.INTRO;
  const accent = accentMap[s.type] || C.teal;
  const mono = { fontFamily: "'DM Mono', monospace" };
  const serif = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };

  return (
    <div style={{ position: "relative", width: "100%", height: "700px", background: C.navy, fontFamily: "'DM Sans', sans-serif", color: C.white, overflow: "hidden", userSelect: "none", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <style>{`
        @keyframes sf-fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes sf-fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes sf-scaleIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        @keyframes sf-countUp { from { opacity:0; transform:translateY(20px) scale(0.9); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes sf-scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(700px); } }
        @keyframes sf-pulseGlow { 0%,100% { box-shadow: 0 0 20px rgba(13,148,136,0.3); } 50% { box-shadow: 0 0 40px rgba(13,148,136,0.6); } }
        .sf-scan { position:absolute; left:0; right:0; height:2px; background: linear-gradient(90deg, transparent, rgba(13,148,136,0.12), transparent); animation: sf-scanline 5s linear infinite; pointer-events:none; z-index:1; }
        .sf-pip { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.12); cursor:pointer; transition:all 0.3s; flex-shrink:0; }
        .sf-pip:hover { background:rgba(255,255,255,0.4); transform:scale(1.5); }
        .sf-pip.done { background:${C.teal}; } .sf-pip.done.red { background:${C.red}; } .sf-pip.done.amber { background:${C.amber}; }
        .sf-pip.active { background:white; transform:scale(1.8); box-shadow:0 0 8px rgba(255,255,255,0.4); }
        .sf-ctrl { background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1); color:white; border-radius:8px; padding:7px 14px; font-family:'DM Mono',monospace; font-size:11px; cursor:pointer; transition:all 0.2s; }
        .sf-ctrl:hover { background:rgba(255,255,255,0.14); }
        .sf-compare-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:560px; width:100%; margin:0 auto 10px; }
        .sf-cell-bad { background:rgba(220,38,38,0.08); border:1px solid rgba(220,38,38,0.15); border-radius:10px; padding:14px 12px; text-align:center; }
        .sf-cell-good { background:rgba(13,148,136,0.08); border:1px solid rgba(13,148,136,0.15); border-radius:10px; padding:14px 12px; text-align:center; }
      `}</style>

      <div style={{ position: "absolute", inset: 0, background: bg, transition: "background 1.2s ease" }} />
      <div className="sf-scan" />
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
          <span style={{ ...mono, fontSize: 10, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>AEGIS · Snowflake Campaign Simulation</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="sf-ctrl" onClick={toggle}>{paused ? "▶ Play" : "❚❚ Pause"}</button>
          <button className="sf-ctrl" onClick={replay}>↺ Replay</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.04)", zIndex: 20 }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: `linear-gradient(90deg, ${accent}, ${C.teal})`, transition: "width 0.6s ease", boxShadow: `0 0 12px ${accent}` }} />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "72px 24px 90px", textAlign: "center" }}>

        {s.type === "INTRO" && (
          <div key={animKey} style={{ animation: "sf-fadeUp 0.9s ease both" }}>
            <div style={{ ...mono, fontSize: 10, color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>BASED ON THE REAL 2024 BREACH</div>
            <h2 style={{ fontSize: "clamp(2rem, 5.5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 10 }}>
              AEGIS <span style={{ ...serif, fontWeight: 400, color: C.muted }}>vs.</span> <span style={{ color: C.red }}>UNC5537</span>
            </h2>
            <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.15rem)", color: C.muted, maxWidth: 480, margin: "0 auto 18px", lineHeight: 1.5 }}>
              The <span style={{ color: C.amber }}>Snowflake campaign</span> breached 165 companies.
              <br />AEGIS would have stopped it at <span style={{ color: C.white, fontWeight: 600 }}>first credential use</span>.
            </p>
            <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {["AT&T", "Ticketmaster", "Santander", "Neiman Marcus", "Advance Auto"].map(v => (
                <span key={v} style={{ ...mono, fontSize: 10, color: C.mutedDk, background: "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)" }}>{v}</span>
              ))}
            </div>
          </div>
        )}

        {s.type === "CONTEXT" && (
          <div key={animKey} style={{ maxWidth: 620, width: "100%" }}>
            <div style={{ animation: "sf-fadeIn 0.5s ease both", ...mono, fontSize: 10, color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>⚠ REAL INCIDENT — 2024</div>
            <h2 style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.1s", fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>{s.title}</h2>
            <p style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.2s", fontSize: "clamp(0.85rem, 2vw, 1rem)", color: C.muted, lineHeight: 1.55, maxWidth: 500, margin: "0 auto 20px" }}>{s.detail}</p>
            <div style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.35s", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, maxWidth: 540, margin: "0 auto" }}>
              {s.stats.map((st, i) => (
                <div key={st.label} style={{ animation: `sf-countUp 0.6s ease both`, animationDelay: `${0.4 + i * 0.1}s`, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)", borderRadius: 10, padding: "14px 6px" }}>
                  <div style={{ ...mono, fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 500, color: C.amber }}>{st.num}</div>
                  <div style={{ fontSize: 10, color: C.mutedDk, marginTop: 4 }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(s.type === "ATTACKER" || s.type === "AEGIS" || s.type === "GUARDIAN") && (
          <div key={animKey} style={{ maxWidth: 620, width: "100%" }}>
            <div style={{ animation: "sf-fadeIn 0.4s ease both", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              {s.ts && <span style={{ ...mono, fontSize: 12, color: C.muted }}>{s.ts}</span>}
              <span style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 6, background: s.type === "ATTACKER" ? "rgba(220,38,38,0.12)" : s.type === "GUARDIAN" ? "rgba(255,255,255,0.08)" : "rgba(13,148,136,0.12)", color: accent, border: `1px solid ${s.type === "ATTACKER" ? "rgba(220,38,38,0.2)" : s.type === "GUARDIAN" ? "rgba(255,255,255,0.12)" : "rgba(13,148,136,0.2)"}` }}>
                {s.type === "AEGIS" ? "AEGIS AGENT" : s.type}
              </span>
              {s.mitre && <span style={{ ...mono, fontSize: 10, color: C.mutedDk, background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: 6 }}>MITRE {s.mitre}</span>}
            </div>
            <h2 style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.08s", fontSize: "clamp(1.5rem, 4.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10, color: s.type === "ATTACKER" ? C.redSoft : C.white }}>{s.title}</h2>
            <p style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.18s", fontSize: "clamp(0.9rem, 2vw, 1.15rem)", color: C.muted, lineHeight: 1.5, marginBottom: 8, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>{s.sub}</p>
            {s.detail && <p style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.28s", fontSize: 12, color: C.mutedDk, lineHeight: 1.6, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>{s.detail}</p>}
            {s.agent && (
              <div style={{ animation: "sf-scaleIn 0.5s ease both, sf-pulseGlow 2.5s ease-in-out infinite 0.5s", marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, background: s.type === "GUARDIAN" ? "rgba(255,255,255,0.08)" : "rgba(13,148,136,0.08)", border: `1px solid ${s.type === "GUARDIAN" ? "rgba(255,255,255,0.12)" : "rgba(13,148,136,0.18)"}`, borderRadius: 100, padding: "7px 18px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.type === "GUARDIAN" ? C.white : C.teal }} />
                <span style={{ ...mono, fontSize: 12, color: s.type === "GUARDIAN" ? C.white : C.tealLight }}>⚡ {s.agent}</span>
              </div>
            )}
          </div>
        )}

        {s.type === "RESOLVED" && (
          <div key={animKey} style={{ maxWidth: 560 }}>
            <div style={{ animation: "sf-fadeIn 0.5s ease both", ...mono, fontSize: 12, color: C.success, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>✓ THREAT NEUTRALIZED</div>
            <h2 style={{ animation: "sf-fadeUp 0.7s ease both", animationDelay: "0.12s", fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 12, color: C.success }}>{s.title}</h2>
            <p style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.25s", fontSize: "clamp(0.9rem, 2vw, 1.15rem)", color: C.muted, lineHeight: 1.5 }}>{s.sub}</p>
          </div>
        )}

        {s.type === "COMPARE" && (
          <div key={animKey} style={{ maxWidth: 600, width: "100%" }}>
            <div style={{ animation: "sf-fadeIn 0.4s ease both", ...mono, fontSize: 10, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>REALITY VS. AEGIS</div>
            <h2 style={{ animation: "sf-fadeUp 0.5s ease both", animationDelay: "0.08s", fontSize: "clamp(1.3rem, 3.5vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>
              What <span style={{ color: C.red }}>happened</span> vs. what <span style={{ color: C.teal }}>would have</span>
            </h2>
            {[
              ["40 days undetected", "Detected in 340ms"],
              ["500M+ records stolen", "0 records exfiltrated"],
              ["$370K ransom paid (AT&T alone)", "$0 ransom · $0 breach cost"],
              ["165 organizations compromised", "Contained at first credential use"],
            ].map(([bad, good], i) => (
              <div className="sf-compare-row" key={i} style={{ animation: `sf-fadeUp 0.5s ease both`, animationDelay: `${0.2 + i * 0.1}s` }}>
                <div className="sf-cell-bad"><div style={{ ...mono, fontSize: 12, color: C.redSoft, lineHeight: 1.4 }}>{bad}</div></div>
                <div className="sf-cell-good"><div style={{ ...mono, fontSize: 12, color: C.tealLight, lineHeight: 1.4 }}>{good}</div></div>
              </div>
            ))}
            <div style={{ animation: "sf-fadeIn 0.5s ease both", animationDelay: "0.7s", display: "flex", justifyContent: "center", gap: 20, marginTop: 6 }}>
              <span style={{ ...mono, fontSize: 10, color: C.red }}>● Without AEGIS</span>
              <span style={{ ...mono, fontSize: 10, color: C.teal }}>● With AEGIS</span>
            </div>
          </div>
        )}

        {s.type === "SCORE" && (
          <div key={animKey} style={{ maxWidth: 680, width: "100%" }}>
            <div style={{ animation: "sf-fadeIn 0.4s ease both", ...mono, fontSize: 11, color: C.teal, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>MISSION COMPLETE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { num: "612ms", label: "Total response", delay: "0.1s" },
                { num: "0 bytes", label: "Data exfiltrated", delay: "0.22s" },
                { num: "0", label: "Analysts required", delay: "0.34s" },
                { num: "8", label: "MITRE techniques", delay: "0.46s" },
              ].map(c => (
                <div key={c.label} style={{ animation: `sf-countUp 0.7s ease both`, animationDelay: c.delay, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "22px 10px", textAlign: "center" }}>
                  <div style={{ ...mono, fontSize: "clamp(1.1rem, 3vw, 1.7rem)", fontWeight: 500, color: C.teal, marginBottom: 4 }}>{c.num}</div>
                  <div style={{ fontSize: 11, color: C.mutedDk }}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ animation: "sf-fadeUp 0.6s ease both", animationDelay: "0.6s" }}>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 4 }}>
                Real breach: <span style={{ color: C.red, fontWeight: 600 }}>40 days undetected</span>
                <span style={{ margin: "0 10px", color: C.mutedDk }}>·</span>
                AEGIS: <span style={{ color: C.teal, fontWeight: 600 }}>612ms</span>
              </p>
              <p style={{ fontSize: 12, color: C.mutedDk }}>Every agent, every detection, every containment action — fully autonomous.</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "16px 20px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
        {STAGES.map((st, i) => {
          const done = i < idx;
          const active = i === idx;
          const c = st.type === "ATTACKER" ? "red" : st.type === "CONTEXT" || st.type === "COMPARE" ? "amber" : "";
          return <div key={i} className={`sf-pip ${done ? `done ${c}` : ""} ${active ? "active" : ""}`} onClick={() => goTo(i)} title={st.title || st.type} />;
        })}
      </div>
    </div>
  );
}
