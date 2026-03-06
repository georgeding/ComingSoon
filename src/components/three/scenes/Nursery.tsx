import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Group } from 'three'

function Crib() {
  return (
    <group position={[0, 0.3, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.1, 1]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      {/* Rails */}
      {[[-0.85, 0.4, 0], [0.85, 0.4, 0], [0, 0.4, -0.45], [0, 0.4, 0.45]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[i < 2 ? 0.05 : 1.8, 0.7, i < 2 ? 1 : 0.05]} />
          <meshStandardMaterial color="#c4956a" transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Mattress */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.6, 0.1, 0.8]} />
        <meshStandardMaterial color="#f0e6d3" />
      </mesh>
      {/* Pillow */}
      <mesh position={[-0.5, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.08, 0.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Mobile() {
  const groupRef = useRef<Group>(null)
  const star1Ref = useRef<Mesh>(null)
  const star2Ref = useRef<Mesh>(null)
  const star3Ref = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) groupRef.current.rotation.y = t * 0.3
    if (star1Ref.current) star1Ref.current.position.y = 1.8 + Math.sin(t) * 0.05
    if (star2Ref.current) star2Ref.current.position.y = 1.7 + Math.sin(t + 2) * 0.05
    if (star3Ref.current) star3Ref.current.position.y = 1.75 + Math.sin(t + 4) * 0.05
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Rod */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Hanging stars */}
      <mesh ref={star1Ref} position={[0.3, 1.8, 0]}>
        <octahedronGeometry args={[0.1]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={star2Ref} position={[-0.3, 1.7, 0.2]}>
        <octahedronGeometry args={[0.08]} />
        <meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={star3Ref} position={[0, 1.75, -0.3]}>
        <octahedronGeometry args={[0.09]} />
        <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.3} />
      </mesh>
      {/* Strings */}
      {[[0.3, 0], [-0.3, 0.2], [0, -0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.9, z]}>
          <cylinderGeometry args={[0.003, 0.003, 0.3]} />
          <meshStandardMaterial color="#aaa" />
        </mesh>
      ))}
    </group>
  )
}

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 1.5]}>
      <circleGeometry args={[1.2, 32]} />
      <meshStandardMaterial color="#E8D5C4" />
    </mesh>
  )
}

export function Nursery() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f5e6d3" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2.5, -3]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#fce4ec" />
      </mesh>
      {/* Side wall */}
      <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f8e8ee" />
      </mesh>

      <Crib />
      <Mobile />
      <Rug />

      {/* Toy blocks */}
      {[
        { pos: [1.5, 0.1, 1.5], color: '#FF6B6B' },
        { pos: [1.7, 0.1, 1.3], color: '#4ECDC4' },
        { pos: [1.6, 0.3, 1.4], color: '#FFE66D' },
      ].map(({ pos, color }, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, i * 0.5, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* Window */}
      <mesh position={[-3.95, 2.5, -1]}>
        <planeGeometry args={[0.05, 2]} />
        <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.5} />
      </mesh>

      {/* Warm lighting */}
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#FFF5E0" />
      <pointLight position={[-2, 2, 1]} intensity={0.3} color="#FFD700" />
      <ambientLight intensity={0.4} color="#FFF0E0" />
    </group>
  )
}
