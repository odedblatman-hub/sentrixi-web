"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import WhyNow from "@/components/WhyNow";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main style={{ background: "#04080f", color: "#e8edf5", minHeight: "100vh", fontFamily: "var(--font-sans, 'IBM Plex Sans', system-ui, sans-serif)", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 }} />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", height: "64px", borderBottom: "1px solid rgba(0,210,255,0.08)", background: "rgba(4,8,15,0.85)", backdropFilter: "blur(12px)" }}>
        <span style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "1.4rem", letterSpacing: "0.08em", color: "#e8edf5" }}>SENTRIXI</span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/shield" style={{ color: "#7eb8d4", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em" }}>SHIELD</Link>
          <Link href="/sentinel" style={{ color: "#7eb8d4", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em" }}>SENTINEL</Link>
          <Link href="/investors" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em" }}>INVESTORS</Link>
          <Link href="/research-area" style={{ color: "#10b981", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em" }}>RESEARCH AREA</Link>
          <a href="mailto:register@sentrixi.com" style={{ padding: "0.4rem 1.2rem", border: "1px solid rgba(0,210,255,0.4)", borderRadius: "4px", color: "#00d4ff", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.08em" }}>CONTACT</a>
        </div>
      </nav>

      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "400px", background: "radial-gradient(ellipse, rgba(0,100,180,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", border: "1px solid rgba(0,210,255,0.2)", borderRadius: "20px", fontSize: "0.72rem", letterSpacing: "0.15em", color: "#00d4ff", marginBottom: "2.5rem", background: "rgba(0,210,255,0.04)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4ff", animation: "pulse 2s infinite" }} />
          AI-NATIVE DATABASE SECURITY
        </div>

        <h1 style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 400, lineHeight: 1.1, maxWidth: "880px", marginBottom: "1.5rem", color: "#f0f4fa" }}>
          Security that lives<br />
          <span style={{ color: "#00d4ff" }}>where your data lives.</span>
        </h1>

        <p style={{ fontSize: "1.1rem", color: "#7a92aa", maxWidth: "560px", lineHeight: 1.7, marginBottom: "4rem" }}>
          Two purpose-built products. One architecture.
          Real-time detection at the query layer — zero ETL, zero delay.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: "860px", width: "100%" }}>
          <ProductCard tier="TIER 1 · LAND" name="AEGIS Shield" description="AI-native behavioral detection embedded inside your database engine. Built for CISOs, CTOs, and VP R&D teams defending regulated environments." cta="Protect Your Database" href="/shield" accentColor="#00d4ff" glowColor="rgba(0,212,255,0.08)" tags={["Database Protection", "Behavioral AI", "Zero ETL"]} />
          <ProductCard tier="TIER 2 · EXPAND" name="AEGIS Sentinel" description="Full AI SIEM connecting to any datalake. Built for enterprise SOC teams and database vendors seeking to embed security as a native capability." cta="Explore Sentinel" href="/sentinel" accentColor="#f59e0b" glowColor="rgba(245,158,11,0.08)" tags={["Full AI SIEM", "Vendor Embed", "30+ AI Agents"]} />
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.3 }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #00d4ff, transparent)" }} />
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(0,210,255,0.08)", borderBottom: "1px solid rgba(0,210,255,0.08)", padding: "3rem 2rem", background: "rgba(0,15,30,0.5)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: "900px", margin: "0 auto", gap: "2rem", textAlign: "center" }}>
          <Stat value="90-Day" label="Behavioral baseline windows" />
          <Stat value="<1s" label="Mean detection latency" />
          <Stat value="30+" label="Specialized AI agents" />
          <Stat value="70%" label="Cost reduction vs. legacy SIEM" />
        </div>
      </section>

      <WhyNow context="market" />

      <footer style={{ position: "relative", zIndex: 1, padding: "2rem 3rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "#3a4f62" }}>
        <span style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "1rem", color: "#4a6070" }}>SENTRIXI</span>
        <span>© 2026 Sentrixi. All rights reserved.</span>
        <a href="mailto:register@sentrixi.com" style={{ color: "#3a4f62", textDecoration: "none" }}>register@sentrixi.com</a>
      </footer>

    </main>
  );
}

function ProductCard({ tier, name, description, cta, href, accentColor, glowColor, tags }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} style={{ textDecoration: "none" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", padding: "2rem", border: `1px solid ${hovered ? accentColor + "50" : "rgba(255,255,255,0.06)"}`, borderRadius: "12px", background: hovered ? glowColor : "rgba(8,16,30,0.6)", transition: "all 0.3s ease", cursor: "pointer", height: "100%", textAlign: "left" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: accentColor, opacity: 0.7, marginBottom: "0.75rem" }}>{tier}</div>
        <h2 style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "1.8rem", fontWeight: 400, color: "#f0f4fa", marginBottom: "1rem" }}>{name}</h2>
        <p style={{ fontSize: "0.88rem", color: "#7a92aa", lineHeight: 1.7, marginBottom: "1.5rem" }}>{description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {tags.map((tag) => (
            <span key={tag} style={{ padding: "0.2rem 0.6rem", border: `1px solid ${accentColor}30`, borderRadius: "3px", fontSize: "0.7rem", color: accentColor, letterSpacing: "0.05em" }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: accentColor, fontWeight: 500 }}>
          {cta}
          <span style={{ transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none" }}>→</span>
        </div>
      </div>
    </Link>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "2.2rem", color: "#e8edf5", marginBottom: "0.3rem" }}>{value}</div>
      <div style={{ fontSize: "0.78rem", color: "#4a6a80", letterSpacing: "0.04em" }}>{label}</div>
    </div>
  );
}
