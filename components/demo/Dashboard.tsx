"use client";
import { useDemoStore } from "@/store/demoStore";

interface DashboardProps {
  setView: (view: string) => void;
}

export default function Dashboard({ setView }: DashboardProps) {
  const setIncident = useDemoStore((s) => s.setIncident);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KPI title="Events/sec" value="12,847" />
        <KPI title="Latency" value="14ms" />
        <KPI title="Active Threats" value="1" red />
        <KPI title="Agent Coverage" value="100%" />
      </div>

      <div className="border border-gray-800 rounded-xl overflow-hidden bg-black/40">
        <div className="p-4 border-b border-gray-800 font-medium text-white bg-white/5">Real-time Security Alerts</div>

        <div
          onClick={() => {
            setIncident("inc-1");
            setView("incidents");
          }}
          className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center group"
        >
          <div className="flex flex-col">
            <span className="text-white group-hover:text-red-400 transition-colors">Data Exfiltration Pattern Detected</span>
            <span className="text-xs text-gray-500">Source: IP 192.168.1.104 • Destination: External (unverified)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 uppercase font-bold tracking-tighter">Critical</span>
            <span className="text-gray-600 text-xs">2 min ago</span>
          </div>
        </div>

        <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center border-t border-gray-800 opacity-60">
          <div className="flex flex-col">
            <span className="text-white">Unusual Login Attempt</span>
            <span className="text-xs text-gray-500">Source: User admin_ext • Location: Amsterdam, NL</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase font-bold tracking-tighter">Medium</span>
            <span className="text-gray-600 text-xs">15 min ago</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 border border-gray-800 rounded-xl bg-black/20 p-4 relative overflow-hidden">
             <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Network Flow</div>
             <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1 h-12">
                {[40, 60, 45, 90, 65, 30, 80, 50, 40, 70, 85, 45, 60, 95, 30].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm" style={{height: `${h}%`}}></div>
                ))}
             </div>
        </div>
        <div className="h-32 border border-gray-800 rounded-xl bg-black/20 p-4 relative overflow-hidden">
             <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">CPU Utilization</div>
             <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1 h-12">
                {[20, 25, 22, 30, 28, 25, 35, 32, 30, 28, 30, 35, 40, 38, 35].map((h, i) => (
                    <div key={i} className="flex-1 bg-green-500/20 rounded-t-sm" style={{height: `${h}%`}}></div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
}

interface KPIProps {
  title: string;
  value: string;
  red?: boolean;
}

function KPI({ title, value, red }: KPIProps) {
  return (
    <div className="p-4 border border-gray-800 rounded-xl bg-black/40">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{title}</div>
      <div className={`text-2xl font-semibold ${red ? "text-red-500" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}
