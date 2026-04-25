"use client";
// app/shield/page.jsx — AEGIS Shield Landing Page
// Target audience: CISO / CTO / VP R&D
// Goal: Book a technical demo (email form)

import { useState } from "react";
import Link from "next/link";

const ACCENT = "#00d4ff";
const ACCENT_DIM = "rgba(0,212,255,0.12)";
const THREAT_RED = "#ff4444";

export default function ShieldPage() {
  return (
    <main
      style={{
        background: "#04080f",
        color: "#e8edf5",
        minHeight: "100vh",
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,210,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Nav />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "8rem 2rem 4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(0,80,160,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", border: "1px solid rgba(0,210,255,0.2)", borderRadius: "20px", fontSize: "0.72rem", letterSpacing: "0.15em", color: ACCENT, marginBottom: "2rem", background: "rgba(0,210,255,0.04)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT }} />
          AEGIS SHIELD · TIER 1
        </div>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            maxWidth: "900px",
            marginBottom: "1.5rem",
            color: "#f0f4fa",
          }}
        >
          The Breach Is Already
          <br />
          <span style={{ color: ACCENT }}>Inside Your Database.</span>
        </h1>

        <p style={{ fontSize: "1.1rem", color: "#7a92aa", maxWidth: "600px", lineHeight: 1.7, marginBottom: "1rem" }}>
          Perimeter tools guard the edge. But once credentials are valid,
          every malicious query looks identical to a legitimate one.
          AEGIS Shield sees the difference — at the query layer, in real time.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#4a6a80", marginBottom: "3rem", letterSpacing: "0.04em" }}>
          Now in limited deployment · Regulated financial environments
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="#demo"
            style={{
              padding: "0.75rem 2rem",
              background: ACCENT,
              color: "#000",
              borderRadius: "6px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.88rem",
              letterSpacing: "0.04em",
            }}
          >
            Request Technical Demo
          </a>
          <a
            href="#how-it-works"
            style={{
              padding: "0.75rem 2rem",
              border: "1px solid rgba(0,210,255,0.3)",
              color: ACCENT,
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "0.88rem",
              letterSpacing: "0.04em",
            }}
          >
            See Architecture
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginTop: "5rem",
            padding: "2rem 2.5rem",
            border: "1px solid rgba(0,210,255,0.1)",
            borderRadius: "12px",
            background: "rgba(0,15,30,0.6)",
            maxWidth: "780px",
            width: "100%",
          }}
        >
          <StatBox value="90-Day" label="Behavioral baseline" />
          <StatBox value="<1s" label="Detection latency" />
          <StatBox value="6" label="Threat categories" />
          <StatBox value="Zero" label="ETL pipeline" />
        </div>
      </section>

      {/* THE GAP */}
      <section
        id="why"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "7rem 2rem",
          background: "rgba(0,10,20,0.7)",
          borderTop: "1px solid rgba(0,210,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionLabel>THE PROBLEM</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, maxWidth: "680px", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            Your security stack has a structural blind spot.
          </h2>
          <p style={{ color: "#7a92aa", maxWidth: "560px", lineHeight: 1.8, marginBottom: "4rem", fontSize: "1rem" }}>
            Endpoints are monitored. Networks are filtered. Identities are managed.
            But the moment a query executes, your visibility ends.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(0,210,255,0.08)", border: "1px solid rgba(0,210,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
            <GapCard icon="🔒" title="Perimeter" status="Monitored" statusColor={ACCENT} items={["Firewall", "WAF", "IDS/IPS", "VPN"]} />
            <GapCard icon="👤" title="Identity" status="Monitored" statusColor={ACCENT} items={["IAM", "MFA", "RBAC", "SSO"]} />
            <GapCard icon="🗄️" title="Database Layer" status="Blind Spot" statusColor={THREAT_RED} items={["Query execution", "Data access patterns", "Behavioral deviation", "Insider movement"]} highlight />
          </div>

          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem 2rem",
              border: "1px solid rgba(255,68,68,0.2)",
              borderLeft: "4px solid " + THREAT_RED,
              borderRadius: "8px",
              background: "rgba(255,68,68,0.04)",
              maxWidth: "680px",
            }}
          >
            <p style={{ color: "#e8edf5", fontSize: "1rem", lineHeight: 1.7 }}>
              <strong style={{ color: THREAT_RED }}>The attacker's advantage:</strong> Valid credentials make every query look legitimate.
              DAM tools see logs — after the fact. AEGIS Shield sees intent — at execution time.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ position: "relative", zIndex: 1, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel>ARCHITECTURE</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
            Behavioral detection at the query layer.
          </h2>
          <p style={{ color: "#7a92aa", maxWidth: "520px", lineHeight: 1.8, marginBottom: "4rem", fontSize: "0.95rem" }}>
            Shield runs inside your HTAP database — not beside it — with zero ETL and sub-second detection latency.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            <FeatureCard
              num="01"
              title="Behavioral Baselining"
              body="Learns individual query patterns per user, role, application, and time window across 90-day rolling baselines. Every deviation scored against the individual fingerprint — not population averages."
              accent={ACCENT}
            />
            <FeatureCard
              num="02"
              title="Query Intent Classification"
              body="Every query classified in real time before results return: routine access, ad-hoc, bulk export, schema reconnaissance, privilege probing. Risk-scored at execution."
              accent={ACCENT}
            />
            <FeatureCard
              num="03"
              title="Exfiltration Pattern Detection"
              body="Detects data staging, chunked exports, cumulative over-access, and obfuscated queries. Tracks longitudinal patterns across weeks — not just individual events."
              accent={ACCENT}
            />
            <FeatureCard
              num="04"
              title="Cyber Intelligence Enrichment"
              body="AI agents correlate database anomalies with live threat intelligence — matching TTPs, IOCs, and adversary campaigns to contextualize every alert with real-world data."
              accent={ACCENT}
            />
            <FeatureCard
              num="05"
              title="Data Integrity Monitoring"
              body="Statistical write-pattern analysis detects subtle record manipulation — modified amounts, altered identifiers, phantom transactions. Catches data poisoning before it compounds."
              accent={ACCENT}
            />
            <FeatureCard
              num="06"
              title="Compliance Automation"
              body="Pre-built evidence packages for SOC 2, NYDFS §500, DORA, PCI-DSS, HIPAA. Audit-ready reports generated automatically. Zero manual log pulls."
              accent={ACCENT}
            />
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem 2rem",
              borderRadius: "8px",
              background: "rgba(0,15,30,0.8)",
              border: "1px solid rgba(0,210,255,0.08)",
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#4a6a80" }}>Security & Privacy:</span>
            {["SOC 2 Type II", "ISO 27001", "GDPR", "Data Residency"].map((b) => (
              <span key={b} style={{ fontSize: "0.78rem", color: "#5a8a9a", padding: "0.2rem 0.7rem", border: "1px solid rgba(0,210,255,0.15)", borderRadius: "3px" }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* KILL CHAIN */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "7rem 2rem",
          background: "rgba(0,8,18,0.8)",
          borderTop: "1px solid rgba(0,210,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionLabel>DETECTION STORY</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "4rem", lineHeight: 1.2 }}>
            Shield intercepts at every stage of the kill chain.
          </h2>

          <KillChain />

          <div style={{ marginTop: "4rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, marginBottom: "2rem", color: "#c0d0e0" }}>
              Real-world threat scenarios
            </h3>
            <div style={{ display: "grid", gap: "1px", background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
              <Scenario
                title="Credential Misuse — Anomalous Data Access"
                detail="A user account systematically exports customer PII and financial records over 48 hours using valid credentials. Perimeter tools see normal traffic. Shield detects the behavioral divergence from the user's 90-day baseline within the first query batch."
                mitre="T1078 · T1530"
              />
              <Scenario
                title="Slow-and-Low Cumulative Exfiltration"
                detail="500 records per query, 3x daily, for 30 days — staying under DAM thresholds. Total silent exposure: 45,000 records. Shield detects the longitudinal access pattern within the first week and flags cumulative risk escalation."
                mitre="T1020 · T1041"
              />
              <Scenario
                title="Data Integrity / Poisoning Attack"
                detail="Write access exploited to subtly modify financial records — small percentage changes to transaction amounts, altered counterparty identifiers, phantom transactions. Shield's statistical write-pattern analysis detects drift from normal modification patterns."
                mitre="T1565 · T1491"
              />
              <Scenario
                title="Compromised Service Account — Schema Recon"
                detail="Attacker with stolen CI/CD credentials systematically maps the entire database schema, identifies high-value tables, stages data in small chunks. Shield classifies schema recon queries at execution time and escalates immediately."
                mitre="T1213 · T1074"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ position: "relative", zIndex: 1, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionLabel>PRICING</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
            Transparent pricing. No surprises.
          </h2>
          <p style={{ color: "#7a92aa", marginBottom: "4rem", fontSize: "0.95rem" }}>Annual contracts. On-prem option available on Enterprise tier.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
            <PricingCard tier="Starter" price="$24K" period="/yr" nodes="Up to 5 nodes" features={["Behavioral analytics", "Anomaly detection", "1 compliance framework", "Email support"]} accent={ACCENT} />
            <PricingCard tier="Pro" price="$72K" period="/yr" nodes="Up to 25 nodes" features={["Full behavioral + threat detection", "3 compliance frameworks", "Cyber intel enrichment", "API integrations", "Priority support"]} accent={ACCENT} featured />
            <PricingCard tier="Enterprise" price="Custom" period="" nodes="Unlimited nodes" features={["Full suite + custom compliance", "Dedicated AI model training", "24/7 SLA", "On-prem option", "Dedicated CSM"]} accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* DEMO FORM */}
      <section
        id="demo"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "7rem 2rem",
          background: "rgba(0,8,18,0.9)",
          borderTop: "1px solid rgba(0,210,255,0.08)",
        }}
      >
        <div style={{ maxWidth: "580px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>GET STARTED</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
            Request a technical demo.
          </h2>
          <p style={{ color: "#7a92aa", marginBottom: "3rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
            We'll walk through your specific database environment, threat model, and compliance requirements.
            No slides. No generic pitch. A real technical conversation.
          </p>
          <DemoForm productLine="Shield" />
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </main>
  );
}

/* ─── SUB-COMPONENTS ─── */

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", height: "64px", borderBottom: "1px solid rgba(0,210,255,0.08)", background: "rgba(4,8,15,0.9)", backdropFilter: "blur(12px)" }}>
      <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", letterSpacing: "0.08em", color: "#e8edf5", textDecoration: "none" }}>SENTRIXI</Link>
      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", padding: "0.3rem 0.8rem", border: "1px solid rgba(0,210,255,0.25)", borderRadius: "20px", background: "rgba(0,210,255,0.06)" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT }} />
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: ACCENT }}>AEGIS SHIELD</span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link href="/sentinel" style={{ color: "#7a92aa", textDecoration: "none", fontSize: "0.82rem" }}>Sentinel →</Link>
        <a href="#demo" style={{ padding: "0.4rem 1.2rem", background: ACCENT, color: "#000", borderRadius: "4px", fontSize: "0.78rem", textDecoration: "none", fontWeight: 600 }}>Request Demo</a>
      </div>
    </nav>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: ACCENT, opacity: 0.7, marginBottom: "1rem" }}>{children}</div>
  );
}

function StatBox({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", color: "#e8edf5", marginBottom: "0.3rem" }}>{value}</div>
      <div style={{ fontSize: "0.72rem", color: "#4a6a80", letterSpacing: "0.04em" }}>{label}</div>
    </div>
  );
}

function GapCard({ icon, title, status, statusColor, items, highlight }) {
  return (
    <div style={{ padding: "2rem", background: highlight ? "rgba(255,68,68,0.04)" : "rgba(0,15,30,0.7)" }}>
      <div style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>{icon}</div>
      <div style={{ fontSize: "1rem", fontWeight: 600, color: "#d0dde8", marginBottom: "0.5rem" }}>{title}</div>
      <div style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.1em", color: statusColor, border: `1px solid ${statusColor}40`, borderRadius: "3px", padding: "0.15rem 0.5rem", marginBottom: "1rem" }}>{status}</div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(i => (
          <li key={i} style={{ fontSize: "0.82rem", color: "#5a7a8a", padding: "0.2rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: statusColor, flexShrink: 0 }} />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({ num, title, body, accent }) {
  return (
    <div style={{ padding: "1.75rem", border: "1px solid rgba(0,210,255,0.08)", borderRadius: "10px", background: "rgba(0,12,24,0.6)", transition: "border-color 0.2s" }}>
      <div style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: accent, opacity: 0.5, marginBottom: "0.75rem" }}>{num}</div>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#d0dde8", marginBottom: "0.75rem", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: "0.82rem", color: "#5a7a90", lineHeight: 1.7 }}>{body}</p>
    </div>
  );
}

function KillChain() {
  const steps = [
    { label: "Access Gained", sub: "Stolen credentials", status: "active" },
    { label: "Reconnaissance", sub: "Schema mapping", status: "active" },
    { label: "Data Staging", sub: "Chunk reads", status: "detected" },
    { label: "Exfiltration", sub: "Data movement", status: "blocked" },
    { label: "Data Sold", sub: "Breach complete", status: "blocked" },
  ];
  const colors = { active: "#ff9900", detected: ACCENT, blocked: "#ff4444" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: "1rem" }}>
      {steps.map((s, i) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <div style={{ textAlign: "center", width: "140px" }}>
            {s.status === "detected" && (
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: ACCENT, marginBottom: "0.5rem", padding: "0.2rem 0.5rem", border: `1px solid ${ACCENT}40`, borderRadius: "3px", display: "inline-block" }}>
                AEGIS DETECTS
              </div>
            )}
            {s.status === "blocked" && (
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "#ff4444", marginBottom: "0.5rem", padding: "0.2rem 0.5rem", border: "1px solid rgba(255,68,68,0.4)", borderRadius: "3px", display: "inline-block" }}>
                BLOCKED
              </div>
            )}
            {s.status === "active" && <div style={{ height: "1.4rem", marginBottom: "0.5rem" }} />}
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `2px solid ${colors[s.status]}`, background: `${colors[s.status]}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem", opacity: s.status === "blocked" ? 0.4 : 1 }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: colors[s.status] }} />
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: s.status === "blocked" ? "#3a4f62" : "#c0d0e0" }}>{s.label}</div>
            <div style={{ fontSize: "0.7rem", color: "#3a4f62", marginTop: "0.2rem" }}>{s.sub}</div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: "40px", height: "1px", background: s.status === "detected" || steps[i + 1]?.status === "blocked" ? "rgba(255,68,68,0.3)" : "rgba(255,153,0,0.3)", flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Scenario({ title, detail, mitre }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{ padding: "1.25rem 1.5rem", background: open ? "rgba(0,30,60,0.5)" : "rgba(0,15,30,0.6)", cursor: "pointer", transition: "background 0.2s" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.9rem", color: "#c0d0e0", fontWeight: 500 }}>{title}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.68rem", color: "#4a6a80", letterSpacing: "0.06em" }}>{mitre}</span>
          <span style={{ color: ACCENT, fontSize: "0.9rem", transition: "transform 0.2s", display: "block", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
        </div>
      </div>
      {open && <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#6a8aa0", lineHeight: 1.7 }}>{detail}</p>}
    </div>
  );
}

function PricingCard({ tier, price, period, nodes, features, accent, featured }) {
  return (
    <div style={{ padding: "2rem", border: `1px solid ${featured ? accent + "50" : "rgba(0,210,255,0.1)"}`, borderRadius: "10px", background: featured ? "rgba(0,30,60,0.4)" : "rgba(0,12,24,0.5)", position: "relative" }}>
      {featured && <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: accent, color: "#000", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", padding: "0.25rem 1rem", borderRadius: "0 0 6px 6px" }}>MOST POPULAR</div>}
      <div style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#5a8a9a", marginBottom: "1rem" }}>{tier.toUpperCase()}</div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.5rem", color: "#e8edf5", marginBottom: "0.25rem" }}>
        {price}<span style={{ fontSize: "1rem", color: "#4a6a80" }}>{period}</span>
      </div>
      <div style={{ fontSize: "0.82rem", color: "#4a6a80", marginBottom: "1.5rem" }}>{nodes}</div>
      <div style={{ borderTop: "1px solid rgba(0,210,255,0.08)", paddingTop: "1.5rem" }}>
        {features.map((f) => (
          <div key={f} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.6rem", fontSize: "0.82rem", color: "#7a92aa" }}>
            <span style={{ color: accent, flexShrink: 0, marginTop: "1px" }}>✓</span>
            {f}
          </div>
        ))}
      </div>
      <a
        href="#demo"
        style={{ display: "block", marginTop: "1.5rem", padding: "0.7rem", textAlign: "center", border: `1px solid ${accent}40`, borderRadius: "6px", color: accent, textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, background: featured ? `${accent}15` : "transparent" }}
      >
        {price === "Custom" ? "Contact Sales" : "Get Started"}
      </a>
    </div>
  );
}

function DemoForm({ productLine }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", role: "", email: "", message: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.company) return;
    const subject = encodeURIComponent(`AEGIS ${productLine} — Demo Request from ${form.company}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nRole: ${form.role}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:register@sentrixi.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: "3rem", border: "1px solid rgba(0,210,255,0.2)", borderRadius: "12px", background: "rgba(0,30,60,0.4)", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: ACCENT, marginBottom: "0.75rem" }}>Request sent.</h3>
        <p style={{ color: "#7a92aa", fontSize: "0.9rem" }}>We'll be in touch within one business day.</p>
      </div>
    );
  }

  const inputStyle = { width: "100%", padding: "0.7rem 1rem", background: "rgba(0,15,30,0.8)", border: "1px solid rgba(0,210,255,0.12)", borderRadius: "6px", color: "#e8edf5", fontSize: "0.88rem", fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ display: "grid", gap: "1rem", textAlign: "left" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.72rem", color: "#4a6a80", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>FULL NAME *</label>
          <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
        </div>
        <div>
          <label style={{ fontSize: "0.72rem", color: "#4a6a80", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>COMPANY *</label>
          <input style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.72rem", color: "#4a6a80", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>ROLE</label>
          <input style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="CISO / CTO / VP R&D" />
        </div>
        <div>
          <label style={{ fontSize: "0.72rem", color: "#4a6a80", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>WORK EMAIL *</label>
          <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" />
        </div>
      </div>
      <div>
        <label style={{ fontSize: "0.72rem", color: "#4a6a80", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>YOUR ENVIRONMENT (optional)</label>
        <textarea style={{ ...inputStyle, height: "90px", resize: "vertical" }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Database platform, node count, compliance requirements..." />
      </div>
      <button
        onClick={handleSubmit}
        style={{ padding: "0.85rem", background: ACCENT, color: "#000", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.06em", cursor: "pointer" }}
      >
        REQUEST TECHNICAL DEMO →
      </button>
      <p style={{ fontSize: "0.72rem", color: "#3a4f62", textAlign: "center" }}>
        We respond within 1 business day. No sales sequences. No spam.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, padding: "2rem 3rem", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "#3a4f62" }}>
      <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1rem", color: "#4a6070", textDecoration: "none" }}>SENTRIXI</Link>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link href="/shield" style={{ color: "#3a4f62", textDecoration: "none" }}>Shield</Link>
        <Link href="/sentinel" style={{ color: "#3a4f62", textDecoration: "none" }}>Sentinel</Link>
      </div>
      <span>© 2026 Sentrixi</span>
    </footer>
  );
}
