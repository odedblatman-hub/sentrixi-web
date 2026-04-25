"use client";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toTimeString().slice(0, 8));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-12 border-b border-white/5 flex items-center justify-between px-5 bg-black/80 flex-shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-[10px] text-gray-500 font-mono">NODE_ALPHA_04</span>
        <span className="text-gray-700">|</span>
        <span className="text-[10px] text-gray-600">UNC5537 · Active Investigation</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] font-mono text-red-400 font-bold tracking-wider">1 P0 ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 5px #10B981" }} />
          <span className="text-[10px] font-mono text-emerald-400 tracking-wider">AEGIS RUNNING</span>
        </div>
        <span className="text-[10px] font-mono text-gray-600">{time}</span>
      </div>
    </div>
  );
}
