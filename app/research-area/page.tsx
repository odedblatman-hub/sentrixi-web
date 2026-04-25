import type { Metadata } from "next";
import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import SnowflakeDemo from "@/components/research/SnowflakeDemo";
import CinematicDemo from "@/components/research/CinematicDemo";
import AttackReplay from "@/components/research/AttackReplay";
import HybridDemo from "@/components/research/HybridDemo";

export const metadata: Metadata = {
  title: "Research Area | Sentrixi",
  description: "Live AEGIS attack simulations — Snowflake breach, query-layer detection, and Scattered Spider. Real TTPs. Autonomous response. Zero analysts.",
};

const TEAL = "#0D9488";
const ACCENT = "#00d4ff";

function SectionHeader({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: TEAL, opacity: 0.8, marginBottom: "0.75rem", fontFamily: "var(--font-sans, 'IBM Plex Sans', system-ui, sans-serif)" }}>
        {label}
      </div>
      <h2 style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, lineHeight: 1.15, color: "#f0f4fa", marginBottom: "0.75rem" }}>
        {title}
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#5a7a8a", lineHeight: 1.65, maxWidth: "560px" }}>{sub}</p>
    </div>
  );
}

export default function ResearchArea() {
  return (
    <main style={{ background: "#04080f", color: "#e8edf5", minHeight: "100vh", fontFamily: "var(--font-sans, 'IBM Plex Sans', system-ui, sans-serif)", overflowX: "hidden" }}>
      {/* Grid background */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", height: "64px", borderBottom: "1px solid rgba(0,210,255,0.08)", background: "rgba(4,8,15,0.85)", backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.55rem", textDecoration: "none" }}>
          <svg width="18" height="24" viewBox="10 10 130 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M75,10 L140,35 L140,105 C140,145 110,175 75,190 C40,175 10,145 10,105 L10,35 Z" fill="rgba(0,229,160,0.12)" stroke="#00E5A0" strokeWidth="4"/>
            <circle cx="75" cy="90" r="5.5" fill="#00E5A0" opacity="0.9"/>
            <circle cx="75" cy="54" r="3.5" fill="#00E5A0" opacity="0.7"/>
            <circle cx="43" cy="108" r="3.5" fill="#00E5A0" opacity="0.7"/>
            <circle cx="107" cy="108" r="3.5" fill="#00E5A0" opacity="0.7"/>
            <line x1="75" y1="90" x2="75" y2="54" stroke="#00E5A0" strokeWidth="1.5" opacity="0.5"/>
            <line x1="75" y1="90" x2="43" y2="108" stroke="#00E5A0" strokeWidth="1.5" opacity="0.5"/>
            <line x1="75" y1="90" x2="107" y2="108" stroke="#00E5A0" strokeWidth="1.5" opacity="0.5"/>
          </svg>
          <span style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "1.4rem", letterSpacing: "0.08em", color: "#e8edf5" }}>SENTRIXI</span>
        </Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/shield" style={{ color: "#7eb8d4", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em" }}>SHIELD</Link>
          <Link href="/sentinel" style={{ color: "#7eb8d4", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em" }}>SENTINEL</Link>
          <Link href="/investors" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em" }}>INVESTORS</Link>
          <span style={{ color: TEAL, fontSize: "0.85rem", letterSpacing: "0.06em", borderBottom: `1px solid ${TEAL}`, paddingBottom: "1px" }}>RESEARCH AREA</span>
          <ContactButton style={{ padding: "0.4rem 1.2rem", border: "1px solid rgba(0,210,255,0.4)", borderRadius: "4px", color: ACCENT, fontSize: "0.78rem", letterSpacing: "0.08em" }} />
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "400px", background: `radial-gradient(ellipse, rgba(13,148,136,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", border: `1px solid rgba(13,148,136,0.3)`, borderRadius: "20px", fontSize: "0.72rem", letterSpacing: "0.15em", color: TEAL, marginBottom: "2rem", background: "rgba(13,148,136,0.05)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: TEAL, animation: "pulse 2s infinite" }} />
          TECHNICAL DEMONSTRATION
        </div>

        <h1 style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "clamp(2.8rem, 6vw, 5.2rem)", fontWeight: 400, lineHeight: 1.08, maxWidth: "860px", margin: "0 auto 1.5rem", color: "#f0f4fa" }}>
          See AEGIS intercept<br />
          the attacks that<br />
          <span style={{ color: TEAL }}>made the headlines.</span>
        </h1>

        <p style={{ fontSize: "1.05rem", color: "#7a92aa", maxWidth: "520px", lineHeight: 1.7, margin: "0 auto 3.5rem" }}>
          Three replays. Real threat actor TTPs. Autonomous detection and containment — at the query layer.
        </p>

        {/* Stat strip */}
        <div style={{ display: "inline-flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center", padding: "1.25rem 2.5rem", border: "1px solid rgba(13,148,136,0.12)", borderRadius: "12px", background: "rgba(13,148,136,0.04)" }}>
          {[
            { v: "612ms", l: "avg detection" },
            { v: "0 bytes", l: "exfiltrated" },
            { v: "0", l: "analysts required" },
            { v: "MITRE", l: "ATT&CK tagged" },
          ].map(({ v, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "1.5rem", color: TEAL, marginBottom: "0.15rem" }}>{v}</div>
              <div style={{ fontSize: "0.72rem", color: "#4a6a80", letterSpacing: "0.06em" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(0,210,255,0.06)", position: "relative", zIndex: 1 }} />

      {/* SIMULATION 01 — Snowflake */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionHeader
            label="SIMULATION 01 · THE SNOWFLAKE CAMPAIGN"
            title="What 40 days of undetected access looks like — and how AEGIS stops it in 612ms."
            sub="UNC5537 (ShinyHunters) compromised 165 organizations through stolen credentials with no MFA. This replay walks through every stage of the attack and shows what AEGIS would have done at each step."
          />
          <SnowflakeDemo />
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Real incident", value: "Snowflake breach, 2024" },
              { label: "Threat actor", value: "UNC5537 / ShinyHunters" },
              { label: "AEGIS response", value: "612ms" },
              { label: "MITRE coverage", value: "8 techniques" },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: "1 1 160px" }}>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "#3a5a70", marginBottom: "0.2rem" }}>{label.toUpperCase()}</div>
                <div style={{ fontSize: "0.88rem", color: "#8ab0c0", fontFamily: "var(--font-sans, monospace)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* AttackReplay has its own borderTop */}
        <AttackReplay />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(0,210,255,0.06)", position: "relative", zIndex: 1 }} />

      {/* SIMULATION 03 — Scattered Spider */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionHeader
            label="SIMULATION 03 · SCATTERED SPIDER"
            title="A nation-grade social engineering campaign. Neutralized before a single file moved."
            sub="SMS phishing → EvilProxy session hijack → MFA fatigue → SharePoint exfil staging. 487ms from first signal to full containment. No SOC analyst required."
          />
          <CinematicDemo />
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Attack vector", value: "SMS phishing + AiTM proxy" },
              { label: "Threat actor", value: "Scattered Spider (UNC3944)" },
              { label: "AEGIS response", value: "487ms" },
              { label: "MITRE coverage", value: "12 techniques" },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: "1 1 160px" }}>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "#3a5a70", marginBottom: "0.2rem" }}>{label.toUpperCase()}</div>
                <div style={{ fontSize: "0.88rem", color: "#8ab0c0" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(0,210,255,0.06)", position: "relative", zIndex: 1 }} />

      {/* Hybrid Demo — Cinematic → SOC → Compare */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionHeader
            label="AEGIS SOC · LIVE DASHBOARD"
            title="What your analysts see — when AEGIS is running."
            sub="Watch the full attack unfold — then see the AEGIS SOC take over. Live incident timeline, AI-classified alerts, and the AI Analyst explaining every decision in plain language."
          />
          <HybridDemo />
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", borderTop: "1px solid rgba(0,210,255,0.06)", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: TEAL, opacity: 0.7, marginBottom: "1.25rem" }}>READY TO GO FURTHER</div>
          <h2 style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.15, color: "#f0f4fa", marginBottom: "1.25rem" }}>
            See AEGIS run on<br />
            <span style={{ color: TEAL }}>your environment.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#6a8a9a", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Everything you&apos;ve seen here runs against your actual database layer — not synthetic traffic. Request a technical briefing and we&apos;ll run AEGIS live on your infrastructure.
          </p>
          <a href="mailto:register@sentrixi.com?subject=Technical Briefing Request" style={{ display: "inline-block", padding: "0.85rem 2.4rem", background: TEAL, color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "0.85rem", letterSpacing: "0.08em", fontWeight: 500, transition: "opacity 0.2s" }}>
            REQUEST A TECHNICAL BRIEFING →
          </a>
          <div style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "#3a5060" }}>
            No commitment required · We'll configure a live session against your stack
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, padding: "2rem 3rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "#3a4f62" }}>
        <span style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "1rem", color: "#4a6070" }}>SENTRIXI</span>
        <span>© 2026 Sentrixi. All rights reserved.</span>
        <a href="mailto:register@sentrixi.com" style={{ color: "#3a4f62", textDecoration: "none" }}>register@sentrixi.com</a>
      </footer>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </main>
  );
}
