'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null!)
  
  // Generate stable telemetry points
  const positions = useMemo(() => {
    const arr = new Float32Array(8000)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 15
    }
    return arr
  }, [])

  // Mouse tracking logic
  useFrame((state) => {
    const { x, y } = state.mouse
    // Subtle rotation based on cursor position
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, y * 0.2, 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.2, 0.1)
    
    // Constant slow drift
    ref.current.rotation.z += 0.001
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        color="#22d3ee" 
        size={0.018} 
        sizeAttenuation={true} 
        depthWrite={false} 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function Hero() {
  return (
    <section className="pt-48 pb-32 overflow-hidden bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <div className="inline-block px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-400 text-xs font-mono mb-6 bg-cyan-400/5">
            SENTRIXI // AI CORE ACTIVE
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] text-white">
            Security, operated by <span className="text-cyan-400">intelligence.</span>
          </h1>
          <p className="mt-8 text-gray-400 text-xl max-w-lg leading-relaxed font-light">
            Autonomous investigation and response. Aegis neutralizes threats before they reach your perimeter.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl hover:bg-cyan-300 transition-all active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              Start Briefing
            </button>
            <button className="border border-white/10 text-white px-8 py-4 rounded-2xl hover:bg-white/5 transition-all">
              View Platform
            </button>
          </div>
        </div>
        
        <div className="h-[600px] relative cursor-crosshair">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-transparent to-transparent z-10 pointer-events-none" />
          <Canvas camera={{ position: [0, 0, 7] }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <Particles />
          </Canvas>
        </div>
      </div>
    </section>
  )
}