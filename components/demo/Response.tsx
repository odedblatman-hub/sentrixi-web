"use client";

import { useState } from "react";

export default function Response() {
  const [logs, setLogs] = useState([
    { time: "14:22:01", action: "AEGIS_INIT", msg: "Incident #2024-0424 response sequence started." },
    { time: "14:22:02", action: "SESSION_FLAG", msg: "Session user_jdoe_production tagged for deep inspection." },
    { time: "14:22:03", action: "SOC_NOTIFY", msg: "Alert transmitted to Security Operations Center via PagerDuty." },
  ]);

  const [executing, setExecuting] = useState(false);

  const runRemediation = () => {
    setExecuting(true);
    setTimeout(() => {
        setLogs(prev => [
            ...prev,
            { time: "14:24:45", action: "RESTRICT_ACC", msg: "Access policy 'ZERO_TRUST_LOCK' applied to source IP." },
            { time: "14:24:46", action: "SESSION_KILL", msg: "Active tokens invalidated. Connection terminated." }
        ]);
        setExecuting(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      <div className="col-span-2 space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white font-mono tracking-tight underline decoration-red-500/50 underline-offset-8">Response Console</h3>
            <div className="text-[10px] text-gray-500 font-mono tracking-widest">ENCRYPTION: AES-256-GCM</div>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-4 font-mono text-xs overflow-auto h-[400px] shadow-inner shadow-white/5">
            {logs.map((log, i) => (
                <div key={i} className="mb-2 flex gap-4">
                    <span className="text-gray-600">[{log.time}]</span>
                    <span className="text-blue-500 w-24">[{log.action}]</span>
                    <span className="text-gray-300">{log.msg}</span>
                </div>
            ))}
            {executing && (
                <div className="animate-pulse text-green-500">_ EXECUTING REMEDIATION SEQUENCE...</div>
            )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recommended Actions</h4>
        
        <ActionCard 
            title="Isolate Session" 
            desc="Immediately terminate all active connections for this user."
            status="Recommended"
            onClick={runRemediation}
            disabled={executing}
        />

        <ActionCard 
            title="Rotate API Keys" 
            desc="Invalidate current secrets and trigger auto-rotation."
            status="Ready"
            disabled={executing}
        />

        <ActionCard 
            title="Snapshot Evidence" 
            desc="Create forensic copy of the accessed DB volumes."
            status="Completed"
            disabled={true}
        />

        <div className="p-4 border border-dashed border-gray-800 rounded-xl text-center">
            <p className="text-[10px] text-gray-600">Additional actions are determined by AEGIS Guardian AI based on real-time threat evolution.</p>
        </div>
      </div>
    </div>
  );
}

interface ActionCardProps {
    title: string;
    desc: string;
    status: string;
    onClick?: () => void;
    disabled: boolean;
}

function ActionCard({ title, desc, status, onClick, disabled }: ActionCardProps) {
  return (
    <div 
        onClick={!disabled ? onClick : undefined}
        className={`p-4 border border-gray-800 rounded-xl transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-red-500/50 cursor-pointer bg-white/5'}`}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="font-semibold text-white text-sm">{title}</div>
        <div className={`text-[10px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded ${status === 'Recommended' ? 'bg-red-500/10 text-red-500' : 'bg-gray-800 text-gray-400'}`}>
            {status}
        </div>
      </div>
      <p className="text-[11px] text-gray-500 leading-tight">{desc}</p>
    </div>
  );
}
