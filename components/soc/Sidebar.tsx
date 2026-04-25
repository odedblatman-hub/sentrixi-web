"use client";
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-black border-r border-white/5 p-4 flex flex-col h-full">

      <div className="text-lg font-semibold mb-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400" />
        AEGIS
      </div>

      <nav className="space-y-3 text-sm text-gray-400 flex-1">
        <div className="text-white bg-white/5 px-3 py-2 rounded-lg cursor-pointer">Dashboard</div>
        <div className="px-3 py-2 hover:text-white cursor-pointer transition-colors">Threats</div>
        <div className="px-3 py-2 hover:text-white cursor-pointer transition-colors">Telemetry</div>
        <div className="px-3 py-2 hover:text-white cursor-pointer transition-colors">Investigations</div>
        <div className="px-3 py-2 hover:text-white cursor-pointer transition-colors">Settings</div>
      </nav>

      <Link href="/research-area" className="text-xs text-gray-500 hover:text-cyan-400 mt-auto pt-4 border-t border-white/5">
        ← Back to Research
      </Link>

    </div>
  )
}
