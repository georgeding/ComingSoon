import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function Bedroom() {
  const screenRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as any
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#4a4a5a" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2.5, -3]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#2c2c3e" />
      </mesh>
      {/* Side wall */}
      <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#302c40" />
      </mesh>

      {/* Bed */}
      <group position={[2, 0, -1.5]}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.8, 0.3, 2]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[1.6, 0.15, 1.8]} />
          <meshStandardMaterial color="#3d3d5c" />
        </mesh>
        <mesh position={[0, 0.6, -0.85]}>
          <boxGeometry args={[1.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.55, -0.6]}>
          <boxGeometry args={[0.8, 0.1, 0.4]} />
          <meshStandardMaterial color="#6B5B95" />
        </mesh>
      </group>

      {/* Desk with computer */}
      <group position={[-2, 0, -2]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.7]} />
          <meshStandardMaterial color="#5a4a3a" />
        </mesh>
        {/* Legs */}
        {[[-0.7, -0.3], [0.7, -0.3], [-0.7, 0.3], [0.7, 0.3]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.3, z]}>
            <boxGeometry args={[0.05, 0.6, 0.05]} />
            <meshStandardMaterial color="#4a3a2a" />
          </mesh>
        ))}
        {/* Monitor */}
        <mesh ref={screenRef} position={[0, 1, -0.1]}>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
          <meshStandardMaterial color="#333" emissive="#4444ff" emissiveIntensity={0.3} />
        </mesh>
        {/* Monitor stand */}
        <mesh position={[0, 0.7, -0.1]}>
          <boxGeometry args={[0.1, 0.15, 0.1]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        {/* Keyboard */}
        <mesh position={[0, 0.65, 0.15]}>
          <boxGeometry args={[0.5, 0.02, 0.15]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      {/* Posters on wall */}
      {[
        { pos: [-1, 3, -2.95], color: '#e94560', size: [0.8, 1] },
        { pos: [0.5, 3.2, -2.95], color: '#4ECDC4', size: [0.6, 0.8] },
        { pos: [-2.5, 3.5, -2.95], color: '#FFD93D', size: [0.5, 0.7] },
      ].map(({ pos, color, size }, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <planeGeometry args={size as [number, number]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* Clothes on floor (teen mess) */}
      {[
        { pos: [0, 0.02, 0.5], color: '#3d3d5c' },
        { pos: [0.5, 0.02, 1], color: '#e94560' },
      ].map(({ pos, color }, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[-Math.PI / 2, 0, i]}>
          <planeGeometry args={[0.4, 0.5]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* Fairy lights */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-3.9 + i * 0.7, 4.2, -2.9]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={['#FF69B4', '#FFD700', '#87CEEB', '#FF6B6B'][i % 4]}
            emissive={['#FF69B4', '#FFD700', '#87CEEB', '#FF6B6B'][i % 4]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Moody lighting */}
      <pointLight position={[-2, 1.5, -1.5]} intensity={0.5} color="#6B5BFF" />
      <pointLight position={[2, 2, 0]} intensity={0.3} color="#FF69B4" />
      <ambientLight intensity={0.15} color="#2c2c3e" />
    </group>
  )
}
