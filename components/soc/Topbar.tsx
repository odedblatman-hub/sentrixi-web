"use client";

export default function Topbar() {
  return (
    <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black">

      <div className="text-sm text-gray-400">
        Autonomous Security Intelligence <span className="mx-2 text-gray-600">|</span> <span className="text-xs font-mono">NODE_ALPHA_04</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <div className="text-green-400 text-xs font-bold tracking-widest uppercase">System Active</div>
        </div>
      </div>

    </div>
  )
}
