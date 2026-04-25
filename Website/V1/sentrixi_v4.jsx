import { useState, useEffect, useRef, useCallback } from "react";

const T = {
  teal:"#0D9488",tealDark:"#0F766E",tealLight:"#CCFBF1",tealXL:"#F0FDFA",
  navy:"#0F172A",navyMid:"#1E293B",navyLight:"#334155",
  ivory:"#FAFAF7",border:"#E2E8F0",borderMid:"#CBD5E1",
  muted:"#64748B",mutedLt:"#94A3B8",
  red:"#DC2626",redBg:"#FEF2F2",amber:"#D97706",amberBg:"#FFFBEB",
  success:"#059669",successBg:"#ECFDF5",purple:"#7C3AED",
};

const LogoMark = ({size=32,teal=T.teal,navy=T.navy})=>(
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M55.2 25.8 A24 24 0 1 0 55.2 38.2" stroke={teal} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
    <circle cx="49" cy="15" r="4.5" fill={teal}/>
    <circle cx="15" cy="49" r="4.5" fill={teal}/>
    <circle cx="32" cy="32" r="6.5" fill={navy}/>
    <circle cx="32" cy="32" r="3.2" fill={teal}/>
  </svg>
);

const LogoWordmark=({size=24,dark=true})=>(
  <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}}>
    <LogoMark size={size} navy={dark?T.navy:"#FAFAF7"}/>
    <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:500,fontSize:size*0.75,letterSpacing:"-0.4px",color:dark?T.navy:"#FAFAF7",lineHeight:1}}>
      Sentri<em style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic",color:T.teal}}>xi</em>
    </span>
  </div>
);

const GA4_ID="G-XXXXXXXXXX";
function trackEvent(n,p={}){if(typeof window!=="undefined"&&window.gtag)window.gtag("event",n,p);}

function useHeadlineVariant(){
  const [v,setV]=useState(null);
  useEffect(()=>{
    let x=sessionStorage.getItem("sx-hl");
    if(!x){x=Math.random()>.5?"A":"B";sessionStorage.setItem("sx-hl",x);}
    setV(x);trackEvent("headline_variant_shown",{variant:x});
  },[]);
  return v;
}

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:${T.ivory};color:${T.navy};-webkit-font-smoothing:antialiased;}
.serif{font-family:'Instrument Serif',serif;} .mono{font-family:'DM Mono',monospace;}

.nav{position:fixed;top:0;left:0;right:0;z-index:200;height:64px;padding:0 48px;display:flex;align-items:center;justify-content:space-between;background:rgba(250,250,247,.93);backdrop-filter:blur(14px);border-bottom:1px solid ${T.border};transition:box-shadow .3s;}
.nav.scrolled{box-shadow:0 1px 24px rgba(15,23,42,.07);}
.nav-links{display:flex;align-items:center;gap:32px;}
.nav-btn{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:${T.muted};transition:color .2s;padding:0;}
.nav-btn:hover,.nav-btn.active{color:${T.navy};}
.btn-book{background:${T.navy};color:white;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:9px 22px;border-radius:9px;border:none;cursor:pointer;transition:all .2s;}
.btn-book:hover{background:${T.navyMid};transform:translateY(-1px);}

.page-section{padding:100px 48px;max-width:1200px;margin:0 auto;}
.section-tag{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${T.teal};margin-bottom:14px;display:block;}
.section-h2{font-family:'Instrument Serif',serif;font-size:clamp(32px,4vw,52px);line-height:1.08;letter-spacing:-1.5px;margin-bottom:18px;}
.section-sub{font-size:17px;color:${T.muted};line-height:1.75;max-width:600px;margin-bottom:56px;}

.btn-primary{background:${T.navy};color:white;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:14px 28px;border-radius:10px;border:none;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:8px;}
.btn-primary:hover{background:${T.navyMid};transform:translateY(-1px);}
.btn-teal{background:${T.teal};color:white;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:14px 28px;border-radius:10px;border:none;cursor:pointer;transition:all .2s;}
.btn-teal:hover{background:${T.tealDark};transform:translateY(-1px);}
.btn-white{background:white;color:${T.tealDark};font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;padding:14px 28px;border-radius:10px;border:none;cursor:pointer;transition:all .2s;}
.btn-white:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,.12);}

.email-form{display:flex;gap:10px;max-width:460px;}
.email-input{flex:1;padding:13px 18px;border-radius:10px;border:1.5px solid ${T.border};background:white;font-family:'DM Sans',sans-serif;font-size:15px;color:${T.navy};outline:none;transition:border .2s;}
.email-input:focus{border-color:${T.teal};}
.email-input::placeholder{color:${T.mutedLt};}
.success-msg{display:flex;align-items:center;gap:10px;background:${T.successBg};border:1px solid #A7F3D0;border-radius:10px;padding:14px 20px;font-size:15px;color:${T.success};font-weight:500;max-width:460px;}

.pulse-dot{width:8px;height:8px;border-radius:50%;background:${T.teal};animation:pdot 2s infinite;}
@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
.live-badge{display:inline-flex;align-items:center;gap:7px;background:${T.tealLight};color:${T.tealDark};font-size:11px;font-weight:700;letter-spacing:.08em;padding:5px 13px;border-radius:100px;text-transform:uppercase;}

.stats-bar{background:${T.navy};padding:20px 48px;display:flex;justify-content:center;flex-wrap:wrap;}
.stat-item{text-align:center;padding:0 40px;border-right:1px solid rgba(255,255,255,.1);}
.stat-item:last-child{border-right:none;}
.stat-num{font-family:'DM Mono',monospace;font-size:26px;color:white;letter-spacing:-1px;display:block;}
.stat-num em{font-style:normal;color:${T.teal};}
.stat-label{font-size:11px;color:${T.mutedLt};margin-top:3px;letter-spacing:.04em;}

/* Theater / Incident */
.theater{border:1px solid ${T.border};border-radius:16px;overflow:hidden;background:white;margin-bottom:16px;}
.theater-bar{padding:10px 16px;background:${T.ivory};border-bottom:1px solid ${T.border};display:flex;align-items:center;gap:8px;}
.theater-dot{width:10px;height:10px;border-radius:50%;}
.theater-title{font-size:12px;color:${T.muted};flex:1;margin-left:4px;font-family:'DM Mono',monospace;}
.t-row{display:flex;gap:12px;align-items:flex-start;padding:12px 16px;border-bottom:1px solid ${T.border};transition:opacity .5s;}
.t-row:last-child{border-bottom:none;}
.t-time{font-size:10px;color:${T.mutedLt};min-width:60px;padding-top:4px;font-family:'DM Mono',monospace;}
.t-icon{width:26px;height:26px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;}
.t-icon.threat{background:${T.redBg};color:${T.red};}
.t-icon.agent{background:${T.tealXL};color:${T.tealDark};}
.t-icon.ok{background:${T.successBg};color:${T.success};}
.t-main{font-size:13px;font-weight:500;color:${T.navy};margin-bottom:3px;}
.t-sub{font-size:12px;color:${T.muted};}
.t-chip{display:inline-block;font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;margin-top:5px;letter-spacing:.04em;}
.chip-threat{background:${T.redBg};color:${T.red};} .chip-agent{background:${T.tealLight};color:${T.tealDark};} .chip-ok{background:${T.successBg};color:${T.success};}
.resolution{margin:12px 16px;padding:12px 16px;border-radius:10px;background:${T.successBg};border:1px solid #A7F3D0;transition:opacity .5s;}
.res-title{font-size:12px;font-weight:600;color:${T.success};margin-bottom:8px;}
.res-stats{display:flex;gap:24px;}
.res-n{font-size:20px;font-weight:600;color:${T.success};font-family:'DM Mono',monospace;}
.res-l{font-size:10px;color:${T.success};opacity:.75;margin-top:2px;}

/* ROI Calculator */
.roi-calc{background:white;border:1px solid ${T.border};border-radius:16px;overflow:hidden;margin-top:28px;}
.roi-head{padding:14px 20px;border-bottom:1px solid ${T.border};}
.roi-head-title{font-size:13px;font-weight:500;color:${T.navy};margin-bottom:12px;}
.roi-tabs{display:flex;gap:0;border:1px solid ${T.border};border-radius:8px;overflow:hidden;}
.roi-tab{flex:1;padding:8px;text-align:center;font-size:12px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;background:${T.ivory};color:${T.muted};border-right:1px solid ${T.border};transition:all .15s;}
.roi-tab:last-child{border-right:none;}
.roi-tab.on{background:white;color:${T.navy};}
.roi-body{padding:16px 20px;}
.roi-slider-row{margin-bottom:14px;}
.roi-slider-labels{display:flex;justify-content:space-between;font-size:12px;color:${T.muted};margin-bottom:6px;}
.roi-slider-val{font-weight:600;color:${T.navy};font-family:'DM Mono',monospace;}
.roi-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px;}
.roi-card{background:${T.ivory};border:1px solid ${T.border};border-radius:10px;padding:12px;}
.roi-card-n{font-size:20px;font-weight:600;color:${T.navy};font-family:'DM Mono',monospace;letter-spacing:-0.5px;}
.roi-card-l{font-size:11px;color:${T.muted};margin-top:3px;}

/* Constellation */
.constellation-wrap{border:1px solid ${T.border};border-radius:16px;overflow:hidden;background:white;margin-bottom:16px;}
.c-bar{padding:10px 16px;background:${T.ivory};border-bottom:1px solid ${T.border};display:flex;align-items:center;justify-content:space-between;}
.c-bar-title{font-size:12px;color:${T.muted};font-family:'DM Mono',monospace;}
.c-alert{padding:10px 16px;font-size:12px;font-weight:500;display:flex;align-items:center;justify-content:space-between;transition:all .4s;}

/* Agent grid */
.agent-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px;}
.agent-card{background:white;border:1px solid ${T.border};border-radius:16px;padding:22px 18px;transition:all .25s;position:relative;overflow:hidden;}
.agent-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ac,${T.teal});border-radius:16px 16px 0 0;transform:scaleX(0);transition:transform .25s;transform-origin:left;}
.agent-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(15,23,42,.08);}
.agent-card:hover::before{transform:scaleX(1);}
.agent-emoji{font-size:24px;margin-bottom:12px;display:block;}
.agent-role{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ac,${T.teal});margin-bottom:4px;}
.agent-name{font-size:17px;font-weight:600;color:${T.navy};margin-bottom:8px;font-family:'Instrument Serif',serif;}
.agent-desc{font-size:13px;color:${T.muted};line-height:1.65;}
.agent-status{display:flex;align-items:center;gap:5px;font-size:11px;color:${T.success};font-weight:500;margin-top:12px;}

/* Forensic Genie */
.genie-section{padding:80px 48px;background:${T.ivory};}
.genie-inner{max-width:1100px;margin:0 auto;}
.genie-wrap{display:grid;grid-template-columns:260px 1fr;border:1px solid ${T.border};border-radius:20px;overflow:hidden;background:white;margin-top:48px;}
.genie-left{background:${T.navyMid};padding:24px;display:flex;flex-direction:column;gap:16px;}
.genie-right{padding:24px;}
.genie-user-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:16px;}
.g-avatar{width:44px;height:44px;border-radius:11px;background:${T.tealLight};display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:10px;}
.g-name{font-size:14px;font-weight:600;color:white;margin-bottom:2px;}
.g-dept{font-size:11px;color:rgba(255,255,255,.5);margin-bottom:10px;}
.g-risk-badge{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;letter-spacing:.05em;text-transform:uppercase;}
.rb-high{background:${T.redBg};color:${T.red};}
.rb-medium{background:${T.amberBg};color:${T.amber};}
.rb-low{background:${T.successBg};color:${T.success};}
.g-score-label{font-size:10px;color:rgba(255,255,255,.4);margin-top:10px;margin-bottom:4px;}
.g-score-track{height:5px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;}
.g-score-fill{height:100%;border-radius:3px;transition:width 1s ease;}
.genie-meta{font-size:11px;color:rgba(255,255,255,.4);display:flex;flex-direction:column;gap:6px;}
.genie-meta-row{display:flex;justify-content:space-between;}
.genie-meta-val{color:rgba(255,255,255,.7);font-family:'DM Mono',monospace;}
.genie-step{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid ${T.border};transition:opacity .5s;}
.genie-step:last-child{border-bottom:none;}
.genie-step-dot{width:20px;height:20px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;margin-top:1px;transition:all .3s;}
.gsd-wait{background:${T.border};}
.gsd-active{background:${T.tealLight};border:1.5px solid ${T.teal};animation:spin .8s linear infinite;}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.gsd-done{background:${T.successBg};border:1px solid #A7F3D0;color:${T.success};}
.genie-step-main{font-size:13px;font-weight:500;color:${T.navy};margin-bottom:2px;}
.genie-step-sub{font-size:11px;color:${T.muted};}
.genie-narrative{background:${T.navyMid};border-radius:10px;padding:14px 16px;margin-top:14px;font-family:'DM Mono',monospace;font-size:11px;color:rgba(255,255,255,.75);line-height:1.7;min-height:72px;border-left:3px solid ${T.teal};}
.genie-pdf-row{display:flex;align-items:center;gap:10px;background:${T.tealXL};border:1px solid rgba(13,148,136,.3);border-radius:10px;padding:12px 16px;margin-top:10px;font-size:13px;font-weight:500;color:${T.tealDark};}

/* Risk Dial */
.risk-dial-section{background:white;border-top:1px solid ${T.border};border-bottom:1px solid ${T.border};padding:80px 48px;}
.risk-dial-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.risk-dial-center{text-align:center;}
.risk-toggle-row{display:flex;gap:10px;justify-content:center;margin-top:20px;}
.risk-btn{border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 28px;border-radius:10px;transition:all .2s;}
.risk-btn.off{background:${T.ivory};border:1px solid ${T.border};color:${T.muted};}
.risk-btn.on{background:${T.teal};color:white;}
.risk-metrics{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:0;}
.risk-metric{background:${T.ivory};border:1px solid ${T.border};border-radius:12px;padding:16px;transition:all .5s;}
.risk-metric.improved{background:${T.successBg};border-color:#A7F3D0;}
.risk-metric-n{font-size:22px;font-weight:600;font-family:'DM Mono',monospace;letter-spacing:-1px;margin-bottom:3px;transition:color .5s;}
.risk-metric-n.red{color:${T.red};}
.risk-metric-n.green{color:${T.success};}
.risk-metric-l{font-size:12px;color:${T.muted};}

/* Act 2 */
.act2-section{background:${T.redBg};border-top:1px solid #FECACA;border-bottom:1px solid #FECACA;padding:80px 48px;}
.act2-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.act2-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.act2-stat{text-align:center;padding:24px;background:white;border-radius:16px;border:1px solid #FECACA;}
.act2-stat-n{font-size:52px;font-weight:600;color:${T.red};font-family:'DM Mono',monospace;letter-spacing:-2px;line-height:1;}
.act2-stat-l{font-size:13px;color:${T.red};opacity:.8;margin-top:6px;}

/* 5 Advantages */
.adv-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:40px;}
.adv-card{background:white;border:1px solid ${T.border};border-radius:14px;padding:22px 18px;text-align:center;transition:all .2s;}
.adv-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(15,23,42,.07);}
.adv-num{font-size:11px;font-weight:700;color:${T.teal};letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px;}
.adv-icon{font-size:28px;margin-bottom:12px;display:block;}
.adv-title{font-size:14px;font-weight:600;color:${T.navy};margin-bottom:8px;}
.adv-body{font-size:12px;color:${T.muted};line-height:1.6;}

/* Before/After */
.ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px;}
.ba-col{border-radius:14px;overflow:hidden;border:1px solid ${T.border};}
.ba-head{padding:11px 16px;font-size:13px;font-weight:600;}
.ba-head.bad{background:${T.redBg};color:${T.red};border-bottom:1px solid #FECACA;}
.ba-head.good{background:${T.successBg};color:${T.success};border-bottom:1px solid #A7F3D0;}
.ba-items{padding:12px;display:flex;flex-direction:column;gap:8px;}
.ba-item{padding:10px 13px;border-radius:9px;border:1px solid;}
.ba-item.bad{background:${T.redBg};border-color:#FECACA;}
.ba-item.good{background:${T.successBg};border-color:#A7F3D0;}
.ba-metric{font-size:11px;color:${T.muted};margin-bottom:2px;}
.ba-val{font-size:15px;font-weight:600;}
.ba-val.bad{color:${T.red};} .ba-val.good{color:${T.success};}

/* Platform section */
.platform-section{background:${T.navyMid};padding:100px 48px;}
.plat-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;max-width:1200px;margin:0 auto;}
.plat-tag{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${T.teal};margin-bottom:14px;display:block;}
.plat-h2{font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,50px);line-height:1.08;letter-spacing:-1.5px;color:white;margin-bottom:18px;}
.plat-h2 em{font-style:italic;color:${T.teal};}
.plat-sub{font-size:16px;color:rgba(255,255,255,.7);line-height:1.75;margin-bottom:36px;}
.plat-cards{display:flex;flex-direction:column;gap:14px;}
.plat-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px 20px;}
.plat-card-title{font-size:14px;font-weight:600;color:white;margin-bottom:6px;display:flex;align-items:center;gap:10px;}
.plat-card-body{font-size:13px;color:rgba(255,255,255,.6);line-height:1.65;}
.plat-proof{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px;}
.plat-proof-label{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${T.teal};margin-bottom:16px;}
.plat-stat{margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.08);}
.plat-stat:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none;}
.plat-stat-n{font-size:28px;font-weight:600;color:white;font-family:'DM Mono',monospace;letter-spacing:-1px;}
.plat-stat-n em{font-style:normal;color:${T.teal};}
.plat-stat-l{font-size:12px;color:rgba(255,255,255,.5);margin-top:3px;}

/* Features */
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.feat-card{background:white;border:1px solid ${T.border};border-radius:18px;padding:28px;transition:all .2s;}
.feat-card:hover{box-shadow:0 8px 32px rgba(15,23,42,.07);transform:translateY(-2px);}
.feat-icon{font-size:26px;margin-bottom:18px;display:block;}
.feat-title{font-size:17px;font-weight:600;margin-bottom:10px;font-family:'Instrument Serif',serif;}
.feat-body{font-size:14px;color:${T.muted};line-height:1.75;}

/* CTA */
.cta-section{background:${T.teal};padding:100px 48px;text-align:center;}
.cta-h2{font-family:'Instrument Serif',serif;font-size:clamp(30px,4vw,52px);letter-spacing:-1.5px;color:white;margin-bottom:18px;}
.cta-sub{font-size:17px;color:rgba(255,255,255,.8);margin-bottom:36px;}
.cta-form{display:flex;gap:10px;max-width:440px;margin:0 auto 14px;}
.cta-input{flex:1;padding:14px 18px;border-radius:10px;border:none;background:rgba(255,255,255,.18);color:white;font-family:'DM Sans',sans-serif;font-size:15px;outline:none;}
.cta-input::placeholder{color:rgba(255,255,255,.55);}
.cta-input:focus{background:rgba(255,255,255,.25);}

/* Proof */
.proof-section{background:${T.navy};padding:80px 48px;text-align:center;}
.proof-quote{font-family:'Instrument Serif',serif;font-size:clamp(22px,3vw,36px);line-height:1.4;color:white;max-width:760px;margin:0 auto 28px;letter-spacing:-.5px;}
.proof-quote em{font-style:italic;color:${T.teal};}
.proof-chips{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:40px;}
.proof-chip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.65);font-size:12px;font-weight:500;padding:7px 16px;border-radius:100px;}

/* Hero */
.hero{min-height:100vh;padding:120px 48px 80px;position:relative;overflow:hidden;}
.hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px);background-size:56px 56px;opacity:.45;mask-image:radial-gradient(ellipse 90% 90% at center,black 0%,transparent 72%);}
.hero-radial{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 70% 60% at 50% -5%,rgba(13,148,136,.12) 0%,transparent 70%);}
.hero-content{position:relative;z-index:1;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
.hero-h1{font-family:'Instrument Serif',serif;font-size:clamp(36px,4.8vw,64px);line-height:1.07;letter-spacing:-2px;color:${T.navy};margin-bottom:10px;}
.hero-h1 em{font-style:italic;color:${T.teal};}
.hero-tagline-line{font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${T.teal};margin-bottom:14px;}
.hero-sub{font-size:16px;color:${T.muted};margin-bottom:32px;line-height:1.65;max-width:440px;}

/* Video */
.video-slot{border:1px solid ${T.border};border-radius:14px;overflow:hidden;background:${T.ivory};margin-bottom:16px;}
.video-bar{padding:10px 16px;background:white;border-bottom:1px solid ${T.border};display:flex;align-items:center;justify-content:space-between;}
.video-title{font-size:12px;font-weight:500;color:${T.navy};}
.video-dur{font-size:11px;color:${T.muted};font-family:'DM Mono',monospace;}
.video-body{padding:20px 16px;display:flex;align-items:center;gap:16px;}
.play-btn{width:44px;height:44px;border-radius:50%;background:white;border:1px solid ${T.border};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .2s;}
.play-btn:hover{border-color:${T.teal};}
.play-icon{width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:14px solid ${T.navy};margin-left:3px;}
.video-chapters{flex:1;display:flex;flex-direction:column;gap:4px;}
.video-chapter{font-size:12px;color:${T.muted};padding:5px 10px;border-radius:7px;cursor:pointer;transition:all .15s;}
.video-chapter.on{background:${T.tealXL};color:${T.tealDark};font-weight:500;}
.video-progress{height:3px;background:${T.border};margin:0 16px 16px;border-radius:2px;overflow:hidden;}
.video-fill{height:100%;background:${T.teal};border-radius:2px;transition:width .12s linear;}

/* Forms */
.form-label{font-size:13px;font-weight:600;color:${T.navy};display:block;margin-bottom:6px;}
.form-input,.form-select,.form-textarea{width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid ${T.border};background:white;font-family:'DM Sans',sans-serif;font-size:15px;color:${T.navy};outline:none;transition:border .2s;}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:${T.teal};}
.form-input::placeholder,.form-textarea::placeholder{color:${T.mutedLt};}
.form-select{appearance:none;cursor:pointer;}
.form-textarea{resize:vertical;min-height:110px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.form-field{margin-bottom:18px;}

/* Footer */
.footer{border-top:1px solid ${T.border};padding:36px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
.footer-links{display:flex;gap:24px;}
.footer-link{font-size:13px;color:${T.muted};cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;transition:color .2s;padding:0;}
.footer-link:hover{color:${T.navy};}

/* Arch / Spec */
.arch-box{background:white;border:1px solid ${T.border};border-radius:18px;padding:32px;margin-top:48px;}
.arch-tier-label{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${T.mutedLt};margin-bottom:14px;}
.arch-nodes{display:flex;gap:10px;flex-wrap:wrap;}
.arch-node{background:${T.ivory};border:1px solid ${T.border};border-radius:8px;padding:8px 14px;font-size:12px;font-weight:500;color:${T.navy};}
.arch-node.active{background:${T.tealXL};border-color:rgba(13,148,136,.3);color:${T.tealDark};}
.arch-arrow{text-align:center;color:${T.border};font-size:22px;margin:10px 0;}
.spec-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:48px;}
.spec-card{background:white;border:1px solid ${T.border};border-radius:14px;padding:24px;}
.spec-title{font-size:16px;font-weight:600;margin-bottom:14px;font-family:'Instrument Serif',serif;}
.spec-list{list-style:none;}
.spec-list li{font-size:13px;color:${T.muted};padding:6px 0;border-bottom:1px solid ${T.border};display:flex;align-items:center;gap:8px;}
.spec-list li:last-child{border-bottom:none;}
.spec-check{color:${T.teal};font-size:13px;}

/* Timeline */
.timeline-item{display:flex;gap:24px;padding:22px 0;border-bottom:1px solid ${T.border};}
.timeline-yr{font-size:12px;font-weight:600;color:${T.teal};min-width:52px;padding-top:2px;font-family:'DM Mono',monospace;}
.timeline-title{font-size:15px;font-weight:600;margin-bottom:4px;}
.timeline-body{font-size:14px;color:${T.muted};line-height:1.65;}

@media(max-width:900px){
  .nav{padding:0 20px;} .nav-links{display:none;}
  .hero{padding:100px 20px 60px;} .hero-content{grid-template-columns:1fr;gap:40px;}
  .page-section{padding:60px 20px;} .stats-bar{padding:16px 20px;}
  .stat-item{padding:0 16px;} .agent-grid{grid-template-columns:repeat(2,1fr);}
  .roi-cards{grid-template-columns:1fr;} .features-grid{grid-template-columns:1fr;}
  .ba-grid{grid-template-columns:1fr;} .spec-grid{grid-template-columns:1fr;}
  .adv-grid{grid-template-columns:repeat(2,1fr);}
  .form-row{grid-template-columns:1fr;} .footer{flex-direction:column;text-align:center;}
  .cta-form{flex-direction:column;} .email-form{flex-direction:column;}
  .act2-inner{grid-template-columns:1fr;} .act2-stats-grid{grid-template-columns:repeat(2,1fr);}
  .plat-grid{grid-template-columns:1fr;} .platform-section{padding:60px 20px;}
  .risk-dial-inner{grid-template-columns:1fr;} .risk-dial-section{padding:60px 20px;}
  .genie-wrap{grid-template-columns:1fr;}
  .genie-section{padding:60px 20px;}
}
`;

/* ─── DATA ──────────────────────────────────────────────────────── */
const INCIDENTS=[
  {time:"00:00.000",type:"threat",icon:"!",label:"Lateral movement — 3 endpoints",sub:"User jsmith · Unusual admin privilege escalation detected across AWS, Okta, endpoint",chip:"threat"},
  {time:"00:00.087",type:"agent",icon:"S",label:"Sentinel — kill chain correlation initiated",sub:"Correlating 50+ sources: network telemetry, identity logs, endpoint forensics, cloud trails",chip:"agent"},
  {time:"00:00.312",type:"agent",icon:"N",label:"Nexus — isolation playbook triggered",sub:"3 endpoints quarantined · jsmith session terminated · AWS keys rotated · SIEM updated",chip:"agent"},
  {time:"00:00.487",type:"ok",icon:"✓",label:"Incident resolved — zero data exfiltrated",sub:"Evidence package generated · Forensic PDF ready · Ticket filed · Compliance log updated",chip:"ok"},
];

const AGENTS=[
  {emoji:"🔍",role:"Threat Detection",name:"Sentinel",desc:"Monitors 50+ data sources, correlating across network, endpoint, identity, and cloud in real time.",accent:T.teal},
  {emoji:"🧠",role:"Behavioral Analytics",name:"Cognito",desc:"Builds live risk profiles on every user. Flags behavioral drift 30 days before incidents escalate.",accent:T.purple},
  {emoji:"⚡",role:"Incident Response",name:"Nexus",desc:"Orchestrates autonomous containment playbooks. Detect to respond in under 500ms, zero ticket required.",accent:T.red},
  {emoji:"🛡️",role:"Compliance Automation",name:"Lex",desc:"Maps every finding to NIST, MITRE, SOC 2, and NYDFS automatically. Audit reports write themselves.",accent:T.amber},
  {emoji:"🕵️",role:"Insider Threat",name:"Argus",desc:"Detects pre-departure data theft and policy violations across 30+ behavioral signals, before damage occurs.",accent:"#0369A1"},
  {emoji:"🌐",role:"Network Intelligence",name:"Atlas",desc:"Lateral movement, C2 pattern recognition, and encrypted traffic analysis at enterprise scale.",accent:T.success},
  {emoji:"☁️",role:"Cloud Security",name:"Nimbus",desc:"Continuous posture across AWS, GCP, and Azure. Privilege escalation and misconfigs caught in minutes.",accent:T.purple},
  {emoji:"🔬",role:"Forensics & IR",name:"Oracle",desc:"Kill-chain reconstruction with court-admissible evidence packages ready for legal and insurance.",accent:T.teal},
];

const GENIE_STEPS=[
  {label:"Behavioral baseline loaded",sub:"30-day activity profile · 47,312 events analyzed · 14 peer groups compared"},
  {label:"Anomalies identified — 7 signals",sub:"Job search activity · unusual data access · off-hours login · 340% repo access spike"},
  {label:"OSINT enrichment complete",sub:"11 sources queried: VirusTotal, Shodan, AbuseIPDB, GreyNoise, WHOIS, HIBP..."},
  {label:"Kill chain reconstructed",sub:"Staging → exfil pattern confirmed · MITRE T1078, T1074, T1567 mapped · confidence 0.94"},
  {label:"DFIR narrative generated",sub:"Claude Opus analysis complete · 2,400-word investigation · timeline reconstructed"},
  {label:"Forensic PDF ready",sub:"Court-admissible evidence package · 47 pages · encrypted · chain of custody logged"},
];

const DFIR_NARRATIVE="The subject exhibits behavioral patterns consistent with pre-departure data staging. Over the 14-day observation window, access to source code repositories increased by 340%, three job-search platforms were visited during business hours, and 2.3GB of proprietary data was moved to an unmanaged cloud storage endpoint. Risk convergence score: 0.94. Recommendation: immediate containment and investigation.";

const FEATURES=[
  {emoji:"⚡",title:"Sub-500ms detection",body:"Dual-brain AI — fast ML heuristics fire first, then LLM deep analysis for context. No lag, no backlog, no analyst triage queue."},
  {emoji:"🤖",title:"30 specialist AI agents",body:"A growing fleet of domain experts — each trained on their specific threat surface — working in concert around the clock. Not a monolith. A team."},
  {emoji:"🧬",title:"Self-learning flywheel",body:"Federated ML retrains on your environment weekly. Every analyst correction, every confirmed detection, every false positive sharpens the model automatically."},
  {emoji:"📋",title:"Compliance on autopilot",body:"NIST, MITRE ATT&CK, SOC 2, ISO 27001, NYDFS. Every finding is automatically mapped. Audit packages generate without a human writing a single report."},
  {emoji:"🔎",title:"Forensic Genie",body:"Claude-powered DFIR analysis that runs daily on every high-risk user and every 3 hours on critical-risk entities. Full investigation narratives generated autonomously."},
  {emoji:"👁️",title:"Human-in-the-loop control",body:"Every autonomous action is fully auditable. Analysts review, approve, or override. Complete control without managing the flood. Safety-critical actions always require human sign-off."},
];

const TIMELINE=[
  {year:"1995",title:"Enterprise security foundations",body:"25+ years building security infrastructure across enterprise, government, and regulated financial services globally."},
  {year:"2012",title:"CTO, Enterprise Security Division",body:"Led 120-person security engineering org. Built behavioral analytics platform protecting 2M+ endpoints across 40 countries."},
  {year:"2019",title:"CIO & CISO, Fireblocks",body:"Joined Fireblocks as founding security executive. Built the AEGIS autonomous SOC platform under NYDFS 23 NYCRR 500 regulatory oversight."},
  {year:"2024",title:"AEGIS reaches production",body:"Autonomous SOC platform live: 30 specialist agents, 900+ employees, 30+ global regions, 18 months of zero critical incidents missed."},
  {year:"2026",title:"Founded Sentrixi",body:"Spun out the AEGIS platform — bringing autonomous, machine-speed security operations to every enterprise."},
];

/* ─── ROI CALCULATOR ────────────────────────────────────────────── */
function ROICalculator(){
  const [tab,setTab]=useState("ciso");
  const [analysts,setAnalysts]=useState(12);
  const [socCost,setSocCost]=useState(3200);

  const hoursSaved=analysts*800;
  const saved=Math.max(0,socCost-890);
  const roi=Math.max(0,Math.round(((saved*3-890)/890)*100));
  const payback=saved>0?(890/saved*12).toFixed(1)+"mo":"N/A";

  return(
    <div className="roi-calc">
      <div className="roi-head">
        <div className="roi-head-title">What does this mean for you?</div>
        <div className="roi-tabs">
          {["ciso","ceo","cfo"].map(k=>(
            <button key={k} className={`roi-tab${tab===k?" on":""}`} onClick={()=>setTab(k)}>
              {k==="ceo"?"CEO / Board":k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="roi-body">
        {tab==="ciso"&&(
          <>
            <div className="roi-slider-row">
              <div className="roi-slider-labels">
                <span>SOC analysts on your team</span>
                <span className="roi-slider-val">{analysts}</span>
              </div>
              <input type="range" min="2" max="50" step="1" value={analysts} onChange={e=>setAnalysts(Number(e.target.value))} style={{width:"100%"}}/>
            </div>
            <div className="roi-cards">
              <div className="roi-card"><div className="roi-card-n">{hoursSaved.toLocaleString()}</div><div className="roi-card-l">Analyst hours saved / yr</div></div>
              <div className="roi-card"><div className="roi-card-n">100%</div><div className="roi-card-l">Alert coverage (was &lt;5%)</div></div>
              <div className="roi-card"><div className="roi-card-n">487ms</div><div className="roi-card-l">MTTR (was 77 days)</div></div>
            </div>
          </>
        )}
        {tab==="ceo"&&(
          <div className="roi-cards">
            <div className="roi-card"><div className="roi-card-n">0</div><div className="roi-card-l">Critical incidents missed — 18 months</div></div>
            <div className="roi-card"><div className="roi-card-n">SOC 2</div><div className="roi-card-l">Continuously audit-ready</div></div>
            <div className="roi-card"><div className="roi-card-n">99.97%</div><div className="roi-card-l">Uptime SLA guaranteed</div></div>
          </div>
        )}
        {tab==="cfo"&&(
          <>
            <div className="roi-slider-row">
              <div className="roi-slider-labels">
                <span>Current annual SOC cost</span>
                <span className="roi-slider-val">${socCost.toLocaleString()}K</span>
              </div>
              <input type="range" min="500" max="10000" step="100" value={socCost} onChange={e=>setSocCost(Number(e.target.value))} style={{width:"100%"}}/>
            </div>
            <div className="roi-cards">
              <div className="roi-card"><div className="roi-card-n">${saved.toLocaleString()}K</div><div className="roi-card-l">Annual savings</div></div>
              <div className="roi-card"><div className="roi-card-n">{roi}%</div><div className="roi-card-l">3-year ROI</div></div>
              <div className="roi-card"><div className="roi-card-n">{payback}</div><div className="roi-card-l">Payback period</div></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── RISK DIAL (Canvas) ────────────────────────────────────────── */
function RiskDial(){
  const canvasRef=useRef(null);
  const needleRef=useRef(78);
  const targetRef=useRef(78);
  const animRef=useRef(null);
  const [enabled,setEnabled]=useState(false);
  const [score,setScore]=useState(78);

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    const ctx=canvas.getContext("2d");
    const W=300,H=175,cx=150,cy=155,r=120;
    const dpr=window.devicePixelRatio||1;
    canvas.width=W*dpr; canvas.height=H*dpr;
    canvas.style.width=W+"px"; canvas.style.height=H+"px";
    ctx.scale(dpr,dpr);

    const zones=[
      {color:"#0D9488",from:0,       to:-Math.PI*.2},  // Minimal
      {color:"#65A30D",from:-Math.PI*.2,to:-Math.PI*.4},  // Low
      {color:"#D97706",from:-Math.PI*.4,to:-Math.PI*.6},  // Medium
      {color:"#EA580C",from:-Math.PI*.6,to:-Math.PI*.8},  // High
      {color:"#DC2626",from:-Math.PI*.8,to:-Math.PI},     // Critical
    ];

    const LABELS=["Minimal","Low","Medium","High","Critical"];
    const LABEL_COLORS=["#0D9488","#65A30D","#D97706","#EA580C","#DC2626"];

    const draw=()=>{
      ctx.clearRect(0,0,W,H);

      // Draw colored arc zones
      zones.forEach(z=>{
        ctx.beginPath();
        ctx.arc(cx,cy,r,z.from,z.to,true);
        ctx.strokeStyle=z.color; ctx.lineWidth=16; ctx.lineCap="butt";
        ctx.stroke();
      });

      // Thin inner ring
      ctx.beginPath();
      ctx.arc(cx,cy,r-20,0,-Math.PI,true);
      ctx.strokeStyle="rgba(226,232,240,0.4)"; ctx.lineWidth=1; ctx.lineCap="round";
      ctx.stroke();

      // Needle
      const t=needleRef.current/100;
      const angle=-Math.PI*t;
      const nx=cx+(r-24)*Math.cos(angle);
      const ny=cy+(r-24)*Math.sin(angle);
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.lineTo(nx,ny);
      ctx.strokeStyle=T.navy; ctx.lineWidth=2.5; ctx.lineCap="round";
      ctx.stroke();

      // Needle base
      ctx.beginPath(); ctx.arc(cx,cy,7,0,Math.PI*2);
      ctx.fillStyle=T.navy; ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy,4,0,Math.PI*2);
      ctx.fillStyle=T.teal; ctx.fill();

      // Score number
      const s=Math.round(needleRef.current);
      const lIdx=Math.min(4,Math.floor(s/20));
      ctx.fillStyle=LABEL_COLORS[lIdx];
      ctx.font="600 32px 'DM Mono',monospace"; ctx.textAlign="center";
      ctx.fillText(s,cx,cy-24);
      ctx.font="500 13px 'DM Sans',sans-serif";
      ctx.fillText(LABELS[lIdx],cx,cy-7);
    };

    const animate=()=>{
      const diff=targetRef.current-needleRef.current;
      if(Math.abs(diff)>0.15){ needleRef.current+=diff*.07; setScore(Math.round(needleRef.current)); }
      else { needleRef.current=targetRef.current; }
      draw();
      animRef.current=requestAnimationFrame(animate);
    };
    animRef.current=requestAnimationFrame(animate);
    return()=>cancelAnimationFrame(animRef.current);
  },[]);

  const toggle=()=>{
    const next=!enabled;
    setEnabled(next);
    targetRef.current=next?12:78;
    trackEvent("risk_dial_toggle",{state:next?"on":"off"});
  };

  const metrics=[
    {label:"Mean dwell time",before:"197 days",after:"<60 sec"},
    {label:"Alert coverage",before:"<5%",after:"100%"},
    {label:"MTTR",before:"77 days",after:"<500ms"},
    {label:"False positive rate",before:"8%",after:"<0.1%"},
  ];

  return(
    <div className="risk-dial-section">
      <div className="risk-dial-inner">
        <div>
          <span className="section-tag">Real-time risk transformation</span>
          <h2 className="section-h2">Watch your risk profile drop.</h2>
          <p style={{fontSize:16,color:T.muted,lineHeight:1.75,marginBottom:32}}>
            Toggle Sentrixi on and watch what autonomous monitoring does to your risk exposure — across dwell time, coverage, response speed, and false positive rate.
          </p>
          <div className="risk-metrics">
            {metrics.map(m=>(
              <div key={m.label} className={`risk-metric${enabled?" improved":""}`}>
                <div className={`risk-metric-n${enabled?" green":" red"}`}>{enabled?m.after:m.before}</div>
                <div className="risk-metric-l">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="risk-dial-center">
          <canvas ref={canvasRef} style={{display:"block",margin:"0 auto"}}/>
          <div className="risk-toggle-row">
            <button className={`risk-btn${enabled?" on":" off"}`} onClick={toggle}>
              {enabled?"✓ Sentrixi active — disable":"Enable Sentrixi →"}
            </button>
          </div>
          <p style={{fontSize:12,color:T.mutedLt,marginTop:12}}>
            {enabled?"Risk score: "+Math.round(score)+" · Minimal exposure":"Risk score: "+Math.round(score)+" · High exposure — try enabling Sentrixi"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── FORENSIC GENIE DEMO ───────────────────────────────────────── */
function ForensicGenieDemo(){
  const [step,setStep]=useState(-1);
  const [started,setStarted]=useState(false);
  const [narrativeLen,setNarrativeLen]=useState(0);
  const [showNarrative,setShowNarrative]=useState(false);
  const [showPdf,setShowPdf]=useState(false);
  const [riskLevel,setRiskLevel]=useState("HIGH");

  const start=()=>{
    if(started){
      setStep(-1);setStarted(false);setNarrativeLen(0);setShowNarrative(false);setShowPdf(false);setRiskLevel("HIGH");
      return;
    }
    setStarted(true);setStep(0);
    trackEvent("genie_demo_started");
  };

  useEffect(()=>{
    if(!started)return;
    if(step<GENIE_STEPS.length-1){
      const t=setTimeout(()=>setStep(s=>s+1),step===0?500:650);
      return()=>clearTimeout(t);
    } else if(step===GENIE_STEPS.length-1){
      const t=setTimeout(()=>{setShowNarrative(true);setRiskLevel("CRITICAL");},700);
      return()=>clearTimeout(t);
    }
  },[step,started]);

  useEffect(()=>{
    if(!showNarrative)return;
    if(narrativeLen<DFIR_NARRATIVE.length){
      const t=setTimeout(()=>setNarrativeLen(l=>Math.min(DFIR_NARRATIVE.length,l+4)),22);
      return()=>clearTimeout(t);
    } else {
      const t=setTimeout(()=>setShowPdf(true),400);
      return()=>clearTimeout(t);
    }
  },[showNarrative,narrativeLen]);

  const riskColor=riskLevel==="CRITICAL"?T.red:riskLevel==="HIGH"?T.amber:T.success;
  const riskScore=riskLevel==="CRITICAL"?94:riskLevel==="HIGH"?72:28;
  const scoreW=riskLevel==="CRITICAL"?"94%":riskLevel==="HIGH"?"72%":"28%";

  return(
    <div className="genie-section">
      <div className="genie-inner">
        <span className="section-tag">Forensic Genie</span>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:0}}>
          <div>
            <h2 className="section-h2">Your AI investigator. Always working.</h2>
            <p className="section-sub" style={{marginBottom:0}}>While your analysts sleep, Forensic Genie is analyzing every high-risk user in your environment. Watch it work — click Run Analysis.</p>
          </div>
          <button className="btn-primary" onClick={start} style={{flexShrink:0}}>
            {started?"↺ Reset demo":"▶ Run analysis"}
          </button>
        </div>

        <div className="genie-wrap">
          {/* LEFT — User profile */}
          <div className="genie-left">
            <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:T.teal,marginBottom:4}}>Subject profile</div>
            <div className="genie-user-card">
              <div className="g-avatar">👤</div>
              <div className="g-name">Sarah Chen</div>
              <div className="g-dept">Engineering · Senior Lead</div>
              <div className="g-risk-badge" style={{background:riskLevel==="CRITICAL"?T.redBg:riskLevel==="HIGH"?T.amberBg:T.successBg,color:riskColor,transition:"all .8s"}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:riskColor,display:"inline-block"}}/>
                {riskLevel} RISK
              </div>
              <div className="g-score-label">Risk convergence score</div>
              <div className="g-score-track">
                <div className="g-score-fill" style={{width:scoreW,background:riskColor}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                <span style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>0</span>
                <span style={{fontSize:10,color:riskColor,fontFamily:"DM Mono,monospace",fontWeight:600,transition:"color .8s"}}>{riskScore}</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>100</span>
              </div>
            </div>
            <div className="genie-meta">
              {[["Last analysis","05:00 UTC"],["Events analyzed","47,312"],["Peer deviation","3.4×"],["Signals active","7 / 30"]].map(([k,v])=>(
                <div key={k} className="genie-meta-row">
                  <span>{k}</span><span className="genie-meta-val">{v}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.25)",lineHeight:1.5}}>
              Powered by Claude Opus · NYDFS compliant · Runs daily at 05:00 UTC
            </div>
          </div>

          {/* RIGHT — Analysis steps */}
          <div className="genie-right">
            <div style={{fontSize:12,fontWeight:600,color:T.muted,marginBottom:14,letterSpacing:".06em",textTransform:"uppercase"}}>
              {!started?"Waiting to start...":showPdf?"Analysis complete":"Analyzing..."}
            </div>

            {GENIE_STEPS.map((s,i)=>{
              const isDone=i<step;
              const isActive=i===step;
              const isWait=i>step;
              return(
                <div key={i} className="genie-step" style={{opacity:isWait&&!started?0.3:isWait?0.3:1}}>
                  <div className={`genie-step-dot${isActive?" gsd-active":isDone?" gsd-done":" gsd-wait"}`}>
                    {isDone?"✓":isActive?"◌":""}
                  </div>
                  <div>
                    <div className="genie-step-main">{s.label}</div>
                    {(isDone||isActive)&&<div className="genie-step-sub">{s.sub}</div>}
                  </div>
                </div>
              );
            })}

            {showNarrative&&(
              <>
                <div style={{fontSize:11,fontWeight:600,color:T.muted,margin:"16px 0 6px",letterSpacing:".08em",textTransform:"uppercase"}}>DFIR narrative</div>
                <div className="genie-narrative">
                  {DFIR_NARRATIVE.slice(0,narrativeLen)}
                  {narrativeLen<DFIR_NARRATIVE.length&&<span style={{animation:"pdot 0.6s infinite",display:"inline-block",marginLeft:2}}>▋</span>}
                </div>
              </>
            )}

            {showPdf&&(
              <div className="genie-pdf-row">
                <span style={{fontSize:20}}>📄</span>
                <div>
                  <div style={{fontWeight:600}}>Forensic PDF ready — chen_sarah_2026-04-19.pdf</div>
                  <div style={{fontSize:11,color:T.muted,marginTop:2}}>47 pages · Encrypted · Chain of custody logged · Court-admissible</div>
                </div>
                <span style={{marginLeft:"auto",fontSize:12,color:T.teal,cursor:"pointer"}}>Download →</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONSTELLATION ─────────────────────────────────────────────── */
function ConstellationCanvas({onAlert}){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current;
    if(!canvas)return;
    const ctx=canvas.getContext("2d");
    const names=["Sentinel","Cognito","Nexus","Lex","Argus","Atlas","Nimbus","Oracle","Vance","Iris","Cruz","Ash","Zaid","Brook","Nova","Rex"];
    let W,H=220,nodes=[];
    const build=()=>{
      W=canvas.parentElement.offsetWidth;
      const dpr=window.devicePixelRatio||1;
      canvas.width=W*dpr; canvas.height=H*dpr;
      canvas.style.width=W+"px"; canvas.style.height=H+"px";
      ctx.scale(dpr,dpr);
      const cx=W/2,cy=H/2,r1=Math.min(W,H)*.36,r2=Math.min(W,H)*.18;
      nodes=[];
      for(let i=0;i<10;i++){const a=(i/10)*Math.PI*2-Math.PI/2;nodes.push({x:cx+r1*Math.cos(a),y:cy+r1*Math.sin(a),name:names[i],alert:false,active:true});}
      for(let i=0;i<6;i++){const a=(i/6)*Math.PI*2-Math.PI/6;nodes.push({x:cx+r2*Math.cos(a),y:cy+r2*Math.sin(a),name:names[10+i],alert:false,active:true});}
    };
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const cx=W/2,cy=H/2;
      nodes.forEach(n=>{ctx.beginPath();ctx.strokeStyle="rgba(226,232,240,0.7)";ctx.lineWidth=0.5;ctx.moveTo(cx,cy);ctx.lineTo(n.x,n.y);ctx.stroke();});
      ctx.beginPath();ctx.arc(cx,cy,22,0,Math.PI*2);ctx.fillStyle=T.navy;ctx.fill();
      ctx.strokeStyle=T.tealDark;ctx.lineWidth=1;ctx.stroke();
      ctx.fillStyle="white";ctx.font="500 8px 'DM Mono',monospace";ctx.textAlign="center";
      ctx.fillText("SENTRIXI",cx,cy-3);ctx.fillStyle=T.teal;ctx.font="7px 'DM Sans',sans-serif";ctx.fillText("HUB",cx,cy+8);
      nodes.forEach(n=>{
        ctx.beginPath();ctx.arc(n.x,n.y,13,0,Math.PI*2);
        ctx.fillStyle=n.alert?T.redBg:n.active?T.tealXL:"white";ctx.fill();
        ctx.strokeStyle=n.alert?T.red:n.active?T.teal:T.border;ctx.lineWidth=0.8;ctx.stroke();
        ctx.fillStyle=n.alert?T.red:n.active?T.tealDark:T.muted;
        ctx.font="500 7px 'DM Sans',sans-serif";ctx.textAlign="center";
        ctx.fillText(n.name.slice(0,3).toUpperCase(),n.x,n.y+2.5);
      });
    };
    const triggerAlert=()=>{
      const idx=Math.floor(Math.random()*nodes.length);
      nodes[idx].alert=true;nodes[idx].active=false;
      onAlert&&onAlert(nodes[idx].name);
      setTimeout(()=>{nodes[idx].alert=false;nodes[idx].active=true;onAlert&&onAlert(null);},2400);
    };
    build();
    const animId=setInterval(draw,50);
    const alertId=setInterval(triggerAlert,5200);
    const ro=new ResizeObserver(build);
    ro.observe(canvas.parentElement);
    return()=>{clearInterval(animId);clearInterval(alertId);ro.disconnect();};
  },[]);
  return <canvas ref={ref} style={{width:"100%",height:220,display:"block"}}/>;
}

/* ─── INCIDENT TIMELINE ─────────────────────────────────────────── */
function IncidentTimeline(){
  const [step,setStep]=useState(0);
  const [done,setDone]=useState(false);
  useEffect(()=>{
    if(step<INCIDENTS.length-1){const t=setTimeout(()=>setStep(s=>s+1),step===0?600:750);return()=>clearTimeout(t);}
    else{const t=setTimeout(()=>setDone(true),750);return()=>clearTimeout(t);}
  },[step]);
  useEffect(()=>{
    if(done){const t=setTimeout(()=>{setStep(0);setDone(false);},4000);return()=>clearTimeout(t);}
  },[done]);
  return(
    <div className="theater">
      <div className="theater-bar">
        <div className="theater-dot" style={{background:T.red}}/>
        <div className="theater-dot" style={{background:T.amber}}/>
        <div className="theater-dot" style={{background:T.success}}/>
        <span className="theater-title">live incident simulation · ransomware attempt · MITRE ATT&CK mapped</span>
        <div className="live-badge"><div className="pulse-dot"/>LIVE</div>
      </div>
      {INCIDENTS.map((inc,i)=>(
        <div key={i} className="t-row" style={{opacity:i<=step?1:0.18}}>
          <div className="t-time">{inc.time}</div>
          <div className={`t-icon ${inc.type}`}>{inc.icon}</div>
          <div>
            <div className="t-main">{inc.label}</div>
            <div className="t-sub">{inc.sub}</div>
            <span className={`t-chip chip-${inc.chip}`}>
              {inc.chip==="threat"?"THREAT DETECTED":inc.chip==="agent"?"AGENT ACTIVE":"RESOLVED"}
            </span>
          </div>
        </div>
      ))}
      <div className="resolution" style={{opacity:done?1:0}}>
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

/* ─── VIDEO PLAYER ──────────────────────────────────────────────── */
function VideoPlayer(){
  const [progress,setProgress]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [chapter,setChapter]=useState(0);
  const timer=useRef(null);
  const chapters=["0:00 — The problem every CISO faces","0:18 — How the 30-agent fleet works","0:38 — Live: ransomware contained in 487ms","0:52 — Your next step"];
  const toggle=()=>{
    if(playing){clearInterval(timer.current);setPlaying(false);}
    else{
      setPlaying(true);
      timer.current=setInterval(()=>{
        setProgress(p=>{
          const n=p+0.55;setChapter(Math.min(3,Math.floor((n/100)*4)));
          if(n>=100){clearInterval(timer.current);setPlaying(false);return 0;}
          return n;
        });
      },100);
    }
  };
  return(
    <div className="video-slot">
      <div className="video-bar">
        <span className="video-title">Platform walkthrough — AI narrator · no login required</span>
        <span className="video-dur mono">{playing?`0:${String(Math.round(progress*.6)).padStart(2,"0")}`:"1:00"}</span>
      </div>
      <div className="video-body">
        <div className="play-btn" onClick={toggle}>
          {playing?<div style={{width:10,height:14,background:T.navy,boxShadow:`inset 5px 0 0 white`}}/>:<div className="play-icon"/>}
        </div>
        <div className="video-chapters">
          {chapters.map((c,i)=><div key={i} className={`video-chapter${i===chapter?" on":""}`}>{c}</div>)}
        </div>
      </div>
      <div className="video-progress"><div className="video-fill" style={{width:`${progress}%`}}/></div>
    </div>
  );
}

/* ─── EMAIL CAPTURE ─────────────────────────────────────────────── */
function EmailCapture({dark=false,label="Request early access",location="unknown"}){
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  const submit=e=>{
    e.preventDefault();
    if(!email.includes("@"))return;
    trackEvent("email_capture",{email,location,label});
    setDone(true);
  };
  if(done) return <div className="success-msg">✓&nbsp; You're on the list. Oded will reach out personally within 24 hours.</div>;
  if(dark) return(
    <form className="cta-form" onSubmit={submit}>
      <input className="cta-input" type="email" placeholder="your@company.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <button type="submit" className="btn-white">{label}</button>
    </form>
  );
  return(
    <form className="email-form" onSubmit={submit}>
      <input className="email-input" type="email" placeholder="work@yourcompany.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <button type="submit" className="btn-primary">{label}</button>
    </form>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────────────── */
function HomePage({nav}){
  const hlVariant=useHeadlineVariant();
  const [alertAgent,setAlertAgent]=useState(null);

  return(
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid"/><div className="hero-radial"/>
        <div className="hero-content">
          <div>
            <div className="live-badge" style={{marginBottom:16}}><div className="pulse-dot"/>Built &amp; battle-tested in production</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24,padding:"10px 16px",background:T.successBg,border:`1px solid #A7F3D0`,borderRadius:10,maxWidth:420}}>
              <span style={{fontSize:18}}>🛡️</span>
              <span style={{fontSize:13,color:T.success,lineHeight:1.5}}>
                <strong>18 months in production at a Tier-1 regulated fintech.</strong><br/>
                Zero critical incidents missed. NYDFS 23 NYCRR 500 compliant.
              </span>
            </div>
            {hlVariant&&(
              <h1 className="hero-h1">
                {hlVariant==="A"?(<>Threats move fast.<br/><em>Sentrixi moves faster.</em></>):(<>Your Entire Security Team.<br/>In a <em>Single Platform.</em><br/>Always On.</>)}
              </h1>
            )}
            <div className="hero-tagline-line">Autonomous · Expert · Always Ahead</div>
            <p className="hero-sub">Enterprise security, operating at machine speed. 30 specialist AI agents. 120+ capabilities. Continuously self-learning.</p>
            <EmailCapture label="Request early access" location="hero"/>
            <p style={{fontSize:12,color:T.mutedLt,marginTop:12}}>No credit card · No commitment · Oded responds personally</p>
            <ROICalculator/>
          </div>
          <div>
            <IncidentTimeline/>
            <VideoPlayer/>
            <div className="constellation-wrap">
              <div className="c-bar">
                <span className="c-bar-title">sentrixi agent fleet · live status</span>
                <div className="live-badge"><div className="pulse-dot"/>30 / 30 active</div>
              </div>
              <ConstellationCanvas onAlert={setAlertAgent}/>
              <div className="c-alert" style={alertAgent?{background:T.redBg,color:T.red,borderTop:`1px solid #FECACA`}:{background:T.successBg,color:T.success,borderTop:`1px solid #A7F3D0`}}>
                <span>{alertAgent?`🛡️  Suspicious activity — ${alertAgent} agent responding`:"✓  All systems nominal — continuous monitoring active"}</span>
                <span style={{fontFamily:"DM Mono,monospace",fontSize:11}}>{alertAgent?"containing...":"secure"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[["30","Specialist AI agents"],["120+","Security capabilities"],["<500ms","Detection latency"],["197→0","Days dwell time eliminated"],["NYDFS","Production-compliant"]].map(([n,l])=>(
          <div className="stat-item" key={l}><span className="stat-num"><em>{n}</em></span><div className="stat-label">{l}</div></div>
        ))}
      </div>

      {/* MOTION 2 — FOR PLATFORM TEAMS — high up, investor-visible */}
      <div style={{background:`linear-gradient(180deg,${T.navyMid} 0%,#0D1829 100%)`,padding:"80px 48px",borderBottom:`1px solid rgba(255,255,255,.06)`}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:32}}>
            <div style={{background:T.tealLight,borderRadius:8,padding:"4px 12px",fontSize:11,fontWeight:700,color:T.tealDark,letterSpacing:".1em",textTransform:"uppercase"}}>For platform teams</div>
            <div style={{height:1,flex:1,background:"rgba(255,255,255,.08)"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>
            <div>
              <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(28px,3.5vw,46px)",lineHeight:1.1,letterSpacing:"-1.5px",color:"white",marginBottom:18}}>
                Win the enterprise deals<br/>you're <em style={{fontStyle:"italic",color:T.teal}}>losing to compliance gaps.</em>
              </h2>
              <p style={{fontSize:16,color:"rgba(255,255,255,.65)",lineHeight:1.8,marginBottom:28}}>
                Real-time data platforms, cloud infrastructure vendors, and SaaS companies are losing regulated enterprise deals — banks, fintechs, healthcare systems — because they can't prove security operations at the level buyers require. Sentrixi embeds natively as your security layer. White-label or co-branded. Your customers never leave your product.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
                {[
                  {icon:"🏆",t:"Close compliance-blocked deals",b:"SOC 2, FedRAMP, NYDFS — satisfied out of the box, without your team building a single security feature."},
                  {icon:"🔌",t:"Security as a moat, not a gap",b:"Your competitors sell fast. You sell fast and secure. Compliance becomes your competitive close, not your obstacle."},
                  {icon:"⚙️",t:"White-label or co-branded",b:"Deploys as your security suite. Your brand. Your customer relationship. Our autonomous AI behind the scenes."},
                  {icon:"📈",t:"New revenue line, immediate",b:"OEM licensing on top of your existing ARR. Attach to every enterprise deal without building a security team."},
                ].map(c=>(
                  <div key={c.t} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:12,padding:"16px 18px"}}>
                    <div style={{fontSize:13,fontWeight:600,color:"white",marginBottom:5,display:"flex",alignItems:"center",gap:8}}><span>{c.icon}</span>{c.t}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>{c.b}</div>
                  </div>
                ))}
              </div>
              <button className="btn-teal" onClick={()=>nav("contact")}>Talk to us about embedding Sentrixi →</button>
            </div>
            <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:32}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:T.teal,marginBottom:20}}>What embedding Sentrixi delivers to your customers</div>
              {[
                {n:"197→<60s",l:"Average attacker dwell time, eliminated from every customer environment"},
                {n:"100%",l:"Alert coverage — every event triaged autonomously, no analyst queue needed"},
                {n:"30+",l:"Compliance frameworks satisfied automatically — NIST, SOC 2, ISO 27001, NYDFS"},
                {n:"$1.5M–$4M",l:"Annual SOC cost your enterprise customers eliminate per deployment"},
                {n:"<14 days",l:"Time-to-value from signed agreement to first autonomous detections"},
              ].map((s,i)=>(
                <div key={s.l} style={{paddingBottom:i<4?16:0,marginBottom:i<4?16:0,borderBottom:i<4?"1px solid rgba(255,255,255,.06)":"none"}}>
                  <div style={{fontSize:26,fontWeight:600,color:"white",fontFamily:"DM Mono,monospace",letterSpacing:"-1px"}}><em style={{fontStyle:"normal",color:T.teal}}>{s.n}</em></div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginTop:4,lineHeight:1.5}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="act2-section">
        <div className="act2-inner">
          <div>
            <span className="section-tag" style={{color:T.red}}>The broken model</span>
            <h2 className="section-h2">You hired analysts.<br/>You bought the tools.<br/>You wrote the playbooks.</h2>
            <p style={{fontSize:17,color:T.muted,lineHeight:1.75,marginBottom:20}}>And attackers still lived undetected in your environment for an average of <strong style={{color:T.red}}>197 days</strong> before anyone noticed. The issue isn't effort — the model is broken. Human-speed security cannot operate at machine-speed threat.</p>
            <p style={{fontSize:15,color:T.muted,lineHeight:1.75}}>Sentrixi doesn't patch the old model. It replaces it entirely — with a fleet of AI specialists that never sleep, never burn out, and get sharper every week.</p>
          </div>
          <div className="act2-stats-grid">
            {[["197","avg. days attackers dwell undetected"],["$4M","avg. annual enterprise SOC cost"],["<5%","of alerts get human investigation"],["8%","industry false positive rate"]].map(([n,l])=>(
              <div key={l} className="act2-stat"><div className="act2-stat-n">{n}</div><div className="act2-stat-l">{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* AGENT TEAM */}
      <div className="page-section">
        <span className="section-tag">The platform</span>
        <h2 className="section-h2">Meet your new security team.</h2>
        <p className="section-sub">Not a dashboard. Not a rules engine. A coordinated fleet of AI specialists — each expert in their domain, working 24/7. No PTO. No burnout. No attrition. Growing to 60+ specialists on the roadmap.</p>
        <div className="agent-grid">
          {AGENTS.map(a=>(
            <div key={a.name} className="agent-card" style={{"--ac":a.accent}}>
              <span className="agent-emoji">{a.emoji}</span>
              <div className="agent-role">{a.role}</div>
              <div className="agent-name">{a.name}</div>
              <div className="agent-desc">{a.desc}</div>
              <div className="agent-status"><div className="pulse-dot" style={{width:6,height:6,background:T.success}}/>Active &amp; monitoring</div>
            </div>
          ))}
        </div>
      </div>

      {/* FORENSIC GENIE DEMO */}
      <ForensicGenieDemo/>

      {/* 5 UNFAIR ADVANTAGES */}
      <div style={{background:T.navyMid,padding:"80px 48px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <span className="section-tag" style={{color:T.teal}}>Why Sentrixi wins</span>
          <h2 className="section-h2" style={{color:"white"}}>Five unfair advantages.</h2>
          <div className="adv-grid">
            {[
              {n:"01",icon:"🧠",title:"Dual-brain architecture",body:"Fast ML path fires in <500ms. Deep LLM path adds contextual reasoning. Speed and accuracy — not a tradeoff."},
              {n:"02",icon:"🤖",title:"30+ specialist agents",body:"Not one model pretending to know everything. A coordinated fleet of domain experts, each tuned to its threat surface."},
              {n:"03",icon:"🧬",title:"Self-learning flywheel",body:"Every analyst correction, every confirmed detection, every false positive sharpens the models. Gets better every week, automatically."},
              {n:"04",icon:"🔎",title:"Forensic Genie",body:"Claude-powered DFIR that runs daily on every high-risk user. Full investigation narratives and court-admissible PDFs — autonomously generated."},
              {n:"05",icon:"🔌",title:"Built to embed",body:"Deploys as a native capability inside your existing platform. White-label, co-branded, or API-first. Security as a feature, not a separate product."},
            ].map(a=>(
              <div key={a.n} className="adv-card">
                <div className="adv-num">{a.n}</div>
                <span className="adv-icon">{a.icon}</span>
                <div className="adv-title">{a.title}</div>
                <div className="adv-body">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BEFORE / AFTER */}
      <div style={{background:T.ivory,padding:"100px 48px",borderTop:`1px solid ${T.border}`}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <span className="section-tag">The contrast</span>
          <h2 className="section-h2">Your SOC, before and after.</h2>
          <p className="section-sub">Real numbers. No rounding. This is what the switch looks like in practice.</p>
          <div className="ba-grid">
            <div className="ba-col">
              <div className="ba-head bad">Traditional SOC — today</div>
              <div className="ba-items">
                {[["Mean dwell time","197 days"],["Mean time to respond","77 days"],["Alert coverage","<5% investigated"],["False positive rate","8% of analyst time wasted"],["Annual team cost","$1.5M–$4M"],["Availability","Human hours only"]].map(([m,v])=>(
                  <div key={m} className="ba-item bad"><div className="ba-metric">{m}</div><div className="ba-val bad">{v}</div></div>
                ))}
              </div>
            </div>
            <div className="ba-col">
              <div className="ba-head good">Sentrixi — autonomous SOC</div>
              <div className="ba-items">
                {[["Mean dwell time","<60 seconds"],["Mean time to respond","<500ms"],["Alert coverage","100% autonomous triage"],["False positive rate","<0.1% (self-correcting)"],["Annual platform cost","From $890K"],["Availability","24/7/365, machine speed"]].map(([m,v])=>(
                  <div key={m} className="ba-item good"><div className="ba-metric">{m}</div><div className="ba-val good">{v}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RISK DIAL */}
      <RiskDial/>

      {/* PROOF */}
      <div className="proof-section">
        <span className="section-tag" style={{color:T.teal}}>Production proof</span>
        <blockquote className="proof-quote">"Sentrixi has been running our autonomous SOC for over a year.<br/><em>Zero critical incidents missed.</em> My team now focuses on strategy, not triage."</blockquote>
        <p style={{fontSize:14,color:T.mutedLt}}><strong style={{color:"white"}}>CISO</strong> · Tier-1 Financial Institution · $50B+ in assets · NYDFS regulated</p>
        <div className="proof-chips">
          {["30 AI agents in production","900+ employees protected","30+ global regions","NYDFS 23 NYCRR 500 compliant","18 months · zero critical incidents missed"].map(c=>(
            <div key={c} className="proof-chip">{c}</div>
          ))}
        </div>
      </div>

      {/* MOTION 2 — PLATFORM — kept at bottom as second occurrence for product teams scrolling deep */}
      <div className="platform-section">
        <div className="plat-grid">
          <div>
            <span className="plat-tag">For platforms &amp; infrastructure teams</span>
            <h2 className="plat-h2">Win the enterprise deals you're<br/><em>losing to compliance gaps.</em></h2>
            <p className="plat-sub">Your customers trust you with their most critical data. Enterprise buyers now require proof of world-class security operations before signing. Sentrixi embeds natively into real-time data platforms, cloud infrastructure, and SaaS products — turning security from a sales obstacle into a decisive competitive advantage.</p>
            <div className="plat-cards">
              {[
                {icon:"🏆",title:"Close compliance-blocked deals",body:"Enterprise buyers demand SOC 2, FedRAMP, and NYDFS before committing. Sentrixi satisfies all of them, out of the box — without your team building a single security feature."},
                {icon:"🔌",title:"Security as a differentiator",body:"Your competitors sell fast. You sell fast and secure. A category of one in a market where compliance is increasingly the final gate."},
                {icon:"⚙️",title:"White-label or co-branded",body:"Sentrixi deploys as your security suite. Your brand. Your customers. Our autonomous detection and response technology behind the scenes."},
              ].map(c=>(
                <div key={c.title} className="plat-card">
                  <div className="plat-card-title"><span>{c.icon}</span>{c.title}</div>
                  <div className="plat-card-body">{c.body}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:32}}>
              <button className="btn-teal" onClick={()=>nav("contact")}>Talk to us about embedding Sentrixi →</button>
            </div>
          </div>
          <div className="plat-proof">
            <div className="plat-proof-label">What embedding Sentrixi delivers</div>
            {[["197→<60",l="Days dwell time, eliminated from your customers' environments"],["100%","Alert coverage — every event triaged, no analyst queue"],["30+","Compliance frameworks satisfied automatically"],["$1.5M+","Annual SOC cost your customers eliminate per deployment"]].map(s=>(
              <div key={s[1]} className="plat-stat">
                <div className="plat-stat-n"><em>{s[0]}</em></div>
                <div className="plat-stat-l">{s[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="page-section">
        <span className="section-tag">Capabilities</span>
        <h2 className="section-h2">Built for enterprises that can't afford gaps.</h2>
        <div className="features-grid">
          {FEATURES.map(f=>(
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
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <h2 className="cta-h2">Ready to operate at machine speed?</h2>
          <p className="cta-sub">We onboard in cohorts of 5. Spot secured on request.</p>
          <EmailCapture dark label="Get early access" location="cta-bottom"/>
          <p style={{fontSize:12,color:"rgba(255,255,255,.55)",marginTop:12}}>No SDRs. No automated sequences. A real conversation with the founder.</p>
        </div>
      </div>
    </>
  );
}

/* ─── PRODUCT PAGE ───────────────────────────────────────────────── */
function ProductPage(){
  return(
    <>
      <div style={{minHeight:"50vh",display:"flex",alignItems:"center",padding:"120px 48px 60px",textAlign:"center",background:`radial-gradient(ellipse 70% 60% at 50% 0%,rgba(13,148,136,.09) 0%,transparent 70%)`}}>
        <div style={{maxWidth:780,margin:"0 auto"}}>
          <span className="section-tag">The platform</span>
          <h1 className="section-h2" style={{maxWidth:"none"}}>Security that thinks, acts,<br/>and learns — without a ticket queue.</h1>
          <p style={{fontSize:17,color:T.muted,marginTop:16,lineHeight:1.75}}>30 specialist AI agents today, growing to 60+. Dual-brain ML+LLM architecture, self-learning flywheel, and Forensic Genie — all running autonomously, all the time.</p>
        </div>
      </div>
      <div className="page-section">
        <span className="section-tag">Architecture</span>
        <h2 className="section-h2">Dual-brain intelligence.</h2>
        <p className="section-sub">Every detection runs two paths simultaneously: fast ML heuristics (&lt;500ms) for continuous monitoring, and deep LLM reasoning for contextual investigation. Speed without false positives.</p>
        <div className="arch-box">
          <div className="arch-tier-label">Data ingestion</div>
          <div className="arch-nodes">
            {["SIEM / Sentinel","EDR / Endpoint","Identity / Okta","AWS · GCP · Azure","Network flow","SaaS apps"].map(n=><div key={n} className="arch-node">{n}</div>)}
          </div>
          <div className="arch-arrow">↓</div>
          <div className="arch-tier-label">Agent fleet — 30 specialists (60+ on roadmap)</div>
          <div className="arch-nodes">
            {["⚡ Sentinel · Detection","🧠 Cognito · Behavior","🕵️ Argus · Insider","⚡ Nexus · Response","🛡️ Lex · Compliance","🌐 Atlas · Network","☁️ Nimbus · Cloud","🔬 Oracle · Forensics"].map(n=><div key={n} className="arch-node active">{n}</div>)}
          </div>
          <div className="arch-arrow">↓</div>
          <div className="arch-tier-label">Forensic Genie · Kill Chain Engine · Guardian Response</div>
          <div className="arch-nodes">
            {["✓ Autonomous response","✓ DFIR narratives","✓ Compliance reports","✓ Evidence packages","✓ SIEM write-back"].map(n=><div key={n} className="arch-node">{n}</div>)}
          </div>
        </div>
        </div>

        {/* NAMED THREAT ACTORS */}
        <div style={{margin:"48px 0",background:T.navyMid,borderRadius:20,padding:32,border:`1px solid rgba(255,255,255,.08)`}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <div style={{background:T.redBg,border:`1px solid #FECACA`,borderRadius:8,padding:"4px 12px",fontSize:11,fontWeight:700,color:T.red,letterSpacing:".08em",textTransform:"uppercase"}}>Elite capability</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.35)"}}>No other vendor in your competitive set has this built in</div>
          </div>
          <h3 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(22px,3vw,34px)",color:"white",letterSpacing:"-1px",marginBottom:12}}>
            Named-actor detection. Pre-built playbooks.<br/><em style={{fontStyle:"italic",color:T.teal}}>Ready on day one.</em>
          </h3>
          <p style={{fontSize:15,color:"rgba(255,255,255,.6)",lineHeight:1.75,marginBottom:28,maxWidth:680}}>
            The Kill Chain Reasoning Engine ships with pre-built detection playbooks for the world's most active threat groups. Not generic MITRE coverage — specific behavioral signatures, TTPs, and campaign patterns for named actors, maintained and updated continuously.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
            {[
              {name:"Lazarus Group",origin:"DPRK — state-sponsored",sigs:["Cryptocurrency theft patterns","SWIFT system targeting","Custom RAT deployment","Long-dwell low-and-slow infiltration"],color:"#F59E0B"},
              {name:"Volt Typhoon",origin:"PRC — critical infrastructure",sigs:["Living-off-the-land (LOTL) techniques","No malware — admin tool abuse only","Telecommunications & energy focus","Months-long dwell before action"],color:"#EF4444"},
              {name:"Scattered Spider",origin:"Social engineering specialists",sigs:["MFA fatigue attacks","Help desk impersonation","SIM swapping patterns","Okta & Azure AD compromise chains"],color:"#8B5CF6"},
              {name:"APT41",origin:"PRC — dual espionage + crime",sigs:["Supply chain compromise","Video game industry targeting","Healthcare data exfiltration","Ransomware + state espionage hybrid"],color:"#06B6D4"},
            ].map(a=>(
              <div key={a.name} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:14,padding:20}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:a.color,marginBottom:10}}/>
                <div style={{fontSize:14,fontWeight:600,color:"white",marginBottom:3}}>{a.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:14,fontFamily:"DM Mono,monospace"}}>{a.origin}</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {a.sigs.map(s=>(
                    <div key={s} style={{fontSize:11,color:"rgba(255,255,255,.55)",display:"flex",gap:6,alignItems:"flex-start"}}>
                      <span style={{color:a.color,flexShrink:0,marginTop:1}}>›</span>{s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:20,padding:"12px 16px",background:"rgba(255,255,255,.04)",borderRadius:10,border:"1px solid rgba(255,255,255,.07)",fontSize:12,color:"rgba(255,255,255,.4)",display:"flex",alignItems:"center",gap:10}}>
            <span style={{color:T.teal,fontSize:16}}>⚡</span>
            Kill Chain Engine maintains live hypothesis graphs per workspace — updated within 60 seconds of new events. Confidence ≥ 0.85 triggers autonomous P0 alert.
          </div>
        </div>

        <div className="spec-grid">
          {[
            {title:"🤖 Detection engine",items:["30 agents (25 general + 5 insider threat fleet)","Fast path: ML heuristics <500ms","Deep path: Claude Opus / Sonnet / Haiku","MITRE ATT&CK auto-mapped on every finding","Kill Chain Engine: nation-state campaign detection"]},
            {title:"🛡️ Response — Guardian",items:["Autonomous playbook execution","5 individually-armable response actions","Human-in-the-loop approval controls","Full audit trail for every action","Safety-critical actions always require human sign-off"]},
            {title:"📋 Compliance automation",items:["NIST CSF, NYDFS 23 NYCRR 500, SOC 2, ISO 27001","Real-time compliance posture dashboard","Audit-ready evidence packages, automated","Control gap identification and prioritization","Regulator-facing report generation"]},
            {title:"🔗 Integrations",items:["50+ data connectors out of the box","Microsoft Sentinel bidirectional sync","Okta, Azure AD, Google Workspace","AWS, GCP, Azure cloud posture","Jira, ServiceNow, PagerDuty, Slack"]},
          ].map(card=>(
            <div key={card.title} className="spec-card">
              <div className="spec-title">{card.title}</div>
              <ul className="spec-list">
                {card.items.map(it=><li key={it}><span className="spec-check">✓</span>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="cta-section">
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <h2 className="cta-h2">See it in action.</h2>
          <p className="cta-sub">30 minutes. No slides. Just the platform on real threat data.</p>
          <EmailCapture dark label="Book the demo" location="product-cta"/>
        </div>
      </div>
    </>
  );
}

/* ─── ABOUT PAGE ─────────────────────────────────────────────────── */
function AboutPage(){
  return(
    <>
      <div style={{minHeight:"55vh",display:"flex",alignItems:"center",padding:"120px 48px 60px",background:`radial-gradient(ellipse 60% 60% at 80% 50%,rgba(13,148,136,.07) 0%,transparent 70%)`}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
          <div>
            <span className="section-tag">The founder</span>
            <h1 className="section-h2" style={{fontSize:"clamp(42px,6vw,72px)",letterSpacing:"-2px"}}>Oded<br/>Blatman</h1>
            <p style={{fontSize:15,color:T.teal,fontWeight:600,marginBottom:24}}>Founder &amp; CEO · Sentrixi</p>
            <p style={{fontSize:16,color:T.muted,lineHeight:1.8,marginBottom:20}}>30 years building security infrastructure for the world's most regulated industries. Former CIO &amp; CISO at Fireblocks, where he designed and deployed the AEGIS autonomous SOC platform — 18+ months in production under NYDFS regulatory oversight, protecting 900+ employees across 30+ global regions.</p>
            <p style={{fontSize:16,color:T.muted,lineHeight:1.8}}>Sentrixi didn't start in a boardroom. It started at 2am, watching analysts manually triage alerts that a machine should have already resolved.</p>
            <div style={{display:"flex",gap:32,marginTop:32}}>
              {[["30+","Years in security"],["18mo+","Production runtime"],["900+","Employees protected"]].map(([n,l])=>(
                <div key={l}><div style={{fontSize:32,fontWeight:600,color:T.navy,letterSpacing:"-1px",fontFamily:"'Instrument Serif',serif"}}>{n}</div><div style={{fontSize:12,color:T.muted,marginTop:4}}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={{width:"100%",aspectRatio:"1",borderRadius:24,background:`linear-gradient(135deg,${T.tealXL} 0%,${T.amberBg} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:100}}>🧑‍💻</div>
        </div>
      </div>
      <div className="page-section">
        <span className="section-tag">Career</span>
        <h2 className="section-h2">Built by someone who lived the problem.</h2>
        <div style={{maxWidth:680}}>
          {TIMELINE.map(item=>(
            <div key={item.year} className="timeline-item">
              <div className="timeline-yr">{item.year}</div>
              <div><div className="timeline-title">{item.title}</div><div className="timeline-body">{item.body}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:T.navyMid,padding:"80px 48px",textAlign:"center"}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(26px,4vw,44px)",color:"white",marginBottom:20,letterSpacing:"-1px",lineHeight:1.2}}>"Security operations should be a capability,<br/>not a headcount problem."</h2>
          <p style={{fontSize:16,color:T.mutedLt,lineHeight:1.8}}>Every enterprise deserves world-class security operations — not just those that can afford 50-person SOC teams.</p>
        </div>
      </div>
    </>
  );
}

/* ─── CONTACT PAGE ───────────────────────────────────────────────── */
function ContactPage(){
  const [form,setForm]=useState({name:"",email:"",company:"",role:"",message:""});
  const [done,setDone]=useState(false);
  const submit=e=>{
    e.preventDefault();
    if(!form.name||!form.email.includes("@"))return;
    trackEvent("demo_request",{role:form.role,company:form.company});
    setDone(true);
  };
  return(
    <div style={{maxWidth:600,margin:"0 auto",padding:"120px 48px"}}>
      <span className="section-tag">Get in touch</span>
      <h1 className="section-h2">Book your demo.</h1>
      <p style={{fontSize:17,color:T.muted,lineHeight:1.75,marginBottom:40}}>Oded responds personally within 24 hours. No SDRs. No sequences. A real conversation about whether Sentrixi is the right fit.</p>
      {!done?(
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form-field"><label className="form-label">Full name *</label><input className="form-input" placeholder="Jane Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
            <div className="form-field"><label className="form-label">Work email *</label><input className="form-input" type="email" placeholder="jane@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
          </div>
          <div className="form-row">
            <div className="form-field"><label className="form-label">Company</label><input className="form-input" placeholder="Acme Corp" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></div>
            <div className="form-field">
              <label className="form-label">Your role</label>
              <select className="form-select" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
                <option value="">Select role…</option>
                <option>CISO / Chief Security Officer</option>
                <option>CTO / VP Engineering</option>
                <option>CEO / Founder</option>
                <option>Security Director / Manager</option>
                <option>Board member / Investor</option>
                <option>Platform / Product leader</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-field"><label className="form-label">What's your biggest security operations challenge?</label><textarea className="form-textarea" placeholder="Tell us about your current setup, team size, and what's not working…" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></div>
          <button type="submit" className="btn-primary" style={{width:"100%",justifyContent:"center",padding:"16px",fontSize:16}}>Request my demo →</button>
          <p style={{fontSize:12,color:T.mutedLt,marginTop:12,textAlign:"center"}}>We'll respond within 24 hours. No spam, ever.</p>
        </form>
      ):(
        <div>
          <div className="success-msg" style={{marginBottom:24}}>✓&nbsp; Request received. Oded will be in touch personally within 24 hours.</div>
          <div style={{padding:24,background:T.ivory,borderRadius:14,border:`1px solid ${T.border}`}}>
            <div style={{fontSize:12,fontWeight:600,color:T.muted,marginBottom:8,letterSpacing:".06em",textTransform:"uppercase"}}>While you wait</div>
            <p style={{fontSize:15,color:T.navy,lineHeight:1.75}}>We onboard in cohorts of 5. Typical time-to-value: <strong>14 days</strong> from signed agreement to first autonomous detections running in your environment.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────── */
export default function SentrixiApp(){
  const [page,setPage]=useState("home");
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>10);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  const nav=p=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"});trackEvent("page_view",{page:p});};
  return(
    <div style={{minHeight:"100vh",background:T.ivory}}>
      <style>{CSS}</style>
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div onClick={()=>nav("home")}><LogoWordmark size={28} dark/></div>
        <div className="nav-links">
          {[["home","Home"],["product","Platform"],["about","About"],["contact","Contact"]].map(([p,l])=>(
            <button key={p} className={`nav-btn${page===p?" active":""}`} onClick={()=>nav(p)}>{l}</button>
          ))}
        </div>
        <button className="btn-book" onClick={()=>nav("contact")}>Book a demo</button>
      </nav>
      {page==="home"&&<HomePage nav={nav}/>}
      {page==="product"&&<ProductPage/>}
      {page==="about"&&<AboutPage/>}
      {page==="contact"&&<ContactPage/>}
      <footer className="footer">
        <div onClick={()=>nav("home")} style={{cursor:"pointer"}}><LogoWordmark size={22} dark/></div>
        <div className="footer-links">
          {[["home","Home"],["product","Platform"],["about","About"],["contact","Contact"]].map(([p,l])=>(
            <button key={p} className="footer-link" onClick={()=>nav(p)}>{l}</button>
          ))}
        </div>
        <div style={{fontSize:12,color:T.mutedLt}}>© 2026 Sentrixi · sentrixi.com · Autonomous. Expert. Always Ahead.</div>
      </footer>
    </div>
  );
}
