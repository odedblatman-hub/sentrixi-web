'use client';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Overview from './Overview';
import Alerts from './Alerts';
import Timeline from './Timeline';
import AIAnalyst from './AIAnalyst';

export default function SOCDemo() {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#050505] shadow-2xl shadow-black/50">
      <style>{`
        .soc-scrollbar::-webkit-scrollbar { width: 4px; }
        .soc-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .soc-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>

      <div className="flex h-[680px]">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />

          <div className="grid grid-cols-12 gap-4 p-6 flex-1 overflow-hidden">
            <div className="col-span-8 space-y-4 overflow-y-auto pr-2 soc-scrollbar">
              <Overview />
              <Timeline />
            </div>
            <div className="col-span-4 space-y-4 overflow-y-auto pr-2 soc-scrollbar">
              <Alerts />
              <AIAnalyst />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
