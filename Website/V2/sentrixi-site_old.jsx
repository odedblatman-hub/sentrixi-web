import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─── */
const C = {
  navy: "#0B1D3A",
  navyLight: "#132B4F",
  slate: "#1E293B",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  warmGray: "#F1F0EB",
  teal: "#0D9373",
  tealLight: "#D0FAF0",
  tealDark: "#065F46",
  coral: "#E85D3A",
  coralLight: "#FEF0EC",
  amber: "#D97706",
  blue: "#2563EB",
  blueLight: "#EFF6FF",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
};

const font = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

/* ─── SCROLL FADE HOOK ─── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" } };
}

function Section({ children, bg = C.white, id, pad = "100px 0" }) {
  return (
    <section id={id} style={{ background: bg, padding: pad }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>{children}</div>
    </section>
  );
}

function SectionLabel({ children, color = C.teal }) {
  return <div style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color, marginBottom: 16 }}>{children}</div>;
}

function H2({ children, maxWidth = 720 }) {
  return <h2 style={{ fontFamily: font.display, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: C.textPrimary, maxWidth, marginBottom: 24 }}>{children}</h2>;
}

function Body({ children, maxWidth = 640 }) {
  return <p style={{ fontFamily: font.body, fontSize: 18, lineHeight: 1.7, color: C.textSecondary, maxWidth, marginBottom: 0 }}>{children}</p>;
}

/* ─── STAT PILL ─── */
function Stat({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: font.display, fontSize: 42, color: C.navy, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: font.body, fontSize: 13, color: C.textSecondary, marginTop: 6, letterSpacing: "0.02em" }}>{label}</div>
    </div>
  );
}

/* ─── FLYWHEEL INFOGRAPHIC ─── */
function FlywheelGraphic() {
  const f = useFadeIn();
  return (
    <div ref={f.ref} style={{ ...f.style, margin: "60px auto 0", maxWidth: 800 }}>
      <svg viewBox="0 0 800 420" style={{ width: "100%" }}>
        {/* Base bar */}
        <rect x="60" y="260" width="200" height="80" rx="8" fill={C.navy} />
        <text x="160" y="295" textAnchor="middle" fill={C.white} fontFamily={font.body} fontWeight="500" fontSize="15">Database workload</text>
        <text x="160" y="315" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily={font.body} fontSize="13">Queries + storage</text>

        {/* Security log bar — 3x wider */}
        <rect x="300" y="120" width="440" height="220" rx="8" fill={C.teal} opacity="0.1" />
        <rect x="300" y="120" width="440" height="220" rx="8" fill="none" stroke={C.teal} strokeWidth="1.5" strokeDasharray="6 4" />

        <rect x="320" y="150" width="400" height="60" rx="6" fill={C.teal} opacity="0.15" />
        <text x="520" y="178" textAnchor="middle" fill={C.tealDark} fontFamily={font.body} fontWeight="500" fontSize="14">Security + compliance logs (EDR, identity, cloud, network)</text>
        <text x="520" y="196" textAnchor="middle" fill={C.tealDark} fontFamily={font.body} fontSize="12" opacity="0.7">Continuous high-frequency ingestion — the highest-volume enterprise workload</text>

        <rect x="320" y="230" width="400" height="60" rx="6" fill={C.teal} opacity="0.15" />
        <text x="520" y="258" textAnchor="middle" fill={C.tealDark} fontFamily={font.body} fontWeight="500" fontSize="14">AI governance + audit telemetry</text>
        <text x="520" y="276" textAnchor="middle" fill={C.tealDark} fontFamily={font.body} fontSize="12" opacity="0.7">Every agent action, every policy decision, every access event</text>

        {/* Multiplier label */}
        <rect x="585" y="306" width="80" height="30" rx="15" fill={C.teal} />
        <text x="625" y="326" textAnchor="middle" fill={C.white} fontFamily={font.body} fontWeight="600" fontSize="14">+3x</text>

        {/* Arrow from base to security area */}
        <path d="M260 290 L290 290" stroke={C.textMuted} strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />

        {/* Bottom label */}
        <text x="160" y="375" textAnchor="middle" fill={C.textSecondary} fontFamily={font.body} fontSize="13">Today</text>
        <text x="520" y="375" textAnchor="middle" fill={C.teal} fontFamily={font.body} fontWeight="500" fontSize="13">With AEGIS</text>

        {/* Leaking dollar sign */}
        <text x="60" y="50" fill={C.coral} fontFamily={font.body} fontWeight="600" fontSize="13" opacity="0.8">Where your customers' security budget goes today:</text>
        <rect x="60" y="64" width="680" height="36" rx="6" fill={C.coralLight} />
        <text x="400" y="87" textAnchor="middle" fill={C.coral} fontFamily={font.body} fontSize="13">Legacy SIEMs (Separate vendor, separate contract, separate data silo) → revenue you never see</text>

        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

/* ─── SECURITY GAP INFOGRAPHIC ─── */
function GapGraphic() {
  const f = useFadeIn();
  const layers = [
    { name: "Endpoint", vendor: "CrowdStrike, SentinelOne", protected: true },
    { name: "Network", vendor: "Palo Alto, Fortinet", protected: true },
    { name: "Cloud posture", vendor: "Wiz, Orca", protected: true },
    { name: "Application", vendor: "Snyk, Checkmarx", protected: true },
    { name: "Database layer", vendor: "← AEGIS fills this gap", protected: false },
  ];
  return (
    <div ref={f.ref} style={{ ...f.style, margin: "48px auto 0", maxWidth: 640 }}>
      {layers.map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", marginBottom: 6, borderRadius: 10, background: l.protected ? C.offWhite : "transparent", border: l.protected ? "none" : `2px solid ${C.teal}`, position: "relative" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: l.protected ? "#DEF7EC" : C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {l.protected ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={C.tealDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill={C.white} /></svg>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: l.protected ? C.textPrimary : C.white }}>{l.name}</div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: l.protected ? C.textSecondary : "rgba(255,255,255,0.8)" }}>{l.vendor}</div>
          </div>
          {!l.protected && <div style={{ fontFamily: font.mono, fontSize: 11, color: C.white, background: C.coral, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>Unprotected today</div>}
        </div>
      ))}
    </div>
  );
}

/* ─── VENDOR VALUE CARD ─── */
function VendorCard({ icon, title, body, accent = C.teal }) {
  return (
    <div style={{ flex: 1, padding: "32px 28px", borderRadius: 16, border: `0.5px solid ${C.border}`, background: C.white, position: "relative", overflow: "hidden" }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${accent}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        {icon}
      </div>
      <div style={{ fontFamily: font.body, fontSize: 18, fontWeight: 600, color: C.textPrimary, marginBottom: 10, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontFamily: font.body, fontSize: 15, color: C.textSecondary, lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

/* ─── PHASE CARD ─── */
function PhaseCard({ num, label, title, body, live }) {
  return (
    <div style={{ flex: 1, padding: "32px 28px", borderRadius: 16, background: C.white, border: `0.5px solid ${C.border}`, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: C.teal, letterSpacing: "0.08em" }}>{label}</span>
        {live && <span style={{ fontFamily: font.mono, fontSize: 10, background: "#DEF7EC", color: C.tealDark, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>LIVE</span>}
      </div>
      <div style={{ fontFamily: font.display, fontSize: 22, color: C.textPrimary, marginBottom: 10 }}>{title}</div>
      <div style={{ fontFamily: font.body, fontSize: 15, color: C.textSecondary, lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

/* ─── DETECTION CARD ─── */
function DetectionCard({ title, body }) {
  return (
    <div style={{ padding: "24px 24px", borderRadius: 12, background: C.white, border: `0.5px solid ${C.border}` }}>
      <div style={{ fontFamily: font.body, fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: font.body, fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: font.body, color: C.textPrimary, background: C.white }}>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontFamily: font.display, fontSize: 20, color: C.navy, letterSpacing: "0.02em" }}>Sentrixi</div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[["Why AEGIS", "#why"], ["For vendors", "#vendors"], ["Product", "#product"], ["For enterprises", "#enterprises"]].map(([label, href]) => (
              <a key={href} href={href} style={{ fontFamily: font.body, fontSize: 14, color: C.textSecondary, textDecoration: "none", fontWeight: 500 }}>{label}</a>
            ))}
            <a href="#contact" style={{ fontFamily: font.body, fontSize: 14, fontWeight: 600, color: C.white, background: C.navy, padding: "8px 20px", borderRadius: 8, textDecoration: "none" }}>Schedule a briefing</a>
          </div>
        </div>
      </nav>

      {/* ═══ S1: HERO ═══ */}
      <Section bg={C.white} pad="160px 0 80px" id="hero">
        <SectionLabel color={C.teal}>AEGIS by Sentrixi</SectionLabel>
        <h1 style={{ fontFamily: font.display, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1.1, color: C.navy, maxWidth: 800, marginBottom: 28 }}>
          Security is the largest data workload in the enterprise.<br />
          <span style={{ color: C.teal }}>The database that captures it wins.</span>
        </h1>
        <Body maxWidth={680}>
          AEGIS turns real-time database platforms into self-defending security ecosystems — driving 3x data consumption, 2x faster enterprise sales, and a competitive moat that OLAP-only vendors cannot replicate.
        </Body>
        <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
          <a href="#vendors" style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: C.white, background: C.navy, padding: "14px 28px", borderRadius: 10, textDecoration: "none" }}>For database vendors</a>
          <a href="#enterprises" style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: C.navy, background: "transparent", padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: `1.5px solid ${C.navy}` }}>For enterprises</a>
        </div>
        <div style={{ display: "flex", gap: 60, marginTop: 72, flexWrap: "wrap" }}>
          <Stat value="3x" label="Consumption lift" />
          <Stat value="2x" label="Sales velocity" />
          <Stat value="<20ms" label="Detection latency" />
          <Stat value="24/7" label="Autonomous ops" />
        </div>
      </Section>

      {/* ═══ S2: MARKET VALIDATION ═══ */}
      <Section bg={C.warmGray} id="why">
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={f.style}>
            <SectionLabel>Market signal</SectionLabel>
            <H2>In March 2026, the world's largest data platform launched a native SIEM.</H2>
            <Body>
              That wasn't a product experiment — it was a $65B company betting that security workloads are the next frontier for data platform consumption. They proved the model: capture security logs, drive 3x more data through your engine, and lock in enterprise customers who can never leave.
            </Body>
            <div style={{ fontFamily: font.body, fontSize: 17, color: C.textPrimary, fontWeight: 500, marginTop: 32, padding: "24px 28px", borderRadius: 12, background: C.white, borderLeft: `4px solid ${C.teal}`, maxWidth: 700 }}>
              But they built security <em>on top of</em> the data layer.<br />
              AEGIS builds it <em>into</em> the database kernel — where detection runs at ingest speed, not batch cadence.
            </div>
          </div>
        ); })()}
      </Section>

      {/* ═══ S3: THE REAL QUESTION ═══ */}
      <Section bg={C.white} id="question">
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={f.style}>
            <SectionLabel color={C.coral}>The real question</SectionLabel>
            <H2 maxWidth={800}>"Why would a database vendor sell security?"</H2>
            <Body maxWidth={720}>
              Wrong framing. The right question is: security telemetry is the single highest-volume, highest-frequency data workload in every enterprise. Whoever's database captures it gets 3x the consumption, 2x faster sales cycles, and a moat that commodity databases can't replicate.
            </Body>
            <Body maxWidth={720}>
              <span style={{ fontWeight: 600, color: C.textPrimary }}>You're not selling security. You're selling data gravity.</span> Security is the mechanism. Revenue is the outcome.
            </Body>
          </div>
        ); })()}
        <FlywheelGraphic />
      </Section>

      {/* ═══ S4: THE GAP ═══ */}
      <Section bg={C.offWhite}>
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={{ ...f.style, textAlign: "center" }}>
            <SectionLabel>The unprotected layer</SectionLabel>
            <H2 maxWidth={600}>Every layer is protected. Except the one where the data lives.</H2>
            <Body maxWidth={560}>
              Endpoints, networks, cloud posture, applications — all covered. But the database layer, where records, transactions, and secrets actually reside, has zero behavioral detection. That's the gap AEGIS fills.
            </Body>
          </div>
        ); })()}
        <GapGraphic />
      </Section>

      {/* ═══ S5: FOR VENDORS ═══ */}
      <Section bg={C.white} id="vendors">
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={f.style}>
            <SectionLabel>For database vendors</SectionLabel>
            <H2 maxWidth={700}>Turn security into your highest-margin revenue line.</H2>
            <Body>Every AEGIS customer becomes a 3x consumption customer. Here's how.</Body>
          </div>
        ); })()}
        <div style={{ display: "flex", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
          <VendorCard
            accent={C.teal}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2 20h20M5 20V8l7-5 7 5v12" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 20v-6h6v6" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            title="3x data consumption"
            body="Security logs are continuous, high-frequency, and voluminous. When customers ingest them into your database instead of a separate SIEM, your storage and compute revenue triples. This isn't theory — a $65B data company just proved it."
          />
          <VendorCard
            accent={C.blue}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            title="2x sales velocity"
            body="The #1 bottleneck in $1M+ enterprise deals is the 3-6 month security review. AEGIS pre-bakes SOC 2, GDPR, and DORA compliance into the platform. The CISO veto disappears. Deal cycles compress by half."
          />
          <VendorCard
            accent={C.amber}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            title="Structural moat"
            body="Security embedded at the kernel level creates switching costs that no bolt-on tool can match. Your customers' security models, behavioral baselines, and compliance evidence all live inside your database. That's permanent lock-in."
          />
        </div>
        <div style={{ marginTop: 48, padding: "32px 36px", borderRadius: 16, background: C.navy, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: font.body, fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Revenue currently leaking to legacy SIEMs</div>
            <div style={{ fontFamily: font.display, fontSize: 36, color: C.white }}>$150K – $400K</div>
            <div style={{ fontFamily: font.body, fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>per customer, per year — captured as database consumption</div>
          </div>
          <a href="#contact" style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: C.navy, background: C.white, padding: "14px 28px", borderRadius: 10, textDecoration: "none", whiteSpace: "nowrap" }}>Explore OEM partnership</a>
        </div>
      </Section>

      {/* ═══ S6: PRODUCT PHASES ═══ */}
      <Section bg={C.offWhite} id="product">
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={f.style}>
            <SectionLabel>The product</SectionLabel>
            <H2>Three phases. Each one deepens the moat.</H2>
            <Body>Designed for OEM embedding into real-time database platforms serving security-conscious enterprises.</Body>
          </div>
        ); })()}
        <div style={{ display: "flex", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
          <PhaseCard num="01" label="PHASE 1" title="Protect the database itself" body="Behavioral anomaly detection on access patterns, privileged users, query anomalies, and credential misuse. Sub-second detection via API. No customer disruption. Sandbox-testable." live />
          <PhaseCard num="02" label="PHASE 2 · Q4 2026" title="Protect the customer" body="Customers inject all security logs into their database instance. AEGIS detects, triages, and contains threats 24/7. This is where the consumption flywheel activates." />
          <PhaseCard num="03" label="YEAR 2+" title="Become the security substrate" body="Embedded SDK for application-layer telemetry. eBPF agents for OS-level behavioral signals. Managed-service wrapper for Fortune 500 security operations." />
        </div>
      </Section>

      {/* ═══ S7: FOR ENTERPRISES ═══ */}
      <Section bg={C.white} id="enterprises">
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={f.style}>
            <SectionLabel>For enterprises</SectionLabel>
            <H2>Your data deserves real-time protection.</H2>
            <Body>If your applications handle financial transactions, patient records, or classified data — AEGIS provides database-layer behavioral defense that doesn't exist anywhere else.</Body>
          </div>
        ); })()}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 48 }}>
          <DetectionCard title="Insider threat detection" body="60+ autonomous AI agents build behavioral baselines on every privileged user. Anomalous query patterns, off-hours access, and data staging caught in real time." />
          <DetectionCard title="Credential misuse" body="Detect stolen or shared credentials through behavioral fingerprinting — not just failed logins. Dual-brain architecture: ML fast-path in <500ms, LLM deep analysis on escalation." />
          <DetectionCard title="Data exfiltration" body="Unusual data volumes, bulk exports, staging behavior, and transfer to unauthorized channels caught before damage. Kill-chain reasoning tracks multi-stage campaigns." />
          <DetectionCard title="AI agent governance" body="Identity-aware filtering for vector searches. Prevent prompt injection, unauthorized data access, and shadow AI. Every agent action audited and governed." />
          <DetectionCard title="Compliance automation" body="Continuous evidence for SOC 2, GDPR, NYDFS 500, PCI-DSS, DORA, ISO 27001, and HIPAA. Audit trail generated automatically — not assembled annually." />
          <DetectionCard title="Nation-state defense" body="Kill Chain Reasoning Engine with playbooks for advanced persistent threats. Living-off-the-land detection. Adversarial ML hardening against evasion attempts." />
        </div>
        <div style={{ display: "flex", gap: 48, marginTop: 56, justifyContent: "center", flexWrap: "wrap" }}>
          <Stat value="60+" label="AI detection agents" />
          <Stat value="<20ms" label="Threat detection" />
          <Stat value="18mo" label="Battle-tested in production" />
          <Stat value="0" label="Infrastructure changes" />
        </div>
      </Section>

      {/* ═══ S8: COMPLIANCE ═══ */}
      <Section bg={C.offWhite}>
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={{ ...f.style, textAlign: "center" }}>
            <SectionLabel>Compliance</SectionLabel>
            <H2 maxWidth={500}>Continuous evidence, not annual audits.</H2>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
              {["SOC 2 Type II", "GDPR Art. 32", "NYDFS 500", "PCI-DSS 4.0", "DORA", "ISO 27001", "HIPAA"].map(fw => (
                <div key={fw} style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 500, padding: "8px 18px", borderRadius: 8, background: C.white, border: `0.5px solid ${C.border}`, color: C.textPrimary }}>{fw}</div>
              ))}
            </div>
          </div>
        ); })()}
      </Section>

      {/* ═══ S9: TEAM ═══ */}
      <Section bg={C.white}>
        {(() => { const f = useFadeIn(); return (
          <div ref={f.ref} style={f.style}>
            <SectionLabel>Leadership</SectionLabel>
            <H2>Built by practitioners, not just engineers.</H2>
            <div style={{ display: "flex", gap: 20, marginTop: 40, flexWrap: "wrap" }}>
              {[
                { role: "Founder & CEO", desc: "CIO/CISO with 15+ years leading cybersecurity and AI governance in regulated financial services. Architect of enterprise behavioral detection platforms protecting critical infrastructure across 30+ global regions." },
                { role: "Advisory Board", desc: "Former SOC directors, threat intelligence leads, and compliance architects from top-tier financial institutions and defense organizations." },
                { role: "Engineering", desc: "18 months of production-hardened platform development. 60+ detection agents, self-learning ML pipeline, adversarial hardening. Battle-tested against nation-state and organized cybercrime actors." },
              ].map(t => (
                <div key={t.role} style={{ flex: 1, minWidth: 240, padding: "28px 24px", borderRadius: 12, border: `0.5px solid ${C.border}` }}>
                  <div style={{ fontFamily: font.body, fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 10 }}>{t.role}</div>
                  <div style={{ fontFamily: font.body, fontSize: 14, color: C.textSecondary, lineHeight: 1.65 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ); })()}
      </Section>

      {/* ═══ S10: CONTACT ═══ */}
      <Section bg={C.navy} id="contact" pad="80px 0">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>Get started</div>
          <h2 style={{ fontFamily: font.display, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: C.white, marginBottom: 20 }}>Schedule a briefing.</h2>
          <p style={{ fontFamily: font.body, fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 40px" }}>
            We partner selectively with database vendors serving security-conscious verticals, and with enterprises that need database-layer protection.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:contact@sentrixi.com?subject=OEM Partnership Inquiry" style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: C.navy, background: C.white, padding: "14px 28px", borderRadius: 10, textDecoration: "none" }}>For database vendors</a>
            <a href="mailto:contact@sentrixi.com?subject=Enterprise Briefing Request" style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: C.white, background: "transparent", padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.3)" }}>For enterprises</a>
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 32 }}>contact@sentrixi.com</div>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: C.navy, borderTop: "0.5px solid rgba(255,255,255,0.08)", padding: "24px 32px", textAlign: "center" }}>
        <span style={{ fontFamily: font.body, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>SENTRIXI &copy; 2026 Sentrixi Ltd. All rights reserved.</span>
      </footer>
    </div>
  );
}
