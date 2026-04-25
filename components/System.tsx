'use client'
import { motion } from 'framer-motion'
import { Database, Cpu, ShieldAlert } from 'lucide-react'

const LAYERS = [
  { 
    id: 'ingest', 
    name: 'Unified Ingestion', 
    icon: <Database className="w-6 h-6" />, 
    desc: 'Database patterns, identity logs, and network telemetry.',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'reason', 
    name: 'AI Reasoning', 
    icon: <Cpu className="w-6 h-6" />, 
    desc: 'Multi-agent correlation and behavioral anomaly scoring.',
    color: 'from-cyan-500 to-teal-500'
  },
  { 
    id: 'action', 
    name: 'Active Containment', 
    icon: <ShieldAlert className="w-6 h-6" />, 
    desc: 'Sub-millisecond access revocation and token invalidation.',
    color: 'from-teal-500 to-emerald-500'
  }
]

export default function System() {
  return (
    <section className="py-40 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Autonomous Architecture</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">AEGIS operates as a continuous cognitive loop, moving from raw telemetry to autonomous response without human intervention.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-1/2 hidden md:block" />
          
          {LAYERS.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${layer.color} p-px flex items-center justify-center relative z-10`}>
                <div className="w-full h-full bg-black rounded-[23px] flex items-center justify-center text-white group-hover:scale-95 transition-transform duration-300">
                  {layer.icon}
                </div>
                {/* Animated Ring */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${layer.color} opacity-20 blur-xl group-hover:opacity-60 transition-opacity duration-300`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{layer.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{layer.desc}</p>

              {/* Data Flow Pulse */}
              {index < LAYERS.length - 1 && (
                <div className="absolute top-10 -right-6 w-12 hidden md:flex items-center justify-center z-20">
                    <motion.div
                        animate={{ x: [0, 40], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-1 h-1 rounded-full bg-cyan-400"
                    />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
