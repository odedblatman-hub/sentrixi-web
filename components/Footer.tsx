"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="font-bold text-xl tracking-tighter text-white mb-6 block">
              SENTRIXI
            </Link>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              AEGIS: Autonomous Security Intelligence. <br />
              Deploying the next generation of behavioral detection and response 
              directly into the database layer.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/aegis" className="hover:text-cyan-400 transition-colors">Platform</Link></li>
              <li><Link href="/developers" className="hover:text-cyan-400 transition-colors">Developers</Link></li>
              <li><Link href="/investors" className="hover:text-cyan-400 transition-colors">Investors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="mailto:contact@sentrixi.com" className="hover:text-cyan-400 transition-colors">Email</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em]">
            Sentrixi Aegis // Security operated by intelligence.
          </div>
          <div className="text-[10px] text-gray-500 font-mono">
            © 2026 SENTRIXI CORP. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
