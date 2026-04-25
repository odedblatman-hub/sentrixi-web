"use client";
import { useEffect, useState } from "react";

const ANALYSIS = `[THREAT ASSESSMENT]
Campaign ............. UNC5537 / ShinyHunters
Classification ....... Credential-based exfil
Confidence ........... 0.94  Severity: P0 CRITICAL

[DETECTION CHAIN]
Dark web match → VPN auth anomaly → FROSTBITE
SQL recon → temp stage + COPY INTO → kill chain

[AUTONOMOUS ACTIONS TAKEN]
✓ Session terminated (T+12h 8m 0.612s)
✓ Credentials force-rotated (47 accounts)
✓ MFA enforcement applied org-wide
✓ Temp stages dropped (590M records secured)
✓ Network allow-list locked to corp IPs
✓ Legal evidence package generated
✓ SIEM alert dispatched (INC-20241104-0091)
✓ Compliance flags raised: NYDFS §500.17

[VERDICT]
0 bytes exfiltrated · 0 analysts required
$0 ransom · $0 breach cost
Full forensic chain preserved`;

export default function AIAnalyst() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const step = () => {
      if (i >= ANALYSIS.length) { setDone(true); return; }
      // fast-stream: add 3-5 chars per frame
      const chunk = ANALYSIS.slice(i, i + 4);
      setDisplayed(prev => prev + chunk);
      i += 4;
      setTimeout(step, 18);
    };
    const id = setTimeout(step, 800);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="bg-black/60 border border-white/5 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" style={{ boxShadow: "0 0 6px #0D9488" }} />
        <h3 className="text-[9px] uppercase tracking-[0.18em] text-gray-500">AEGIS AI Analyst</h3>
        {done && (
          <span className="ml-auto text-[9px] text-emerald-400 font-mono bg-emerald-500/5 border border-emerald-500/15 px-2 py-0.5 rounded">
            ANALYSIS COMPLETE
          </span>
        )}
      </div>

      <div className="bg-black border border-white/5 rounded-xl p-4 min-h-[200px]">
        <pre className="text-[11px] text-gray-400 whitespace-pre-wrap font-mono leading-relaxed">
          {displayed}
          {!done && <span className="inline-block w-1.5 h-3.5 bg-teal-400 ml-0.5 align-middle" style={{ animation: "soc-blink 0.9s infinite" }} />}
        </pre>
      </div>

      <style>{`@keyframes soc-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
