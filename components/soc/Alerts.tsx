"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_ALERTS = [
  { id: "a1", sev: "P0", sevColor: "text-red-400 bg-red-500/10 border-red-500/25", title: "UNC5537 Campaign Detected", system: "prod-snowflake-01", mitre: "T1078 · T1552", status: "CONTAINED", statusColor: "text-emerald-400" },
  { id: "a2", sev: "P0", sevColor: "text-red-400 bg-red-500/10 border-red-500/25", title: "Credential Exfil via Dark Web IAB", system: "identity-store", mitre: "T1589.001", status: "MITIGATED", statusColor: "text-emerald-400" },
  { id: "a3", sev: "P1", sevColor: "text-amber-400 bg-amber-500/10 border-amber-500/25", title: "SQL Recon 94× Baseline", system: "warehouse-cluster", mitre: "T1087", status: "CONTAINED", statusColor: "text-emerald-400" },
  { id: "a4", sev: "P1", sevColor: "text-amber-400 bg-amber-500/10 border-amber-500/25", title: "Exfil Staging — COPY INTO + GZIP", system: "analytics-db", mitre: "T1074.002", status: "BLOCKED", statusColor: "text-emerald-400" },
  { id: "a5", sev: "P2", sevColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", title: "Auth from Mullvad VPN AS16276", system: "admin-portal", mitre: "T1078", status: "MONITORING", statusColor: "text-cyan-400" },
];

const NEW_ALERTS = [
  { id: "n1", sev: "P1", sevColor: "text-amber-400 bg-amber-500/10 border-amber-500/25", title: "MFA Bypass Attempt — Push Fatigue", system: "okta-tenant", mitre: "T1621", status: "BLOCKED", statusColor: "text-emerald-400" },
  { id: "n2", sev: "P2", sevColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", title: "Unusual OAuth Grant — Shadow App", system: "cloud-apps", mitre: "T1550.001", status: "MONITORING", statusColor: "text-cyan-400" },
  { id: "n3", sev: "P0", sevColor: "text-red-400 bg-red-500/10 border-red-500/25", title: "Temp Stage Creation — CRITICAL Session", system: "prod-snowflake-01", mitre: "T1074.002", status: "CONTAINED", statusColor: "text-emerald-400" },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(BASE_ALERTS);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => {
        const next = t + 1;
        const newAlert = NEW_ALERTS[(next - 1) % NEW_ALERTS.length];
        setAlerts(prev => [{ ...newAlert, id: `${newAlert.id}-${next}` }, ...prev.slice(0, 5)]);
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-black/60 border border-white/5 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[9px] uppercase tracking-[0.18em] text-gray-500">Live Alerts</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[9px] font-mono text-red-400">{alerts.filter(a => a.sev === "P0").length} CRITICAL</span>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {alerts.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-white/5 bg-white/2 rounded-lg p-3 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${a.sevColor}`}>{a.sev}</span>
                  <span className="text-xs text-gray-200 font-medium leading-tight">{a.title}</span>
                </div>
                <span className={`text-[9px] font-bold flex-shrink-0 ${a.statusColor}`}>{a.status}</span>
              </div>
              <div className="flex items-center gap-3 pl-0.5">
                <span className="text-[9px] font-mono text-gray-600">{a.system}</span>
                <span className="text-[9px] font-mono text-gray-700">{a.mitre}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
