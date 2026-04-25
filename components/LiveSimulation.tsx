'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react'

const ANOMALIES = [
  "DETECT::Lateral_Movement [Node_44]",
  "IDENT::Unusual_Volume [S3_Bucket_2]",
  "QUERY::Semantic_Drift [SQL_Engine_B]",
  "EGRESS::Block_List_IP [192.168.1.104]",
  "AUTH::Credential_Stuffing [App_Auth]"
]

export default function LiveSimulation() {
  const [activeAnomalies, setActiveAnomalies] = useState<string[]>([])
  const [stats, setStats] = useState({ events: 12400, threats: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAnomaly = ANOMALIES[Math.floor(Math.random() * ANOMALIES.length)]
        setActiveAnomalies(prev => [newAnomaly, ...prev].slice(0, 5))
        setStats(s => ({ ...s, threats: s.threats + 1 }))
      }
      setStats(s => ({ ...s, events: s.events + Math.floor(Math.random() * 100) }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-40 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Live System Telemetry
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8">Continuous AI <br /> <span className="text-cyan-400 italic">Vigilance.</span></h2>
            <p className="text-gray-400 max-w-lg leading-relaxed mb-12 font-light">
              AEGIS doesn&apos;t sleep. It processes millions of events per second across your entire 
              data substrate, identifying micro-anomalies before they coalesce into security incidents.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.events.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Events/Sec</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-red-500 mb-1">{stats.threats}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Anomalies Contained</div>
                </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full" />
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 relative z-10 backdrop-blur-md overflow-hidden min-h-[400px]">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Global Stream</span>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {activeAnomalies.map((item, i) => (
                            <motion.div
                                key={item + i}
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-red-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-xs font-mono text-gray-300">{item}</span>
                                </div>
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Contained</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent pt-20">
                    <div className="flex gap-1">
                        {[...Array(20)].map((_, i) => (
                            <motion.div 
                                key={i}
                                animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                                className="flex-1 bg-cyan-500/20 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
