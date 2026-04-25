"use client";
import { useState, useEffect } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const dur = 1400;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(id);
  }, [target]);
  return <>{val.toLocaleString()}{suffix}</>;
}

const STATS = [
  { label: "Records Protected", value: 590000000, display: null, suffix: "", unit: "this session", color: "#0D9488" },
  { label: "Mean Detection", value: null, display: "612ms", suffix: "", unit: "vs 40-day industry avg", color: "#00d4ff" },
  { label: "Autonomous Actions", value: 8, display: null, suffix: "", unit: "zero analyst input", color: "#a78bfa" },
  { label: "Agents Active", value: 30, display: null, suffix: "+", unit: "MITRE ATT&CK mapped", color: "#f59e0b" },
];

export default function Overview() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {STATS.map((s) => (
        <div key={s.label} className="bg-black/60 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
          <div className="text-[9px] uppercase tracking-[0.18em] text-gray-500 mb-2">{s.label}</div>
          <div className="text-2xl font-bold tracking-tight mb-1" style={{ color: s.color, fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontWeight: 400 }}>
            {s.display ? s.display : <Counter target={s.value!} suffix={s.suffix} />}
          </div>
          <div className="text-[10px] text-gray-600">{s.unit}</div>
        </div>
      ))}
    </div>
  );
}
