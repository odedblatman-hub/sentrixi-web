"use client";

export default function Agents() {
  const agents = [
    { name: "Identity Agent", status: "Active", load: "12%", uptime: "99.99%", desc: "Monitoring credential usage and anomalies." },
    { name: "Database Agent", status: "Active", load: "24%", uptime: "100%", desc: "Scanning SQL patterns for injection or mass-reads." },
    { name: "Network Agent", status: "Active", load: "8%", uptime: "99.98%", desc: "Analyzing packet headers and egress patterns." },
    { name: "Cloud Agent", status: "Active", load: "15%", uptime: "99.99%", desc: "Integrating with AWS CloudTrail and GuardDuty." },
    { name: "Endpoint Agent", status: "Active", load: "32%", uptime: "99.95%", desc: "Heuristic monitoring on production servers." },
    { name: "Storage Agent", status: "Active", load: "5%", uptime: "100%", desc: "Monitoring S3 bucket permissions and access." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Agent Fleet Coverage</h3>
        <button className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-xs">Deploy New Agent</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((a, i) => (
          <div key={i} className="border border-gray-800 p-4 rounded-xl bg-black/40 hover:border-gray-600 transition-all group">
            <div className="flex justify-between items-start mb-3">
                <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{a.name}</div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-[10px] text-green-500 uppercase font-bold tracking-widest">{a.status}</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mb-4 h-8">{a.desc}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800/50">
                <div>
                    <div className="text-[10px] text-gray-600 uppercase tracking-widest">Load</div>
                    <div className="text-sm font-mono text-gray-300">{a.load}</div>
                </div>
                <div>
                    <div className="text-[10px] text-gray-600 uppercase tracking-widest">Uptime</div>
                    <div className="text-sm font-mono text-gray-300">{a.uptime}</div>
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-gray-800 rounded-xl bg-black/20 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl">🛡️</div>
              <div>
                  <div className="text-white font-medium">Auto-Scaling Fleet</div>
                  <div className="text-sm text-gray-500">AEGIS is automatically managing 30 micro-agents across your infrastructure.</div>
              </div>
          </div>
          <div className="h-2 w-48 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[100%]"></div>
          </div>
      </div>
    </div>
  );
}
