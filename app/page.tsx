import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import System from '@/components/System'
import Platform from '@/components/demo/Platform'

export default function Home() {
  return (
    <main className="bg-[#0A0A0B] min-h-screen text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <System />
      
      <section id="demo" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Interactive Product Experience</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Explore the AEGIS interface. Select alerts in the dashboard to investigate incidents and trigger response protocols in real-time.</p>
          </div>
          <Platform />
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <div className="text-gray-600 text-xs font-mono uppercase tracking-[0.2em]">
          Sentrixi Aegis // Autonomous Security Intelligence
        </div>
      </footer>
    </main>
  )
}