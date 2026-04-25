'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function ShieldAura() {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(4000)
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 12
    return arr
  }, [])

  useFrame((state) => {
    ref.current.rotation.y += 0.002
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.mouse.y * 0.1, 0.1)
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color="#10b981" size={0.015} sizeAttenuation depthWrite={false} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </Points>
  )
}

export default function Hero() {
  return (
    <section className="pt-48 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <div className="text-emerald-500 font-mono text-sm mb-4 tracking-widest uppercase">Stealth Status: DECLASSIFIED</div>
          <h1 className="text-6xl font-bold leading-tight text-white mb-6">
            The Agentic Firewall for the <span className="text-emerald-500">Real-Time Enterprise.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed font-light mb-8">
            Unlock your most sensitive data for AI Agents. Securely. Locally. Instantly.
          </p>
          <div className="flex items-center gap-6">
            <button className="bg-emerald-500 text-slate-950 font-black px-8 py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              Request Early Access
            </button>
            <div className="text-slate-500 text-sm font-medium">Built for SingleStore Flow</div>
          </div>
        </div>
        <div className="h-[500px] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] z-10" />
          <Canvas camera={{ position: [0, 0, 6] }}><ShieldAura /></Canvas>
        </div>
      </div>
    </section>
  )
}