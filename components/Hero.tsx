'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function NetworkGraph() {
  const ref = useRef<THREE.Group>(null!)
  const count = 40
  
  const nodes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      speed: Math.random() * 0.01
    }))
  }, [])

  const lines = useMemo(() => {
    const connections: THREE.Vector3[][] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 3.5) {
          connections.push([nodes[i].position, nodes[j].position])
        }
      }
    }
    return connections
  }, [nodes])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
  })

  return (
    <group ref={ref}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
      ))}
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([line[0].x, line[0].y, line[0].z, line[1].x, line[1].y, line[1].z])}
              itemSize={3}
              args={[new Float32Array([line[0].x, line[0].y, line[0].z, line[1].x, line[1].y, line[1].z]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00E5FF" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-20 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AEGIS Core v2.4
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tighter text-white">
            Security, <br />
            <span className="text-cyan-400 text-glow italic font-light">operated by intelligence.</span>
          </h1>
          
          <p className="mt-8 text-xl text-gray-400 max-w-xl font-light leading-relaxed">
            The world&apos;s first autonomous security layer for real-time databases. 
            Behavioral detection, forensic reconstruction, and active containment—all in sub-20ms.
          </p>
          
          <div className="mt-12 flex items-center gap-6">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300">
              Request Strategic Briefing
            </button>
            <button className="text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <div className="h-[600px] w-full relative">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <NetworkGraph />
          </Canvas>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_20%,black_80%)]" />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll to Investigate</div>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
