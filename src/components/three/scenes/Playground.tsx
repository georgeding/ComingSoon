import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Group } from 'three'

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.6]} />
        <meshStandardMaterial color="#8B5E3C" />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.8, 1.5, 8]} />
        <meshStandardMaterial color="#2ECC71" />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <coneGeometry args={[0.6, 1, 8]} />
        <meshStandardMaterial color="#27AE60" />
      </mesh>
    </group>
  )
}

function Swing() {
  const swingRef = useRef<Group>(null)

  useFrame((state) => {
    if (swingRef.current) {
      swingRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.3
    }
  })

  return (
    <group position={[-2, 0, 0]}>
      {/* Frame */}
      <mesh position={[-0.8, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[0.8, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[2, 0.08, 0.08]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Swing seat */}
      <group ref={swingRef} position={[0, 2.9, 0]}>
        <mesh position={[-0.15, -1.2, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.8]} />
          <meshStandardMaterial color="#666" />
        </mesh>
        <mesh position={[0.15, -1.2, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.8]} />
          <meshStandardMaterial color="#666" />
        </mesh>
        <mesh position={[0, -2.1, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.2]} />
          <meshStandardMaterial color="#e94560" />
        </mesh>
      </group>
    </group>
  )
}

function Slide() {
  return (
    <group position={[2, 0, -1]}>
      {/* Ladder */}
      <mesh position={[-0.5, 1, 0]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshStandardMaterial color="#4ECDC4" />
      </mesh>
      <mesh position={[0.5, 1, 0]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshStandardMaterial color="#4ECDC4" />
      </mesh>
      {/* Slide surface */}
      <mesh position={[0, 1, 1]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.8, 2.5, 0.05]} />
        <meshStandardMaterial color="#FFD93D" />
      </mesh>
      {/* Platform */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="#4ECDC4" />
      </mesh>
    </group>
  )
}

export function Playground() {
  return (
    <group>
      {/* Ground - grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#7EC850" />
      </mesh>

      {/* Sand area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#F4D03F" />
      </mesh>

      <Swing />
      <Slide />

      {/* Trees */}
      <Tree position={[-4, 0, -3]} />
      <Tree position={[4, 0, -2]} />
      <Tree position={[-3, 0, 3]} />
      <Tree position={[5, 0, 3]} />

      {/* School building in background */}
      <mesh position={[0, 2, -8]}>
        <boxGeometry args={[8, 4, 1]} />
        <meshStandardMaterial color="#D4A574" />
      </mesh>
      <mesh position={[0, 4.5, -8]}>
        <boxGeometry args={[6, 1, 1]} />
        <meshStandardMaterial color="#C4956A" />
      </mesh>
      {/* Windows */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={i} position={[x, 2.5, -7.45]}>
          <planeGeometry args={[1, 1.2]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Sky light */}
      <directionalLight position={[5, 8, 3]} intensity={1} color="#FFF8E1" castShadow />
      <ambientLight intensity={0.5} color="#E8F4FF" />
      <hemisphereLight args={['#87CEEB', '#7EC850', 0.3]} />
    </group>
  )
}
