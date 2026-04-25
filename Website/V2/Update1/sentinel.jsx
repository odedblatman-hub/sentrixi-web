"use client";
// app/sentinel/page.jsx — AEGIS Sentinel Landing Page
// Target audience: Database vendors (embed) + Enterprise SOC (deploy)
// Goal: Partner conversation OR enterprise demo

import { useState } from "react";
import Link from "next/link";

const ACCENT = "#f59e0b";
const ACCENT_DIM = "rgba(245,158,11,0.12)";
const CYAN = "#00d4ff";

export default function SentinelPage() {
  const [activeAudience, setActiveAudience] = useState("vendor"); // "vendor" | "enterprise"

  return (
    <main
      style={{
        background: "#050810",
        color: "#e8edf5",
        minHeight: "100vh",
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      }}
    >
      {/* Warm grid texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(245,158,11,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.02) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Nav />

      {/* HERO with audience toggle */}
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
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "500px", background: "radial-gradient(ellipse, rgba(120,80,0,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "20px", fontSize: "0.72rem", letterSpacing: "0.15em", color: ACCENT, marginBottom: "2rem", background: "rgba(245,158,11,0.04)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT }} />
          AEGIS SENTINEL · TIER 2
        </div>

        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.6rem, 5.5vw, 5rem)", fontWeight: 400, lineHeight: 1.1, maxWidth: "900px", marginBottom: "1.5rem", color: "#f0f4fa" }}>
          The AI SIEM that connects
          <br />
          <span style={{ color: ACCENT }}>to everything you already run.</span>
        </h1>

        <p style={{ fontSize: "1rem", color: "#7a92aa", maxWidth: "580px", lineHeight: 1.7, marginBottom: "3rem" }}>
          30+ AI agents. Any datalake. Sub-second correlation across every telemetry source.
          Built for database vendors who want to own security — and enterprise teams who want to end the alert backlog.
        </p>

        {/* Audience toggle */}
        <div style={{ display: "flex", gap: 0, marginBottom: "3rem", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", overflow: "hidden" }}>
          <ToggleBtn label="I'm a database vendor" active={activeAudience === "vendor"} onClick={() => setActiveAudience("vendor")} />
          <ToggleBtn label="I run an enterprise SOC" active={activeAudience === "enterprise"} onClick={() => setActiveAudience("enterprise")} />
        </div>

        {/* Conditional CTA */}
        {activeAudience === "vendor" ? (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#partner" style={{ padding: "0.75rem 2rem", background: ACCENT, color: "#000", borderRadius: "6px", fontWeight: 600, textDecoration: "none", fontSize: "0.88rem", letterSpacing: "0.04em" }}>Request Partner Brief</a>
            <a href="#embed" style={{ padding: "0.75rem 2rem", border: "1px solid rgba(245,158,11,0.3)", color: ACCENT, borderRadius: "6px", textDecoration: "none", fontSize: "0.88rem" }}>See Embed Model</a>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#enterprise" style={{ padding: "0.75rem 2rem", background: ACCENT, color: "#000", borderRadius: "6px", fontWeight: 600, textDecoration: "none", fontSize: "0.88rem", letterSpacing: "0.04em" }}>Request Enterprise Demo</a>
            <a href="#agents" style={{ padding: "0.75rem 2rem", border: "1px solid rgba(245,158,11,0.3)", color: ACCENT, borderRadius: "6px", textDecoration: "none", fontSize: "0.88rem" }}>Explore AI Agents</a>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "5rem", padding: "2rem 2.5rem", border: "1px solid rgba(245,158,11,0.1)", borderRadius: "12px", background: "rgba(15,10,0,0.6)", maxWidth: "780px", width: "100%" }}>
          <StatBox value="30+" label="Specialized AI agents" color={ACCENT} />
          <StatBox value="<1s" label="Cross-source correlation" color={ACCENT} />
          <StatBox value="6+" label="Telemetry sources unified" color={ACCENT} />
          <StatBox value="70%" label="Cost reduction vs. Splunk" color={ACCENT} />
        </div>
      </section>

      {/* ─── VENDOR TRACK ─── */}
      <section
        id="embed"
        style={{ position: "relative", zIndex: 1, padding: "7rem 2rem", background: "rgba(15,10,0,0.7)", borderTop: "1px solid rgba(245,158,11,0.06)" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel color={ACCENT}>FOR DATABASE VENDORS</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2, maxWidth: "700px" }}>
            Turn security into a revenue line.
          </h2>
          <p style={{ color: "#7a92aa", maxWidth: "560px", lineHeight: 1.8, marginBottom: "4rem", fontSize: "0.95rem" }}>
            Security has always been external to the database. AEGIS Sentinel lets you embed it natively —
            transforming your platform into a security-first product and unlocking budgets your competitors can't reach.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
            <VendorBenefitCard
              title="White-Label or Co-Brand"
              body="Ship AEGIS Shield as a native security feature under your brand. Your customers get world-class behavioral detection. You own the relationship."
              icon="🏷️"
            />
            <VendorBenefitCard
              title="Revenue Share Model"
              body="Beyond white-label, participate in security revenue through a structured partnership model. Security budgets are 3–5× larger than infrastructure budgets."
              icon="💰"
            />
            <VendorBenefitCard
              title="Data Expansion"
              body="Security telemetry and behavioral signals drive significant increases in data ingestion and hot retention — translating directly to platform revenue."
              icon="📈"
            />
            <VendorBenefitCard
              title="Unlock Regulated Markets"
              body="Financial services, healthcare, government — these segments require database-native security. AEGIS removes the compliance blocker that has kept them out of your pipeline."
              icon="🔓"
            />
          </div>

          <div style={{ padding: "2rem", border: "1px solid rgba(245,158,11,0.15)", borderLeft: `4px solid ${ACCENT}`, borderRadius: "8px", background: "rgba(245,158,11,0.04)", maxWidth: "680px" }}>
            <p style={{ color: "#e8edf5", fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong style={{ color: ACCENT }}>The shift:</strong> Database vendors have been infrastructure providers.
              AEGIS makes you a security provider — with the margins, retention, and enterprise relationships that come with it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ENTERPRISE TRACK ─── */}
      <section
        id="enterprise"
        style={{ position: "relative", zIndex: 1, padding: "7rem 2rem" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel color={ACCENT}>FOR ENTERPRISE SOC TEAMS</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2, maxWidth: "700px" }}>
            30+ AI agents replacing a 15-person SOC team.
          </h2>
          <p style={{ color: "#7a92aa", maxWidth: "560px", lineHeight: 1.8, marginBottom: "4rem", fontSize: "0.95rem" }}>
            Every significant security event triggers all four agent teams simultaneously —
            detection, cyber intelligence, forensics, and response — working in parallel, not in sequence.
          </p>

          {/* Agent constellation */}
          <div id="agents">
            <AgentTeams />
          </div>
        </div>
      </section>

      {/* DATALAKE INTEGRATIONS */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", background: "rgba(10,8,0,0.7)", borderTop: "1px solid rgba(245,158,11,0.06)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel color={ACCENT}>INTEGRATIONS</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, marginBottom: "1rem" }}>
            Connect to any datalake.
          </h2>
          <p style={{ color: "#7a92aa", marginBottom: "3rem", lineHeight: 1.7, fontSize: "0.9rem" }}>
            No rip-and-replace required. Route telemetry from any source into your existing infrastructure.
            HTAP databases unlock maximum performance. All others supported.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.8rem", marginBottom: "2rem" }}>
            {["HTAP Databases", "Snowflake", "Databricks", "Amazon S3", "Azure ADLS", "Google BigQuery", "Apache Iceberg", "Delta Lake", "Parquet / ORC"].map((db) => (
              <span key={db} style={{ padding: "0.45rem 1rem", border: "1px solid rgba(245,158,11,0.18)", borderRadius: "4px", fontSize: "0.8rem", color: "#8a7a5a", letterSpacing: "0.04em", background: "rgba(245,158,11,0.03)" }}>{db}</span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.8rem" }}>
            {["Okta · Entra ID", "CrowdStrike · SentinelOne", "Office 365 · Proofpoint", "AWS · Azure · GCP", "Zscaler · Palo Alto", "AEGIS Shield"].map((src) => (
              <span key={src} style={{ padding: "0.35rem 0.8rem", border: "1px solid rgba(0,210,255,0.12)", borderRadius: "4px", fontSize: "0.75rem", color: "#5a7a8a" }}>{src}</span>
            ))}
          </div>
        </div>
      </section>

      {/* COMPETITIVE */}
      <section style={{ position: "relative", zIndex: 1, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionLabel color={ACCENT}>COMPETITIVE ADVANTAGE</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "4rem", lineHeight: 1.2 }}>
            Not just another SIEM.
          </h2>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            {[
              { label: "Investigation-First", title: "Built for DFIR, not dashboards", body: "Other platforms detect threats and hand off to human analysts. AEGIS conducts full forensic investigations autonomously. 20 specialized agents coordinate detection, behavioral profiling, forensics, and response — simultaneously." },
              { label: "Zero-ETL", title: "Real-time, not near-real-time", body: 'Even "decoupled" lakehouse SIEMs batch-ingest through ETL pipelines. "Near-real-time" means minutes. When mean time to exploit is 1.6 days, minutes compound into hours. HTAP databases run analytical queries on live transactional data — sub-second detection latency.' },
              { label: "Database-Native", title: "Detection inside the engine", body: "No lakehouse SIEM embeds inside the database. They ingest logs after the fact — creating a structural detection gap. AEGIS Shield runs inside the database engine itself. It sees every query at execution time and classifies intent before results return." },
              { label: "Cyber Intelligence", title: "Threat-informed, not just anomaly-detected", body: "Other SIEMs detect statistical anomalies but can't contextualize them. AEGIS deploys a dedicated Cyber Intelligence Team: TTP profilers, IOC enrichment agents, dark web monitors, and campaign trackers correlating every alert against live threat intelligence." },
            ].map((item) => (
              <div key={item.label} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "2rem", padding: "1.5rem 2rem", border: "1px solid rgba(245,158,11,0.08)", borderRadius: "10px", background: "rgba(15,10,0,0.5)" }}>
                <div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: ACCENT, opacity: 0.7, marginBottom: "0.5rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#d0c0a0", lineHeight: 1.3 }}>{item.title}</div>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#6a7a8a", lineHeight: 1.75 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ position: "relative", zIndex: 1, padding: "7rem 2rem", background: "rgba(10,8,0,0.7)", borderTop: "1px solid rgba(245,158,11,0.06)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <SectionLabel color={ACCENT}>PRICING</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1rem" }}>
            Consumption-based. Predictable costs.
          </h2>
          <p style={{ color: "#7a92aa", marginBottom: "4rem", fontSize: "0.9rem" }}>No per-seat licensing. No per-alert billing. You pay for data, not for security events.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
            <div style={{ padding: "2rem", border: "1px solid rgba(245,158,11,0.12)", borderRadius: "10px", background: "rgba(20,15,0,0.6)" }}>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#6a5a30", marginBottom: "1.5rem" }}>CONSUMPTION</div>
              {[["Data ingestion", "$1.50 / GB / day"], ["Hot retention", "$25 / TB / mo"], ["Warm retention", "$8 / TB / mo"], ["AI compute", "$0.10 / investigation"], ["Platform fee", "From $48K / yr"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.7rem 0", borderBottom: "1px solid rgba(245,158,11,0.06)", fontSize: "0.85rem" }}>
                  <span style={{ color: "#7a8a9a" }}>{k}</span>
                  <span style={{ color: "#d0c0a0", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "2rem", border: "1px solid rgba(245,158,11,0.12)", borderRadius: "10px", background: "rgba(20,15,0,0.6)" }}>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#6a5a30", marginBottom: "1.5rem" }}>500 GB/DAY — COST COMPARISON</div>
              {[["Splunk", "~$1.1M / yr", 100], ["Microsoft Sentinel", "~$680K / yr", 62], ["Databricks Lakewatch", "~$400K / yr", 36], ["AEGIS on HTAP", "~$320K / yr", 29]].map(([name, cost, pct]) => (
                <div key={name} style={{ marginBottom: "1.1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                    <span style={{ color: name.startsWith("AEGIS") ? ACCENT : "#6a7a8a" }}>{name}</span>
                    <span style={{ color: name.startsWith("AEGIS") ? ACCENT : "#5a6a7a" }}>{cost}</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: name.startsWith("AEGIS") ? ACCENT : "rgba(245,158,11,0.2)", borderRadius: "2px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DUAL CTA FORMS */}
      <section
        id="partner"
        style={{ position: "relative", zIndex: 1, padding: "7rem 2rem", borderTop: "1px solid rgba(245,158,11,0.08)" }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            {/* Vendor form */}
            <div>
              <SectionLabel color={ACCENT}>DATABASE VENDORS</SectionLabel>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
                Start a partnership conversation.
              </h2>
              <p style={{ color: "#7a92aa", marginBottom: "2rem", fontSize: "0.88rem", lineHeight: 1.7 }}>
                We'll walk through the embed model, white-label options, and revenue structure — no commitment required.
              </p>
              <DualForm type="vendor" />
            </div>

            {/* Enterprise form */}
            <div>
              <SectionLabel color={CYAN}>ENTERPRISE SOC</SectionLabel>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
                Request an enterprise demo.
              </h2>
              <p style={{ color: "#7a92aa", marginBottom: "2rem", fontSize: "0.88rem", lineHeight: 1.7 }}>
                We'll map Sentinel to your existing stack, telemetry sources, and SOC workflow — no generic pitch.
              </p>
              <DualForm type="enterprise" />
            </div>
          </div>
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
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", height: "64px", borderBottom: "1px solid rgba(245,158,11,0.08)", background: "rgba(5,8,16,0.9)", backdropFilter: "blur(12px)" }}>
      <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", letterSpacing: "0.08em", color: "#e8edf5", textDecoration: "none" }}>SENTRIXI</Link>
      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", padding: "0.3rem 0.8rem", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "20px", background: "rgba(245,158,11,0.06)" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT }} />
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: ACCENT }}>AEGIS SENTINEL</span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link href="/shield" style={{ color: "#7a92aa", textDecoration: "none", fontSize: "0.82rem" }}>Shield →</Link>
        <a href="#partner" style={{ padding: "0.4rem 1.2rem", background: ACCENT, color: "#000", borderRadius: "4px", fontSize: "0.78rem", textDecoration: "none", fontWeight: 600 }}>Get In Touch</a>
      </div>
    </nav>
  );
}

function SectionLabel({ children, color }) {
  return <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: color || ACCENT, opacity: 0.7, marginBottom: "1rem" }}>{children}</div>;
}

function StatBox({ value, label, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", color: "#e8edf5", marginBottom: "0.3rem" }}>{value}</div>
      <div style={{ fontSize: "0.72rem", color: "#5a6a50", letterSpacing: "0.04em" }}>{label}</div>
    </div>
  );
}

function ToggleBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ padding: "0.7rem 1.5rem", background: active ? ACCENT : "transparent", color: active ? "#000" : "#7a92aa", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: active ? 600 : 400, fontFamily: "inherit", transition: "all 0.2s" }}
    >
      {label}
    </button>
  );
}

function VendorBenefitCard({ title, body, icon }) {
  return (
    <div style={{ padding: "1.75rem", border: "1px solid rgba(245,158,11,0.1)", borderRadius: "10px", background: "rgba(20,14,0,0.5)" }}>
      <div style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>{icon}</div>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#d0c0a0", marginBottom: "0.75rem" }}>{title}</h3>
      <p style={{ fontSize: "0.83rem", color: "#6a7a5a", lineHeight: 1.7 }}>{body}</p>
    </div>
  );
}

function AgentTeams() {
  const teams = [
    {
      name: "Detection Team",
      color: ACCENT,
      agents: ["Threat Detection Lead", "Behavioral Analytics", "Anomaly Scoring", "Detection Engineering", "Threat Intel Correlation", "Alert Prioritization"],
    },
    {
      name: "Cyber Intelligence",
      color: "#00d4ff",
      agents: ["Threat Intel Lead", "Adversary TTP Profiler", "IOC Enrichment", "Dark Web Monitor", "Campaign Tracker", "Geo-Threat Analyst"],
    },
    {
      name: "Investigation Team",
      color: "#a78bfa",
      agents: ["DFIR Lead", "Forensic Analyst", "Network Forensics", "Endpoint Forensics", "Cloud Forensics", "Timeline Reconstructor"],
    },
    {
      name: "Response Team",
      color: "#34d399",
      agents: ["Incident Commander", "Containment Agent", "Evidence Packager", "Regulatory Compliance", "Executive Comms", "Post-Incident Analyst"],
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "1.5rem", padding: "0.7rem", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "8px", fontSize: "0.8rem", color: "#8a7a50", letterSpacing: "0.08em" }}>
        ORCHESTRATION LAYER — Event Routing · Agent Coordination · Deconfliction · Response Sequencing
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        {teams.map((team) => (
          <div key={team.name} style={{ border: `1px solid ${team.color}20`, borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ padding: "0.75rem 1rem", background: `${team.color}12`, borderBottom: `1px solid ${team.color}20`, fontSize: "0.78rem", fontWeight: 600, color: team.color, letterSpacing: "0.06em" }}>{team.name}</div>
            {team.agents.map((a) => (
              <div key={a} style={{ padding: "0.5rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.75rem", color: "#5a6a7a" }}>{a}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DualForm({ type }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", role: "", email: "", message: "" });
  const accent = type === "vendor" ? ACCENT : CYAN;

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.company) return;
    const label = type === "vendor" ? "Sentinel Partner Inquiry" : "Sentinel Enterprise Demo Request";
    const subject = encodeURIComponent(`AEGIS Sentinel — ${label} from ${form.company}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nRole: ${form.role}\nEmail: ${form.email}\nType: ${type === "vendor" ? "Database Vendor Partner" : "Enterprise SOC"}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:register@sentrixi.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: "2.5rem", border: `1px solid ${accent}30`, borderRadius: "12px", background: `${accent}06`, textAlign: "center" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: accent }}>✓</div>
        <p style={{ color: "#d0d8e0", fontWeight: 500, marginBottom: "0.5rem" }}>Message sent.</p>
        <p style={{ color: "#6a7a8a", fontSize: "0.85rem" }}>We'll be in touch within one business day.</p>
      </div>
    );
  }

  const inputStyle = { width: "100%", padding: "0.65rem 1rem", background: "rgba(0,10,20,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#e8edf5", fontSize: "0.85rem", fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ display: "grid", gap: "0.85rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a6a", letterSpacing: "0.08em", display: "block", marginBottom: "0.35rem" }}>NAME *</label>
          <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        </div>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a6a", letterSpacing: "0.08em", display: "block", marginBottom: "0.35rem" }}>COMPANY *</label>
          <input style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a6a", letterSpacing: "0.08em", display: "block", marginBottom: "0.35rem" }}>ROLE</label>
          <input style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder={type === "vendor" ? "VP Product / BD" : "CISO / SOC Director"} />
        </div>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a6a", letterSpacing: "0.08em", display: "block", marginBottom: "0.35rem" }}>EMAIL *</label>
          <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="work@company.com" />
        </div>
      </div>
      <div>
        <label style={{ fontSize: "0.68rem", color: "#4a5a6a", letterSpacing: "0.08em", display: "block", marginBottom: "0.35rem" }}>
          {type === "vendor" ? "YOUR PLATFORM (optional)" : "YOUR STACK (optional)"}
        </label>
        <textarea
          style={{ ...inputStyle, height: "80px", resize: "vertical" }}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder={type === "vendor" ? "Database platform, customer base, partnership interest..." : "Current SIEM, data sources, team size..."}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{ padding: "0.8rem", background: accent, color: type === "vendor" ? "#000" : "#000", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em", cursor: "pointer" }}
      >
        {type === "vendor" ? "REQUEST PARTNER BRIEF →" : "REQUEST ENTERPRISE DEMO →"}
      </button>
      <p style={{ fontSize: "0.7rem", color: "#3a4a5a", textAlign: "center" }}>
        We respond within 1 business day. No spam. No sequences.
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
