import Navbar from '@/components/Navbar';
import AttackDemo from '@/components/AttackDemo';
import LiveSimulation from '@/components/LiveSimulation';
import SOCDemo from '@/components/soc/SOCDemo';

export const metadata = {
  title: 'Research Area | Sentrixi',
  description: 'Live AEGIS attack simulations, SOC demo, and real-time threat telemetry.',
};

export default function ResearchArea() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Research Environment
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          AEGIS<br />
          <span className="text-slate-500 font-light italic">Research Area</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
          A working demonstration of the AEGIS intelligence layer — real-time threat detection,
          autonomous containment, and SOC-grade visibility into the data plane.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Live Telemetry */}
      <LiveSimulation />

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Attack Simulation */}
      <AttackDemo />

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* SOC Demo */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-emerald-400 font-bold tracking-[0.3em] text-xs uppercase mb-4">
            Autonomous SOC
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Live SOC Dashboard
          </h2>
          <p className="text-slate-400 max-w-xl font-light">
            The AEGIS Security Operations Center — incident timelines, live alerts, and the AI Analyst in action.
          </p>
        </div>
        <SOCDemo />
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-6">
            Ready to see it on your data?
          </h2>
          <p className="text-slate-400 mb-10 font-light leading-relaxed">
            Everything you've seen here runs against your actual database layer — not synthetic traffic.
            Book a technical briefing and we'll run AEGIS live on your environment.
          </p>
          <a
            href="mailto:register@sentrixi.com?subject=Technical Briefing Request"
            className="inline-block bg-emerald-500 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm hover:bg-emerald-400 transition-all duration-200 tracking-wide"
          >
            Request a Technical Briefing →
          </a>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-white/5">
        <div className="text-slate-700 text-xs font-mono uppercase tracking-[0.2em]">
          Sentrixi © 2026 — Autonomous Security Intelligence
        </div>
      </footer>
    </main>
  );
}
