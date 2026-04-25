"use client";
import { useDemoStore } from "@/store/demoStore";

interface IncidentsProps {
  setView: (view: string) => void;
}

export default function Incidents({ setView }: IncidentsProps) {
  const selected = useDemoStore((s) => s.selectedIncident);

  if (!selected) return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
        <div className="w-16 h-16 border-2 border-dashed border-gray-800 rounded-full flex items-center justify-center">
            <span className="text-2xl">?</span>
        </div>
        <p>Select an incident from the dashboard to investigate.</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
            <h3 className="text-2xl font-bold text-white mb-2">
                Incident #2024-0424: Data Exfiltration
            </h3>
            <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-500 border border-red-500/30 uppercase font-bold tracking-tighter">Critical</span>
                <span className="text-xs text-gray-500 font-mono italic">Source: user_jdoe_production</span>
            </div>
        </div>
        <div className="bg-white/5 border border-gray-800 p-3 rounded-lg text-right">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Time to Detect</div>
            <div className="text-lg font-mono text-green-400">42ms</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Behavioral Analysis</h4>
            <div className="space-y-3">
                <TimelineItem status="critical" text="Valid credentials used from unusual IP (192.168.1.104)" />
                <TimelineItem status="warning" text="Query volume deviation (300% above baseline)" />
                <TimelineItem status="critical" text="Access to encrypted &apos;Customer_PII&apos; table" />
                <TimelineItem status="warning" text="External egress attempt detected and intercepted" />
            </div>
        </div>
        <div className="bg-black/40 border border-gray-800 rounded-xl p-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">AEGIS Guardian Insights</h4>
            <p className="text-sm text-gray-400 leading-relaxed italic">
                &quot;The pattern suggests a &apos;Living off the Land&apos; attack. The attacker is using legitimate system tools to bypass traditional signature-based detection. AEGIS identified the semantic anomaly in the query structure before any data left the perimeter.&quot;
            </p>
            <div className="mt-6 p-3 bg-red-500/5 border border-red-500/20 rounded text-xs text-red-400">
                Recommendation: Immediate session termination and credential rotation.
            </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-800">
          <button
            onClick={() => setView("response")}
            className="flex-1 px-6 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Launch Response Console
          </button>
          <button className="px-6 py-4 bg-gray-900 text-white border border-gray-800 rounded-xl font-bold hover:bg-gray-800 transition-colors">
            Export Forensic Report
          </button>
      </div>
    </div>
  );
}

interface TimelineItemProps {
    status: 'critical' | 'warning';
    text: string;
}

function TimelineItem({ status, text }: TimelineItemProps) {
    return (
        <div className="flex gap-3 items-start">
            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            <div className="text-sm text-gray-300">{text}</div>
        </div>
    )
}
