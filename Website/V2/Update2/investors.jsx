"use client";
// app/investors/page.jsx — AEGIS Investor Landing Page
// Target audience: VCs, angels, family offices, strategic investors
// Goal: Request investor briefing (email form)
// Drop into: app/investors/page.jsx

import { useState } from "react";
import Link from "next/link";

const ACCENT = "#a78bfa"; // violet — distinct from cyan (Shield) and amber (Sentinel)
const SILVER = "#c8d4e0";
const DIM = "rgba(167,139,250,0.1)";

export default function InvestorsPage() {
  return (
    <main
      style={{
        background: "#050609",
        color: "#e8edf5",
        minHeight: "100vh",
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Subtle diagonal grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Nav />

      {/* ── HERO ── */}
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
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "500px", background: "radial-gradient(ellipse, rgba(80,40,160,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", border: "1px solid rgba(167,139,250,0.25)", borderRadius: "20px", fontSize: "0.72rem", letterSpacing: "0.15em", color: ACCENT, marginBottom: "2rem", background: "rgba(167,139,250,0.06)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT }} />
          INVESTOR BRIEFING
        </div>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(3rem, 6.5vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            maxWidth: "960px",
            marginBottom: "2rem",
            color: "#f0f4fa",
            letterSpacing: "-0.01em",
          }}
        >
          Every infrastructure shift
          <br />
          <span style={{ color: ACCENT }}>created a new security category.</span>
          <br />
          <span style={{ color: SILVER, fontSize: "0.7em" }}>The data layer is next.</span>
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#7a92aa",
            maxWidth: "640px",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          Perimeter shift created the firewall market.
          Cloud shift created CSPM.
          Identity shift created CIEM.
          The data execution layer — where breaches actually complete —
          has no equivalent security category. Until now.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="#briefing"
            style={{ padding: "0.85rem 2.2rem", background: ACCENT, color: "#000", borderRadius: "6px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem", letterSpacing: "0.04em" }}
          >
            Request Investor Briefing
          </a>
          <a
            href="#thesis"
            style={{ padding: "0.85rem 2.2rem", border: "1px solid rgba(167,139,250,0.3)", color: ACCENT, borderRadius: "6px", textDecoration: "none", fontSize: "0.9rem" }}
          >
            Read the Thesis
          </a>
        </div>

        {/* Metric strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "6rem", padding: "2rem 2.5rem", border: "1px solid rgba(167,139,250,0.1)", borderRadius: "12px", background: "rgba(10,8,20,0.7)", maxWidth: "800px", width: "100%" }}>
          <Metric value="$14B" label="SIEM market by 2028" />
          <Metric value="$0" label="Owned: data-layer security" />
          <Metric value="3×" label="DB growth vs. tooling" />
          <Metric value="OEM" label="Distribution multiplier" />
        </div>
      </section>

      {/* ── THE SHIFT ── */}
      <section
        id="thesis"
        style={{ position: "relative", zIndex: 1, padding: "8rem 2rem", background: "rgba(5,4,12,0.8)", borderTop: "1px solid rgba(167,139,250,0.06)" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel>THE THESIS</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 400, marginBottom: "1.5rem", maxWidth: "720px", lineHeight: 1.15 }}>
            Security always follows infrastructure.
            <br />
            <span style={{ color: ACCENT }}>Infrastructure just moved again.</span>
          </h2>
          <p style={{ color: "#7a92aa", maxWidth: "580px", lineHeight: 1.8, marginBottom: "5rem", fontSize: "1rem" }}>
            Each infrastructure layer that gained enterprise trust eventually required its own security primitive.
            Databases hold more sensitive data than any other layer in the stack — and remain the only major layer without embedded behavioral security.
          </p>

          {/* Shift timeline */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0", position: "relative", marginBottom: "5rem" }}>
            {[
              { era: "2000s", shift: "Perimeter", category: "Firewall / IDS", status: "owned" },
              { era: "2010s", shift: "Cloud", category: "CSPM / CWPP", status: "owned" },
              { era: "2015s", shift: "Identity", category: "CIEM / PAM", status: "owned" },
              { era: "2020s", shift: "Endpoint", category: "EDR / XDR", status: "owned" },
              { era: "Now", shift: "Data Layer", category: "???", status: "open" },
            ].map((item, i) => (
              <div
                key={item.shift}
                style={{
                  padding: "1.5rem 1.25rem",
                  borderTop: `2px solid ${item.status === "open" ? ACCENT : "rgba(167,139,250,0.25)"}`,
                  background: item.status === "open" ? DIM : "transparent",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: item.status === "open" ? ACCENT : "#3a4a6a", marginBottom: "0.5rem" }}>{item.era}</div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: item.status === "open" ? "#f0f4fa" : "#8090a0", marginBottom: "0.4rem" }}>{item.shift}</div>
                <div style={{ fontSize: "0.75rem", color: item.status === "open" ? ACCENT : "#3a4a5a", fontFamily: "'IBM Plex Mono', monospace" }}>{item.category}</div>
                {item.status === "open" && (
                  <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", fontSize: "0.6rem", letterSpacing: "0.12em", color: ACCENT, background: DIM, border: `1px solid ${ACCENT}40`, borderRadius: "3px", padding: "0.15rem 0.4rem" }}>OPEN</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ padding: "2rem 2.5rem", border: "1px solid rgba(167,139,250,0.18)", borderLeft: `4px solid ${ACCENT}`, borderRadius: "8px", background: DIM, maxWidth: "740px" }}>
            <p style={{ color: "#e0daf8", fontSize: "1rem", lineHeight: 1.8 }}>
              <strong style={{ color: ACCENT }}>The category insight:</strong> No incumbent owns data-layer behavioral security.
              DAM tools are log-based and post-hoc. SIEMs are infrastructure-adjacent.
              The position is structurally unoccupied — and AEGIS is designed to own it.
            </p>
          </div>
        </div>
      </section>

      {/* ── THREE ANALOGIES ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "8rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel>CATEGORY ANALOGIES</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
            This has happened before.
          </h2>
          <p style={{ color: "#7a92aa", maxWidth: "540px", lineHeight: 1.8, marginBottom: "4rem", fontSize: "0.95rem" }}>
            Each of these companies redefined an infrastructure layer as a security-capable platform — and captured the market that followed.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            <AnalogyCard
              company="Databricks"
              move="Brought compute to the data layer"
              lesson="Created a $43B company by making the data layer programmable — not just storage."
              parallel="AEGIS makes the data layer observable and defensible."
              num="01"
            />
            <AnalogyCard
              company="Snowflake"
              move="Made data storage a platform"
              lesson="Turned a commodity infrastructure component into a $60B+ data cloud by adding intelligence and ecosystem."
              parallel="AEGIS adds security intelligence to the database as a native layer."
              num="02"
            />
            <AnalogyCard
              company="CrowdStrike"
              move="Repositioned endpoint as intelligence"
              lesson="Turned endpoint from a passive log collector into a real-time intelligence layer. $80B+ market cap."
              parallel="AEGIS repositions the database from passive storage to active detection surface."
              num="03"
            />
          </div>
        </div>
      </section>

      {/* ── WHY NOW ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "8rem 2rem", background: "rgba(5,4,12,0.8)", borderTop: "1px solid rgba(167,139,250,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel>WHY NOW</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 400, marginBottom: "4rem", lineHeight: 1.2 }}>
            Three signals converging simultaneously.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
            <SignalCard
              num="01"
              signal="Data volume is outpacing visibility infrastructure"
              body="Enterprise database instances grew 3× in five years. Security tooling didn't follow. The gap between data growth and security coverage is widening — not closing."
              stat="3×"
              statLabel="DB growth vs. tooling"
            />
            <SignalCard
              num="02"
              signal="Security is collapsing toward execution layers"
              body="Zero trust moved security to identity. AI-native threats are moving it to the execution layer. Perimeter defenses are structurally insufficient against credential-valid attacks."
              stat="83%"
              statLabel="Breaches use valid credentials"
            />
            <SignalCard
              num="03"
              signal="AI enables behavioral modeling at scale"
              body="Behavioral baselines that once required months of manual rule-writing can now be built in days. AI makes per-user, per-query profiling economically viable at enterprise scale."
              stat="90-Day"
              statLabel="Dynamic baselines"
            />
          </div>

          <div style={{ textAlign: "center", padding: "2.5rem", border: "1px solid rgba(167,139,250,0.15)", borderRadius: "12px", background: DIM }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#f0f4fa", lineHeight: 1.5 }}>
              "The database is the next control point.
              <br />
              <span style={{ color: ACCENT }}>The window to own this category is open — but not indefinitely."</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODEL ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "8rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel>BUSINESS MODEL</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
            Two distribution channels.
            <br />
            <span style={{ color: ACCENT }}>One scales without a sales team.</span>
          </h2>
          <p style={{ color: "#7a92aa", maxWidth: "540px", lineHeight: 1.8, marginBottom: "4rem", fontSize: "0.95rem" }}>
            Direct enterprise sales establishes category credibility. OEM partnerships create a distribution multiplier that operates at infrastructure scale.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
            <ModelCard
              channel="Direct"
              title="Enterprise Sales"
              desc="CISO and CTO buyers in regulated industries — financial services, healthcare, government. High ACV, long relationships, compliance-driven urgency."
              metrics={[["ACV range", "$24K – $500K+"], ["Sales motion", "Technical demo → POC → contract"], ["Buyer trigger", "Compliance deadline / breach event"]]}
              accent={ACCENT}
            />
            <ModelCard
              channel="OEM / Embed"
              title="Database Vendor Partnerships"
              desc="White-label or co-brand AEGIS as a native security feature. Revenue share model. Each partner multiplies reach across their entire customer base — without adding to Sentrixi's sales headcount."
              metrics={[["Revenue share", "Negotiated per partnership"], ["Distribution", "Partner's installed base"], ["Competitive moat", "Switching cost = platform switch"]]}
              accent="#00d4ff"
              highlight
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              { label: "Data Consumption Driver", body: "Security telemetry increases hot data ingestion — creating a revenue multiplier for the database vendor, not just a feature add." },
              { label: "SIEM-Class Workloads", body: "Sentinel enables SIEM analytics inside the database — unlocking a $6B+ adjacent market for platforms that embed it." },
              { label: "Regulated Market Unlock", body: "Financial services and healthcare customers blocked by compliance requirements become accessible through AEGIS certification." },
            ].map((item) => (
              <div key={item.label} style={{ padding: "1.25rem 1.5rem", border: "1px solid rgba(167,139,250,0.08)", borderRadius: "8px", background: "rgba(10,8,20,0.5)" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#b0a0d0", marginBottom: "0.6rem" }}>{item.label}</div>
                <p style={{ fontSize: "0.8rem", color: "#5a6a80", lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT LINES SUMMARY ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", background: "rgba(5,4,12,0.8)", borderTop: "1px solid rgba(167,139,250,0.06)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionLabel>THE PLATFORM</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "3rem", lineHeight: 1.2 }}>
            Land with Shield. Expand with Sentinel.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <ProductLine
              label="TIER 1 · LAND"
              name="AEGIS Shield"
              desc="Database-native behavioral detection. Replaces DAM tools. Designed for CISO/CTO buyers. Expands with every compliance trigger."
              arr="$24K – $500K+"
              accent="#00d4ff"
            />
            <ProductLine
              label="TIER 2 · EXPAND"
              name="AEGIS Sentinel"
              desc="Full AI SIEM on any datalake. 30+ agents. Consumption-based pricing. Expands revenue per customer 3–8× over Shield alone."
              arr="$48K platform + consumption"
              accent="#f59e0b"
            />
          </div>
        </div>
      </section>

      {/* ── BRIEFING FORM ── */}
      <section
        id="briefing"
        style={{ position: "relative", zIndex: 1, padding: "8rem 2rem", borderTop: "1px solid rgba(167,139,250,0.08)" }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>GET THE BRIEFING</SectionLabel>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.2 }}>
            Request an investor briefing.
          </h2>
          <p style={{ color: "#7a92aa", marginBottom: "3rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
            We'll share market analysis, architecture overview, business model detail,
            and current traction. No cold deck. A real conversation.
          </p>
          <InvestorForm />
        </div>
      </section>

      <Footer />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </main>
  );
}

/* ─── SUB-COMPONENTS ─── */

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", height: "64px", borderBottom: "1px solid rgba(167,139,250,0.08)", background: "rgba(5,6,9,0.92)", backdropFilter: "blur(12px)" }}>
      <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", letterSpacing: "0.08em", color: "#e8edf5", textDecoration: "none" }}>SENTRIXI</Link>
      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", padding: "0.3rem 0.8rem", border: "1px solid rgba(167,139,250,0.25)", borderRadius: "20px", background: "rgba(167,139,250,0.06)" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT }} />
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: ACCENT }}>INVESTOR BRIEFING</span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link href="/shield" style={{ color: "#7a92aa", textDecoration: "none", fontSize: "0.82rem" }}>Products</Link>
        <a href="#briefing" style={{ padding: "0.4rem 1.2rem", background: ACCENT, color: "#000", borderRadius: "4px", fontSize: "0.78rem", textDecoration: "none", fontWeight: 700 }}>Request Briefing</a>
      </div>
    </nav>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: ACCENT, opacity: 0.7, marginBottom: "1rem" }}>{children}</div>;
}

function Metric({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", color: "#e8edf5", marginBottom: "0.3rem" }}>{value}</div>
      <div style={{ fontSize: "0.72rem", color: "#4a5a70", letterSpacing: "0.04em", lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

function AnalogyCard({ company, move, lesson, parallel, num }) {
  return (
    <div style={{ padding: "2rem", border: "1px solid rgba(167,139,250,0.1)", borderRadius: "12px", background: "rgba(10,8,20,0.6)", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: ACCENT, opacity: 0.5 }}>{num}</div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem", color: "#f0f4fa" }}>{company}</div>
      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#8090a8", fontStyle: "italic" }}>{move}</div>
      <p style={{ fontSize: "0.82rem", color: "#5a6a80", lineHeight: 1.7, borderBottom: "1px solid rgba(167,139,250,0.08)", paddingBottom: "1rem" }}>{lesson}</p>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
        <span style={{ color: ACCENT, flexShrink: 0, fontSize: "0.8rem", marginTop: "1px" }}>→</span>
        <p style={{ fontSize: "0.82rem", color: "#a090c0", lineHeight: 1.6 }}>{parallel}</p>
      </div>
    </div>
  );
}

function SignalCard({ num, signal, body, stat, statLabel }) {
  return (
    <div style={{ padding: "1.75rem", border: "1px solid rgba(167,139,250,0.1)", borderRadius: "10px", background: "rgba(10,8,20,0.5)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: ACCENT, opacity: 0.5 }}>{num}</div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: ACCENT }}>{stat}</div>
          <div style={{ fontSize: "0.65rem", color: "#5a5a7a", letterSpacing: "0.06em" }}>{statLabel}</div>
        </div>
      </div>
      <h3 style={{ fontSize: "0.92rem", fontWeight: 600, color: "#c0b0e0", marginBottom: "0.75rem", lineHeight: 1.4 }}>{signal}</h3>
      <p style={{ fontSize: "0.82rem", color: "#5a6a7a", lineHeight: 1.7 }}>{body}</p>
    </div>
  );
}

function ModelCard({ channel, title, desc, metrics, accent, highlight }) {
  return (
    <div style={{ padding: "2rem", border: `1px solid ${highlight ? accent + "35" : "rgba(167,139,250,0.1)"}`, borderRadius: "12px", background: highlight ? `${accent}08` : "rgba(10,8,20,0.5)", position: "relative" }}>
      {highlight && (
        <div style={{ position: "absolute", top: "-1px", right: "1.5rem", background: accent, color: "#000", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", padding: "0.25rem 0.8rem", borderRadius: "0 0 6px 6px" }}>SCALE ENGINE</div>
      )}
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: accent, opacity: 0.7, marginBottom: "0.5rem" }}>{channel}</div>
      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#e0d8f8", marginBottom: "0.75rem" }}>{title}</h3>
      <p style={{ fontSize: "0.85rem", color: "#6a7a90", lineHeight: 1.7, marginBottom: "1.5rem" }}>{desc}</p>
      <div style={{ borderTop: "1px solid rgba(167,139,250,0.08)", paddingTop: "1.25rem", display: "grid", gap: "0.6rem" }}>
        {metrics.map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
            <span style={{ color: "#5a6a80" }}>{k}</span>
            <span style={{ color: "#b0a8d0", fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductLine({ label, name, desc, arr, accent }) {
  return (
    <div style={{ padding: "1.75rem", border: `1px solid ${accent}20`, borderRadius: "10px", background: `${accent}05` }}>
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: accent, opacity: 0.7, marginBottom: "0.5rem" }}>{label}</div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: "#e0d8f8", marginBottom: "0.6rem" }}>{name}</div>
      <p style={{ fontSize: "0.83rem", color: "#6a7a88", lineHeight: 1.7, marginBottom: "1rem" }}>{desc}</p>
      <div style={{ fontSize: "0.78rem", color: "#5a6a80" }}>
        ACV: <span style={{ color: accent, fontWeight: 500 }}>{arr}</span>
      </div>
    </div>
  );
}

function InvestorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", firm: "", role: "", email: "", focus: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    const subject = encodeURIComponent(`Sentrixi Investor Briefing Request — ${form.firm || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nFirm: ${form.firm}\nRole: ${form.role}\nEmail: ${form.email}\n\nFocus / Context:\n${form.focus}`
    );
    window.open(`mailto:register@sentrixi.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: "3rem", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "12px", background: DIM, textAlign: "center" }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: ACCENT, marginBottom: "0.75rem" }}>Request sent.</div>
        <p style={{ color: "#7a92aa", fontSize: "0.9rem" }}>We'll be in touch within two business days with the briefing package.</p>
      </div>
    );
  }

  const inp = { width: "100%", padding: "0.7rem 1rem", background: "rgba(5,4,16,0.8)", border: "1px solid rgba(167,139,250,0.12)", borderRadius: "6px", color: "#e8edf5", fontSize: "0.88rem", fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ display: "grid", gap: "1rem", textAlign: "left" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a70", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>NAME *</label>
          <input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        </div>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a70", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>FIRM</label>
          <input style={inp} value={form.firm} onChange={e => setForm({ ...form, firm: e.target.value })} placeholder="Fund or firm name" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a70", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>ROLE</label>
          <input style={inp} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Partner / Principal / MD" />
        </div>
        <div>
          <label style={{ fontSize: "0.68rem", color: "#4a5a70", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>EMAIL *</label>
          <input style={inp} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@fund.com" />
        </div>
      </div>
      <div>
        <label style={{ fontSize: "0.68rem", color: "#4a5a70", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>INVESTMENT FOCUS (optional)</label>
        <textarea style={{ ...inp, height: "80px", resize: "vertical" }} value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} placeholder="Stage, sector focus, portfolio context..." />
      </div>
      <button onClick={handleSubmit} style={{ padding: "0.9rem", background: ACCENT, color: "#000", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.06em", cursor: "pointer" }}>
        REQUEST INVESTOR BRIEFING →
      </button>
      <p style={{ fontSize: "0.7rem", color: "#3a4050", textAlign: "center" }}>NDA available on request. We respond within two business days.</p>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, padding: "2rem 3rem", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "#3a4f62" }}>
      <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1rem", color: "#4a5070", textDecoration: "none" }}>SENTRIXI</Link>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link href="/shield" style={{ color: "#3a4050", textDecoration: "none" }}>Shield</Link>
        <Link href="/sentinel" style={{ color: "#3a4050", textDecoration: "none" }}>Sentinel</Link>
        <Link href="/investors" style={{ color: ACCENT, textDecoration: "none", opacity: 0.7 }}>Investors</Link>
      </div>
      <span>© 2026 Sentrixi</span>
    </footer>
  );
}
