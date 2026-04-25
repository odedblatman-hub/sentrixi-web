"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl tracking-tighter text-white flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          SENTRIXI
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link href="/aegis" className="hover:text-cyan-400 transition-colors">Platform</Link>
          <Link href="/partners" className="hover:text-cyan-400 transition-colors">Partners</Link>
          <Link href="/investors" className="hover:text-cyan-400 transition-colors">Investors</Link>
          <Link href="/research" className="hover:text-cyan-400 transition-colors">Research</Link>
          <Link href="/developers" className="hover:text-cyan-400 transition-colors">Developers</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/soc" className="hidden sm:block text-xs font-mono text-cyan-400 uppercase tracking-widest border border-cyan-400/30 px-2 py-1 rounded hover:bg-cyan-400/10 transition-colors">
            Live SOC Demo
          </Link>
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-400 transition-all duration-300">
            Request Briefing
          </button>
        </div>
      </div>
    </nav>
  );
}
