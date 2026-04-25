"use client";
import { useEffect, useState } from "react";

const EVENTS = [
  { ts: "T − weeks", type: "ATTACKER", label: "Infostealer malware on contractor devices", detail: "Lumma Stealer · credentials stored in Jira unencrypted", mitre: "T1589.001", color: "#DC2626" },
  { ts: "T + 0s", type: "AEGIS", label: "Dark Web Intel Agent activated", detail: "47 active Snowflake credentials matched in leaked dumps", mitre: "T1552", color: "#0D9488" },
  { ts: "T + 12h 0.340s", type: "AEGIS", label: "Anomalous auth — CRITICAL", detail: "Mullvad VPN · new device · no MFA · exposed credential", mitre: "T1078", color: "#0D9488" },
  { ts: "T + 12h 3m 0.180s", type: "AEGIS", label: "SQL recon 94× behavioral baseline", detail: "FROSTBITE tool · SHOW USERS / SHOW SCHEMAS in bulk", mitre: "T1087", color: "#0D9488" },
  { ts: "T + 12h 8m 0.410s", type: "KILL CHAIN", label: "UNC5537 campaign matched — P0", detail: "Kill Chain Engine · confidence 0.94 · TA0001–TA0010", mitre: "TA0001–TA0010", color: "#f59e0b" },
  { ts: "T + 12h 8m 0.612s", type: "GUARDIAN", label: "Autonomous containment complete", detail: "Session killed · creds rotated · temp stages dropped · MFA enforced", mitre: "", color: "#10B981" },
];

const TYPE_COLORS: Record<string, string> = {
  ATTACKER: "text-red-400 border-red-500/30 bg-red-500/5",
  AEGIS: "text-teal-400 border-teal-500/30 bg-teal-500/5",
  "KILL CHAIN": "text-amber-400 border-amber-500/30 bg-amber-500/5",
  GUARDIAN: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
};

export default function Timeline() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= EVENTS.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), visible === 0 ? 400 : 900);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="bg-black/60 border border-white/5 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[9px] uppercase tracking-[0.18em] text-gray-500">Attack Reconstruction · UNC5537</h3>
        <div className="text-[9px] font-mono text-teal-500/70 bg-teal-500/5 border border-teal-500/10 px-2 py-0.5 rounded">LIVE</div>
      </div>

      <div className="space-y-3">
        {EVENTS.slice(0, visible).map((e, i) => (
          <div key={i} className="flex gap-3 items-start" style={{ animation: "soc-slideIn 0.35s ease both" }}>
            <div className="flex flex-col items-center mt-1 flex-shrink-0">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color, boxShadow: `0 0 6px ${e.color}80` }} />
              {i < visible - 1 && <div className="w-px flex-1 mt-1" style={{ background: `${e.color}20`, minHeight: "12px" }} />}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[9px] font-mono text-gray-600">{e.ts}</span>
                <span className={`text-[9px] font-bold tracking-[0.1em] px-1.5 py-0.5 rounded border ${TYPE_COLORS[e.type] || "text-gray-400"}`}>{e.type}</span>
                {e.mitre && <span className="text-[9px] font-mono text-gray-600 bg-white/3 border border-white/5 px-1.5 py-0.5 rounded">{e.mitre}</span>}
              </div>
              <div className="text-xs text-gray-200 font-medium mb-0.5">{e.label}</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">{e.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes soc-slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:none; } }`}</style>
    </div>
  );
}
