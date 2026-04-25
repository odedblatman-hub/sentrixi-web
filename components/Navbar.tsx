"use client";
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'SHIELD', href: 'https://www.sentrixi.com/shield', external: true },
  { label: 'SENTINEL', href: 'https://www.sentrixi.com/sentinel', external: true },
  { label: 'INVESTORS', href: 'https://www.sentrixi.com/investors', external: true },
  { label: 'RESEARCH AREA', href: '/research-area', external: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        <Link href="/" className="font-bold text-lg tracking-tighter text-white flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SENTRIXI
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-400">
          {NAV_LINKS.map(({ label, href, external }) =>
            external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                {label}
              </a>
            ) : (
              <Link key={label} href={href} className="hover:text-emerald-400 transition-colors duration-200">
                {label}
              </Link>
            )
          )}
        </div>

        <a href="mailto:register@sentrixi.com" className="hidden md:block bg-emerald-500 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm hover:bg-emerald-400 transition-all duration-200">
          CONTACT
        </a>

        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#020617] border-t border-slate-800/60 px-6 py-4 space-y-3 text-sm font-semibold">
          {NAV_LINKS.map(({ label, href, external }) =>
            external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block text-slate-400 hover:text-white py-1">{label}</a>
            ) : (
              <Link key={label} href={href} className="block text-slate-400 hover:text-emerald-400 py-1" onClick={() => setMenuOpen(false)}>{label}</Link>
            )
          )}
          <a href="mailto:register@sentrixi.com" className="block text-emerald-400 py-1">CONTACT</a>
        </div>
      )}
    </nav>
  );
}
