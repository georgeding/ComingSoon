import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function LivingRoom() {
  const toyRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (toyRef.current) {
      toyRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group>
      {/* Floor - wooden */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#c4956a" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2.5, -3]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
      {/* Side wall */}
      <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f0ebe3" />
      </mesh>

      {/* Couch */}
      <group position={[0, 0, -2]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[2.5, 0.5, 0.8]} />
          <meshStandardMaterial color="#6B8E7B" />
        </mesh>
        <mesh position={[0, 0.75, -0.3]}>
          <boxGeometry args={[2.5, 0.5, 0.2]} />
          <meshStandardMaterial color="#5A7D6A" />
        </mesh>
        {/* Pillows */}
        <mesh position={[-0.8, 0.65, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#FFD93D" />
        </mesh>
        <mesh position={[0.8, 0.65, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>
      </group>

      {/* Coffee table */}
      <mesh position={[0, 0.3, -0.5]}>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      {[[-0.5, -0.2], [0.5, -0.2], [-0.5, -0.8], [0.5, -0.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.15, z + 0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color="#6B4914" />
        </mesh>
      ))}

      {/* Spinning toy */}
      <mesh ref={toyRef} position={[1.5, 0.2, 1]}>
        <coneGeometry args={[0.2, 0.3, 6]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>

      {/* Toy train */}
      {[0, 0.4, 0.8].map((x, i) => (
        <group key={i} position={[-1.5 + x, 0.1, 1.5]}>
          <mesh>
            <boxGeometry args={[0.3, 0.15, 0.2]} />
            <meshStandardMaterial color={['#e94560', '#4ECDC4', '#FFE66D'][i]} />
          </mesh>
          <mesh position={[-0.1, -0.05, 0.1]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      ))}

      {/* Carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.01, 0.5]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#E8C9A0" />
      </mesh>

      {/* Window with sunlight */}
      <group position={[-3.95, 2.2, -1]}>
        <mesh>
          <planeGeometry args={[0.05, 2.5]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <pointLight position={[-3, 3, -1]} intensity={1} color="#FFF8E1" />
      <pointLight position={[2, 3, 1]} intensity={0.4} color="#FFE0B2" />
      <ambientLight intensity={0.35} />
    </group>
  )
}
