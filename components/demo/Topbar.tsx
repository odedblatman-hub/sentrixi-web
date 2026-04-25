"use client";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-800 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span>System Status: Operational</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Global Network Traffic: 1.2 GB/s</span>
        <span className="font-mono">{time.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
