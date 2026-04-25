"use client";
// components/WhyNow.jsx
// Reusable "Why Now" section — insert after hero on homepage and shield page
//
// Usage:
//   import WhyNow from "@/components/WhyNow";
//   <WhyNow context="ciso" />   ← CISO/CTO framing (shield page)
//   <WhyNow context="market" /> ← Market/investor framing (homepage)

const SIGNALS = {
  ciso: [
    {
      num: "01",
      headline: "The perimeter has already been breached.",
      body: "83% of database breaches use valid credentials. Perimeter and identity tools can't distinguish legitimate access from a compromised account executing unauthorized queries. The detection gap is structural, not a configuration problem.",
      stat: "83%",
      statLabel: "Breaches use valid credentials",
      accentColor: "#ff4444",
    },
    {
      num: "02",
      headline: "Data volume is outpacing security coverage.",
      body: "Enterprise database instances grew 3× in five years. The attack surface expanded. The tooling didn't follow. DAM tools still operate on delayed log pipelines — designed for a world with 10% of today's data velocity.",
      stat: "3×",
      statLabel: "DB growth vs. security tooling",
      accentColor: "#f59e0b",
    },
    {
      num: "03",
      headline: "Regulatory pressure just became existential.",
      body: "NYDFS §500, DORA, and SEC disclosure rules now mandate demonstrable data-layer controls — not just perimeter evidence. Organizations without embedded database monitoring face enforcement exposure, not just audit findings.",
      stat: "72hr",
      statLabel: "NYDFS breach notification window",
      accentColor: "#00d4ff",
    },
  ],
  market: [
    {
      num: "01",
      headline: "Data volume is outpacing visibility infrastructure.",
      body: "Enterprise database instances grew 3× in five years. Security tooling didn't follow. The gap between data growth and security coverage is widening — creating a structural market need that legacy DAM tools cannot address.",
      stat: "3×",
      statLabel: "DB growth vs. security tooling",
      accentColor: "#a78bfa",
    },
    {
      num: "02",
      headline: "Security is collapsing toward execution layers.",
      body: "Zero trust moved security to identity. AI-native threats are moving it to the execution layer. The database — where data is accessed, modified, and exfiltrated — is the final unmonitored execution surface.",
      stat: "83%",
      statLabel: "Breaches use valid credentials",
      accentColor: "#a78bfa",
    },
    {
      num: "03",
      headline: "AI makes behavioral modeling economically viable.",
      body: "Per-user, per-query behavioral baselines that once required months of manual rule-writing can now be built and maintained autonomously. The technical barrier to owning this category just dropped — the window is open.",
      stat: "90-Day",
      statLabel: "Dynamic baselines, automated",
      accentColor: "#a78bfa",
    },
  ],
};

export default function WhyNow({ context = "ciso" }) {
  const signals = SIGNALS[context] || SIGNALS.ciso;
  const isPurple = context === "market";
  const baseAccent = isPurple ? "#a78bfa" : "#00d4ff";

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "7rem 2rem",
        background: "rgba(0,5,12,0.75)",
        borderTop: `1px solid ${baseAccent}10`,
        borderBottom: `1px solid ${baseAccent}10`,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: baseAccent, opacity: 0.7, marginBottom: "1rem" }}>
              WHY NOW
            </div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "#f0f4fa",
                maxWidth: "600px",
              }}
            >
              The shift has already started.
            </h2>
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#5a7a8a",
              maxWidth: "340px",
              lineHeight: 1.7,
              textAlign: "right",
            }}
          >
            Three converging forces are making
            data-layer security not just possible —
            but urgently necessary.
          </p>
        </div>

        {/* Signal cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3.5rem" }}>
          {signals.map((signal) => (
            <SignalCard key={signal.num} signal={signal} />
          ))}
        </div>

        {/* Closing thesis line */}
        <div
          style={{
            padding: "2rem 2.5rem",
            border: `1px solid ${baseAccent}20`,
            borderLeft: `4px solid ${baseAccent}`,
            borderRadius: "8px",
            background: `${baseAccent}06`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              color: "#e8edf5",
              lineHeight: 1.4,
              maxWidth: "680px",
            }}
          >
            The database is the next control point in enterprise security infrastructure.
          </p>
          <a
            href={context === "ciso" ? "#demo" : "#briefing"}
            style={{
              padding: "0.75rem 1.75rem",
              background: baseAccent,
              color: "#000",
              borderRadius: "6px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.82rem",
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            {context === "ciso" ? "See How Shield Works →" : "Read the Investor Thesis →"}
          </a>
        </div>
      </div>
    </section>
  );
}

function SignalCard({ signal }) {
  return (
    <div
      style={{
        padding: "1.75rem",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "10px",
        background: "rgba(5,10,20,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
      }}
    >
      {/* Number + stat row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: signal.accentColor, opacity: 0.5 }}>
          {signal.num}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.5rem",
              color: signal.accentColor,
              lineHeight: 1,
            }}
          >
            {signal.stat}
          </div>
          <div style={{ fontSize: "0.62rem", color: "#3a4a5a", letterSpacing: "0.06em", marginTop: "0.2rem", maxWidth: "110px", textAlign: "right" }}>
            {signal.statLabel}
          </div>
        </div>
      </div>

      {/* Headline */}
      <h3
        style={{
          fontSize: "0.92rem",
          fontWeight: 600,
          color: "#c0d0e0",
          lineHeight: 1.4,
        }}
      >
        {signal.headline}
      </h3>

      {/* Body */}
      <p style={{ fontSize: "0.82rem", color: "#5a6a78", lineHeight: 1.75 }}>
        {signal.body}
      </p>

      {/* Bottom accent bar */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(to right, ${signal.accentColor}50, transparent)`,
          borderRadius: "1px",
          marginTop: "auto",
        }}
      />
    </div>
  );
}
