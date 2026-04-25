import { useState, useEffect, useRef } from "react";

const C = {
  navy: "#0B1D3A", navyLight: "#132B4F", slate: "#1E293B",
  white: "#FFFFFF", offWhite: "#F8FAFC", warmGray: "#F1F0EB",
  teal: "#0D9373", tealLight: "#D0FAF0", tealDark: "#065F46", tealBg: "#ECFDF5",
  coral: "#E85D3A", coralLight: "#FEF0EC", coralDark: "#9A3412",
  amber: "#D97706", blue: "#2563EB", blueLight: "#EFF6FF",
  purple: "#7C3AED", purpleLight: "#F5F3FF",
  textPrimary: "#0F172A", textSecondary: "#64748B", textMuted: "#94A3B8",
  border: "#E2E8F0",
};
const F = { d: "'DM Serif Display', Georgia, serif", b: "'DM Sans', -apple-system, sans-serif", m: "'JetBrains Mono', monospace" };

function useFade() {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); return () => o.disconnect(); }, []);
  return { ref, s: { opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" } };
}
const Sec = ({ children, bg = C.white, id, pad = "100px 0" }) => <section id={id} style={{ background: bg, padding: pad }}><div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>{children}</div></section>;
const Lbl = ({ children, color = C.teal }) => <div style={{ fontFamily: F.m, fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color, marginBottom: 16 }}>{children}</div>;
const H2 = ({ children, mw = 720, center }) => <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 400, lineHeight: 1.15, color: C.textPrimary, maxWidth: mw, marginBottom: 24, textAlign: center ? "center" : undefined, margin: center ? "0 auto 24px" : undefined }}>{children}</h2>;
const P = ({ children, mw = 640, center }) => <p style={{ fontFamily: F.b, fontSize: 18, lineHeight: 1.7, color: C.textSecondary, maxWidth: mw, textAlign: center ? "center" : undefined, margin: center ? "0 auto" : undefined }}>{children}</p>;
const Stat = ({ value, label, color = C.navy }) => <div style={{ textAlign: "center" }}><div style={{ fontFamily: F.d, fontSize: 42, color, lineHeight: 1 }}>{value}</div><div style={{ fontFamily: F.b, fontSize: 13, color: C.textSecondary, marginTop: 6 }}>{label}</div></div>;

/* ═══ HERO VISUAL: Animated data flow ═══ */
function HeroVisual() {
  return (<div style={{ margin: "64px auto 0", maxWidth: 900 }}>
    <svg viewBox="0 0 900 280" style={{ width: "100%" }}>
      <style>{`@keyframes flowR{from{stroke-dashoffset:40}to{stroke-dashoffset:0}}@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}.flow{stroke-dasharray:8 32;animation:flowR 1.8s linear infinite}.dot{animation:pulse 2.4s ease-in-out infinite}`}</style>
      {[{x:30,y:40,l:"EDR",s:"Endpoints",c:"#818CF8"},{x:30,y:110,l:"IAM",s:"Identity",c:"#60A5FA"},{x:30,y:180,l:"Cloud",s:"AWS / Azure",c:"#34D399"},{x:870,y:40,l:"SASE",s:"Network",c:"#FB923C"},{x:870,y:110,l:"Email",s:"Phishing",c:"#F472B6"},{x:870,y:180,l:"Apps",s:"SaaS logs",c:"#A78BFA"}].map((n,i)=>(<g key={i}><rect x={n.x} y={n.y} width={90} height={48} rx={8} fill={n.c} opacity={.12} stroke={n.c} strokeWidth={1}/><text x={n.x+45} y={n.y+20} textAnchor="middle" fill={n.c} fontFamily={F.m} fontSize={11} fontWeight={600}>{n.l}</text><text x={n.x+45} y={n.y+36} textAnchor="middle" fill={C.textMuted} fontFamily={F.b} fontSize={10}>{n.s}</text></g>))}
      {[64,134,204].map((y,i)=>(<line key={`l${i}`} x1={125} y1={y} x2={330} y2={140} className="flow" stroke={C.teal} strokeWidth={2} opacity={.5} style={{animationDelay:`${i*.3}s`}}/>))}
      {[64,134,204].map((y,i)=>(<line key={`r${i}`} x1={775} y1={y} x2={570} y2={140} className="flow" stroke={C.teal} strokeWidth={2} opacity={.5} style={{animationDelay:`${i*.3+.15}s`}}/>))}
      <rect x={330} y={80} width={240} height={120} rx={16} fill={C.navy}/><rect x={330} y={80} width={240} height={120} rx={16} fill="none" stroke={C.teal} strokeWidth={1.5}/>
      <text x={450} y={118} textAnchor="middle" fill={C.white} fontFamily={F.d} fontSize={22}>AEGIS</text>
      <text x={450} y={142} textAnchor="middle" fill={C.teal} fontFamily={F.m} fontSize={11}>60+ AI detection agents</text>
      <text x={450} y={160} textAnchor="middle" fill="rgba(255,255,255,.5)" fontFamily={F.b} fontSize={11}>Embedded in your database kernel</text>
      <circle cx={340} cy={140} r={4} fill={C.teal} className="dot"/><circle cx={560} cy={140} r={4} fill={C.teal} className="dot" style={{animationDelay:".5s"}}/>
      <line x1={450} y1={200} x2={450} y2={248} stroke={C.teal} strokeWidth={1.5} strokeDasharray="4 4"/>
      <rect x={340} y={246} width={220} height={30} rx={15} fill={C.tealBg} stroke={C.teal} strokeWidth={1}/><text x={450} y={266} textAnchor="middle" fill={C.tealDark} fontFamily={F.m} fontSize={11} fontWeight={500}>Threats neutralized. Compliance met. Data captured.</text>
    </svg>
  </div>);
}

/* ═══ BEFORE / AFTER REVENUE SPLIT ═══ */
function BeforeAfter() {
  const f = useFade();
  return (<div ref={f.ref} style={{...f.s,margin:"56px auto 0",maxWidth:820}}>
    <div style={{display:"flex",gap:24}}>
      <div style={{flex:1,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}>
        <div style={{background:C.coral,padding:"14px 20px"}}><div style={{fontFamily:F.m,fontSize:11,color:"rgba(255,255,255,.7)",letterSpacing:".08em"}}>TODAY</div><div style={{fontFamily:F.b,fontSize:16,fontWeight:600,color:C.white,marginTop:2}}>Without AEGIS</div></div>
        <div style={{padding:24}}><svg viewBox="0 0 340 200" style={{width:"100%"}}>
          <rect x={20} y={100} width={120} height={80} rx={6} fill={C.navy}/><text x={80} y={138} textAnchor="middle" fill={C.white} fontFamily={F.b} fontSize={12} fontWeight={500}>Your database</text><text x={80} y={156} textAnchor="middle" fill="rgba(255,255,255,.5)" fontFamily={F.b} fontSize={10}>Base workload only</text>
          <rect x={195} y={30} width={130} height={150} rx={6} fill={C.coralLight} stroke={C.coral} strokeWidth={1} strokeDasharray="4 3"/>
          <text x={260} y={60} textAnchor="middle" fill={C.coralDark} fontFamily={F.b} fontSize={11} fontWeight={600}>Legacy SIEM</text><text x={260} y={78} textAnchor="middle" fill={C.coral} fontFamily={F.b} fontSize={10}>Separate vendor</text><text x={260} y={93} textAnchor="middle" fill={C.coral} fontFamily={F.b} fontSize={10}>Separate contract</text><text x={260} y={108} textAnchor="middle" fill={C.coral} fontFamily={F.b} fontSize={10}>Separate data silo</text>
          <path d="M140 140 L190 90" stroke={C.coral} strokeWidth={1.5} fill="none"/>
          <text x={260} y={155} textAnchor="middle" fill={C.coral} fontFamily={F.m} fontSize={18} fontWeight={700}>$$$</text><text x={260} y={172} textAnchor="middle" fill={C.coral} fontFamily={F.b} fontSize={10}>Revenue you never see</text>
        </svg></div>
      </div>
      <div style={{flex:1,borderRadius:16,overflow:"hidden",border:`1.5px solid ${C.teal}`}}>
        <div style={{background:C.teal,padding:"14px 20px"}}><div style={{fontFamily:F.m,fontSize:11,color:"rgba(255,255,255,.7)",letterSpacing:".08em"}}>WITH AEGIS</div><div style={{fontFamily:F.b,fontSize:16,fontWeight:600,color:C.white,marginTop:2}}>Everything in one platform</div></div>
        <div style={{padding:24}}><svg viewBox="0 0 340 200" style={{width:"100%"}}>
          <rect x={40} y={20} width={260} height={165} rx={10} fill={C.tealBg} stroke={C.teal} strokeWidth={1}/><text x={170} y={46} textAnchor="middle" fill={C.tealDark} fontFamily={F.m} fontSize={10} fontWeight={500}>YOUR DATABASE + AEGIS</text>
          <rect x={60} y={60} width={100} height={48} rx={6} fill={C.navy}/><text x={110} y={82} textAnchor="middle" fill={C.white} fontFamily={F.b} fontSize={11} fontWeight={500}>App data</text><text x={110} y={96} textAnchor="middle" fill="rgba(255,255,255,.5)" fontFamily={F.b} fontSize={9}>1x base</text>
          <rect x={180} y={60} width={100} height={48} rx={6} fill={C.teal}/><text x={230} y={82} textAnchor="middle" fill={C.white} fontFamily={F.b} fontSize={11} fontWeight={500}>Security logs</text><text x={230} y={96} textAnchor="middle" fill="rgba(255,255,255,.7)" fontFamily={F.b} fontSize={9}>+2x volume</text>
          <rect x={60} y={120} width={220} height={48} rx={6} fill={C.teal} opacity={.3}/><text x={170} y={142} textAnchor="middle" fill={C.tealDark} fontFamily={F.b} fontSize={11} fontWeight={500}>Governance + audit trail</text><text x={170} y={156} textAnchor="middle" fill={C.tealDark} fontFamily={F.b} fontSize={9}>+1x continuous telemetry</text>
          <rect x={223} y={185} width={56} height={22} rx={11} fill={C.teal}/><text x={251} y={200} textAnchor="middle" fill={C.white} fontFamily={F.b} fontSize={12} fontWeight={700}>= 3x</text>
        </svg></div>
      </div>
    </div>
  </div>);
}

/* ═══ SALES CYCLE COMPRESSION ═══ */
function SalesCycle() {
  const f = useFade();
  return (<div ref={f.ref} style={{...f.s,margin:"48px auto 0",maxWidth:760}}>
    <svg viewBox="0 0 760 180" style={{width:"100%"}}>
      <text x={0} y={20} fill={C.coral} fontFamily={F.m} fontSize={11} fontWeight={600}>WITHOUT AEGIS</text>
      <rect x={0} y={32} width={720} height={40} rx={6} fill={C.coralLight}/><rect x={0} y={32} width={200} height={40} rx={6} fill={C.navy} opacity={.08}/><rect x={200} y={32} width={360} height={40} fill={C.coral} opacity={.18}/><rect x={560} y={32} width={160} height={40} rx={6} fill={C.navy} opacity={.08}/>
      <text x={100} y={57} textAnchor="middle" fill={C.textPrimary} fontFamily={F.b} fontSize={11} fontWeight={500}>Technical eval</text>
      <text x={380} y={50} textAnchor="middle" fill={C.coralDark} fontFamily={F.b} fontSize={12} fontWeight={700}>Security and compliance review</text><text x={380} y={64} textAnchor="middle" fill={C.coral} fontFamily={F.b} fontSize={10}>3-6 months (the CISO veto)</text>
      <text x={640} y={57} textAnchor="middle" fill={C.textPrimary} fontFamily={F.b} fontSize={11} fontWeight={500}>Procurement</text><text x={738} y={57} textAnchor="start" fill={C.textMuted} fontFamily={F.m} fontSize={12} fontWeight={600}>~9mo</text>
      <text x={0} y={110} fill={C.teal} fontFamily={F.m} fontSize={11} fontWeight={600}>WITH AEGIS</text>
      <rect x={0} y={122} width={380} height={40} rx={6} fill={C.tealBg}/><rect x={0} y={122} width={180} height={40} rx={6} fill={C.navy} opacity={.08}/><rect x={180} y={122} width={80} height={40} fill={C.teal} opacity={.12}/><rect x={260} y={122} width={120} height={40} rx={6} fill={C.navy} opacity={.08}/>
      <text x={90} y={147} textAnchor="middle" fill={C.textPrimary} fontFamily={F.b} fontSize={11} fontWeight={500}>Technical eval</text><text x={220} y={140} textAnchor="middle" fill={C.tealDark} fontFamily={F.b} fontSize={10} fontWeight={600}>Pre-baked</text><text x={220} y={153} textAnchor="middle" fill={C.teal} fontFamily={F.b} fontSize={9}>SOC2 / DORA</text><text x={320} y={147} textAnchor="middle" fill={C.textPrimary} fontFamily={F.b} fontSize={11} fontWeight={500}>Procurement</text><text x={400} y={147} fill={C.teal} fontFamily={F.m} fontSize={12} fontWeight={700}>~4mo</text>
      <rect x={490} y={115} width={170} height={52} rx={10} fill={C.teal}/><text x={575} y={140} textAnchor="middle" fill={C.white} fontFamily={F.b} fontSize={13} fontWeight={600}>2x faster to close</text><text x={575} y={156} textAnchor="middle" fill="rgba(255,255,255,.7)" fontFamily={F.b} fontSize={10}>CISO veto eliminated</text>
    </svg>
  </div>);
}

/* ═══ DUAL-BRAIN ARCHITECTURE ═══ */
function DualBrain() {
  const f = useFade();
  return (<div ref={f.ref} style={{...f.s,margin:"56px auto 0",maxWidth:780}}>
    <svg viewBox="0 0 780 290" style={{width:"100%"}}>
      <style>{`@keyframes sp{0%,100%{opacity:.3}50%{opacity:.9}}.sc{animation:sp 2s ease-in-out infinite}`}</style>
      <rect x={20} y={105} width={110} height={80} rx={8} fill={C.offWhite} stroke={C.border} strokeWidth={1}/><text x={75} y={138} textAnchor="middle" fill={C.textPrimary} fontFamily={F.b} fontSize={12} fontWeight={600}>Raw events</text><text x={75} y={156} textAnchor="middle" fill={C.textMuted} fontFamily={F.b} fontSize={10}>Millions / hour</text>
      <line x1={135} y1={145} x2={185} y2={145} stroke={C.textMuted} strokeWidth={1.5}/>
      <rect x={190} y={85} width={180} height={120} rx={12} fill={C.blueLight} stroke={C.blue} strokeWidth={1}/><circle cx={220} cy={125} r={14} fill={C.blue} opacity={.15} className="sc"/><text x={280} y={120} textAnchor="middle" fill={C.blue} fontFamily={F.m} fontSize={11} fontWeight={600}>ML BRAIN</text><text x={280} y={138} textAnchor="middle" fill={C.blue} fontFamily={F.b} fontSize={12} fontWeight={500}>Fast path</text><text x={280} y={156} textAnchor="middle" fill={C.textSecondary} fontFamily={F.b} fontSize={10}>Heuristics + IsolationForest</text><rect x={230} y={168} width={100} height={20} rx={10} fill={C.blue} opacity={.15}/><text x={280} y={182} textAnchor="middle" fill={C.blue} fontFamily={F.m} fontSize={10} fontWeight={600}>&lt;500ms</text>
      <line x1={375} y1={125} x2={415} y2={125} stroke={C.textMuted} strokeWidth={1.5}/><text x={395} y={113} textAnchor="middle" fill={C.textMuted} fontFamily={F.b} fontSize={9}>Top 5%</text>
      <line x1={375} y1={165} x2={415} y2={215} stroke={C.textMuted} strokeWidth={1} strokeDasharray="4 3"/><text x={420} y={233} fill={C.textMuted} fontFamily={F.b} fontSize={10}>95% noise dismissed</text>
      <rect x={420} y={65} width={200} height={130} rx={12} fill={C.purpleLight} stroke={C.purple} strokeWidth={1}/><circle cx={454} cy={105} r={14} fill={C.purple} opacity={.15} className="sc" style={{animationDelay:"1s"}}/><text x={520} y={103} textAnchor="middle" fill={C.purple} fontFamily={F.m} fontSize={11} fontWeight={600}>LLM BRAIN</text><text x={520} y={121} textAnchor="middle" fill={C.purple} fontFamily={F.b} fontSize={12} fontWeight={500}>Deep analysis</text><text x={520} y={139} textAnchor="middle" fill={C.textSecondary} fontFamily={F.b} fontSize={10}>Claude AI reasoning</text><text x={520} y={154} textAnchor="middle" fill={C.textSecondary} fontFamily={F.b} fontSize={10}>MITRE tagging + intent</text><text x={520} y={169} textAnchor="middle" fill={C.textSecondary} fontFamily={F.b} fontSize={10}>Forensic narrative</text><rect x={470} y={178} width={100} height={20} rx={10} fill={C.purple} opacity={.15}/><text x={520} y={192} textAnchor="middle" fill={C.purple} fontFamily={F.m} fontSize={10} fontWeight={600}>5% escalated</text>
      <line x1={625} y1={130} x2={660} y2={130} stroke={C.textMuted} strokeWidth={1.5}/>
      <rect x={665} y={90} width={100} height={80} rx={10} fill={C.teal}/><text x={715} y={122} textAnchor="middle" fill={C.white} fontFamily={F.b} fontSize={12} fontWeight={600}>Verdict</text><text x={715} y={140} textAnchor="middle" fill="rgba(255,255,255,.7)" fontFamily={F.b} fontSize={10}>DFIR + response</text><text x={715} y={156} textAnchor="middle" fill="rgba(255,255,255,.7)" fontFamily={F.b} fontSize={10}>&lt;20ms total</text>
      <text x={390} y={280} textAnchor="middle" fill={C.textMuted} fontFamily={F.b} fontSize={12}>ML handles volume. AI handles depth. You pay for intelligence only when it matters.</text>
    </svg>
  </div>);
}

/* ═══ PRODUCT MOCKUP: Investigation Console ═══ */
function ProductMockup() {
  const f = useFade();
  return (<div ref={f.ref} style={{...f.s,margin:"56px auto 0",maxWidth:960}}>
    <div style={{background:C.slate,borderRadius:16,overflow:"hidden",border:`1px solid rgba(255,255,255,.08)`,boxShadow:"0 25px 60px rgba(0,0,0,.3)"}}>
      {/* Title bar */}
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{width:12,height:12,borderRadius:6,background:"#EF4444"}}/><div style={{width:12,height:12,borderRadius:6,background:"#EAB308"}}/><div style={{width:12,height:12,borderRadius:6,background:"#22C55E"}}/>
        <div style={{flex:1,textAlign:"center",fontFamily:F.m,fontSize:11,color:"rgba(255,255,255,.4)"}}>AEGIS Investigation Console</div>
      </div>
      <div style={{display:"flex",minHeight:420}}>
        {/* Sidebar */}
        <div style={{width:180,borderRight:"1px solid rgba(255,255,255,.06)",padding:"16px 0"}}>
          {["Overview","Threat hunting","Forensics","Kill chains","Insider threats","Compliance","Settings"].map((item,i)=>(
            <div key={i} style={{padding:"8px 20px",fontFamily:F.b,fontSize:12,color:i===2?"#fff":"rgba(255,255,255,.4)",background:i===2?"rgba(255,255,255,.06)":"transparent",borderLeft:i===2?`2px solid ${C.teal}`:"2px solid transparent",cursor:"pointer"}}>{item}</div>
          ))}
        </div>
        {/* Main content */}
        <div style={{flex:1,padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div><div style={{fontFamily:F.b,fontSize:16,fontWeight:600,color:"#fff"}}>User: jsmith@acme.com</div><div style={{fontFamily:F.m,fontSize:11,color:C.coral,marginTop:4}}>RISK: HIGH — Convergence detected across 3 agents</div></div>
            <div style={{display:"flex",gap:8}}><div style={{fontFamily:F.m,fontSize:10,padding:"4px 10px",borderRadius:6,background:"rgba(232,93,58,.15)",color:C.coral}}>Flight risk</div><div style={{fontFamily:F.m,fontSize:10,padding:"4px 10px",borderRadius:6,background:"rgba(124,58,237,.15)",color:C.purple}}>Data exfil</div><div style={{fontFamily:F.m,fontSize:10,padding:"4px 10px",borderRadius:6,background:"rgba(37,99,235,.15)",color:C.blue}}>Shadow AI</div></div>
          </div>
          {/* Timeline bars */}
          <div style={{background:"rgba(255,255,255,.03)",borderRadius:8,padding:16,marginBottom:16}}>
            <div style={{fontFamily:F.m,fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:12}}>ACTIVITY TIMELINE — LAST 72 HOURS</div>
            <div style={{display:"flex",gap:2,alignItems:"flex-end",height:60}}>
              {[20,35,15,45,25,55,70,40,30,85,95,60,45,35,25,40,50,30,20,15,25,35,50,65].map((h,i)=>(<div key={i} style={{flex:1,height:`${h}%`,background:h>70?C.coral:h>50?C.amber:C.teal,borderRadius:2,opacity:.7}}/>))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}><span style={{fontFamily:F.m,fontSize:9,color:"rgba(255,255,255,.25)"}}>72h ago</span><span style={{fontFamily:F.m,fontSize:9,color:"rgba(255,255,255,.25)"}}>Now</span></div>
          </div>
          {/* Evidence table */}
          <div style={{background:"rgba(255,255,255,.03)",borderRadius:8,padding:16}}>
            <div style={{fontFamily:F.m,fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:12}}>CONVERGENCE EVIDENCE</div>
            {[
              {time:"14:23",event:"Bulk download: 847 files from /vault/keys/",agent:"Data exfil",severity:"CRITICAL",color:C.coral},
              {time:"13:58",event:"LinkedIn OTW settings page visited",agent:"Flight risk",severity:"HIGH",color:C.amber},
              {time:"12:41",event:"ChatGPT upload: policy-config.yaml",agent:"Shadow AI",severity:"HIGH",color:C.purple},
              {time:"11:15",event:"Off-hours VPN from foreign IP (Tor exit)",agent:"Identity",severity:"MEDIUM",color:C.blue},
              {time:"09:30",event:"Resume.docx edited on personal drive",agent:"Flight risk",severity:"MEDIUM",color:C.amber},
            ].map((e,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:i<4?"1px solid rgba(255,255,255,.04)":"none"}}>
                <span style={{fontFamily:F.m,fontSize:11,color:"rgba(255,255,255,.3)",width:40}}>{e.time}</span>
                <span style={{fontFamily:F.b,fontSize:12,color:"rgba(255,255,255,.75)",flex:1}}>{e.event}</span>
                <span style={{fontFamily:F.m,fontSize:10,color:e.color,width:70}}>{e.agent}</span>
                <span style={{fontFamily:F.m,fontSize:9,padding:"2px 8px",borderRadius:4,background:`${e.color}20`,color:e.color}}>{e.severity}</span>
              </div>
            ))}
          </div>
        </div>
        {/* AI panel */}
        <div style={{width:260,borderLeft:"1px solid rgba(255,255,255,.06)",padding:20}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><div style={{width:8,height:8,borderRadius:4,background:C.teal}}/><span style={{fontFamily:F.m,fontSize:11,color:C.teal,fontWeight:600}}>Genie AI</span></div>
          <div style={{background:"rgba(13,147,115,.08)",borderRadius:10,padding:14,marginBottom:12}}>
            <div style={{fontFamily:F.b,fontSize:12,color:"rgba(255,255,255,.8)",lineHeight:1.6}}>This user shows <strong style={{color:C.coral}}>convergence across 3 insider threat agents</strong>. The combination of job search activity + bulk data access + unauthorized AI tool usage in a 72h window is a high-confidence pre-departure exfiltration pattern.</div>
          </div>
          <div style={{fontFamily:F.m,fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:8}}>RECOMMENDED ACTIONS</div>
          {["Freeze API credentials","Notify key custodians","Escalate to CISO"].map((a,i)=>(
            <div key={i} style={{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(255,255,255,.08)",marginBottom:6,fontFamily:F.b,fontSize:11,color:"rgba(255,255,255,.6)",cursor:"pointer"}}>{a}</div>
          ))}
          <div style={{fontFamily:F.m,fontSize:10,color:"rgba(255,255,255,.3)",marginTop:16,marginBottom:8}}>MITRE ATT&CK</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {["TA0009","TA0010","T1530","T1567","T1078"].map(t=><span key={t} style={{fontFamily:F.m,fontSize:9,padding:"2px 6px",borderRadius:4,background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.4)"}}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  </div>);
}

/* ═══ DATA SOURCES → AGENTS PIPELINE ═══ */
function AgentPipeline() {
  const f = useFade();
  const sources = ["EDR / XDR","Network / Firewall","Identity / IAM","SaaS apps","Cloud / IaaS","Email / Phishing","DNS / Proxy","Code repos"];
  const agents = [{n:"Detection agents",c:C.teal},{n:"Triage agents",c:C.blue},{n:"Analytics agents",c:C.purple},{n:"Response agents",c:C.amber}];
  return (<div ref={f.ref} style={{...f.s,margin:"56px auto 0",maxWidth:960}}>
    <div style={{display:"flex",gap:32,alignItems:"stretch"}}>
      {/* Sources */}
      <div style={{flex:"0 0 180"}}>
        <div style={{fontFamily:F.m,fontSize:11,color:C.textMuted,marginBottom:12,letterSpacing:".06em"}}>DATA SOURCES</div>
        {sources.map((s,i)=>(
          <div key={i} style={{padding:"10px 16px",borderRadius:8,border:`0.5px solid ${C.border}`,marginBottom:6,fontFamily:F.b,fontSize:13,fontWeight:500,color:C.textPrimary,background:C.white}}>{s}</div>
        ))}
      </div>
      {/* Arrow zone */}
      <div style={{flex:"0 0 80",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg viewBox="0 0 80 300" style={{width:80,height:"100%"}}>
          {sources.map((_,i)=>{
            const y1 = 25 + i * 46;
            return <line key={i} x1={0} y1={y1} x2={80} y2={150} stroke={C.teal} strokeWidth={1} opacity={.3}/>;
          })}
        </svg>
      </div>
      {/* AEGIS engine */}
      <div style={{flex:1}}>
        <div style={{background:C.navy,borderRadius:16,padding:28,border:`1px solid ${C.teal}33`}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <div style={{width:40,height:40,borderRadius:10,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill={C.white}/></svg>
            </div>
            <div><div style={{fontFamily:F.d,fontSize:20,color:C.white}}>AEGIS Engine</div><div style={{fontFamily:F.m,fontSize:10,color:C.teal}}>Embedded in the database kernel</div></div>
          </div>
          <div style={{fontFamily:F.b,fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.6,marginBottom:24}}>
            Unlike bolt-on SIEMs that sit outside your data, AEGIS runs <em style={{color:C.teal}}>inside</em> the database engine. Detection happens at ingest speed — not after batch ETL. Every query, every access pattern, every anomaly is caught in real time.
          </div>
          <div style={{fontFamily:F.m,fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:12,letterSpacing:".06em"}}>AUTONOMOUS AI AGENTS</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {agents.map(a=>(
              <div key={a.n} style={{padding:"12px 16px",borderRadius:10,background:`${a.c}15`,border:`1px solid ${a.c}30`}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:6,height:6,borderRadius:3,background:a.c}}/><span style={{fontFamily:F.b,fontSize:13,fontWeight:600,color:C.white}}>{a.n}</span></div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:16}}>
            {[{l:"Kill chain reasoning",v:"APT playbooks"},{l:"Insider threat fleet",v:"5 specialized agents"},{l:"LOTL detection",v:"Living-off-the-land"}].map(x=>(
              <div key={x.l} style={{padding:"10px 14px",borderRadius:8,background:"rgba(255,255,255,.04)"}}>
                <div style={{fontFamily:F.b,fontSize:11,fontWeight:600,color:"rgba(255,255,255,.7)"}}>{x.l}</div>
                <div style={{fontFamily:F.m,fontSize:10,color:"rgba(255,255,255,.35)",marginTop:2}}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>);
}

/* ═══ SECURITY GAP ═══ */
function GapGraphic() {
  const f = useFade();
  return (<div ref={f.ref} style={{...f.s,margin:"48px auto 0",maxWidth:600}}>
    {[{n:"Endpoint",v:"CrowdStrike, SentinelOne",ok:true},{n:"Network",v:"Palo Alto, Fortinet",ok:true},{n:"Cloud posture",v:"Wiz, Orca",ok:true},{n:"Application",v:"Snyk, Checkmarx",ok:true},{n:"Database layer",v:"AEGIS fills this gap",ok:false}].map((l,i)=>(
      <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 20px",marginBottom:6,borderRadius:10,background:l.ok?C.offWhite:C.navy,border:l.ok?"none":`2px solid ${C.teal}`}}>
        <div style={{width:34,height:34,borderRadius:8,background:l.ok?"#DEF7EC":C.teal,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          {l.ok?<svg width="16" height="16" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke={C.tealDark} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>:<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill={C.white}/></svg>}
        </div>
        <div style={{flex:1}}><div style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:l.ok?C.textPrimary:C.white}}>{l.n}</div><div style={{fontFamily:F.b,fontSize:13,color:l.ok?C.textSecondary:"rgba(255,255,255,.7)"}}>{l.v}</div></div>
        {!l.ok&&<div style={{fontFamily:F.m,fontSize:10,color:C.white,background:C.coral,padding:"3px 10px",borderRadius:20,fontWeight:600}}>UNPROTECTED</div>}
      </div>
    ))}
  </div>);
}

/* ═══ CAPABILITY CARD ═══ */
function CapCard({icon,title,body}) {
  return (<div style={{padding:"24px",borderRadius:12,border:`0.5px solid ${C.border}`,background:C.white}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
      <div style={{width:32,height:32,borderRadius:8,background:C.tealBg,display:"flex",alignItems:"center",justifyContent:"center"}}>{icon}</div>
      <div style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.textPrimary}}>{title}</div>
    </div>
    <div style={{fontFamily:F.b,fontSize:14,color:C.textSecondary,lineHeight:1.6}}>{body}</div>
  </div>);
}

/* ═══ MAIN APP ═══ */
export default function App() {
  return (<div style={{fontFamily:F.b,color:C.textPrimary,background:C.white}}>
    {/* NAV */}
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(255,255,255,.92)",backdropFilter:"blur(12px)",borderBottom:`0.5px solid ${C.border}`}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{fontFamily:F.d,fontSize:20,color:C.navy}}>Sentrixi</div>
        <div style={{display:"flex",gap:28,alignItems:"center"}}>
          {[["Why AEGIS","#why"],["For vendors","#vendors"],["Product","#product"],["For enterprises","#enterprises"]].map(([l,h])=><a key={h} href={h} style={{fontFamily:F.b,fontSize:14,color:C.textSecondary,textDecoration:"none",fontWeight:500}}>{l}</a>)}
          <a href="#contact" style={{fontFamily:F.b,fontSize:14,fontWeight:600,color:C.white,background:C.navy,padding:"8px 20px",borderRadius:8,textDecoration:"none"}}>Get a briefing</a>
        </div>
      </div>
    </nav>

    {/* HERO */}
    <Sec bg={C.white} pad="160px 0 60px" id="hero">
      <Lbl>AEGIS by Sentrixi</Lbl>
      <h1 style={{fontFamily:F.d,fontSize:"clamp(34px,5vw,58px)",fontWeight:400,lineHeight:1.1,color:C.navy,maxWidth:780,marginBottom:24}}>Security is the largest data workload in the enterprise. <span style={{color:C.teal}}>The database that captures it wins.</span></h1>
      <P mw={660}>AEGIS embeds AI-native detection and response directly into real-time database platforms — driving 3x data consumption, 2x faster enterprise sales, and a moat that OLAP-only vendors cannot replicate.</P>
      <div style={{display:"flex",gap:16,marginTop:40,flexWrap:"wrap"}}>
        <a href="#vendors" style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.white,background:C.navy,padding:"14px 28px",borderRadius:10,textDecoration:"none"}}>For database vendors</a>
        <a href="#enterprises" style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.navy,padding:"14px 28px",borderRadius:10,textDecoration:"none",border:`1.5px solid ${C.navy}`}}>For enterprises</a>
      </div>
      <HeroVisual/>
      <div style={{display:"flex",gap:60,marginTop:56,flexWrap:"wrap",justifyContent:"center"}}><Stat value="3x" label="Consumption lift"/><Stat value="2x" label="Sales velocity"/><Stat value="<20ms" label="Detection latency"/><Stat value="60+" label="AI agents"/></div>
    </Sec>

    {/* MARKET VALIDATION */}
    <Sec bg={C.warmGray} id="why">{(()=>{const f=useFade();return(<div ref={f.ref} style={f.s}><Lbl>Market signal</Lbl><H2>In March 2026, the world's largest data platform launched a native SIEM.</H2><P>That wasn't a product experiment — it was a $65B company betting that security workloads are the next frontier for data platform consumption. They proved the model: capture security logs, drive 3x more data through your engine, lock in enterprise customers.</P><div style={{fontFamily:F.b,fontSize:17,color:C.textPrimary,fontWeight:500,marginTop:32,padding:"24px 28px",borderRadius:12,background:C.white,borderLeft:`4px solid ${C.teal}`,maxWidth:720}}>But they built security <em>on top of</em> the data layer.<br/>AEGIS builds it <em>into</em> the database kernel — where detection runs at ingest speed, not batch cadence.</div></div>)})()}</Sec>

    {/* THE REAL QUESTION */}
    <Sec bg={C.white} id="question">{(()=>{const f=useFade();return(<div ref={f.ref} style={{...f.s,textAlign:"center"}}><Lbl color={C.coral}>The real question</Lbl><H2 mw={800} center>"Why would a database vendor sell security?"</H2><P mw={680} center>Wrong framing. Security telemetry is the single highest-volume data workload in every enterprise. Whoever's database captures it gets 3x the consumption and a moat commodity databases can't replicate.</P><div style={{fontFamily:F.b,fontSize:20,fontWeight:600,color:C.teal,marginTop:24}}>You're not selling security. You're selling data gravity.</div></div>)})()}<BeforeAfter/></Sec>

    {/* WHERE DATA MEETS SECURITY — NEW SECTION */}
    <Sec bg={C.navy} pad="80px 0">
      {(()=>{const f=useFade();return(<div ref={f.ref} style={{...f.s,textAlign:"center"}}><Lbl color={C.teal}>Where data meets security</Lbl><h2 style={{fontFamily:F.d,fontSize:"clamp(28px,3.5vw,42px)",fontWeight:400,color:C.white,maxWidth:700,margin:"0 auto 20px"}}>Fight agents with agents. Detect threats where the data lives.</h2><p style={{fontFamily:F.b,fontSize:17,color:"rgba(255,255,255,.55)",maxWidth:640,margin:"0 auto 48px"}}>Traditional SIEMs bolt on AI features that can't access the full context of your data. AEGIS embeds autonomous detection directly inside the database engine — where every query, every access pattern, and every anomaly is visible in real time.</p></div>)})()}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,maxWidth:900,margin:"0 auto"}}>
        {[
          {t:"Database-native detection",b:"Detection agents run inside the database kernel, not in a separate appliance. Every query pattern, every privileged access, every anomaly — caught at ingest speed with zero data movement."},
          {t:"Enterprise-wide governance",b:"Fine-grained access control at table, row, column, and attribute levels with full auditability across all data. Your security policy lives where your data lives."},
          {t:"Automated ingestion and normalization",b:"AEGIS handles ingestion and normalization of major security sources (EDR, identity, cloud, network, SaaS) into standardized tables. No manual ETL, no schema wrangling."},
          {t:"True data ownership",b:"All security telemetry stays in your database, in your cloud account. No data leaves your perimeter. No vendor lock-in. Full portability on open formats."},
          {t:"Autonomous AI agent fleet",b:"60+ specialized agents handle detection, triage, correlation, and response autonomously. Attackers use swarms of AI agents — defenders should too."},
          {t:"Natural language investigation",b:"Analysts query security data using plain language instead of specialized query languages. Democratizes threat hunting across skill levels — junior analysts to CISOs."},
        ].map(c=>(
          <div key={c.t} style={{padding:"22px",borderRadius:12,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.white,marginBottom:8}}>{c.t}</div>
            <div style={{fontFamily:F.b,fontSize:13,color:"rgba(255,255,255,.5)",lineHeight:1.65}}>{c.b}</div>
          </div>
        ))}
      </div>
    </Sec>

    {/* AGENT PIPELINE DIAGRAM */}
    <Sec bg={C.offWhite} id="product">{(()=>{const f=useFade();return(<div ref={f.ref} style={f.s}><Lbl>The architecture</Lbl><H2>All your data sources. One autonomous detection engine.</H2><P>AEGIS ingests telemetry from every security source, normalizes it into the database, and deploys autonomous AI agents for detection, triage, and response — all at kernel speed.</P></div>)})()}<AgentPipeline/></Sec>

    {/* PRODUCT MOCKUP */}
    <Sec bg={C.white}>{(()=>{const f=useFade();return(<div ref={f.ref} style={{...f.s,textAlign:"center"}}><Lbl color={C.purple}>See it in action</Lbl><H2 mw={600} center>AI-powered investigation, built for speed.</H2><P mw={600} center>The AEGIS console shows convergence across multiple insider threat agents. The AI panel explains the risk, cites evidence, and recommends actions — all in real time.</P></div>)})()}<ProductMockup/></Sec>

    {/* SALES CYCLE */}
    <Sec bg={C.offWhite}>{(()=>{const f=useFade();return(<div ref={f.ref} style={f.s}><Lbl color={C.blue}>Sales acceleration</Lbl><H2 mw={600}>Cut your enterprise sales cycle in half.</H2><P mw={640}>The #1 bottleneck in $1M+ database deals is the 3-6 month security review. AEGIS pre-bakes SOC 2, GDPR, and DORA compliance into the platform.</P></div>)})()}<SalesCycle/></Sec>

    {/* THE GAP */}
    <Sec bg={C.white}>{(()=>{const f=useFade();return(<div ref={f.ref} style={{...f.s,textAlign:"center"}}><Lbl>The unprotected layer</Lbl><H2 mw={600} center>Every layer is protected. Except where the data lives.</H2></div>)})()}<GapGraphic/></Sec>

    {/* FOR VENDORS */}
    <Sec bg={C.offWhite} id="vendors">{(()=>{const f=useFade();return(<div ref={f.ref} style={f.s}><Lbl>For database vendors</Lbl><H2 mw={700}>Turn security into your highest-margin revenue line.</H2></div>)})()}
      <div style={{display:"flex",gap:20,marginTop:36,flexWrap:"wrap"}}>
        {[{c:C.teal,t:"3x consumption",b:"Security logs are continuous and voluminous. When customers ingest them into your database instead of a separate SIEM, storage and compute revenue triples."},{c:C.blue,t:"2x sales velocity",b:"Pre-baked compliance removes the CISO veto from procurement. Deal cycles compress from 9 months to 4."},{c:C.amber,t:"Structural moat",b:"Security at the kernel level creates switching costs no bolt-on can match. Behavioral baselines live inside your database permanently."}].map(c=><div key={c.t} style={{flex:1,minWidth:240,padding:"28px 24px",borderRadius:14,border:`0.5px solid ${C.border}`,background:C.white}}><div style={{width:10,height:10,borderRadius:3,background:c.c,marginBottom:16}}/><div style={{fontFamily:F.b,fontSize:18,fontWeight:600,color:C.textPrimary,marginBottom:10}}>{c.t}</div><div style={{fontFamily:F.b,fontSize:15,color:C.textSecondary,lineHeight:1.65}}>{c.b}</div></div>)}
      </div>
      <div style={{marginTop:40,padding:"28px 32px",borderRadius:14,background:C.navy,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
        <div><div style={{fontFamily:F.b,fontSize:13,color:"rgba(255,255,255,.5)"}}>Revenue currently leaking to legacy SIEMs</div><div style={{fontFamily:F.d,fontSize:34,color:C.white,marginTop:4}}>$150K – $400K</div><div style={{fontFamily:F.b,fontSize:13,color:"rgba(255,255,255,.5)",marginTop:4}}>per customer, per year — captured as database consumption</div></div>
        <a href="#contact" style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.navy,background:C.white,padding:"12px 24px",borderRadius:10,textDecoration:"none"}}>Explore OEM partnership</a>
      </div>
    </Sec>

    {/* PHASES */}
    <Sec bg={C.white}>
      {(()=>{const f=useFade();return<div ref={f.ref} style={f.s}><Lbl>Roadmap</Lbl><H2>Three phases. Each one deepens the moat.</H2></div>})()}
      <div style={{display:"flex",gap:20,marginTop:40,flexWrap:"wrap"}}>
        {[{l:"PHASE 1",t:"Protect the database",b:"Behavioral anomaly detection on access patterns, privileged users, credential misuse. Sub-second. Zero disruption.",live:true},{l:"PHASE 2 · Q4 2026",t:"Protect the customer",b:"Customers inject all security logs into your database. AEGIS detects, triages, contains 24/7. Consumption flywheel activates."},{l:"YEAR 2+",t:"The security substrate",b:"Embedded SDK, eBPF agents, managed-service wrapper for Fortune 500 security operations."}].map(p=><div key={p.l} style={{flex:1,minWidth:240,padding:"28px 24px",borderRadius:14,background:C.offWhite,border:`0.5px solid ${C.border}`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><span style={{fontFamily:F.m,fontSize:11,fontWeight:600,color:C.teal}}>{p.l}</span>{p.live&&<span style={{fontFamily:F.m,fontSize:10,background:"#DEF7EC",color:C.tealDark,padding:"2px 8px",borderRadius:10,fontWeight:600}}>LIVE</span>}</div><div style={{fontFamily:F.d,fontSize:21,color:C.textPrimary,marginBottom:10}}>{p.t}</div><div style={{fontFamily:F.b,fontSize:15,color:C.textSecondary,lineHeight:1.65}}>{p.b}</div></div>)}
      </div>
    </Sec>

    {/* DUAL BRAIN */}
    <Sec bg={C.offWhite}>{(()=>{const f=useFade();return(<div ref={f.ref} style={{...f.s,textAlign:"center"}}><Lbl color={C.purple}>How it works</Lbl><H2 mw={600} center>Two-pass AI: volume handled by ML, depth by intelligence.</H2><P mw={600} center>ML filters 95% of events in under 500ms. Only genuine signals reach the LLM for deep reasoning. Total: under 20ms.</P></div>)})()}<DualBrain/></Sec>

    {/* FOR ENTERPRISES */}
    <Sec bg={C.white} id="enterprises">{(()=>{const f=useFade();return<div ref={f.ref} style={f.s}><Lbl>For enterprises</Lbl><H2>Your data deserves real-time protection.</H2><P>If your applications handle financial transactions, patient records, or classified data — AEGIS provides database-layer behavioral defense that doesn't exist anywhere else.</P></div>})()}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:40}}>
        {[
          {t:"Insider threat detection",b:"60+ AI agents build behavioral baselines on every privileged user. Anomalous patterns caught in real time."},
          {t:"Credential misuse",b:"Behavioral fingerprinting detects stolen credentials. Dual-brain: ML fast-path, LLM deep analysis on escalation."},
          {t:"Data exfiltration",b:"Unusual volumes, bulk exports, staging behavior caught before damage. Kill-chain reasoning tracks multi-stage campaigns."},
          {t:"AI agent governance",b:"Identity-aware vector filtering. Prevent prompt injection and shadow AI. Every agent action audited."},
          {t:"Compliance automation",b:"Continuous evidence for SOC 2, GDPR, PCI-DSS, DORA, HIPAA. Generated automatically, not assembled annually."},
          {t:"Nation-state defense",b:"Kill Chain Reasoning Engine with APT playbooks. LOTL detection. Adversarial ML hardening."},
        ].map(c=><div key={c.t} style={{padding:"22px",borderRadius:12,background:C.offWhite,border:`0.5px solid ${C.border}`}}><div style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.textPrimary,marginBottom:6}}>{c.t}</div><div style={{fontFamily:F.b,fontSize:14,color:C.textSecondary,lineHeight:1.6}}>{c.b}</div></div>)}
      </div>
      <div style={{display:"flex",gap:48,marginTop:48,justifyContent:"center",flexWrap:"wrap"}}><Stat value="60+" label="AI agents" color={C.teal}/><Stat value="<20ms" label="Detection" color={C.teal}/><Stat value="18mo" label="Battle-tested" color={C.teal}/><Stat value="0" label="Infra changes" color={C.teal}/></div>
    </Sec>

    {/* COMPLIANCE */}
    <Sec bg={C.offWhite}>{(()=>{const f=useFade();return(<div ref={f.ref} style={{...f.s,textAlign:"center"}}><Lbl>Compliance</Lbl><H2 mw={460} center>Continuous evidence, not annual audits.</H2><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:28}}>{["SOC 2 Type II","GDPR Art. 32","NYDFS 500","PCI-DSS 4.0","DORA","ISO 27001","HIPAA"].map(fw=><div key={fw} style={{fontFamily:F.m,fontSize:12,fontWeight:500,padding:"8px 16px",borderRadius:8,background:C.white,border:`0.5px solid ${C.border}`,color:C.textPrimary}}>{fw}</div>)}</div></div>)})()}</Sec>

    {/* TEAM */}
    <Sec bg={C.white}>{(()=>{const f=useFade();return<div ref={f.ref} style={f.s}><Lbl>Leadership</Lbl><H2>Built by practitioners.</H2></div>})()}
      <div style={{display:"flex",gap:20,marginTop:32,flexWrap:"wrap"}}>
        {[{r:"Founder & CEO",d:"CIO/CISO with 15+ years in cybersecurity and AI governance in regulated financial services. Architect of behavioral detection platforms protecting critical infrastructure across 30+ regions."},{r:"Advisory board",d:"Former SOC directors, threat intelligence leads, and compliance architects from top-tier financial institutions and defense organizations."},{r:"Engineering",d:"18 months production-hardened. 60+ detection agents, self-learning ML, adversarial hardening. Battle-tested against nation-state actors."}].map(t=><div key={t.r} style={{flex:1,minWidth:240,padding:"24px 22px",borderRadius:12,border:`0.5px solid ${C.border}`,background:C.offWhite}}><div style={{fontFamily:F.b,fontSize:16,fontWeight:600,color:C.textPrimary,marginBottom:10}}>{t.r}</div><div style={{fontFamily:F.b,fontSize:14,color:C.textSecondary,lineHeight:1.65}}>{t.d}</div></div>)}
      </div>
    </Sec>

    {/* CONTACT */}
    <Sec bg={C.navy} id="contact" pad="80px 0">
      <div style={{textAlign:"center"}}><Lbl color={C.teal}>Get started</Lbl>
        <h2 style={{fontFamily:F.d,fontSize:"clamp(26px,3.5vw,40px)",fontWeight:400,color:C.white,marginBottom:16}}>Schedule a briefing.</h2>
        <p style={{fontFamily:F.b,fontSize:16,color:"rgba(255,255,255,.55)",maxWidth:520,margin:"0 auto 36px"}}>We partner selectively with database vendors serving security-conscious verticals, and with enterprises that need database-layer protection.</p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="mailto:contact@sentrixi.com?subject=OEM Partnership" style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.navy,background:C.white,padding:"12px 26px",borderRadius:10,textDecoration:"none"}}>For database vendors</a>
          <a href="mailto:contact@sentrixi.com?subject=Enterprise Briefing" style={{fontFamily:F.b,fontSize:15,fontWeight:600,color:C.white,padding:"12px 26px",borderRadius:10,textDecoration:"none",border:"1.5px solid rgba(255,255,255,.25)"}}>For enterprises</a>
        </div>
        <div style={{fontFamily:F.b,fontSize:13,color:"rgba(255,255,255,.35)",marginTop:28}}>contact@sentrixi.com</div>
      </div>
    </Sec>

    <footer style={{background:C.navy,borderTop:"0.5px solid rgba(255,255,255,.06)",padding:"20px 32px",textAlign:"center"}}><span style={{fontFamily:F.b,fontSize:12,color:"rgba(255,255,255,.25)"}}>SENTRIXI &copy; 2026 Sentrixi Ltd. All rights reserved.</span></footer>
  </div>);
}
