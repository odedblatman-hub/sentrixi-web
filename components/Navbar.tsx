"use client";
import Link from 'next/link';
import { useState } from 'react';
import ContactButton from '@/components/ContactButton';

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
          <svg width="18" height="24" viewBox="10 10 130 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M75,10 L140,35 L140,105 C140,145 110,175 75,190 C40,175 10,145 10,105 L10,35 Z" fill="rgba(0,229,160,0.12)" stroke="#00E5A0" strokeWidth="4"/>
            <circle cx="75" cy="90" r="5.5" fill="#00E5A0" opacity="0.9"/>
            <circle cx="75" cy="54" r="3.5" fill="#00E5A0" opacity="0.7"/>
            <circle cx="43" cy="108" r="3.5" fill="#00E5A0" opacity="0.7"/>
            <circle cx="107" cy="108" r="3.5" fill="#00E5A0" opacity="0.7"/>
            <line x1="75" y1="90" x2="75" y2="54" stroke="#00E5A0" strokeWidth="1.5" opacity="0.5"/>
            <line x1="75" y1="90" x2="43" y2="108" stroke="#00E5A0" strokeWidth="1.5" opacity="0.5"/>
            <line x1="75" y1="90" x2="107" y2="108" stroke="#00E5A0" strokeWidth="1.5" opacity="0.5"/>
          </svg>
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

        <ContactButton className="hidden md:block text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all duration-200" style={{ backgroundColor: "#00E5A0" }} />

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
          <ContactButton className="block text-left py-1" style={{ color: "#00E5A0" }} />
        </div>
      )}
    </nav>
  );
}
