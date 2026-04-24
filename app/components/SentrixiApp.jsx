"use client";
import { useState, useEffect, useRef } from "react";

/* ── GA4 helper ── */
function trackEvent(name, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}

/* ── tiny icons ── */
const I = {
  Shield: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Eye: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Zap: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Db: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Check: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Arrow: (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Lock: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Alert: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  User: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Server: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  Globe: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Mail: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Cloud: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  Key: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  X: (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Brain: (p) => <svg width={p.s||24} height={p.s||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17h8v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7z"/><path d="M9 22h6"/><path d="M10 17v2"/><path d="M14 17v2"/></svg>,
  Play: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><polygon points="8,5 19,12 8,19" /></svg>,
};

function useReveal(th = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Counter({ end, suffix = "", prefix = "" }) {
  const [ref, vis] = useReveal(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let c = 0;
    const s = end / 60;
    const id = setInterval(() => { c += s; if (c >= end) { setN(end); clearInterval(id); } else setN(Math.floor(c)); }, 16);
    return () => clearInterval(id);
  }, [vis, end]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
          backgroundColor: `rgba(99,102,241,${Math.random() * 0.25 + 0.08})`,
          borderRadius: "50%",
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 4}s`,
        }} />
      ))}
    </div>
  );
}

/* ── Video player — shows real video when src is provided, else styled placeholder ── */
function VideoPlayer({ src, title, description, duration, accentColor = "#6366f1" }) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);

  function handlePlay() {
    if (src && videoRef.current) {
      videoRef.current.play().catch(e => {
        console.error("Video play failed:", e);
        setError(true);
      });
      setPlaying(true);
    }
    trackEvent("video_play", { video_title: title });
  }

  if (src && !error) {
    return (
      <div style={{ marginBottom: 48, borderRadius: 16, overflow: "hidden", border: `1px solid ${accentColor}33`, background: "#0a0e1a", position: "relative" }}>
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          preload="metadata"
          style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
          onPlay={() => { setPlaying(true); trackEvent("video_play", { video_title: title }); }}
          onEnded={() => trackEvent("video_complete", { video_title: title })}
          onError={(e) => { console.error("Video error:", e); setError(true); }}
        >
          Your browser does not support the video tag.
        </video>
        {!playing && (
           <div 
             onClick={handlePlay}
             style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", cursor: "pointer", zIndex: 10 }}
           >
             <div style={{ width: 64, height: 64, borderRadius: "50%", background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px ${accentColor}66` }}>
               <I.Play />
             </div>
           </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 48, borderRadius: 16, overflow: "hidden", border: `1px solid ${accentColor}33`, background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.5))", position: "relative" }}>
      <div style={{ aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${accentColor}14 0%, transparent 60%)` }} />
        <div
          onClick={handlePlay}
          style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 0 40px ${accentColor}66`, transition: "all 0.3s", position: "relative", zIndex: 1 }}
        >
          <I.Play />
        </div>
        <div style={{ marginTop: 20, fontFamily: "Syne", fontSize: 16, fontWeight: 700, color: "#c7d2fe", position: "relative", zIndex: 1 }}>{title}</div>
        <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#64748b", marginTop: 6, position: "relative", zIndex: 1, textAlign: "center", maxWidth: 480, padding: "0 24px" }}>{description}</div>
        {duration && <div style={{ marginTop: 12, padding: "4px 12px", borderRadius: 100, background: `${accentColor}1a`, fontFamily: "DM Sans", fontSize: 11, color: accentColor, fontWeight: 600, position: "relative", zIndex: 1 }}>{duration}</div>}
        <div style={{ marginTop: 8, padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,0.04)", fontFamily: "DM Sans", fontSize: 10, color: "#475569", position: "relative", zIndex: 1 }}>{error ? "Error loading video" : "Video coming soon"}</div>
      </div>
    </div>
  );
}

/* ── Dashboard Image — displays dashboard PNGs with caption ── */
function DashboardImage({ src, title, description, accentColor = "#6366f1" }) {
  const [ref, vis] = useReveal(0.15);
  return (
    <div ref={ref} style={{ marginBottom: 48, borderRadius: 16, overflow: "hidden", border: `1px solid ${accentColor}33`, background: "rgba(15,23,42,0.5)", position: "relative", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease-out" }}>
      <img src={src} alt={title} style={{ width: "100%", display: "block", borderBottom: `1px solid ${accentColor}20` }} />
      <div style={{ padding: "20px 24px", background: "linear-gradient(180deg, rgba(15,23,42,0.8), rgba(10,14,26,0.9))" }}>
        <div style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{title}</div>
        <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{description}</div>
      </div>
    </div>
  );
}

/* ── attack chain infographic ── */
function AttackChain({ steps, detectAt, color, title }) {
  const [ref, vis] = useReveal(0.2);
  const [hov, setHov] = useState(null);
  return (
    <div ref={ref} style={{ padding: "20px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color, marginBottom: 20, fontFamily: "Syne" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
        {steps.map((s, i) => {
          const det = i === detectAt, past = i > detectAt;
          return (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ flex: 1, textAlign: "center", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: `all 0.4s ease ${i * 0.08}s`, cursor: "default", position: "relative" }}>
              {i > 0 && <div style={{ position: "absolute", left: 0, top: 19, width: "50%", height: 2, background: det ? `linear-gradient(90deg, rgba(99,102,241,0.3), ${color})` : past ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.2)" }} />}
              {i < steps.length - 1 && <div style={{ position: "absolute", right: 0, top: 19, width: "50%", height: 2, background: det ? `linear-gradient(90deg, ${color}, rgba(239,68,68,0.15))` : past ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.2)" }} />}
              <div style={{ width: 40, height: 40, borderRadius: "50%", margin: "0 auto 8px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: det ? color : past ? "rgba(239,68,68,0.12)" : "rgba(99,102,241,0.1)", border: `2px solid ${det ? color : past ? "rgba(239,68,68,0.25)" : "rgba(99,102,241,0.2)"}`, transform: hov === i ? "scale(1.15)" : "scale(1)", transition: "all 0.3s", boxShadow: det ? `0 0 24px ${color}50` : "none" }}>
                <span style={{ color: det ? "#fff" : past ? "#ef4444" : "#a5b4fc" }}>{det ? <I.Shield s={17} /> : past ? <I.X s={14} /> : s.icon}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: det ? color : past ? "#475569" : "#cbd5e1", fontFamily: "Syne", textDecoration: past ? "line-through" : "none", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: det ? color : "#64748b", fontFamily: "DM Sans", lineHeight: 1.3 }}>{det ? "AEGIS DETECTS" : past ? "BLOCKED" : s.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── expandable use-case card ── */
function UseCase({ icon, title, threat, detection, impact, color, mitre, delay = 0 }) {
  const [ref, vis] = useReveal(0.1);
  const [open, setOpen] = useState(false);
  return (
    <div ref={ref} onClick={() => { setOpen(!open); if (!open) trackEvent("use_case_expand", { title }); }} style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.6))", border: `1px solid ${open ? color + "50" : "rgba(99,102,241,0.1)"}`, borderRadius: 16, padding: open ? 28 : 24, cursor: "pointer", transition: "all 0.35s", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transitionDelay: `${delay}s`, boxShadow: open ? `0 12px 40px ${color}12` : "none" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15, color: "#e2e8f0", marginBottom: 4 }}>{title}</div>
          <div style={{ fontFamily: "DM Sans", fontSize: 12.5, color: "#94a3b8", lineHeight: 1.5 }}>{threat}</div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(99,102,241,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#64748b", fontSize: 11 }}>▼</div>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${color}20`, paddingTop: 16, marginTop: 16, animation: "fadeSlide 0.3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color, marginBottom: 6, fontFamily: "Syne" }}>How AEGIS Detects</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, fontFamily: "DM Sans" }}>{detection}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#6ee7b7", marginBottom: 6, fontFamily: "Syne" }}>Business Impact Prevented</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, fontFamily: "DM Sans" }}>{impact}</div>
            </div>
          </div>
          {mitre && <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{mitre.map((t, i) => <span key={i} style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(99,102,241,0.08)", color: "#a5b4fc", fontSize: 10, fontWeight: 600, fontFamily: "DM Sans" }}>{t}</span>)}</div>}
        </div>
      )}
    </div>
  );
}

/* ── correlation hub diagram ── */
function CorrelationDiagram() {
  const [ref, vis] = useReveal(0.2);
  const sources = [
    { label: "Identity", sub: "Okta · Entra ID", color: "#f472b6", icon: <I.Key s={16} />, angle: 0 },
    { label: "Endpoint", sub: "CrowdStrike · S1", color: "#fb923c", icon: <I.Server s={16} />, angle: 60 },
    { label: "Email", sub: "O365 · Proofpoint", color: "#fbbf24", icon: <I.Mail s={16} />, angle: 120 },
    { label: "Cloud", sub: "AWS · Azure · GCP", color: "#34d399", icon: <I.Cloud s={16} />, angle: 180 },
    { label: "Network", sub: "Zscaler · PAN", color: "#60a5fa", icon: <I.Globe s={16} />, angle: 240 },
    { label: "Database", sub: "AEGIS Shield", color: "#a78bfa", icon: <I.Db s={16} />, angle: 300 },
  ];
  const r = 130;
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: 340, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: 110, height: 110, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.2) 0%,rgba(99,102,241,0.04) 70%)", border: "2px solid rgba(99,102,241,0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2, animation: vis ? "pulse-glow 3s ease-in-out infinite" : "none", opacity: vis ? 1 : 0, transition: "opacity 0.6s 0.3s" }}>
        <I.Brain s={26} />
        <div style={{ fontFamily: "Syne", fontSize: 10, fontWeight: 700, color: "#c7d2fe", marginTop: 4 }}>AEGIS SENTINEL</div>
        <div style={{ fontSize: 9, color: "#64748b", fontFamily: "DM Sans" }}>30+ AI Agents</div>
      </div>
      <svg style={{ position: "absolute", width: 340, height: 340, zIndex: 1 }} viewBox="-170 -170 340 340">
        {sources.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const x = Math.cos(rad) * r, y = Math.sin(rad) * r;
          return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke={s.color} strokeWidth="1" strokeDasharray="4 4" opacity={vis ? 0.35 : 0} style={{ transition: `opacity 0.5s ease ${i * 0.12 + 0.4}s` }} />;
        })}
      </svg>
      {sources.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = Math.cos(rad) * r, y = Math.sin(rad) * r;
        return (
          <div key={i} style={{ position: "absolute", transform: `translate(${x}px, ${y}px)`, zIndex: 2, opacity: vis ? 1 : 0, transition: `all 0.5s ease ${i * 0.1 + 0.2}s`, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}12`, border: `1.5px solid ${s.color}35`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#e2e8f0", fontFamily: "Syne", marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 8, color: "#64748b", fontFamily: "DM Sans" }}>{s.sub}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ── contact modal ── */
function ContactModal({ open, onClose, type }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, type }),
      });
      if (res.ok) {
        setStatus("success");
        trackEvent("contact_form_submit", { form_type: type });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20, padding: 40, maxWidth: 480, width: "100%", position: "relative" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}><I.X s={20} /></button>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(110,231,183,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#6ee7b7" }}><I.Check s={28} /></div>
            <div style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>Request Received</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 14, color: "#94a3b8" }}>We'll be in touch at {email} within 24 hours.</div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>
              {type === "sandbox" ? "Request Sandbox Access" : type === "partner" ? "Partner With Us" : "Request Technical Briefing"}
            </div>
            <div style={{ fontFamily: "DM Sans", fontSize: 14, color: "#64748b", marginBottom: 24 }}>We'll respond within 24 hours.</div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Full Name", value: name, setter: setName, type: "text", placeholder: "Your name" },
                { label: "Work Email", value: email, setter: setEmail, type: "email", placeholder: "you@company.com" },
                { label: "Company", value: company, setter: setCompany, type: "text", placeholder: "Company name" },
              ].map(({ label, value, setter, type: t, placeholder }) => (
                <div key={label}>
                  <div style={{ fontFamily: "DM Sans", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>{label}</div>
                  <input required type={t} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} style={{ width: "100%", background: "rgba(30,41,59,0.8)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontFamily: "DM Sans", fontSize: 14, outline: "none" }} />
                </div>
              ))}
              <button type="submit" disabled={status === "loading"} style={{ padding: "13px 24px", borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", fontFamily: "Syne", fontWeight: 700, fontSize: 15, border: "none", cursor: status === "loading" ? "wait" : "pointer", marginTop: 8 }}>
                {status === "loading" ? "Sending..." : "Submit Request"}
              </button>
              {status === "error" && <div style={{ color: "#ef4444", fontFamily: "DM Sans", fontSize: 13, textAlign: "center" }}>Something went wrong. Please try again.</div>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════════════════════ */
export default function SentrixiLanding() {
  const [modal, setModal] = useState(null);

  const shieldCases = [
    { icon: <I.User s={22} />, title: "Credential Misuse — Anomalous Data Access", color: "#f472b6",
      threat: "A user account begins systematically exporting customer PII, financial records, and proprietary data over 48 hours using legitimate credentials — appearing as normal database activity to perimeter tools.",
      detection: "Shield detects a 340% spike in SELECT queries against sensitive tables, unusual off-hours access, and bulk export query structures deviating from the account's 6-month behavioral baseline. Cyber intelligence agents cross-reference the anomaly with known data exfiltration TTPs to confirm high-confidence threat.",
      impact: "Prevents breach of 2.3M customer records. Avoids $8.2M average insider breach cost (Ponemon 2025). Blocks NYDFS §500.17(a) notification obligation before it's triggered.",
      mitre: ["T1078 Valid Accounts", "T1530 Data from Cloud Storage", "T1567 Exfil Over Web Service"] },
    { icon: <I.Key s={22} />, title: "Compromised Service Account — Schema Recon", color: "#fb923c",
      threat: "Attacker obtains service account credentials from a leaked CI/CD config. They systematically map the entire database schema, identify high-value tables, then stage data in small chunks designed to evade volume-based alerts.",
      detection: "Shield identifies INFORMATION_SCHEMA queries and systematic table scans never observed in the account's 12-month baseline. Query intent classifier flags 'reconnaissance' and 'data staging' patterns. Risk score exceeds threshold within 4 minutes.",
      impact: "Prevents full database mapping before targeted exfiltration. Eliminates the typical 277-day dwell time for credential-based attacks. Provides forensic evidence of exactly which tables were accessed.",
      mitre: ["T1078.004 Cloud Accounts", "T1083 File & Dir Discovery", "T1074 Data Staged"] },
    { icon: <I.Alert s={22} />, title: "Second-Order SQL Injection Bypass", color: "#ef4444",
      threat: "A sophisticated injection bypasses the WAF by storing the payload in a user profile field during registration. It executes when an admin views the profile — attempting privilege escalation and credential table reads.",
      detection: "Shield operates at the database layer and sees the actual executed query regardless of delivery method. Query intent classifier flags 'privilege escalation' and 'credential access' intents. The web app service account has never performed GRANT or system table reads.",
      impact: "Catches attacks WAFs miss entirely. Prevents privilege escalation giving persistent admin access. Blocks credential theft that could compromise the entire application tier.",
      mitre: ["T1190 Exploit Public-Facing App", "T1078.003 Local Accounts", "T1552 Unsecured Credentials"] },
    { icon: <I.Db s={22} />, title: "Slow-and-Low Cumulative Exfiltration", color: "#a78bfa",
      threat: "A compromised account reads 500 records per query, 3 times daily, for 30 days — staying under the 10K-record DAM alert threshold. Total silent exfiltration: 45,000 sensitive records.",
      detection: "Shield's longitudinal analysis tracks cumulative data access, not just individual queries. It detects that this account's 90-day rolling access to the customers table exceeds its baseline by 12x. The gradual escalation pattern itself is flagged as a known exfiltration technique.",
      impact: "Detects what legacy DAM tools structurally cannot — attacks designed to stay under per-event thresholds. Prevents the 45K-record breach triggering mandatory NYDFS 72-hour notification.",
      mitre: ["T1029 Scheduled Transfer", "T1030 Data Transfer Size Limits", "T1048 Exfil Over Alt Protocol"] },
    { icon: <I.Lock s={22} />, title: "Data Integrity / Poisoning Attack", color: "#fbbf24",
      threat: "Attacker with write access subtly modifies financial records — changing transaction amounts by small percentages, altering counterparty identifiers, injecting phantom transactions to manipulate regulatory reporting.",
      detection: "Write-pattern analytics detect changed UPDATE frequency to the transactions table with unusual field targeting. Statistical analysis flags that modified values follow a non-random distribution. Integrity checksums on critical fields trigger immediate alerts.",
      impact: "Prevents regulatory reporting fraud resulting in NYDFS enforcement action. Blocks financial manipulation before it affects downstream accounting and client statements.",
      mitre: ["T1565.001 Stored Data Manipulation", "T1485 Data Destruction", "T1491 Defacement"] },
    { icon: <I.Server s={22} />, title: "RBAC Misconfiguration Exploitation", color: "#34d399",
      threat: "A role migration leaves residual permissions allowing a junior developer access to production financial tables. Curiosity-driven access escalates as they realize the access is unmonitored by existing tools.",
      detection: "Shield's role-based behavioral model knows this developer role has never accessed financial_transactions or account_balances. First access triggers anomaly flag. Cyber intelligence agents identify 'exploration escalation' — increasing query sophistication matching known reconnaissance TTPs.",
      impact: "Catches RBAC misconfigurations through behavior rather than relying on perfect policy. Identifies unauthorized access within minutes rather than during quarterly access reviews.",
      mitre: ["T1078.003 Local Accounts", "T1087 Account Discovery", "T1069 Permission Groups Discovery"] },
  ];

  const sentinelCases = [
    { icon: <I.Globe s={22} />, title: "Multi-Stage APT Kill Chain", color: "#6366f1",
      threat: "State-sponsored group: phishing → credential harvest → Okta session compromise → lateral movement to internal servers → database admin escalation → systematic exfiltration of custody wallet metadata.",
      detection: "Sentinel correlates 5 sources simultaneously: email gateway flags phishing, identity logs show impossible travel, endpoint telemetry detects lateral movement tools, network logs reveal internal scanning, Shield flags admin account accessing wallet tables for the first time. No single source triggers high-confidence — cross-correlation produces 98.7% confidence.",
      impact: "Detects sophisticated attacks evading single-source detection. Reduces investigation from days to minutes with pre-correlated kill chain. For crypto custody, prevents wallet metadata exfiltration that could enable catastrophic asset loss.",
      mitre: ["T1566 Phishing", "T1078 Valid Accounts", "T1021 Remote Services", "T1068 Priv Escalation"] },
    { icon: <I.Mail s={22} />, title: "Business Email Compromise (BEC)", color: "#f472b6",
      threat: "Attacker compromises CFO email, studies patterns for 2 weeks, then sends convincing wire transfer request referencing a real pending acquisition. Payment routes to attacker-controlled account.",
      detection: "NL processing agents flag changed sending behavior (unusual times, new device). Identity logs confirm new geographic origin. Cross-correlation shows the wire request references a deal code only discussed in emails during the compromise window — proving the attacker read internal correspondence.",
      impact: "Prevents fraudulent wire averaging $1.2M (FBI IC3 2025). Detects compromise during reconnaissance — before the fraudulent request. Maps attacker's email access to the specific intelligence gathered.",
      mitre: ["T1534 Internal Spearphishing", "T1114 Email Collection", "T1657 Financial Theft"] },
    { icon: <I.Cloud s={22} />, title: "Cloud Infrastructure Attack + Lateral to DB", color: "#34d399",
      threat: "Stolen AWS IAM keys → S3 bucket enumeration → security group modification → EC2 instance in unmonitored region → VPC pivot to internal databases.",
      detection: "CloudTrail ingestion detects IAM key usage from unfamiliar IP. Config change monitoring flags security group modification. Network telemetry shows new EC2 initiating DB connections. Shield detects a new connection source never in the baseline. Entire chain correlated in under 90 seconds.",
      impact: "Prevents cloud-to-database lateral movement bypassing perimeter security. Detects infrastructure changes creating attack pathways before exploitation. Full forensic timeline from initial access to attempted DB breach.",
      mitre: ["T1078.004 Cloud Accounts", "T1580 Cloud Infra Discovery", "T1021 Remote Services"] },
    { icon: <I.Server s={22} />, title: "Ransomware Pre-Staging Detection", color: "#ef4444",
      threat: "Ransomware operator: VPN exploit → discovery tools → shadow copy deletion → backup agent disabling → encryption payload staging across file servers — all before triggering encryption.",
      detection: "Sentinel correlates endpoint telemetry (discovery commands, shadow copy deletion, service stops), network anomalies (C2 beaconing, unusual SMB volume), and identity events (new service account, privilege escalation). AI agents recognize the pre-encryption staging pattern from training on 4,700+ ransomware incident reports.",
      impact: "Detects ransomware during preparation when containment is still possible. Average ransomware payment: $2.73M. Average total cost including downtime: $9.4M. Early detection converts catastrophic event to contained incident.",
      mitre: ["T1490 Inhibit System Recovery", "T1489 Service Stop", "T1486 Data Encrypted", "T1059 Scripting"] },
    { icon: <I.Key s={22} />, title: "Supply Chain Compromise via CI/CD", color: "#fbbf24",
      threat: "Malicious dependency injected through compromised open-source package. Backdoor compiles into production, establishing C2 channel that exfiltrates database connection strings and API keys.",
      detection: "Sentinel correlates build pipeline logs (new dependency), deployment telemetry (binary hash mismatch), network monitoring (outbound to DGA-characteristic domain), and database access logs (connection from new instance using freshly-extracted credentials). Full supply chain vector identified.",
      impact: "Detects supply chain attacks bypassing every individual control. Prevents credential theft enabling persistent database access. Identifies compromised build artifact for rollback before widespread deployment.",
      mitre: ["T1195.002 Software Supply Chain", "T1059 Scripting Interpreter", "T1041 Exfil Over C2"] },
    { icon: <I.User s={22} />, title: "Living-off-the-Land + Zero-Day", color: "#a78bfa",
      threat: "Zero-day web app exploit → exclusively legitimate tools (PowerShell, WMI, certutil) for discovery, lateral movement, and data collection. Zero malware signatures for endpoint detection.",
      detection: "Behavioral AI detects web server spawning PowerShell (anomalous lineage), WMI queries targeting unfamiliar hosts, certutil downloading from external URL. Network telemetry confirms lateral movement. Database layer shows compromised machine attempting production DB connections.",
      impact: "Detects attacks designed to evade signature-based detection entirely. Real-time HTAP processing of full endpoint + network + database telemetry. Identifies the attack during lateral movement before data access.",
      mitre: ["T1059.001 PowerShell", "T1047 WMI", "T1218 System Binary Proxy", "T1071 App Layer Protocol"] },
  ];

  return (
    <div style={{ fontFamily: "'Syne','DM Sans',system-ui,sans-serif", color: "#e2e8f0", background: "#0a0e1a", minHeight: "100vh", overflowX: "hidden" }}>
      <ContactModal open={!!modal} onClose={() => setModal(null)} type={modal} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.3)}50%{box-shadow:0 0 40px rgba(99,102,241,0.6)}}
        @keyframes slide-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .cta-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;text-decoration:none;transition:all 0.3s;cursor:pointer;border:none;font-family:'Syne',sans-serif}
        .cta-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6,#6366f1);background-size:200% 200%;animation:gradient-shift 3s ease infinite;color:white}
        .cta-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.4)}
        .cta-secondary{background:transparent;border:1.5px solid rgba(99,102,241,0.5);color:#c7d2fe}
        .cta-secondary:hover{border-color:#6366f1;background:rgba(99,102,241,0.1)}
        .card{background:linear-gradient(135deg,rgba(15,23,42,0.8),rgba(30,41,59,0.6));border:1px solid rgba(99,102,241,0.15);border-radius:16px;padding:32px;transition:all 0.3s}
        .card:hover{border-color:rgba(99,102,241,0.35)}
        .sec{max-width:1200px;margin:0 auto;padding:100px 24px}
        .tag{display:inline-block;padding:6px 14px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase}
        .tab-btn{padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;border:none;transition:all 0.3s;font-family:'Syne',sans-serif}
        .tab-on{background:linear-gradient(135deg,#6366f1,#7c3aed);color:white;box-shadow:0 4px 20px rgba(99,102,241,0.3)}
        .tab-off{background:rgba(30,41,59,0.6);color:#94a3b8}
        .tab-off:hover{background:rgba(30,41,59,0.9);color:#c7d2fe}
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px}
        .g4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:20px}
        @media(max-width:900px){.g2,.g3,.g4{grid-template-columns:1fr}.sec{padding:60px 16px}}
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,14,26,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><I.Shield s={18} /></div>
            <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: "#e2e8f0", letterSpacing: -0.5 }}>SENTRIXI</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a className="nav-link" href="#shield">Shield</a>
            <a className="nav-link" href="#sentinel">Sentinel</a>
            <a className="nav-link" href="#why-aegis">Why AEGIS</a>
            <a className="nav-link" href="#pricing">Pricing</a>
            <button className="cta-btn cta-primary" style={{ padding: "10px 24px", fontSize: 13 }} onClick={() => setModal("briefing")}>Get Started</button>
          </div>
        </div>
      </nav>

      <style>{`
        .nav-link { color: #94a3b8; text-decoration: none; font-size: 14, font-weight: 600; transition: color 0.3s; font-family: 'Syne', sans-serif; }
        .nav-link:hover { color: #a5b4fc; }
      `}</style>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Particles />
        <div style={{ position: "absolute", top: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="sec" style={{ position: "relative", zIndex: 1, paddingTop: 120 }}>
          <div style={{ maxWidth: 720, animation: "slide-up 0.8s ease-out" }}>
            <div className="tag" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", marginBottom: 24 }}>AI-NATIVE SECURITY FOR MODERN DATABASES</div>
            <h1 style={{ fontFamily: "Syne", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24, background: "linear-gradient(135deg,#e2e8f0 0%,#c7d2fe 50%,#a5b4fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Security that lives where your data lives.</h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#94a3b8", maxWidth: 560, marginBottom: 40, fontFamily: "DM Sans" }}>AEGIS delivers AI-powered database protection and full SIEM capabilities running natively on HTAP databases. Zero ETL. Real-time detection. A fraction of the cost.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="cta-btn cta-primary" onClick={() => { setModal("briefing"); trackEvent("cta_click", { button: "hero_early_access" }); }}>Request Early Access <I.Arrow s={18} /></button>
              <button className="cta-btn cta-secondary" onClick={() => { setModal("sandbox"); trackEvent("cta_click", { button: "hero_watch_overview" }); }}>Request Sandbox Access</button>
            </div>
          </div>
          <div className="g4" style={{ marginTop: 80, borderTop: "1px solid rgba(99,102,241,0.15)", paddingTop: 40 }}>
            {[
              { v: 80, s: "%", l: "Cost reduction vs. legacy SIEM" },
              { v: 30, s: "+", l: "AI agents working 24/7" },
              { p: "<", v: 1, s: "s", l: "Mean detection latency" },
              { v: 5, s: "x", l: "Faster than ETL-based detection" },
            ].map((x, i) => (
              <div key={i} style={{ textAlign: "center", padding: "28px 20px" }}>
                <div style={{ fontFamily: "Syne", fontSize: 42, fontWeight: 800, color: "#a5b4fc", marginBottom: 8 }}><Counter end={x.v} suffix={x.s} prefix={x.p || ""} /></div>
                <div style={{ fontSize: 13, color: "#64748b", fontFamily: "DM Sans" }}>{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ AEGIS SHIELD ════ */}
      <section id="shield" style={{ background: "linear-gradient(180deg,#0a0e1a 0%,#0f172a 100%)" }}>
        <div className="sec">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", marginBottom: 16 }}>TIER 1 · LAND</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 40, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>AEGIS Shield</h2>
            <p style={{ fontFamily: "Syne", fontSize: 20, color: "#a5b4fc", marginBottom: 8 }}>AI-Native Database Protection</p>
            <p style={{ color: "#94a3b8", maxWidth: 640, margin: "0 auto", fontFamily: "DM Sans", lineHeight: 1.6 }}>Shield runs inside your HTAP database — not beside it. It learns every user's behavioral baseline and detects threats that legacy DAM tools structurally cannot see.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, marginBottom: 48 }}>
              <button className="cta-btn cta-primary" onClick={() => setModal("briefing")}>Request Technical Briefing</button>
              <button className="cta-btn cta-secondary" onClick={() => setModal("sandbox")}>Request Sandbox Access</button>
            </div>
          </div>

          <VideoPlayer
            src="/videos/shield-overview.mp4"
            title="Your Database Has a Blind Spot"
            description="See how AEGIS Shield detects query anomalies, data exfiltration, and credential misuse in real-time"
            duration="1:00 — Database Protection Overview"
            accentColor="#6366f1"
          />

          <div className="g2" style={{ marginBottom: 48 }}>
            <DashboardImage
              src="/dashboards/AEGIS_02_Kill_Chain_Process_Compromise.png"
              title="Real-Time Kill Chain Mapping"
              description="Shield identifies the exact moment a legitimate process is compromised and begins unauthorized database reconnaissance."
              accentColor="#6366f1"
            />
            <DashboardImage
              src="/dashboards/AEGIS_03_Guardian_Response_Console.png"
              title="Guardian Response Console"
              description="Automated intervention and containment actions being executed as a threat is detected at the query layer."
              accentColor="#6366f1"
            />
          </div>

          <div className="g3" style={{ marginBottom: 48 }}>
            {[
              { icon: <I.Brain s={24} />, t: "Behavioral Baselining", d: "Learns normal query patterns per user, role, application, and time window over 90-day rolling windows. Every deviation scored against the individual baseline.", c: "#a78bfa" },
              { icon: <I.Globe s={24} />, t: "Cyber Intelligence Enrichment", d: "AI agents correlate database anomalies with external threat intelligence — matching TTPs, IOCs, and adversary campaigns to contextualize every alert with real-world threat data.", c: "#f472b6" },
              { icon: <I.Eye s={24} />, t: "Query Intent Classification", d: "Every query classified by intent in real-time: routine, ad-hoc, bulk export, schema recon, privilege probing. Risk scored before results return.", c: "#60a5fa" },
              { icon: <I.Lock s={24} />, t: "Exfiltration Pattern Detection", d: "Detects data staging, chunked exports, cumulative over-access, and obfuscated queries. Tracks longitudinal patterns across weeks, not just individual events.", c: "#34d399" },
              { icon: <I.Alert s={24} />, t: "Data Integrity Monitoring", d: "Statistical write-pattern analysis detects subtle record manipulation — modified amounts, altered identifiers, phantom transactions. Catches data poisoning attacks.", c: "#fbbf24" },
              { icon: <I.Shield s={24} />, t: "Compliance Automation", d: "Pre-built evidence packages for SOC 2, NYDFS §500, DORA, PCI-DSS, HIPAA. Audit-ready reports generate automatically. Zero manual log pulls.", c: "#6ee7b7" },
            ].map((c, i) => { const [ref, vis] = useReveal(0.15); return <div ref={ref} key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${i * 0.08}s` }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.c}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: c.c }}>{c.icon}</div>
              <h4 style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{c.t}</h4>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, fontFamily: "DM Sans" }}>{c.d}</p>
            </div>; })}
          </div>

          <div style={{ marginBottom: 48, padding: "20px 28px", borderRadius: 12, background: "linear-gradient(90deg, rgba(16,185,129,0.06), rgba(99,102,241,0.06))", border: "1px solid rgba(16,185,129,0.15)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><I.Shield s={20} /><span style={{ fontFamily: "Syne", fontSize: 13, fontWeight: 700, color: "#6ee7b7" }}>Security & Privacy by Design</span></div>
            <div style={{ height: 20, width: 1, background: "rgba(110,231,183,0.2)" }} />
            <span style={{ fontFamily: "DM Sans", fontSize: 12, color: "#94a3b8" }}>Your data never leaves your database — Shield analyzes in-place with zero data exfiltration risk</span>
            <div style={{ height: 20, width: 1, background: "rgba(110,231,183,0.2)" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["SOC 2 Type II", "ISO 27001", "GDPR", "Data Residency"].map(b => <span key={b} style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(110,231,183,0.08)", color: "#6ee7b7", fontSize: 10, fontWeight: 600, fontFamily: "DM Sans" }}>{b}</span>)}</div>
          </div>

          <div className="card" style={{ marginBottom: 48, padding: "32px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>How Shield Stops Database Attacks</div>
              <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#64748b" }}>Shield intervenes during the attack chain — before data leaves your perimeter</div>
            </div>
            <AttackChain steps={[
              { label: "Access Gained", sub: "Stolen creds", icon: <I.Key s={14} /> },
              { label: "Reconnaissance", sub: "Schema mapping", icon: <I.Eye s={14} /> },
              { label: "Data Staging", sub: "Chunk reads", icon: <I.Db s={14} /> },
              { label: "DETECTED", sub: "", icon: null },
              { label: "Exfiltration", sub: "Blocked", icon: null },
              { label: "Data Sold", sub: "Prevented", icon: null },
            ]} detectAt={3} color="#6366f1" title="DATABASE ATTACK KILL CHAIN" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>Real-World Threat Scenarios</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 14, color: "#64748b", marginBottom: 24 }}>Click any scenario to see detection method, business impact, and MITRE ATT&CK mapping.</div>
          </div>
          <div className="g2">{shieldCases.map((uc, i) => <UseCase key={i} {...uc} delay={i * 0.05} />)}</div>
        </div>
      </section>

      {/* ════ AEGIS SENTINEL ════ */}
      <section id="sentinel" style={{ background: "linear-gradient(180deg,#0f172a 0%,#0a0e1a 100%)" }}>
        <div className="sec">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag" style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", marginBottom: 16 }}>TIER 2 · EXPAND</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 40, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>AEGIS Sentinel</h2>
            <p style={{ fontFamily: "Syne", fontSize: 20, color: "#c4b5fd", marginBottom: 8 }}>Full AI SIEM — Connect to Any Datalake</p>
            <p style={{ color: "#94a3b8", maxWidth: 680, margin: "0 auto", fontFamily: "DM Sans", lineHeight: 1.6 }}>Route all enterprise telemetry into your existing datalake — HTAP, Snowflake, Databricks, S3, or any storage engine. Thirty-plus specialized AI agents detect, triage, investigate, and respond across every source, with HTAP performance advantages when available.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, marginBottom: 48 }}>
              <button className="cta-btn cta-primary" onClick={() => setModal("briefing")}>Request AI Security Briefing</button>
              <button className="cta-btn cta-secondary" onClick={() => setModal("sandbox")}>Request Sandbox Access</button>
            </div>
          </div>

          <VideoPlayer
            src="/videos/sentinel-overview.mp4"
            title="The SIEM That Lives Where Your Data Lives"
            description="See how 30+ AI agents correlate across identity, endpoint, email, cloud, network, and database telemetry"
            duration="1:00 — AI SIEM on Any Datalake"
            accentColor="#8b5cf6"
          />

          <div className="g3" style={{ marginBottom: 48 }}>
            <DashboardImage
              src="/dashboards/AEGIS_01_SOC_Executive_Dashboard.png"
              title="SOC Executive Dashboard"
              description="High-level visibility into enterprise risk, agent efficiency, and active incident lifecycles across all telemetry sources."
              accentColor="#8b5cf6"
            />
            <DashboardImage
              src="/dashboards/AEGIS_04_Agent_Fleet_30_Agents.png"
              title="AI Agent Fleet Management"
              description="Orchestrating 30+ specialized security agents, each monitoring specific domain telemetry in parallel."
              accentColor="#8b5cf6"
            />
            <DashboardImage
              src="/dashboards/AEGIS_05_Forensic_Report.png"
              title="Automated Forensic Reporting"
              description="Complete forensic timelines and evidence packages generated autonomously by the investigation agent team."
              accentColor="#8b5cf6"
            />
          </div>

          <div className="g2" style={{ marginBottom: 48 }}>
            <div className="card" style={{ padding: 16, minHeight: 380 }}><CorrelationDiagram /></div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: "#e2e8f0", marginBottom: 16 }}>Cross-Source Correlation Engine</div>
              <p style={{ color: "#94a3b8", fontFamily: "DM Sans", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>Modern attacks span multiple systems. No single telemetry source can detect a sophisticated attack alone. Sentinel ingests all sources into one HTAP engine and correlates in real-time.</p>
              {[
                { l: "6+ telemetry sources unified", d: "Identity, endpoint, email, cloud, network, database — one engine" },
                { l: "30+ specialized AI agents", d: "Detection, cyber intelligence, forensics, compliance, triage — coordinated by an orchestration layer" },
                { l: "Sub-second correlation", d: "HTAP processes live data alongside analytical queries — no ETL batch delay" },
                { l: "Natural language threat hunting", d: "Analysts query petabytes in plain English" },
              ].map((x, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 5, minHeight: 36, borderRadius: 3, background: "linear-gradient(180deg,#6366f1,#8b5cf6)", flexShrink: 0, marginTop: 4 }} />
                  <div><div style={{ fontFamily: "Syne", fontSize: 13, fontWeight: 700, color: "#c7d2fe", marginBottom: 2 }}>{x.l}</div><div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{x.d}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 48, padding: 32 }}>
            <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 4, textAlign: "center" }}>The 30+ Agent AI Constellation</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#64748b", textAlign: "center", marginBottom: 8 }}>Specialized agents work in parallel — each trained for a specific security domain</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#a5b4fc", textAlign: "center", marginBottom: 28 }}>Coordinated by a central Orchestration Layer that routes events, deconflicts findings, and sequences response actions</div>
            <div style={{ background: "linear-gradient(90deg, #6366f120, #8b5cf620, #6366f120)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 10, padding: "12px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a5b4fc", animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "Syne", fontSize: 12, fontWeight: 700, color: "#c7d2fe", letterSpacing: 1.5, textTransform: "uppercase" }}>Orchestration Layer — Event Routing · Agent Coordination · Deconfliction · Response Sequencing</span>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a5b4fc", animation: "pulse-glow 2s ease-in-out infinite" }} />
            </div>
            <div className="g4" style={{ gap: 16 }}>
              {[
                { t: "Detection Team", c: "#6366f1", a: ["Threat Detection Lead", "Behavioral Analytics", "Anomaly Scoring", "Detection Engineering", "Threat Intel Correlation", "Alert Prioritization"] },
                { t: "Cyber Intelligence Team", c: "#fbbf24", a: ["Threat Intelligence Lead", "Adversary TTP Profiler", "IOC Enrichment Analyst", "Dark Web Monitor", "Campaign Tracker", "Vulnerability Intelligence", "Geo-Threat Analyst"] },
                { t: "Investigation Team", c: "#f472b6", a: ["DFIR Lead", "Forensic Analyst", "Network Forensics", "Endpoint Forensics", "Cloud Forensics", "Log Correlation Analyst", "Timeline Reconstructor"] },
                { t: "Response Team", c: "#34d399", a: ["Incident Commander", "Containment Agent", "Evidence Packager", "Regulatory Compliance", "Executive Communicator", "Playbook Executor", "Post-Incident Analyst"] },
              ].map((team, i) => { const [ref, vis] = useReveal(0.15); return <div ref={ref} key={i} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${i * 0.1}s`, background: `${team.c}08`, border: `1px solid ${team.c}20`, borderRadius: 12, padding: 20 }}>
                <div style={{ fontFamily: "Syne", fontSize: 12, fontWeight: 700, color: team.c, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{team.t}</div>
                {team.a.map((a, j) => <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: team.c, flexShrink: 0 }} /><span style={{ fontFamily: "DM Sans", fontSize: 11, color: "#cbd5e1" }}>{a}</span></div>)}
              </div>; })}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20, padding: "24px 28px", borderColor: "rgba(139,92,246,0.2)" }}>
            <div style={{ fontFamily: "Syne", fontSize: 15, fontWeight: 700, color: "#c4b5fd", marginBottom: 12 }}>Connect to Any Datalake</div>
            <p style={{ fontFamily: "DM Sans", fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 16 }}>AEGIS Sentinel integrates with your existing data infrastructure — no rip-and-replace required. Route telemetry from any source into any storage layer, with optimized connectors for maximum performance.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["HTAP Databases", "Snowflake", "Databricks", "Amazon S3", "Azure ADLS", "Google BigQuery", "Apache Iceberg", "Delta Lake", "Parquet / ORC"].map(dl => <span key={dl} style={{ padding: "5px 14px", borderRadius: 100, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "#c4b5fd", fontSize: 11, fontWeight: 600, fontFamily: "DM Sans" }}>{dl}</span>)}
            </div>
            <div style={{ marginTop: 12, fontFamily: "DM Sans", fontSize: 12, color: "#64748b", fontStyle: "italic" }}>HTAP databases unlock maximum performance with zero-ETL real-time detection. All other datalakes supported via optimized batch and streaming connectors.</div>
          </div>

          <div style={{ marginBottom: 48, padding: "20px 28px", borderRadius: 12, background: "linear-gradient(90deg, rgba(16,185,129,0.06), rgba(139,92,246,0.06))", border: "1px solid rgba(16,185,129,0.15)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><I.Lock s={20} /><span style={{ fontFamily: "Syne", fontSize: 13, fontWeight: 700, color: "#6ee7b7" }}>Security & Privacy by Design</span></div>
            <div style={{ height: 20, width: 1, background: "rgba(110,231,183,0.2)" }} />
            <span style={{ fontFamily: "DM Sans", fontSize: 12, color: "#94a3b8" }}>End-to-end encryption in transit and at rest — your telemetry stays in your environment with full data sovereignty</span>
            <div style={{ height: 20, width: 1, background: "rgba(110,231,183,0.2)" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["SOC 2 Type II", "ISO 27001", "GDPR", "Zero Trust", "Data Sovereignty"].map(b => <span key={b} style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(110,231,183,0.08)", color: "#6ee7b7", fontSize: 10, fontWeight: 600, fontFamily: "DM Sans" }}>{b}</span>)}</div>
          </div>

          <div className="card" style={{ marginBottom: 48, padding: "32px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>How Sentinel Stops Multi-Stage Attacks</div>
              <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#64748b" }}>Cross-source correlation catches attacks no single tool can detect</div>
            </div>
            <AttackChain steps={[
              { label: "Phishing", sub: "Email bait", icon: <I.Mail s={14} /> },
              { label: "Credential Theft", sub: "SSO compromised", icon: <I.Key s={14} /> },
              { label: "Lateral Movement", sub: "Internal pivot", icon: <I.Globe s={14} /> },
              { label: "DETECTED", sub: "", icon: null },
              { label: "Priv Escalation", sub: "Blocked", icon: null },
              { label: "Exfiltration", sub: "Prevented", icon: null },
            ]} detectAt={3} color="#8b5cf6" title="APT KILL CHAIN — MULTI-SOURCE CORRELATION" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>Real-World Threat Scenarios</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 14, color: "#64748b", marginBottom: 24 }}>Click to see multi-source correlation details and MITRE ATT&CK mapping.</div>
          </div>
          <div className="g2" style={{ marginBottom: 48 }}>{sentinelCases.map((uc, i) => <UseCase key={i} {...uc} delay={i * 0.05} />)}</div>

          <DashboardImage
            src="/dashboards/AEGIS_06_LOTL_Attack_Simulation.png"
            title="Living-off-the-Land (LotL) Attack Simulation"
            description="Sentinel detecting a sophisticated zero-day exploit attempt that exclusively uses legitimate system binaries (PowerShell, WMI) to evade traditional EDR signatures."
            accentColor="#8b5cf6"
          />
        </div>
      </section>

      {/* ════ WHY AEGIS ════ */}
      <section id="why-aegis" style={{ background: "linear-gradient(180deg, #0a0e1a 0%, #0f172a 100%)" }}>
        <div className="sec">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="tag" style={{ background: "rgba(239,68,68,0.12)", color: "#fca5a5", marginBottom: 16 }}>COMPETITIVE ADVANTAGE</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 40, fontWeight: 700, color: "#e2e8f0", marginBottom: 12 }}>Not Just Another SIEM</h2>
            <p style={{ color: "#94a3b8", maxWidth: 660, margin: "0 auto", fontFamily: "DM Sans", lineHeight: 1.6 }}>Lakehouse SIEMs bolt AI assistants onto data platforms. AEGIS was purpose-built for security investigation from day one — with capabilities no analytics-first platform can match.</p>
          </div>

          <div className="g2" style={{ marginBottom: 48, gap: 16 }}>
            {[
              { badge: "INVESTIGATION-FIRST", title: "Built for DFIR, Not Dashboards", theirs: "Other platforms detect threats and surface alerts — then hand off to human analysts for manual investigation using query tools and dashboards.", ours: "AEGIS conducts full forensic investigations autonomously. Twenty specialized agents coordinate across detection, behavioral profiling, forensics, and response teams — working in parallel, not in sequence.", color: "#6366f1" },
              { badge: "CYBER INTELLIGENCE", title: "Threat-Informed, Not Just Anomaly-Detected", theirs: "Other SIEMs use statistical anomaly detection — they know something unusual happened, but can't contextualize it against real-world adversary campaigns, TTPs, or active threat intelligence.", ours: "AEGIS deploys a dedicated Cyber Intelligence Team: threat intel analysts, adversary TTP profilers, IOC enrichment agents, dark web monitors, and campaign trackers that correlate every alert against live threat intelligence.", color: "#f472b6" },
              { badge: "SPECIALIZED AGENTS", title: "Domain Experts, Not Generic Copilots", theirs: "Lakehouse SIEMs offer AI assistants that help analysts write queries, author detection rules, and translate natural language to SQL — essentially productivity tools for existing workflows.", ours: "AEGIS deploys 30+ purpose-built agents with distinct domain expertise: network forensics, endpoint forensics, cloud forensics, cyber intelligence, threat intel correlation, regulatory compliance, evidence packaging.", color: "#fbbf24" },
              { badge: "DATABASE-NATIVE", title: "Protection Inside the Database", theirs: "No lakehouse SIEM offers embedded database activity monitoring. They ingest database logs after the fact — creating a detection gap between when data is accessed and when the log arrives for analysis.", ours: "AEGIS Shield runs inside the database engine itself. It sees every query at execution time, classifies intent before results return, and detects anomalies with zero lag. No other SIEM architecture can match this.", color: "#34d399" },
              { badge: "EVIDENCE PACKAGING", title: "Regulatory-Ready, Not Dashboard-Ready", theirs: "Other platforms offer compliance dashboards and visualization tools. When the regulator calls, your team still spends days manually assembling evidence packages, cross-referencing logs, and preparing documentation.", ours: "AEGIS auto-generates framework-specific evidence packages — NYDFS 72-hour notification bundles, DORA incident reports, SOC 2 audit evidence — with full forensic timelines, risk scoring, and executive summaries.", color: "#6ee7b7" },
              { badge: "ZERO-ETL", title: "Real-Time, Not Near-Real-Time", theirs: "Even \"decoupled\" lakehouse SIEMs batch-ingest data through ETL pipelines. \"Near-real-time\" means minutes of latency. When mean time to exploit is 1.6 days, minutes of detection delay compound into hours of response delay.", ours: "HTAP databases run analytical queries directly on live transactional data. AEGIS detects threats on the same write transaction that created the event — sub-second detection latency, not sub-minute.", color: "#60a5fa" },
              { badge: "VENDOR-AGNOSTIC", title: "Your Database, Your Choice", theirs: "Lakehouse SIEMs require you to run on their proprietary platform. Your security data, detection rules, ML models, and investigation history are locked into a single vendor.", ours: "AEGIS runs on any HTAP database: TiDB, SingleStore, CockroachDB, AlloyDB, and more. Switch vendors, run multi-cloud, maintain true data sovereignty. Your security platform should defend you, not lock you in.", color: "#fb923c" },
              { badge: "PARALLEL ORCHESTRATION", title: "All Teams, Simultaneously", theirs: "Traditional SIEM workflows are linear: detect → enrich → alert → triage → investigate → respond. Each step waits for the previous one. A complex investigation takes days.", ours: "AEGIS fires all four agent teams in parallel on every significant event: Detection scores the threat, Cyber Intelligence contextualizes the adversary, Investigation gathers forensic evidence, and Response prepares containment — all simultaneously.", color: "#c4b5fd" },
            ].map((item, i) => {
              const [ref, vis] = useReveal(0.1);
              return (
                <div ref={ref} key={i} style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.5))", border: `1px solid ${item.color}20`, borderRadius: 16, padding: 28, overflow: "hidden", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `all 0.5s ease ${i * 0.06}s`, position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: item.color, borderRadius: "16px 0 0 16px" }} />
                  <div style={{ paddingLeft: 8 }}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 100, background: `${item.color}12`, color: item.color, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, fontFamily: "Syne", marginBottom: 10 }}>{item.badge}</span>
                    <div style={{ fontFamily: "Syne", fontSize: 17, fontWeight: 700, color: "#e2e8f0", marginBottom: 14 }}>{item.title}</div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}><I.X s={12} /></div>
                      <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#94a3b8", lineHeight: 1.55 }}>{item.theirs}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(110,231,183,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, color: "#6ee7b7" }}><I.Check s={12} /></div>
                      <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#cbd5e1", lineHeight: 1.55 }}>{item.ours}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card" style={{ padding: 32, borderColor: "rgba(99,102,241,0.25)" }}>
            <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 20, textAlign: "center" }}>Capability Comparison</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "DM Sans", fontSize: 13 }}>
                <thead>
                  <tr>{["Capability", "AEGIS", "Lakehouse SIEMs", "Legacy SIEMs", "DAM Tools"].map((h, i) => <th key={i} style={{ padding: "10px 14px", textAlign: i === 0 ? "left" : "center", borderBottom: "1px solid rgba(99,102,241,0.15)", color: i === 1 ? "#a5b4fc" : "#64748b", fontWeight: 700, fontSize: 12, letterSpacing: 0.5, fontFamily: "Syne" }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ["Database-native protection", true, false, false, true],
                    ["Full SIEM (enterprise telemetry)", true, true, true, false],
                    ["Zero-ETL real-time detection", true, false, false, false],
                    ["Cyber intelligence enrichment", true, false, false, false],
                    ["30+ agent autonomous investigation", true, false, false, false],
                    ["Regulatory evidence auto-packaging", true, false, false, false],
                    ["Parallel team orchestration", true, false, false, false],
                    ["Natural language threat hunting", true, true, false, false],
                    ["Detection-as-Code (CI/CD)", true, true, false, false],
                    ["Vendor-agnostic (multi-DB)", true, false, false, "Partial"],
                    ["Custom ML model deployment", true, true, false, false],
                    ["Sub-second detection latency", true, false, false, true],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(99,102,241,0.06)" }}>
                      <td style={{ padding: "10px 14px", color: "#cbd5e1", fontWeight: 500 }}>{row[0]}</td>
                      {[1,2,3,4].map(j => <td key={j} style={{ padding: "10px 14px", textAlign: "center" }}>{row[j] === true ? <span style={{ color: "#6ee7b7", fontWeight: 700 }}>✓</span> : row[j] === false ? <span style={{ color: "#475569" }}>—</span> : <span style={{ color: "#fbbf24", fontSize: 11 }}>{row[j]}</span>}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ════ WHY HTAP ════ */}
      <section id="htap" style={{ background: "#0f172a" }}>
        <div className="sec">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="tag" style={{ background: "rgba(251,191,36,0.15)", color: "#fcd34d", marginBottom: 16 }}>ARCHITECTURAL ADVANTAGE</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 40, fontWeight: 700, color: "#e2e8f0", marginBottom: 16 }}>Why HTAP Is the Future of SIEM</h2>
          </div>
          <div className="g3" style={{ marginBottom: 60 }}>
            {[
              { icon: <I.Zap s={28} />, c: "#fbbf24", t: "Real-Time Detection", d: "Analytical queries on live transactional data. Sub-second threat detection." },
              { icon: <I.Db s={28} />, c: "#6ee7b7", t: "Zero Data Duplication", d: "Log ingestion and AI inference in one engine. No ETL pipeline." },
              { icon: <I.Brain s={28} />, c: "#a5b4fc", t: "Native Vector Search", d: "Semantic log analysis with context-aware AI reasoning." },
              { icon: <I.Server s={28} />, c: "#f472b6", t: "100K+ Events/Second", d: "Massive concurrent writes + heavy analytical reads without degradation." },
              { icon: <I.Eye s={28} />, c: "#fcd34d", t: "Stack Consolidation", d: "Replaces 3–5 SOC tools into one unified platform." },
              { icon: <I.Zap s={28} />, c: "#c4b5fd", t: "AI-Native Architecture", d: "ML training, feature engineering, and inference alongside security data." },
            ].map((c, i) => { const [ref, vis] = useReveal(0.15); return <div ref={ref} key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${i * 0.08}s` }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.c}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: c.c }}>{c.icon}</div>
              <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 12 }}>{c.t}</h4>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, fontFamily: "DM Sans" }}>{c.d}</p>
            </div>; })}
          </div>
          <div className="g2">
            <div className="card" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#ef4444", marginBottom: 16, fontSize: 14, letterSpacing: 1 }}>LEGACY SIEM</div>
              <div style={{ fontFamily: "DM Sans", fontSize: 14, color: "#94a3b8", lineHeight: 2.2 }}>Sources → Shipper → ETL → Storage → Analytics → Alert → Triage<br /><span style={{ color: "#64748b" }}>⏱ Minutes–hours latency · 💰 $4–6/GB · 🔒 Vendor lock-in</span></div>
            </div>
            <div className="card" style={{ borderColor: "rgba(99,102,241,0.4)", boxShadow: "0 0 30px rgba(99,102,241,0.1)" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#6366f1", marginBottom: 16, fontSize: 14, letterSpacing: 1 }}>AEGIS ON HTAP</div>
              <div style={{ fontFamily: "DM Sans", fontSize: 14, color: "#94a3b8", lineHeight: 2.2 }}>Sources → HTAP Database → AI Agents Detect + Respond<br /><span style={{ color: "#6ee7b7" }}>⚡ Sub-second · 💰 $1.50/GB · 🔓 Open formats · ✅ Business data correlation</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ PRICING ════ */}
      <section id="pricing" style={{ background: "linear-gradient(180deg,#0f172a,#0a0e1a)" }}>
        <div className="sec">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="tag" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", marginBottom: 16 }}>TRANSPARENT PRICING</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 40, fontWeight: 700, color: "#e2e8f0" }}>Built for Enterprise Economics</h2>
          </div>
          <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: "#a5b4fc", marginBottom: 24 }}>AEGIS Shield</h3>
          <div className="g3" style={{ marginBottom: 48 }}>
            {[
              { n: "Starter", p: "$24K", s: "/yr", sc: "Up to 5 nodes", f: ["Behavioral analytics", "Anomaly detection", "1 compliance pack"], hl: false },
              { n: "Pro", p: "$72K", s: "/yr", sc: "Up to 25 nodes", f: ["Full behavioral + threat detection", "3 compliance packs", "API integrations", "Priority support"], hl: true },
              { n: "Enterprise", p: "Custom", s: "", sc: "Unlimited", f: ["Full suite + custom compliance", "Dedicated AI model training", "24/7 + SLA", "On-prem option"], hl: false },
            ].map((pl, i) => (
              <div key={i} style={{ background: pl.hl ? "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1))" : "rgba(15,23,42,0.6)", border: `1px solid ${pl.hl ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.1)"}`, borderRadius: 16, padding: 32, transition: "all 0.3s" }}>
                {pl.hl && <div style={{ fontFamily: "Syne", fontSize: 11, fontWeight: 700, color: "#a5b4fc", letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Most Popular</div>}
                <div style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{pl.n}</div>
                <div style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>{pl.sc}</div>
                <div style={{ marginBottom: 24 }}><span style={{ fontFamily: "Syne", fontSize: 36, fontWeight: 800, color: "#e2e8f0" }}>{pl.p}</span><span style={{ color: "#64748b", fontSize: 14 }}>{pl.s}</span></div>
                {pl.f.map((f, j) => <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span style={{ color: "#6ee7b7" }}><I.Check s={16} /></span><span style={{ color: "#cbd5e1", fontSize: 14, fontFamily: "DM Sans" }}>{f}</span></div>)}
                <button className={`cta-btn ${pl.hl ? "cta-primary" : "cta-secondary"}`} style={{ width: "100%", justifyContent: "center", marginTop: 20 }} onClick={() => { setModal(pl.n === "Enterprise" ? "partner" : "briefing"); trackEvent("pricing_cta", { plan: pl.n }); }}>{pl.n === "Enterprise" ? "Contact Sales" : "Get Started"}</button>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, color: "#c4b5fd", marginBottom: 24 }}>AEGIS Sentinel</h3>
          <div className="card" style={{ borderColor: "rgba(139,92,246,0.3)" }}>
            <div className="g2" style={{ gap: 48 }}>
              <div>
                <div style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, color: "#c4b5fd", marginBottom: 16 }}>Consumption-Based</div>
                {[["Ingestion", "$1.50/GB/day"], ["Hot Retention", "$25/TB/mo"], ["Warm Retention", "$8/TB/mo"], ["AI Compute", "$0.10/investigation"], ["Platform Fee", "From $48K/yr"]].map(([l, p], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(99,102,241,0.1)" }}><span style={{ color: "#94a3b8", fontFamily: "DM Sans", fontSize: 14 }}>{l}</span><span style={{ color: "#e2e8f0", fontFamily: "Syne", fontWeight: 600, fontSize: 14 }}>{p}</span></div>)}
              </div>
              <div>
                <div style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, color: "#c4b5fd", marginBottom: 16 }}>500 GB/Day Comparison</div>
                {[["Splunk", "~$1.1M/yr", "#ef4444", 100], ["Microsoft Sentinel", "~$680K/yr", "#f59e0b", 62], ["Databricks Lakewatch", "~$400K/yr", "#fbbf24", 36], ["AEGIS on HTAP", "~$320K/yr", "#6ee7b7", 29]].map(([n, p, c, w], i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: "#94a3b8", fontFamily: "DM Sans", fontSize: 13 }}>{n}</span><span style={{ color: c, fontFamily: "Syne", fontWeight: 700, fontSize: 14 }}>{p}</span></div>
                    <div style={{ height: 8, borderRadius: 4, background: "rgba(30,41,59,0.8)", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 4, background: c, width: `${w}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ VENDOR CTA ════ */}
      <section style={{ background: "#0a0e1a" }}>
        <div className="sec" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <div className="card" style={{ textAlign: "center", padding: "60px 40px", background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.05))", borderColor: "rgba(99,102,241,0.3)" }}>
            <div className="tag" style={{ background: "rgba(99,102,241,0.2)", color: "#c7d2fe", marginBottom: 20 }}>FOR DATABASE VENDORS</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 32, fontWeight: 700, color: "#e2e8f0", marginBottom: 16 }}>Embed AEGIS in Your Platform</h2>
            <p style={{ color: "#94a3b8", maxWidth: 560, margin: "0 auto 32px", fontFamily: "DM Sans", lineHeight: 1.6 }}>White-label or co-brand AEGIS Shield as a native security feature. Differentiate against competitors and unlock revenue from security budgets.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button className="cta-btn cta-primary" onClick={() => { setModal("partner"); trackEvent("cta_click", { button: "vendor_partner" }); }}>Partner With Us <I.Arrow s={18} /></button>
              <button className="cta-btn cta-secondary" onClick={() => { setModal("briefing"); trackEvent("cta_click", { button: "vendor_brief" }); }}>Request Partner Brief</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(99,102,241,0.1)", background: "#0a0e1a" }}>
        <div className="sec" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><I.Shield s={14} /></div>
              <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: "#94a3b8" }}>SENTRIXI</span>
            </div>
            <div style={{ color: "#475569", fontSize: 12, fontFamily: "DM Sans" }}>
              <a href="mailto:register@sentrixi.com" style={{ color: "#64748b", textDecoration: "none", marginRight: 20 }}>register@sentrixi.com</a>
              &copy; 2026 Sentrixi. Security that lives where your data lives.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
