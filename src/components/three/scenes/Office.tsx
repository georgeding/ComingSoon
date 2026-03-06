import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function Office() {
  const clockRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (clockRef.current) {
      clockRef.current.rotation.z = -state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2.5, -3]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f0ebe3" />
      </mesh>
      {/* Side wall */}
      <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#ebe6de" />
      </mesh>

      {/* Executive desk */}
      <group position={[0, 0, -1.5]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.5, 0.08, 1]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <mesh position={[0, 0.3, -0.3]}>
          <boxGeometry args={[2.5, 0.55, 0.4]} />
          <meshStandardMaterial color="#4A2512" />
        </mesh>
        {/* Drawers */}
        <mesh position={[0.8, 0.3, 0.2]}>
          <boxGeometry args={[0.6, 0.55, 0.5]} />
          <meshStandardMaterial color="#4A2512" />
        </mesh>
      </group>

      {/* Office chair */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0, 0.85, -0.2]}>
          <boxGeometry args={[0.5, 0.5, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3]} />
          <meshStandardMaterial color="#666" />
        </mesh>
      </group>

      {/* Computer monitor */}
      <mesh position={[-0.5, 1, -1.8]}>
        <boxGeometry args={[0.7, 0.45, 0.04]} />
        <meshStandardMaterial color="#222" emissive="#4488ff" emissiveIntensity={0.15} />
      </mesh>

      {/* Photo frames on desk */}
      {[0.3, 0.6].map((x, i) => (
        <group key={i} position={[x, 0.75, -1.7]}>
          <mesh>
            <boxGeometry args={[0.15, 0.2, 0.02]} />
            <meshStandardMaterial color={i === 0 ? '#C0C0C0' : '#FFD700'} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.12, 0.16]} />
            <meshStandardMaterial color={i === 0 ? '#FFB6C1' : '#98FB98'} />
          </mesh>
        </group>
      ))}

      {/* Wall clock */}
      <group position={[0, 3.5, -2.95]}>
        <mesh>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial color="#FFF" />
        </mesh>
        <mesh ref={clockRef} position={[0, 0, 0.02]}>
          <boxGeometry args={[0.02, 0.2, 0.01]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Bookcase */}
      <group position={[-3, 0, -2]}>
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[1.2, 4, 0.3]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        {[0.5, 1.2, 1.9, 2.6, 3.3].map((y) => (
          <mesh key={y} position={[0, y, 0.05]}>
            <boxGeometry args={[1.1, 0.04, 0.25]} />
            <meshStandardMaterial color="#4A2512" />
          </mesh>
        ))}
        {/* Books */}
        {[
          { y: 0.65, colors: ['#e94560', '#3498db', '#2ecc71', '#f39c12'] },
          { y: 1.35, colors: ['#9b59b6', '#e67e22', '#1abc9c'] },
          { y: 2.05, colors: ['#e74c3c', '#2980b9', '#27ae60', '#f1c40f', '#8e44ad'] },
        ].map(({ y, colors }) => (
          colors.map((color, i) => (
            <mesh key={`${y}-${i}`} position={[-0.4 + i * 0.2, y, 0.05]}>
              <boxGeometry args={[0.1, 0.25, 0.18]} />
              <meshStandardMaterial color={color} />
            </mesh>
          ))
        ))}
      </group>

      {/* Window */}
      <group position={[-3.95, 2.5, -1]}>
        <mesh>
          <planeGeometry args={[0.05, 2.5]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Potted plant */}
      <group position={[3, 0, -2]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 0.6]} />
          <meshStandardMaterial color="#d4a574" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial color="#2ECC71" />
        </mesh>
        <mesh position={[0.2, 1.1, 0.1]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color="#27AE60" />
        </mesh>
      </group>

      {/* Professional lighting */}
      <pointLight position={[0, 4, 0]} intensity={0.7} color="#FFF8F0" />
      <pointLight position={[-4, 3, -1]} intensity={0.4} color="#FFE8D0" />
      <ambientLight intensity={0.3} color="#FFF5EE" />
    </group>
  )
}
