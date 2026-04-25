'use client'

import Sidebar from '@/components/soc/Sidebar'
import Topbar from '@/components/soc/Topbar'
import Overview from '@/components/soc/Overview'
import Alerts from '@/components/soc/Alerts'
import Timeline from '@/components/soc/Timeline'
import AIAnalyst from '@/components/soc/AIAnalyst'

export default function SOC() {
  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">

      <Sidebar />

      <div className="flex-1 flex flex-col h-full">

        <Topbar />

        <div className="grid grid-cols-12 gap-4 p-6 flex-1 overflow-hidden">

          <div className="col-span-8 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            <Overview />
            <Timeline />
          </div>

          <div className="col-span-4 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            <Alerts />
            <AIAnalyst />
          </div>

        </div>

      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}
