'use client'
const PILLARS = [
  { title: 'Compliance-Native AI', desc: 'Automatic PII redaction and identity-aware filtering. Built for EU AI Act compliance.' },
  { title: 'The Agentic Firewall', desc: 'Prevent prompt injection and exfiltration. Agents only see authorized data in sub-milliseconds.' },
  { title: 'SingleStore Native', desc: 'Zero-latency security for high-concurrency vector workloads and real-time ingestion.' }
]

export default function System() {
  return (
    <section id="pillars" className="py-32 bg-slate-950/50 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((p, i) => (
            <div key={i} className="p-10 rounded-3xl border border-slate-800 bg-slate-900/30 hover:border-emerald-500/50 transition-all group">
              <div className="h-1 w-12 bg-emerald-500 mb-8 group-hover:w-full transition-all duration-500"></div>
              <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
              <p className="text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}