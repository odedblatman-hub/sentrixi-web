'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Alerts() {
  const [alerts, setAlerts] = useState<string[]>([
    "Initial baseline verification",
    "Monitoring data plane egress"
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = "Anomaly detected in DB access pattern"
      setAlerts(prev => [newAlert, ...prev.slice(0,4)])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black/50 border border-white/5 rounded-xl p-5 backdrop-blur-sm">

      <h3 className="mb-4 font-bold text-xs uppercase tracking-[0.2em] text-gray-500">Live Alerts</h3>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
            {alerts.map((a,i)=>(
            <motion.div 
                key={i + a}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-l-2 border-red-500/50 bg-red-500/5 p-3 rounded-r-lg text-sm text-gray-300"
            >
                <div className="text-[10px] text-red-400 font-mono mb-1 uppercase tracking-widest">Critical</div>
                {a}
            </motion.div>
            ))}
        </AnimatePresence>
      </div>

    </div>
  )
}
