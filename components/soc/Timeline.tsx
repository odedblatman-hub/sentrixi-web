'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Timeline() {
  const [events, setEvents] = useState<string[]>([])

  useEffect(() => {
    const steps = [
      "User login anomaly from unusual IP",
      "Database query volume spike detected",
      "Lateral movement attempt toward 'Salaries' table",
      "Threat classified: Insider Compromise",
      "Autonomous access revocation completed"
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) {
        setEvents(prev => [...prev, steps[i]])
        i++
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">

      <h3 className="mb-6 font-bold text-xs uppercase tracking-[0.2em] text-gray-500">Attack Reconstruction</h3>

      <div className="space-y-4">
        {events.map((e,i)=>(
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 items-start"
          >
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] flex-shrink-0" />
            <div className="border border-white/10 bg-white/5 p-3 rounded-xl flex-1 text-sm text-gray-300">
                <div className="text-[10px] text-gray-500 font-mono mb-1">T+{(i*2).toFixed(1)}s</div>
                {e}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
