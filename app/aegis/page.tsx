"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";

const FEATURES = [
  { title: "Behavioral Analysis", desc: "Sub-millisecond detection of semantic query deviation.", icon: <Eye className="w-6 h-6 text-cyan-400" /> },
  { title: "Active Containment", desc: "Autonomous session revocation and token invalidation.", icon: <Lock className="w-6 h-6 text-cyan-400" /> },
  { title: "Sovereign Intelligence", desc: "Private, air-gapped AI agents that never leak data.", icon: <Shield className="w-6 h-6 text-cyan-400" /> },
]

export default function AegisPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-8">Platform Specification</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">AEGIS Platform</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            A multi-agent autonomous security layer designed specifically for high-concurrency 
            HTAP and Vector databases.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-white/10 rounded-[32px] bg-white/5 backdrop-blur-sm text-left group hover:border-cyan-400/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
