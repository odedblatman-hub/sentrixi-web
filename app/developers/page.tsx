"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function DevelopersPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="border-l-2 border-cyan-500 pl-8 py-2">
            <h1 className="text-5xl font-bold tracking-tight mb-4">Architectural Vision</h1>
            <p className="text-xl text-gray-400 font-light">Autonomous Security Intelligence: The AEGIS Specification</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-20">
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">The Challenge</h2>
              <p className="text-gray-400 leading-relaxed">
                Traditional security models rely on reactive pattern matching and human intervention. As data velocity 
                exceeds human processing capacity, the &quot;latency gap&quot; becomes the primary vector for exploitation.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">The Solution</h2>
              <p className="text-gray-400 leading-relaxed">
                AEGIS implements a multi-agent system that operates within the database layer, executing behavioral 
                detection and forensic reconstruction in sub-20ms windows.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 font-mono text-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">AEGIS-CORE</div>
            <h3 className="text-white mb-6 font-bold uppercase tracking-tighter">System Manifesto</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-4">
                <span className="text-cyan-500">[01]</span>
                <span>Replace simple particle systems with dynamic network graphs (nodes + connections).</span>
              </li>
              <li className="flex gap-4">
                <span className="text-cyan-500">[02]</span>
                <span>Implement global motion systems for section reveals and scroll transitions.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-cyan-500">[03]</span>
                <span>Deepen attack simulations with decision reasoning panels and LLM-simulated output.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-cyan-500">[04]</span>
                <span>Convert system diagrams into live data flows moving between cognitive layers.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-cyan-500">[05]</span>
                <span>Scale investor intelligence through ARR potential metrics and competitive architecture.</span>
              </li>
            </ul>
          </div>

          <div className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-8 italic">&quot;Security is no longer a human-scale problem.&quot;</h2>
            <div className="w-12 h-1 bg-cyan-500 mx-auto" />
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
