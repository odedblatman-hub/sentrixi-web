import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import System from '@/components/System'
import AttackDemo from '@/components/AttackDemo'
import LiveSimulation from '@/components/LiveSimulation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <div className="space-y-0">
        <Hero />
        
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black pointer-events-none" />
            <System />
        </div>

        <LiveSimulation />

        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black pointer-events-none" />
            <AttackDemo />
        </div>
      </div>

      <Footer />
    </main>
  )
}
