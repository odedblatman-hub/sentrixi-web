'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const REASONING = [
  "Detecting semantic deviation in SQL access pattern.",
  "Cross-correlating with Identity Provider (Okta) behavioral baseline.",
  "Confirmed: Credential misuse detected via IP-Geographic anomaly.",
  "Deploying AEGIS Response Agent to source endpoint.",
  "Access tokens invalidated. Incident contained."
]

const LOGS = [
  "SYSTEM::BOOT_READY",
  "IDENT::PROBE_ACTIVE -> user_jdoe",
  "DB::QUERY_INTERCEPTED -> SELECT * FROM salaries",
  "ANOMALY::ENTROPY_HIGH [0.98]",
  "GUARDIAN::DECISION_REVOKE -> session_992",
  "CORE::STABLE"
]

export default function AttackDemo() {
  const [activeStep, setActiveStep] = useState(-1)
  const [isSimulating, setIsSimulating] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  
  const runSimulation = async () => {
    setIsSimulating(true)
    setActiveStep(0)
    setLogs([])

    for (let i = 0; i < REASONING.length; i++) {
      await new Promise(r => setTimeout(r, 1200))
      setActiveStep(i + 1)
      setLogs(prev => [...prev, LOGS[i % LOGS.length]])
    }
    
    await new Promise(r => setTimeout(r, 1000))
    setIsSimulating(false)
  }

  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-bold tracking-[0.3em] text-xs uppercase mb-4"
          >
            Live Performance
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Attack Simulation & <br />
            <span className="italic font-light text-gray-500">Autonomous Containment</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Decision Reasoning */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Guardian Reasoning Panel</h3>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-cyan-400 animate-pulse' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {REASONING.map((text, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-1 self-stretch rounded-full transition-colors duration-500 ${activeStep >= i ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/10'}`} />
                  <div className={`py-1 transition-all duration-500 ${activeStep === i ? 'text-white' : activeStep > i ? 'text-gray-500' : 'text-white/10'}`}>
                    <div className="text-[10px] font-mono mb-1 opacity-50">STEP 0{i+1}</div>
                    <p className="text-sm font-medium">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-cyan-400"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(Math.max(0, activeStep) / REASONING.length) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                    <span>Threat Detection</span>
                    <span>Neutralized</span>
                </div>
            </div>
          </div>

          {/* Right: Log Stream */}
          <div className="bg-black border border-white/10 rounded-3xl p-6 font-mono text-[11px] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-gray-500">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <span>AEGIS_LOGS_v2.4</span>
            </div>
            
            <div className="flex-1 space-y-3">
                <AnimatePresence mode="popLayout">
                    {logs.map((l, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3 border-l border-white/5 pl-3"
                        >
                            <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                            <span className={l.includes('ANOMALY') || l.includes('REVOKE') ? 'text-cyan-400' : 'text-gray-400'}>{l}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <button 
                onClick={runSimulation}
                disabled={isSimulating}
                className={`mt-10 w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 ${isSimulating ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-cyan-400 text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.2)]'}`}
            >
                {isSimulating ? 'Simulation in Progress' : 'Run Attack Simulation'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
