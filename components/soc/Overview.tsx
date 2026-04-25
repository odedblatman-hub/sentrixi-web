"use client";

export default function Overview() {
  return (
    <div className="grid grid-cols-3 gap-4">

      {[
        { label: 'Threats Detected', value: '12' },
        { label: 'Active Incidents', value: '3' },
        { label: 'Autonomous Actions', value: '27' },
      ].map((m) => (
        <div key={m.label} className="bg-black/50 border border-white/5 p-5 rounded-xl hover:border-cyan-400/30 transition-colors">
          <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">{m.label}</div>
          <div className="text-3xl mt-2 font-bold text-white tracking-tighter">{m.value}</div>
        </div>
      ))}

    </div>
  )
}
