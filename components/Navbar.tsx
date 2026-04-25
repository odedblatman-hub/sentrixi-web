export default function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <div className="font-bold tracking-tighter text-xl">SENTRIXI <span className="text-slate-500 font-light">| AEGIS</span></div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#pillars" className="hover:text-emerald-400 transition-colors">Strategic Pillars</a>
          <a href="/aegis" className="hover:text-emerald-400 transition-colors">Governance</a>
        </div>
        <button className="bg-emerald-500 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm hover:bg-emerald-400 transition-all">
          Early Access
        </button>
      </div>
    </div>
  );
}