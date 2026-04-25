'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AIAnalyst() {
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const runAnalysis = async () => {
    setLoading(true)
    setAnalysis(null)
    await new Promise(r => setTimeout(r, 1500))
    setAnalysis("Analyzing behavior patterns...\n\n[DETECT] Semantic SQL drift: 0.94 probability.\n[CORRELATE] User ID mapped to geographic anomaly.\n\nCONCLUSION: Active data exfiltration attempt. Access revoked. Tokens rotated.")
    setLoading(false)
  }

  return (
    <div className="bg-black/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">

      <h3 className="mb-6 font-bold text-xs uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        AEGIS AI Analyst
      </h3>

      <button
        onClick={runAnalysis}
        disabled={loading}
        className="w-full bg-cyan-400 text-black px-4 py-3 rounded-xl mb-6 font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-wait"
      >
        {loading ? "Processing..." : "Run Cognitive Analysis"}
      </button>

      <div className="bg-black border border-white/10 p-4 rounded-xl min-h-[140px]">
        <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono leading-relaxed">
            {analysis || "Awaiting signal stream for deep analysis..."}
        </pre>
      </div>

    </div>
  )
}
