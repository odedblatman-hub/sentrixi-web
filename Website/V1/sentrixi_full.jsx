import { useState, useEffect, useRef, useCallback } from "react";

/* ─── BRAND TOKENS ─────────────────────────────────────────────── */
const T = {
  teal:      "#0D9488",
  tealDark:  "#0F766E",
  tealLight: "#CCFBF1",
  tealXL:    "#F0FDFA",
  navy:      "#0F172A",
  navyMid:   "#1E293B",
  navyLight: "#334155",
  ivory:     "#FAFAF7",
  border:    "#E2E8F0",
  borderMid: "#CBD5E1",
  muted:     "#64748B",
  mutedLt:   "#94A3B8",
  red:       "#DC2626",
  redBg:     "#FEF2F2",
  amber:     "#D97706",
  amberBg:   "#FFFBEB",
  success:   "#059669",
  successBg: "#ECFDF5",
};

/* ─── LOGO SVG ──────────────────────────────────────────────────── */
const LogoMark = ({ size = 32, teal = T.teal, navy = T.navy, ivory = T.ivory }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M55.2 25.8 A24 24 0 1 0 55.2 38.2" stroke={teal} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
    <circle cx="49" cy="15" r="4.5" fill={teal}/>
    <circle cx="15" cy="49" r="4.5" fill={teal}/>
    <circle cx="32" cy="32" r="6.5" fill={navy}/>
    <circle cx="32" cy="32" r="3.2" fill={teal}/>
  </svg>
);

const LogoWordmark = ({ size = 24, dark = true }) => (
  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
    <LogoMark size={size} navy={dark ? T.navy : T.ivory} />
    <span style={{
      fontFamily:"'DM Sans', sans-serif", fontWeight:500,
      fontSize: size * 0.75, letterSpacing:"-0.4px",
      color: dark ? T.navy : T.ivory, lineHeight:1,
    }}>
      Sentri<em style={{ fontFamily:"'Instrument Serif', serif", fontStyle:"italic", color:T.teal }}>xi</em>
    </span>
  </div>
);

/* ─── GLOBAL CSS ────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body { font-family:'DM Sans',sans-serif; background:${T.ivory}; color:${T.navy}; -webkit-font-smoothing:antialiased; }
.serif  { font-family:'Instrument Serif',serif; }
.italic { font-style:italic; }
.mono   { font-family:'DM Mono',monospace; }
.teal   { color:${T.teal}; }

/* Nav */
.nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  height:64px; padding:0 48px;
  display:flex; align-items:center; justify-content:space-between;
  background:rgba(250,250,247,0.93); backdrop-filter:blur(14px);
  border-bottom:1px solid ${T.border};
  transition:box-shadow 0.3s;
}
.nav.scrolled { box-shadow:0 1px 24px rgba(15,23,42,0.07); }
.nav-links { display:flex; align-items:center; gap:32px; }
.nav-btn {
  background:none; border:none; cursor:pointer;
  font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
  color:${T.muted}; transition:color 0.2s; padding:0;
}
.nav-btn:hover, .nav-btn.active { color:${T.navy}; }
.btn-book {
  background:${T.navy}; color:white;
  font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
  padding:9px 22px; border-radius:9px; border:none; cursor:pointer;
  transition:all 0.2s;
}
.btn-book:hover { background:${T.navyMid}; transform:translateY(-1px); }

/* Shared section wrapper */
.page-section { padding:100px 48px; max-width:1200px; margin:0 auto; }
.section-tag {
  font-size:11px; font-weight:600; letter-spacing:0.12em;
  text-transform:uppercase; color:${T.teal}; margin-bottom:14px;
  display:block;
}
.section-h2 {
  font-family:'Instrument Serif',serif;
  font-size:clamp(32px,4vw,52px); line-height:1.08;
  letter-spacing:-1.5px; margin-bottom:18px;
}
.section-sub {
  font-size:17px; color:${T.muted}; line-height:1.75;
  max-width:600px; margin-bottom:56px;
}

/* Buttons */
.btn-primary {
  background:${T.navy}; color:white;
  font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500;
  padding:14px 28px; border-radius:10px; border:none; cursor:pointer;
  transition:all 0.2s; display:inline-flex; align-items:center; gap:8px;
}
.btn-primary:hover { background:${T.navyMid}; transform:translateY(-1px); }
.btn-teal {
  background:${T.teal}; color:white;
  font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500;
  padding:14px 28px; border-radius:10px; border:none; cursor:pointer;
  transition:all 0.2s;
}
.btn-teal:hover { background:${T.tealDark}; transform:translateY(-1px); }
.btn-white {
  background:white; color:${T.tealDark};
  font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
  padding:14px 28px; border-radius:10px; border:none; cursor:pointer;
  transition:all 0.2s;
}
.btn-white:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(0,0,0,0.12); }

/* Email form */
.email-form { display:flex; gap:10px; max-width:460px; }
.email-input {
  flex:1; padding:13px 18px; border-radius:10px;
  border:1.5px solid ${T.border}; background:white;
  font-family:'DM Sans',sans-serif; font-size:15px; color:${T.navy};
  outline:none; transition:border 0.2s;
}
.email-input:focus { border-color:${T.teal}; }
.email-input::placeholder { color:${T.mutedLt}; }
.success-msg {
  display:flex; align-items:center; gap:10px;
  background:${T.successBg}; border:1px solid #A7F3D0;
  border-radius:10px; padding:14px 20px;
  font-size:15px; color:${T.success}; font-weight:500;
  max-width:460px;
}

/* Pulse dot */
.pulse-dot {
  width:8px; height:8px; border-radius:50%; background:${T.teal};
  animation:pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

/* Live badge */
.live-badge {
  display:inline-flex; align-items:center; gap:7px;
  background:${T.tealLight}; color:${T.tealDark};
  font-size:11px; font-weight:700; letter-spacing:0.08em;
  padding:5px 13px; border-radius:100px; text-transform:uppercase;
}

/* Stats bar */
.stats-bar {
  background:${T.navy}; padding:20px 48px;
  display:flex; justify-content:center; gap:0; flex-wrap:wrap;
}
.stat-item {
  text-align:center; padding:0 48px;
  border-right:1px solid rgba(255,255,255,0.1);
}
.stat-item:last-child { border-right:none; }
.stat-num {
  font-family:'DM Mono',monospace; font-size:28px; color:white;
  letter-spacing:-1px; display:block;
}
.stat-num em { font-style:normal; color:${T.teal}; }
.stat-label { font-size:11px; color:${T.mutedLt}; margin-top:3px; letter-spacing:0.04em; }

/* Incident theater */
.theater {
  border:1px solid ${T.border}; border-radius:16px; overflow:hidden;
  background:white; margin-bottom:16px;
}
.theater-bar {
  padding:10px 16px; background:${T.ivory};
  border-bottom:1px solid ${T.border};
  display:flex; align-items:center; gap:8px;
}
.theater-dot { width:10px; height:10px; border-radius:50%; }
.theater-title { font-size:12px; color:${T.muted}; flex:1; margin-left:4px; font-family:'DM Mono',monospace; }

.t-row { display:flex; gap:12px; align-items:flex-start; padding:12px 16px; border-bottom:1px solid ${T.border}; transition:opacity 0.5s; }
.t-row:last-child { border-bottom:none; }
.t-time { font-size:10px; color:${T.mutedLt}; min-width:48px; padding-top:4px; font-family:'DM Mono',monospace; }
.t-icon {
  width:26px; height:26px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:11px; font-weight:700;
}
.t-icon.threat { background:${T.redBg}; color:${T.red}; }
.t-icon.agent  { background:${T.tealXL}; color:${T.tealDark}; }
.t-icon.ok     { background:${T.successBg}; color:${T.success}; }
.t-main { font-size:13px; font-weight:500; color:${T.navy}; margin-bottom:3px; }
.t-sub  { font-size:12px; color:${T.muted}; }
.t-chip {
  display:inline-block; font-size:10px; font-weight:600;
  padding:2px 8px; border-radius:20px; margin-top:5px; letter-spacing:0.04em;
}
.chip-threat { background:${T.redBg}; color:${T.red}; }
.chip-agent  { background:${T.tealLight}; color:${T.tealDark}; }
.chip-ok     { background:${T.successBg}; color:${T.success}; }

.resolution {
  margin:12px 16px; padding:12px 16px; border-radius:10px;
  background:${T.successBg}; border:1px solid #A7F3D0;
  transition:opacity 0.5s;
}
.res-title { font-size:12px; font-weight:600; color:${T.success}; margin-bottom:8px; }
.res-stats { display:flex; gap:24px; }
.res-n { font-size:20px; font-weight:600; color:${T.success}; font-family:'DM Mono',monospace; }
.res-l { font-size:10px; color:${T.success}; opacity:0.75; margin-top:2px; }

/* Audience tabs */
.aud-tabs { display:flex; gap:0; border:1px solid ${T.border}; border-radius:10px; overflow:hidden; margin-bottom:20px; }
.aud-tab {
  flex:1; padding:10px 16px; text-align:center; font-size:13px; font-weight:500;
  cursor:pointer; border:none; font-family:'DM Sans',sans-serif;
  background:${T.ivory}; color:${T.muted};
  border-right:1px solid ${T.border}; transition:all 0.15s;
}
.aud-tab:last-child { border-right:none; }
.aud-tab.on { background:white; color:${T.navy}; }
.aud-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.aud-card { background:white; border:1px solid ${T.border}; border-radius:12px; padding:18px; }
.aud-n { font-size:26px; font-weight:600; color:${T.navy}; font-family:'DM Mono',monospace; letter-spacing:-1px; }
.aud-n em { font-style:normal; color:${T.teal}; }
.aud-l { font-size:12px; color:${T.muted}; margin-top:4px; }

/* Agent grid */
.agent-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:48px; }
.agent-card {
  background:white; border:1px solid ${T.border}; border-radius:16px; padding:22px 18px;
  transition:all 0.25s; cursor:default; position:relative; overflow:hidden;
}
.agent-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:var(--ac, ${T.teal}); border-radius:16px 16px 0 0;
  transform:scaleX(0); transition:transform 0.25s; transform-origin:left;
}
.agent-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(15,23,42,0.08); }
.agent-card:hover::before { transform:scaleX(1); }
.agent-emoji { font-size:24px; margin-bottom:12px; display:block; }
.agent-role { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--ac, ${T.teal}); margin-bottom:4px; }
.agent-name { font-size:17px; font-weight:600; color:${T.navy}; margin-bottom:8px; font-family:'Instrument Serif',serif; }
.agent-desc { font-size:13px; color:${T.muted}; line-height:1.65; }
.agent-status { display:flex; align-items:center; gap:5px; font-size:11px; color:${T.success}; font-weight:500; margin-top:12px; }

/* Constellation canvas */
.constellation-wrap {
  border:1px solid ${T.border}; border-radius:16px; overflow:hidden;
  background:white; margin-bottom:16px;
}
.c-bar {
  padding:10px 16px; background:${T.ivory}; border-bottom:1px solid ${T.border};
  display:flex; align-items:center; justify-content:space-between;
}
.c-bar-title { font-size:12px; color:${T.muted}; font-family:'DM Mono',monospace; }
.c-alert-ticker {
  padding:10px 16px; background:${T.redBg}; border-top:1px solid #FECACA;
  font-size:12px; color:${T.red}; font-weight:500;
  display:flex; align-items:center; justify-content:space-between;
  min-height:40px; transition:opacity 0.4s;
}

/* Proof */
.proof-section { background:${T.navy}; padding:80px 48px; text-align:center; }
.proof-quote {
  font-family:'Instrument Serif',serif;
  font-size:clamp(22px,3vw,36px); line-height:1.4; color:white;
  max-width:760px; margin:0 auto 28px; letter-spacing:-0.5px;
}
.proof-quote em { font-style:italic; color:${T.teal}; }
.proof-attr { font-size:14px; color:${T.mutedLt}; }
.proof-chips { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:40px; }
.proof-chip {
  background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14);
  color:rgba(255,255,255,0.65); font-size:12px; font-weight:500;
  padding:7px 16px; border-radius:100px;
}

/* Features */
.features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.feat-card {
  background:white; border:1px solid ${T.border}; border-radius:18px; padding:28px;
  transition:all 0.2s;
}
.feat-card:hover { box-shadow:0 8px 32px rgba(15,23,42,0.07); transform:translateY(-2px); }
.feat-icon { font-size:26px; margin-bottom:18px; display:block; }
.feat-title { font-size:17px; font-weight:600; margin-bottom:10px; font-family:'Instrument Serif',serif; }
.feat-body { font-size:14px; color:${T.muted}; line-height:1.75; }

/* CTA section */
.cta-section { background:${T.teal}; padding:100px 48px; text-align:center; }
.cta-h2 {
  font-family:'Instrument Serif',serif;
  font-size:clamp(30px,4vw,52px); letter-spacing:-1.5px; color:white; margin-bottom:18px;
}
.cta-sub { font-size:17px; color:rgba(255,255,255,0.8); margin-bottom:36px; }
.cta-form { display:flex; gap:10px; max-width:440px; margin:0 auto 14px; }
.cta-input {
  flex:1; padding:14px 18px; border-radius:10px; border:none;
  background:rgba(255,255,255,0.18); color:white;
  font-family:'DM Sans',sans-serif; font-size:15px; outline:none;
}
.cta-input::placeholder { color:rgba(255,255,255,0.55); }
.cta-input:focus { background:rgba(255,255,255,0.25); }

/* Contact form */
.form-label { font-size:13px; font-weight:600; color:${T.navy}; display:block; margin-bottom:6px; }
.form-input, .form-select, .form-textarea {
  width:100%; padding:13px 16px; border-radius:10px;
  border:1.5px solid ${T.border}; background:white;
  font-family:'DM Sans',sans-serif; font-size:15px; color:${T.navy};
  outline:none; transition:border 0.2s;
}
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color:${T.teal}; }
.form-input::placeholder, .form-textarea::placeholder { color:${T.mutedLt}; }
.form-select { appearance:none; cursor:pointer; }
.form-textarea { resize:vertical; min-height:110px; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.form-field { margin-bottom:18px; }

/* About / timeline */
.timeline-item { display:flex; gap:24px; padding:22px 0; border-bottom:1px solid ${T.border}; }
.timeline-yr { font-size:12px; font-weight:600; color:${T.teal}; min-width:52px; padding-top:2px; font-family:'DM Mono',monospace; }
.timeline-title { font-size:15px; font-weight:600; margin-bottom:4px; }
.timeline-body { font-size:14px; color:${T.muted}; line-height:1.65; }

/* Before/After */
.ba-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:40px; }
.ba-col { border-radius:14px; overflow:hidden; border:1px solid ${T.border}; }
.ba-head { padding:11px 16px; font-size:13px; font-weight:600; }
.ba-head.bad { background:${T.redBg}; color:${T.red}; border-bottom:1px solid #FECACA; }
.ba-head.good { background:${T.successBg}; color:${T.success}; border-bottom:1px solid #A7F3D0; }
.ba-items { padding:12px; display:flex; flex-direction:column; gap:8px; }
.ba-item { padding:10px 13px; border-radius:9px; border:1px solid; }
.ba-item.bad { background:${T.redBg}; border-color:#FECACA; }
.ba-item.good { background:${T.successBg}; border-color:#A7F3D0; }
.ba-metric { font-size:11px; color:${T.muted}; margin-bottom:2px; }
.ba-val { font-size:15px; font-weight:600; }
.ba-val.bad { color:${T.red}; }
.ba-val.good { color:${T.success}; }

/* Footer */
.footer {
  border-top:1px solid ${T.border}; padding:36px 48px;
  display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;
}
.footer-links { display:flex; gap:24px; }
.footer-link {
  font-size:13px; color:${T.muted}; cursor:pointer;
  background:none; border:none; font-family:'DM Sans',sans-serif;
  transition:color 0.2s; padding:0;
}
.footer-link:hover { color:${T.navy}; }

/* Hero */
.hero { min-height:100vh; padding:120px 48px 80px; position:relative; overflow:hidden; }
.hero-grid {
  position:absolute; inset:0; z-index:0;
  background-image:linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px);
  background-size:56px 56px; opacity:0.45;
  mask-image:radial-gradient(ellipse 90% 90% at center,black 0%,transparent 72%);
}
.hero-radial {
  position:absolute; inset:0; z-index:0;
  background:radial-gradient(ellipse 70% 60% at 50% -5%, rgba(13,148,136,0.12) 0%,transparent 70%),
             radial-gradient(ellipse 40% 40% at 80% 90%, rgba(15,23,42,0.04) 0%,transparent 60%);
}
.hero-content { position:relative; z-index:1; max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
.hero-left { padding-top:20px; }
.hero-right {}
.hero-h1 {
  font-family:'Instrument Serif',serif;
  font-size:clamp(40px,5.5vw,72px); line-height:1.07; letter-spacing:-2px;
  color:${T.navy}; margin-bottom:10px;
}
.hero-h1 em { font-style:italic; color:${T.teal}; }
.hero-tagline { font-size:16px; color:${T.muted}; margin-bottom:36px; line-height:1.6; }

/* Product arch */
.arch-box { background:white; border:1px solid ${T.border}; border-radius:18px; padding:32px; margin-top:48px; }
.arch-tier-label { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:${T.mutedLt}; margin-bottom:14px; }
.arch-nodes { display:flex; gap:10px; flex-wrap:wrap; }
.arch-node {
  background:${T.ivory}; border:1px solid ${T.border}; border-radius:8px;
  padding:8px 14px; font-size:12px; font-weight:500; color:${T.navy};
  display:flex; align-items:center; gap:6px;
}
.arch-node.active { background:${T.tealXL}; border-color:rgba(13,148,136,0.3); color:${T.tealDark}; }
.arch-arrow { text-align:center; color:${T.border}; font-size:22px; margin:10px 0; }
.spec-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin-top:48px; }
.spec-card { background:white; border:1px solid ${T.border}; border-radius:14px; padding:24px; }
.spec-title { font-size:16px; font-weight:600; margin-bottom:14px; display:flex; align-items:center; gap:8px; font-family:'Instrument Serif',serif; }
.spec-list { list-style:none; }
.spec-list li { font-size:13px; color:${T.muted}; padding:6px 0; border-bottom:1px solid ${T.border}; display:flex; align-items:center; gap:8px; }
.spec-list li:last-child { border-bottom:none; }
.spec-check { color:${T.teal}; font-size:13px; }

/* Video placeholder */
.video-slot {
  border:1px solid ${T.border}; border-radius:14px; overflow:hidden;
  background:${T.ivory}; margin-bottom:16px;
}
.video-bar { padding:10px 16px; background:white; border-bottom:1px solid ${T.border}; display:flex; align-items:center; justify-content:space-between; }
.video-title { font-size:12px; font-weight:500; color:${T.navy}; }
.video-dur { font-size:11px; color:${T.muted}; font-family:'DM Mono',monospace; }
.video-body { padding:20px 16px; display:flex; align-items:center; gap:16px; }
.play-btn {
  width:44px; height:44px; border-radius:50%; background:white;
  border:1px solid ${T.border}; display:flex; align-items:center; justify-content:center;
  cursor:pointer; flex-shrink:0; transition:all 0.2s;
}
.play-btn:hover { border-color:${T.teal}; }
.play-icon { width:0; height:0; border-top:8px solid transparent; border-bottom:8px solid transparent; border-left:14px solid ${T.navy}; margin-left:3px; }
.video-chapters { flex:1; display:flex; flex-direction:column; gap:4px; }
.video-chapter { font-size:12px; color:${T.muted}; padding:5px 10px; border-radius:7px; cursor:pointer; transition:all 0.15s; }
.video-chapter.on { background:${T.tealXL}; color:${T.tealDark}; font-weight:500; }
.video-progress { height:3px; background:${T.border}; margin:0 16px 16px; border-radius:2px; overflow:hidden; }
.video-fill { height:100%; background:${T.teal}; border-radius:2px; transition:width 0.12s linear; }

@media (max-width:900px){
  .nav { padding:0 20px; }
  .nav-links { display:none; }
  .hero { padding:100px 20px 60px; }
  .hero-content { grid-template-columns:1fr; gap:40px; }
  .page-section { padding:60px 20px; }
  .stats-bar { gap:0; padding:16px 20px; }
  .stat-item { padding:0 20px; }
  .agent-grid { grid-template-columns:repeat(2,1fr); }
  .aud-cards { grid-template-columns:1fr; }
  .features-grid { grid-template-columns:1fr; }
  .ba-grid { grid-template-columns:1fr; }
  .spec-grid { grid-template-columns:1fr; }
  .form-row { grid-template-columns:1fr; }
  .footer { flex-direction:column; text-align:center; }
  .cta-form { flex-direction:column; }
  .email-form { flex-direction:column; }
}
`;

/* ─── DATA ──────────────────────────────────────────────────────── */
const AGENTS = [
  { emoji:"🔍", role:"Threat Detection",       name:"Sentinel", desc:"Monitors 50+ sources in real time, correlating across network, endpoint, identity, and cloud.",            accent:T.teal,  },
  { emoji:"🧠", role:"Behavioral Analytics",   name:"Cognito",  desc:"Builds living risk profiles on every user and entity. Flags deviations 30 days before they escalate.",   accent:"#7C3AED"},
  { emoji:"⚡", role:"Incident Response",      name:"Nexus",    desc:"Orchestrates autonomous playbooks. Contain, isolate, and remediate — in under 500ms, no ticket required.", accent:T.red,   },
  { emoji:"🛡️", role:"Compliance Automation",  name:"Lex",      desc:"Maps every detection to NIST, MITRE, SOC 2, and NYDFS in real time. Audit reports write themselves.",     accent:T.amber, },
  { emoji:"🕵️", role:"Insider Threat",         name:"Argus",    desc:"Detects pre-departure data theft and policy violations across 30+ behavioral signals before damage occurs.", accent:"#0369A1"},
  { emoji:"🌐", role:"Network Intelligence",   name:"Atlas",    desc:"Lateral movement, C2 pattern recognition, and encrypted traffic analysis at Goldman Sachs scale.",         accent:T.success},
  { emoji:"☁️", role:"Cloud Security",         name:"Nimbus",   desc:"Continuous posture across AWS, GCP, and Azure. Privilege escalation and misconfigs caught in minutes.",    accent:"#7C3AED"},
  { emoji:"🔬", role:"Forensics & IR",         name:"Oracle",   desc:"Deep-dive kill-chain reconstruction with evidence packages ready for legal, insurance, and regulators.",   accent:T.teal,  },
];

const INCIDENTS = [
  { time:"00:00.000", type:"threat", icon:"!", label:"Lateral movement — 3 endpoints", sub:"User jsmith · Unusual admin privilege escalation detected", chip:"threat" },
  { time:"00:00.087", type:"agent",  icon:"S", label:"Sentinel — kill chain correlation initiated", sub:"Cross-referencing network, identity, and endpoint telemetry", chip:"agent" },
  { time:"00:00.312", type:"agent",  icon:"N", label:"Nexus — isolation playbook triggered", sub:"3 endpoints quarantined · jsmith session terminated · SIEM updated", chip:"agent" },
  { time:"00:00.487", type:"ok",     icon:"✓", label:"Incident resolved — zero data exfiltrated", sub:"Evidence package generated · Ticket filed · Compliance log updated", chip:"ok" },
];

const AUD_DATA = {
  ciso: [
    { n:"487ms",  l:"Mean time to respond"    },
    { n:"99.97%", l:"Detection accuracy"      },
    { n:"100%",   l:"MITRE ATT&CK coverage"   },
  ],
  ceo: [
    { n:"0",    l:"Critical incidents missed — 18 months" },
    { n:"SOC2", l:"Continuously audit-ready"              },
    { n:"30+",  l:"Global regions protected"              },
  ],
  cfo: [
    { n:"73%",   l:"SOC cost reduction"   },
    { n:"$2.1M", l:"Avg. annual savings"  },
    { n:"<6mo",  l:"Payback period"       },
  ],
};

const FEATURES = [
  { emoji:"⚡", title:"Sub-500ms detection",          body:"Dual-path AI — ML heuristics fire first in milliseconds, then LLM deep analysis for contextual investigation. No lag. No backlog." },
  { emoji:"🤖", title:"30 specialized AI agents",    body:"Not one monolithic model. A coordinated fleet of specialists, each expert in their domain, working in concert around the clock." },
  { emoji:"📋", title:"Compliance on autopilot",     body:"NIST, MITRE ATT&CK, SOC 2, ISO 27001, NYDFS. Every finding is automatically mapped. Audit reports generate without a human." },
  { emoji:"🔗", title:"120+ native integrations",    body:"SIEM, EDR, identity providers, cloud platforms, and ticketing. No professional services required to connect your stack." },
  { emoji:"🧬", title:"Self-learning ML pipeline",   body:"Federated models retrain on your environment every week. Accuracy improves continuously without redeployment or tuning." },
  { emoji:"👁️", title:"Human-in-the-loop control",  body:"Every autonomous action is fully auditable. Analysts review, approve, or override. Total control without managing the flood." },
];

const TIMELINE = [
  { year:"1995", title:"Enterprise security foundations",       body:"25+ years building security infrastructure across enterprise, government, and regulated financial services globally." },
  { year:"2012", title:"CTO, Enterprise Security Division",     body:"Led 120-person security engineering org. Built behavioral analytics platform protecting 2M+ endpoints across 40 countries." },
  { year:"2019", title:"CIO & CISO, Fireblocks",               body:"Joined Fireblocks as founding security executive. Built the AEGIS platform from scratch under NYDFS 23 NYCRR 500 regulatory oversight." },
  { year:"2024", title:"AEGIS reaches production",             body:"Autonomous SOC platform live: 30 agents, 900+ employees, 30+ global regions, 18 months of zero critical incidents missed." },
  { year:"2026", title:"Founded Sentrixi",                     body:"Spun out the AEGIS platform as Sentrixi — bringing autonomous, machine-speed security operations to every enterprise." },
];

/* ─── GA4 ANALYTICS HOOK ────────────────────────────────────────── */
const GA4_ID = "G-XXXXXXXXXX"; // Replace with real Measurement ID

function useAnalytics(page) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA4_ID, { page_path: `/${page}` });
    }
  }, [page]);
}

function trackEvent(name, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}

/* ─── CONSTELLATION CANVAS ──────────────────────────────────────── */
function ConstellationCanvas({ onAlert }) {
  const ref = useRef(null);
  const stateRef = useRef({ nodes:[], alertIdx:-1, alertTs:0, animId:null });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const names = ["Sentinel","Cognito","Nexus","Lex","Argus","Atlas","Nimbus","Oracle","Vance","Iris","Cruz","Ash","Zaid","Brook","Nova","Rex"];
    let W, H;

    const build = () => {
      W = canvas.parentElement.offsetWidth;
      H = 220;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      const cx = W/2, cy = H/2;
      const r1 = Math.min(W,H)*0.36, r2 = Math.min(W,H)*0.18;
      stateRef.current.nodes = [];
      for (let i=0; i<10; i++) {
        const a = (i/10)*Math.PI*2 - Math.PI/2;
        stateRef.current.nodes.push({ x:cx+r1*Math.cos(a), y:cy+r1*Math.sin(a), name:names[i], alert:false, active:true });
      }
      for (let i=0; i<6; i++) {
        const a = (i/6)*Math.PI*2 - Math.PI/6;
        stateRef.current.nodes.push({ x:cx+r2*Math.cos(a), y:cy+r2*Math.sin(a), name:names[10+i], alert:false, active:true });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx=W/2, cy=H/2;
      const { nodes } = stateRef.current;
      const cs = getComputedStyle(canvas);
      const get = v => cs.getPropertyValue(v).trim();

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(226,232,240,0.7)";
        ctx.lineWidth = 0.5;
        ctx.moveTo(cx, cy); ctx.lineTo(n.x, n.y);
        ctx.stroke();
      });

      // Center hub
      ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2);
      ctx.fillStyle = T.navy; ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2);
      ctx.strokeStyle = T.tealDark; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle = "white"; ctx.font="500 8px 'DM Mono',monospace"; ctx.textAlign="center";
      ctx.fillText("SENTRIXI", cx, cy-3);
      ctx.fillStyle = T.teal; ctx.font="7px 'DM Sans',sans-serif";
      ctx.fillText("HUB", cx, cy+8);

      nodes.forEach(n => {
        const r = 13;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2);
        ctx.fillStyle = n.alert ? T.redBg : n.active ? T.tealXL : "white";
        ctx.fill();
        ctx.strokeStyle = n.alert ? T.red : n.active ? T.teal : T.border;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.fillStyle = n.alert ? T.red : n.active ? T.tealDark : T.muted;
        ctx.font = "500 7px 'DM Sans',sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(n.name.slice(0,3).toUpperCase(), n.x, n.y+2.5);
      });
    };

    const triggerAlert = () => {
      const { nodes } = stateRef.current;
      const idx = Math.floor(Math.random()*nodes.length);
      nodes[idx].alert = true; nodes[idx].active = false;
      onAlert && onAlert(nodes[idx].name);
      setTimeout(() => {
        nodes[idx].alert = false; nodes[idx].active = true;
        onAlert && onAlert(null);
      }, 2400);
    };

    build();
    const animId = setInterval(() => { draw(); }, 50);
    const alertId = setInterval(triggerAlert, 5200);
    stateRef.current.animId = animId;
    const ro = new ResizeObserver(() => { build(); });
    ro.observe(canvas.parentElement);

    return () => { clearInterval(animId); clearInterval(alertId); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} style={{ width:"100%", height:220, display:"block" }} />;
}

/* ─── INCIDENT TIMELINE ─────────────────────────────────────────── */
function IncidentTimeline() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < INCIDENTS.length - 1) {
      const t = setTimeout(() => setStep(s => s+1), step === 0 ? 600 : 700);
      return () => clearTimeout(t);
    } else if (step === INCIDENTS.length - 1) {
      const t = setTimeout(() => setDone(true), 700);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => { setStep(0); setDone(false); }, 3800);
      return () => clearTimeout(t);
    }
  }, [done]);

  return (
    <div className="theater">
      <div className="theater-bar">
        <div className="theater-dot" style={{ background:T.red }} />
        <div className="theater-dot" style={{ background:T.amber }} />
        <div className="theater-dot" style={{ background:T.success }} />
        <span className="theater-title">live incident simulation · ransomware attempt</span>
        <div className="live-badge"><div className="pulse-dot" /> LIVE</div>
      </div>
      {INCIDENTS.map((inc, i) => (
        <div key={i} className="t-row" style={{ opacity: i <= step ? 1 : 0.2 }}>
          <div className="t-time">{inc.time}</div>
          <div className={`t-icon ${inc.type}`}>{inc.icon}</div>
          <div>
            <div className="t-main">{inc.label}</div>
            <div className="t-sub">{inc.sub}</div>
            <span className={`t-chip chip-${inc.chip}`}>
              {inc.chip === "threat" ? "THREAT DETECTED" : inc.chip === "agent" ? "AGENT ACTIVE" : "RESOLVED"}
            </span>
          </div>
        </div>
      ))}
      <div className="resolution" style={{ opacity: done ? 1 : 0 }}>
        <div className="res-title">Incident resolved autonomously — no human intervention required</div>
        <div className="res-stats">
          <div><div className="res-n">487ms</div><div className="res-l">Total response time</div></div>
          <div><div className="res-n">0</div><div className="res-l">Analysts required</div></div>
          <div><div className="res-n">0 bytes</div><div className="res-l">Data exfiltrated</div></div>
        </div>
      </div>
    </div>
  );
}

/* ─── VIDEO PLAYER (placeholder) ───────────────────────────────── */
function VideoPlayer() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [chapter, setChapter] = useState(0);
  const chapters = [
    "0:00 — The problem every CISO faces",
    "0:18 — How the 30-agent fleet works",
    "0:38 — Live: ransomware contained in 487ms",
    "0:52 — Your next step",
  ];
  const timerRef = useRef(null);

  const toggle = () => {
    if (playing) { clearInterval(timerRef.current); setPlaying(false); }
    else {
      setPlaying(true);
      timerRef.current = setInterval(() => {
        setProgress(p => {
          const next = p + 0.55;
          const ch = Math.min(3, Math.floor((next/100)*4));
          setChapter(ch);
          if (next >= 100) { clearInterval(timerRef.current); setPlaying(false); return 0; }
          return next;
        });
      }, 100);
    }
  };

  return (
    <div className="video-slot">
      <div className="video-bar">
        <span className="video-title">Platform walkthrough — AI narrator · no login required</span>
        <span className="video-dur mono">{playing ? `0:${String(Math.round(progress*0.6)).padStart(2,"0")}` : "1:00"}</span>
      </div>
      <div className="video-body">
        <div className="play-btn" onClick={toggle}>
          {playing
            ? <div style={{ width:10, height:14, background:T.navy, boxShadow:`inset 5px 0 0 white` }} />
            : <div className="play-icon" />
          }
        </div>
        <div className="video-chapters">
          {chapters.map((c,i) => <div key={i} className={`video-chapter${i===chapter?" on":""}`}>{c}</div>)}
        </div>
      </div>
      <div className="video-progress"><div className="video-fill" style={{ width:`${progress}%` }} /></div>
    </div>
  );
}

/* ─── EMAIL CAPTURE ─────────────────────────────────────────────── */
function EmailCapture({ dark = false, label = "Request early access" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = e => {
    e.preventDefault();
    if (!email.includes("@")) return;
    trackEvent("email_capture", { email, location: label });
    setDone(true);
  };

  if (done) return (
    <div className="success-msg">✓&nbsp; You're on the list. Oded will reach out personally within 24 hours.</div>
  );

  if (dark) return (
    <form className="cta-form" onSubmit={submit}>
      <input className="cta-input" type="email" placeholder="your@company.com" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button type="submit" className="btn-white">{label}</button>
    </form>
  );

  return (
    <form className="email-form" onSubmit={submit}>
      <input className="email-input" type="email" placeholder="work@yourcompany.com" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button type="submit" className="btn-primary">{label}</button>
    </form>
  );
}

/* ─── PAGES ─────────────────────────────────────────────────────── */

function HomePage({ nav }) {
  const [alertAgent, setAlertAgent] = useState(null);
  const [audTab, setAudTab] = useState("ciso");

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-radial" />
        <div className="hero-content">
          <div className="hero-left">
            <div className="live-badge" style={{ marginBottom:28 }}>
              <div className="pulse-dot" />
              Production · Tier-1 Financial Institution
            </div>
            <h1 className="hero-h1">
              Threats move fast.<br/>
              <em>Sentrixi moves faster.</em>
            </h1>
            <p className="hero-tagline" style={{ fontSize:16, maxWidth:480 }}>
              Enterprise security, operating at machine speed.<br/>
              30 AI agents. 120+ capabilities. Always current.
            </p>
            <EmailCapture label="Request early access" />
            <p style={{ fontSize:12, color:T.mutedLt, marginTop:12 }}>No credit card · No commitment · Oded responds personally</p>

            {/* Audience tabs */}
            <div style={{ marginTop:40 }}>
              <div className="aud-tabs">
                {["ciso","ceo","cfo"].map(k => (
                  <button key={k} className={`aud-tab${audTab===k?" on":""}`} onClick={()=>setAudTab(k)}>
                    {k==="ceo" ? "CEO / Board" : k.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="aud-cards">
                {AUD_DATA[audTab].map(c => (
                  <div key={c.l} className="aud-card">
                    <div className="aud-n">{c.n}</div>
                    <div className="aud-l">{c.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hero-right">
            <IncidentTimeline />
            <VideoPlayer />

            {/* Constellation */}
            <div className="constellation-wrap">
              <div className="c-bar">
                <span className="c-bar-title">sentrixi agent fleet · live status</span>
                <div className="live-badge"><div className="pulse-dot" />30 / 30 active</div>
              </div>
              <ConstellationCanvas onAlert={setAlertAgent} />
              {alertAgent && (
                <div className="c-alert-ticker">
                  <span>🛡️ &nbsp;Suspicious activity detected — <strong>{alertAgent}</strong> agent responding</span>
                  <span style={{ fontFamily:"DM Mono,monospace", fontSize:11, color:T.red }}>containing...</span>
                </div>
              )}
              {!alertAgent && (
                <div className="c-alert-ticker" style={{ background:T.successBg, borderColor:"#A7F3D0", color:T.success }}>
                  <span>✓ &nbsp;All systems nominal — continuous monitoring active</span>
                  <span style={{ fontFamily:"DM Mono,monospace", fontSize:11, color:T.success }}>secure</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        {[
          ["30", "Specialized AI agents"],
          ["120+", "Security capabilities"],
          ["<500ms", "Detection latency"],
          ["18mo+", "Production runtime"],
          ["NYDFS", "Compliant out of the box"],
        ].map(([n, l]) => (
          <div className="stat-item" key={l}>
            <span className="stat-num"><em>{n}</em></span>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      {/* AGENT TEAM */}
      <div className="page-section">
        <span className="section-tag">The platform</span>
        <h2 className="section-h2">Meet your new security team.</h2>
        <p className="section-sub">Not a dashboard. Not a rules engine. A coordinated fleet of AI specialists — each expert in their domain, working 24/7. No PTO. No burnout. No attrition.</p>
        <div className="agent-grid">
          {AGENTS.map(a => (
            <div key={a.name} className="agent-card" style={{ "--ac": a.accent }}>
              <span className="agent-emoji">{a.emoji}</span>
              <div className="agent-role">{a.role}</div>
              <div className="agent-name">{a.name}</div>
              <div className="agent-desc">{a.desc}</div>
              <div className="agent-status"><div className="pulse-dot" style={{ width:6, height:6, background:T.success }} />Active &amp; monitoring</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROOF */}
      <div className="proof-section">
        <span className="section-tag" style={{ color:T.teal }}>Production proof</span>
        <blockquote className="proof-quote">
          "Sentrixi has been running our autonomous SOC for over a year.<br/>
          <em>Zero critical incidents missed.</em> My team now focuses on strategy, not triage."
        </blockquote>
        <p className="proof-attr"><strong style={{ color:"white" }}>CISO</strong> · Tier-1 Financial Institution · $50B+ in assets · NYDFS regulated</p>
        <div className="proof-chips">
          {["30 AI agents deployed","900+ employees protected","30+ global regions","NYDFS 23 NYCRR 500 compliant","18 months production runtime"].map(c=>(
            <div key={c} className="proof-chip">{c}</div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="page-section">
        <span className="section-tag">Capabilities</span>
        <h2 className="section-h2">Built for enterprises that can't afford gaps.</h2>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feat-card">
              <span className="feat-icon">{f.emoji}</span>
              <div className="feat-title">{f.title}</div>
              <div className="feat-body">{f.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <h2 className="cta-h2">Ready to operate at machine speed?</h2>
          <p className="cta-sub">We onboard customers in cohorts of 5. Spot secured on request.</p>
          <EmailCapture dark label="Get early access" />
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.55)", marginTop:12 }}>No SDRs. No automated sequences. A real conversation with the founder.</p>
        </div>
      </div>
    </>
  );
}

function ProductPage() {
  return (
    <>
      <div style={{ minHeight:"50vh", display:"flex", alignItems:"center", padding:"120px 48px 60px", textAlign:"center", background:`radial-gradient(ellipse 70% 60% at 50% 0%,rgba(13,148,136,0.09) 0%,transparent 70%)` }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <span className="section-tag">The platform</span>
          <h1 className="section-h2" style={{ maxWidth:"none" }}>Security that thinks, acts,<br/>and learns — without a ticket queue.</h1>
          <p style={{ fontSize:17, color:T.muted, marginTop:16, lineHeight:1.75 }}>
            A production-proven autonomous SOC built on 30 specialized AI agents, 120+ capabilities, and a self-learning ML pipeline that improves every week.
          </p>
        </div>
      </div>

      <div className="page-section">
        <span className="section-tag">Architecture</span>
        <h2 className="section-h2">Dual-brain intelligence.</h2>
        <p className="section-sub">Every detection runs two paths simultaneously: fast ML heuristics (&lt;500ms) for continuous monitoring, and deep LLM reasoning for contextual investigation. Speed without false positives.</p>

        <div className="arch-box">
          <div className="arch-tier-label">Data ingestion</div>
          <div className="arch-nodes">
            {["SIEM / Sentinel","EDR / Endpoint","Identity / Okta","AWS · GCP · Azure","Network flow","SaaS apps"].map(n=>(
              <div key={n} className="arch-node">{n}</div>
            ))}
          </div>
          <div className="arch-arrow">↓</div>
          <div className="arch-tier-label">Sentrixi agent fleet — 30 specialists</div>
          <div className="arch-nodes">
            {["⚡ Sentinel · Detection","🧠 Cognito · Behavior","🕵️ Argus · Insider","⚡ Nexus · Response","🛡️ Lex · Compliance","🌐 Atlas · Network","☁️ Nimbus · Cloud","🔬 Oracle · Forensics"].map(n=>(
              <div key={n} className="arch-node active">{n}</div>
            ))}
          </div>
          <div className="arch-arrow">↓</div>
          <div className="arch-tier-label">Output</div>
          <div className="arch-nodes">
            {["✓ Autonomous response","✓ Compliance reports","✓ Analyst console","✓ SIEM write-back","✓ Evidence packages"].map(n=>(
              <div key={n} className="arch-node">{n}</div>
            ))}
          </div>
        </div>

        <div className="spec-grid">
          {[
            { title:"🤖 Detection engine", items:["30 agents (25 general + 5 insider threat)","Fast path: ML heuristics <500ms","Deep path: LLM reasoning (Opus / Sonnet / Haiku)","MITRE ATT&CK auto-mapped on every finding","Self-learning: models retrain weekly"] },
            { title:"🛡️ Response automation", items:["Autonomous playbook execution","Human-in-the-loop approval controls","Instant kill switch — pause all autonomous actions","Full audit trail for every action taken","Slack, email, PagerDuty, Jira integrated"] },
            { title:"📋 Compliance automation", items:["NIST CSF, NYDFS, SOC 2, ISO 27001","Real-time compliance posture dashboard","Audit-ready evidence packages, automated","Control gap identification and prioritization","Regulator-facing report generation"] },
            { title:"🔗 Integrations", items:["50+ data connectors out of the box","Microsoft Sentinel bidirectional sync","Okta, Azure AD, Google Workspace","AWS, GCP, Azure cloud posture","Jira, ServiceNow, PagerDuty"] },
          ].map(card => (
            <div key={card.title} className="spec-card">
              <div className="spec-title">{card.title}</div>
              <ul className="spec-list">
                {card.items.map(it=>(
                  <li key={it}><span className="spec-check">✓</span>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <h2 className="cta-h2">See it in action.</h2>
          <p className="cta-sub">30 minutes. No slides. Just the platform on real threat data.</p>
          <EmailCapture dark label="Book the demo" />
        </div>
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      {/* Founder */}
      <div style={{ minHeight:"55vh", display:"flex", alignItems:"center", padding:"120px 48px 60px", background:`radial-gradient(ellipse 60% 60% at 80% 50%,rgba(13,148,136,0.07) 0%,transparent 70%)` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <span className="section-tag">The founder</span>
            <h1 className="section-h2" style={{ fontSize:"clamp(42px,6vw,72px)", letterSpacing:"-2px" }}>Oded<br/>Blatman</h1>
            <p style={{ fontSize:15, color:T.teal, fontWeight:600, marginBottom:24 }}>Founder &amp; CEO · Sentrixi</p>
            <p style={{ fontSize:16, color:T.muted, lineHeight:1.8, marginBottom:24 }}>
              30 years building security infrastructure for the world's most regulated industries. Former CIO &amp; CISO at Fireblocks, where he designed and deployed the AEGIS autonomous SOC platform — 18+ months in production under NYDFS regulatory oversight, protecting 900+ employees across 30+ global regions.
            </p>
            <p style={{ fontSize:16, color:T.muted, lineHeight:1.8 }}>
              Sentrixi didn't start in a boardroom. It started at 2am, watching analysts manually triage alerts that a machine should have already resolved.
            </p>
            <div style={{ display:"flex", gap:32, marginTop:32 }}>
              {[["30+","Years in security"],["18mo+","Production runtime"],["900+","Employees protected"]].map(([n,l])=>(
                <div key={l}>
                  <div style={{ fontSize:32, fontWeight:600, color:T.navy, letterSpacing:"-1px", fontFamily:"'Instrument Serif',serif" }}>{n}</div>
                  <div style={{ fontSize:12, color:T.muted, marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width:"100%", aspectRatio:"1", borderRadius:24, background:`linear-gradient(135deg,${T.tealXL} 0%,${T.amberBg} 100%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:100 }}>
            🧑‍💻
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="page-section">
        <span className="section-tag">Career</span>
        <h2 className="section-h2">Built by someone who lived the problem.</h2>
        <div style={{ maxWidth:680 }}>
          {TIMELINE.map(item=>(
            <div key={item.year} className="timeline-item">
              <div className="timeline-yr">{item.year}</div>
              <div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-body">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After */}
      <div style={{ background:T.ivory, padding:"80px 48px", borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <span className="section-tag">The contrast</span>
          <h2 className="section-h2">Your SOC has two futures.</h2>
          <p className="section-sub">One runs on humans at human speed. The other on 30 AI specialists at machine speed.</p>
          <div className="ba-grid">
            <div className="ba-col">
              <div className="ba-head bad">Without Sentrixi</div>
              <div className="ba-items">
                {[["Mean time to detect","21 days"],["Mean time to respond","77 days"],["Analysts needed (24/7)","12–18 FTEs"],["Alert coverage","&lt;5% investigated"],["Annual SOC cost","$3.2M+"]].map(([m,v])=>(
                  <div key={m} className="ba-item bad">
                    <div className="ba-metric">{m}</div>
                    <div className="ba-val bad" dangerouslySetInnerHTML={{__html:v}} />
                  </div>
                ))}
              </div>
            </div>
            <div className="ba-col">
              <div className="ba-head good">With Sentrixi</div>
              <div className="ba-items">
                {[["Mean time to detect","<500ms"],["Mean time to respond","<2 seconds"],["Analysts needed (24/7)","2–4 FTEs (strategic)"],["Alert coverage","100% autonomous triage"],["Annual SOC cost","$890K avg."]].map(([m,v])=>(
                  <div key={m} className="ba-item good">
                    <div className="ba-metric">{m}</div>
                    <div className="ba-val good">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div style={{ background:T.navyMid, padding:"80px 48px", textAlign:"center" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Instrument Serif',serif", fontSize:"clamp(26px,4vw,44px)", color:"white", marginBottom:20, letterSpacing:"-1px", lineHeight:1.2 }}>
            "Security operations should be a capability,<br/>not a headcount problem."
          </h2>
          <p style={{ fontSize:16, color:T.mutedLt, lineHeight:1.8 }}>Every enterprise deserves world-class security operations — not just those that can afford 50-person SOC teams.</p>
        </div>
      </div>
    </>
  );
}

function ContactPage({ nav }) {
  const [form, setForm] = useState({ name:"", email:"", company:"", role:"", message:"" });
  const [done, setDone] = useState(false);

  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@")) return;
    trackEvent("demo_request", { role: form.role, company: form.company });
    setDone(true);
  };

  return (
    <div style={{ maxWidth:600, margin:"0 auto", padding:"120px 48px" }}>
      <span className="section-tag">Get in touch</span>
      <h1 className="section-h2">Book your demo.</h1>
      <p style={{ fontSize:17, color:T.muted, lineHeight:1.75, marginBottom:40 }}>
        Oded responds personally within 24 hours. No SDRs. No sequences. A real conversation about whether Sentrixi is the right fit.
      </p>

      {!done ? (
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Full name *</label>
              <input className="form-input" placeholder="Jane Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
            </div>
            <div className="form-field">
              <label className="form-label">Work email *</label>
              <input className="form-input" type="email" placeholder="jane@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Company</label>
              <input className="form-input" placeholder="Acme Corp" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
            </div>
            <div className="form-field">
              <label className="form-label">Your role</label>
              <select className="form-select" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
                <option value="">Select role…</option>
                <option>CISO / Chief Security Officer</option>
                <option>CTO / VP Engineering</option>
                <option>CEO / Founder</option>
                <option>Security Director / Manager</option>
                <option>Board member / Investor</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">What's your biggest security operations challenge?</label>
            <textarea className="form-textarea" placeholder="Tell us about your current setup, team size, and what's not working…" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
          </div>
          <button type="submit" className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"16px", fontSize:16 }}>
            Request my demo →
          </button>
          <p style={{ fontSize:12, color:T.mutedLt, marginTop:12, textAlign:"center" }}>We'll respond within 24 hours. No spam, ever.</p>
        </form>
      ) : (
        <div>
          <div className="success-msg" style={{ marginBottom:24 }}>✓&nbsp; Request received. Oded will be in touch personally within 24 hours.</div>
          <div style={{ padding:24, background:T.ivory, borderRadius:14, border:`1px solid ${T.border}` }}>
            <div style={{ fontSize:12, fontWeight:600, color:T.muted, marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase" }}>While you wait</div>
            <p style={{ fontSize:15, color:T.navy, lineHeight:1.75 }}>
              We onboard in cohorts of 5 to ensure white-glove deployment. Typical time-to-value: <strong>14 days</strong> from signed agreement to first autonomous detections running in your environment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── GA4 SCRIPT INJECTION ──────────────────────────────────────── */
function GA4Script() {
  useEffect(() => {
    if (document.getElementById("ga4-script")) return;
    const s1 = document.createElement("script");
    s1.id = "ga4-script";
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    s1.async = true;
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}',{send_page_view:false});`;
    document.head.appendChild(s2);
  }, []);
  return null;
}

/* ─── ROOT APP ──────────────────────────────────────────────────── */
export default function SentrixiApp() {
  const [page, setPage]       = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useAnalytics(page);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const nav = p => {
    setPage(p);
    window.scrollTo({ top:0, behavior:"smooth" });
    trackEvent("page_view", { page: p });
  };

  return (
    <div style={{ minHeight:"100vh", background:T.ivory }}>
      <style>{GLOBAL_CSS}</style>
      <GA4Script />

      {/* ── NAV ── */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div style={{ cursor:"pointer" }} onClick={() => nav("home")}>
          <LogoWordmark size={28} dark />
        </div>
        <div className="nav-links">
          {[["home","Home"],["product","Platform"],["about","About"],["contact","Contact"]].map(([p,l]) => (
            <button key={p} className={`nav-btn${page===p?" active":""}`} onClick={() => nav(p)}>{l}</button>
          ))}
        </div>
        <button className="btn-book" onClick={() => nav("contact")}>Book a demo</button>
      </nav>

      {/* ── PAGES ── */}
      {page === "home"    && <HomePage nav={nav} />}
      {page === "product" && <ProductPage />}
      {page === "about"   && <AboutPage />}
      {page === "contact" && <ContactPage nav={nav} />}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div onClick={() => nav("home")} style={{ cursor:"pointer" }}>
          <LogoWordmark size={22} dark />
        </div>
        <div className="footer-links">
          {[["home","Home"],["product","Platform"],["about","About"],["contact","Contact"]].map(([p,l]) => (
            <button key={p} className="footer-link" onClick={() => nav(p)}>{l}</button>
          ))}
        </div>
        <div style={{ fontSize:12, color:T.mutedLt }}>© 2026 Sentrixi · sentrixi.com</div>
      </footer>
    </div>
  );
}
