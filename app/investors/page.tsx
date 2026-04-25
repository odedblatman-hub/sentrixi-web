"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Globe } from "lucide-react";

const METRICS = [
  { label: "TAM Potential", value: "$45B+", icon: <Globe className="w-5 h-5 text-cyan-400" /> },
  { label: "Cost Reduction", value: "70%", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
  { label: "Detection Latency", value: "<20ms", icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
  { label: "ARR Efficiency", value: "2.4x", icon: <ShieldCheck className="w-5 h-5 text-blue-400" /> },
]

export default function InvestorsPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-8">
              The Security <br />
              <span className="text-cyan-400 italic">Alpha.</span>
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg mb-12">
              Security is no longer a cost center. For database vendors and enterprise platforms, 
              AEGIS is the primary driver of consumption and sales velocity.
            </p>
            <button className="bg-cyan-400 text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Access Data Room
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
              >
                <div className="mb-4">{m.icon}</div>
                <div className="text-3xl font-bold mb-1">{m.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Competitive Architecture */}
        <div className="mb-40">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">Why We Win</h2>
            <div className="w-12 h-1 bg-cyan-400 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature title="Sub-Millisecond Edge" desc="Traditional SIEMs have minutes of latency. AEGIS operates at the speed of the CPU." />
            <Feature title="Zero-ETL Native" desc="We don't move data. We live inside the data substrate, eliminating the largest security cost." />
            <Feature title="Autonomous Agency" desc="30+ specialized AI agents replacing 15-person SOC teams with zero fatigue." />
          </div>
        </div>

        {/* Market Context */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/20 rounded-[40px] p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold tracking-tighter mb-6">Database-Native Security is the New Standard</h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        The market is shifting from external security tools to embedded intelligence. 
                        Database vendors who don&apos;t own the security layer will be relegated to commodity status. 
                        AEGIS provides the white-label sovereign intelligence layer for the next generation of HTAP platforms.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-bold italic">S1</div>
                        <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-bold italic">S2</div>
                        <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-bold italic">S3</div>
                    </div>
                </div>
                <div className="h-64 border border-white/10 rounded-2xl bg-black/40 flex items-center justify-center relative overflow-hidden group">
                    <div className="text-cyan-400/20 text-8xl font-black absolute">ALPHA</div>
                    <div className="relative z-10 text-center">
                        <div className="text-cyan-400 text-sm font-mono tracking-[0.4em] mb-2 uppercase">Core Valuation</div>
                        <div className="text-white text-5xl font-bold">$280M+</div>
                    </div>
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute inset-0 bg-cyan-400 rounded-full blur-[100px]" 
                    />
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Feature({ title, desc }: any) {
  return (
    <div className="p-10 border border-white/10 rounded-3xl bg-white/5 hover:border-cyan-400/50 transition-colors duration-500">
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
