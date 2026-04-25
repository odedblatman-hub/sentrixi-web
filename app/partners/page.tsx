"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Handshake, Cloud, Code } from "lucide-react";

const PROGRAMS = [
  { title: "Database Vendors", desc: "Embed AEGIS natively into your platform as a white-label security layer.", icon: <Handshake className="w-6 h-6 text-cyan-400" /> },
  { title: "Managed Services", desc: "Enhance your SOC with autonomous detection and response agents.", icon: <Cloud className="w-6 h-6 text-cyan-400" /> },
  { title: "DevSecOps", desc: "Build on the AEGIS API to create custom security workflows.", icon: <Code className="w-6 h-6 text-cyan-400" /> },
]

export default function PartnersPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-8">Ecosystem</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Strategic Partners</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            We partner with the world&apos;s leading database vendors and security operations centers 
            to redefine real-time protection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {PROGRAMS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-white/10 rounded-[32px] bg-white/5 backdrop-blur-sm text-left group hover:border-cyan-400/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-40 p-12 border border-white/5 bg-white/2 rounded-[40px] max-w-4xl mx-auto"
        >
            <h2 className="text-2xl font-bold mb-6">Interested in partnering?</h2>
            <p className="text-gray-400 mb-8">Join the elite network of companies securing the world&apos;s real-time data.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-cyan-400 transition-colors">
                Contact Partnership Team
            </button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
