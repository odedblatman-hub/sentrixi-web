'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

type Step = {
  id: number
  title: string
  description: string
  status: 'idle' | 'active' | 'done'
}

const initialSteps: Step[] = [
  { id: 1, title: 'User Behavior Anomaly', description: 'Unusual database query pattern detected', status: 'idle' },
  { id: 2, title: 'Signal Correlation', description: 'Cross-source anomaly correlation (identity + DB)', status: 'idle' },
  { id: 3, title: 'Threat Classification', description: 'Insider threat pattern identified', status: 'idle' },
  { id: 4, title: 'Autonomous Response', description: 'Session terminated, access revoked', status: 'idle' },
]

function ResearchAttackDemo() {
  const [steps, setSteps] = useState(initialSteps)
  const [running, setRunning] = useState(false)

  const runSimulation = async () => {
    if (running) return
    setRunning(true)

    for (let i = 0; i < steps.length; i++) {
      setSteps(prev =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: 'active' } : s
        )
      )

      await new Promise(r => setTimeout(r, 1200))

      setSteps(prev =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: 'done' } : s
        )
      )
    }

    setRunning(false)
  }

  return (
    <section className="py-24 bg-black/50 border border-white/5 rounded-[40px] overflow-hidden relative">
      <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <h2 className="text-3xl md:text-5xl font-bold text-center tracking-tighter mb-4">
          Autonomous Attack Simulation
        </h2>
        <p className="text-gray-500 text-center mb-12 font-light">Witness the AEGIS decision engine in a controlled exploit scenario.</p>

        <div className="flex justify-center mb-16">
          <button
            onClick={runSimulation}
            disabled={running}
            className="bg-cyan-400 text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-wait"
          >
            {running ? "Simulation Active" : "Execute Breach Scenario"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Timeline */}
          <div className="space-y-4">
            {steps.map(step => (
              <motion.div
                key={step.id}
                animate={{ opacity: step.status === 'idle' ? 0.3 : 1, x: step.status === 'active' ? 10 : 0 }}
                className={`p-5 rounded-2xl border transition-colors duration-500 ${
                  step.status === 'active'
                    ? 'border-cyan-400 bg-cyan-400/5 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                    : step.status === 'done'
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-white/10 bg-white/2'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm uppercase tracking-tight">{step.title}</h3>
                    {step.status === 'done' && <span className="text-emerald-500 text-[10px] font-bold uppercase">Secured</span>}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* System Output */}
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 font-mono text-[11px] text-gray-400 shadow-inner">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <span className="text-gray-600 uppercase tracking-widest">AEGIS_KERNEL_OUTPUT</span>
            </div>
            {steps.map(step => (
              <div key={step.id} className="mb-3">
                {step.status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4"
                  >
                    <span className="text-gray-700">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                    <span className={step.status === 'active' ? 'text-cyan-400 animate-pulse' : 'text-emerald-500/80'}>
                        [{step.status.toUpperCase()}] {step.title}
                    </span>
                  </motion.div>
                )}
              </div>
            ))}
            {running && <div className="mt-4 text-cyan-400/50 animate-pulse">_ AWAITING NEXT SIGNAL...</div>}
            {!running && steps.every(s => s.status === 'done') && (
                <div className="mt-8 pt-4 border-t border-white/5 text-emerald-400">
                    SYSTEM_STATE: RECOVERED. THREAT_NEUTRALIZED.
                </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}

export default function ResearchPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Intelligence Reports
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Research & <br /> <span className="text-cyan-400 italic font-light">Validation.</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Deep dives into behavioral anomaly detection, multi-agent coordination, and 
            the future of autonomous security orchestration.
          </p>
        </motion.div>

        <ResearchAttackDemo />

        <div className="mt-40 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <h2 className="text-4xl font-bold tracking-tighter">The Live Platform <br /> <span className="text-gray-500">Operation Center.</span></h2>
                <p className="text-gray-400 leading-relaxed font-light">
                    Our Security Operations Center (SOC) is powered entirely by AEGIS Guardian agents. 
                    Explore the live telemetry stream, active investigations, and autonomous containment 
                    actions in our public demo environment.
                </p>
                <div className="pt-4">
                    <Link href="/soc" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition-all group">
                        Enter Live SOC Demo
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
            <div className="relative group">
                <div className="absolute inset-0 bg-cyan-400/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-2 overflow-hidden aspect-video relative z-10 shadow-2xl">
                    <div className="w-full h-full bg-black/40 rounded-[28px] flex items-center justify-center border border-white/5">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4 border border-cyan-400/20">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            </div>
                            <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">Public Instance: Active</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
