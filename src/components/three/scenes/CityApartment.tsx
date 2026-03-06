import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function CityBuilding({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Windows */}
      {Array.from({ length: Math.floor(height / 0.5) }).map((_, i) => (
        <mesh key={i} position={[0.41, 0.3 + i * 0.5, 0]}>
          <planeGeometry args={[0.15, 0.2]} />
          <meshStandardMaterial
            color="#FFE082"
            emissive="#FFE082"
            emissiveIntensity={Math.random() > 0.3 ? 0.5 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

export function CityApartment() {
  const cloudsRef = useRef<Group>(null)

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2
    }
  })

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#3a3a4a" />
      </mesh>
      {/* Back wall with window */}
      <mesh position={[0, 2.5, -3]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#e8e0d8" />
      </mesh>

      {/* Large window */}
      <mesh position={[0, 2.5, -2.95]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#1a1a3e" />
      </mesh>

      {/* City skyline through window */}
      <group position={[0, 0, -5]}>
        <CityBuilding position={[-3, 0, 0]} height={4} color="#2c3e50" />
        <CityBuilding position={[-1.5, 0, 0]} height={6} color="#34495e" />
        <CityBuilding position={[0, 0, 0]} height={5} color="#2c3e50" />
        <CityBuilding position={[1.5, 0, -1]} height={7} color="#1a2530" />
        <CityBuilding position={[3, 0, 0]} height={3.5} color="#34495e" />

        {/* Clouds */}
        <group ref={cloudsRef}>
          <mesh position={[-2, 6, -2]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#445566" transparent opacity={0.6} />
          </mesh>
          <mesh position={[1, 5.5, -1]}>
            <sphereGeometry args={[0.7, 8, 8]} />
            <meshStandardMaterial color="#445566" transparent opacity={0.5} />
          </mesh>
        </group>
      </group>

      {/* Modern couch */}
      <group position={[-2, 0, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[2, 0.4, 0.8]} />
          <meshStandardMaterial color="#2c2c3e" />
        </mesh>
        <mesh position={[0, 0.55, -0.3]}>
          <boxGeometry args={[2, 0.3, 0.2]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </group>

      {/* Coffee table - modern */}
      <mesh position={[-1.5, 0.3, 1]}>
        <boxGeometry args={[1, 0.05, 0.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-1.5, 0.15, 1]}>
        <boxGeometry args={[0.8, 0.25, 0.4]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>

      {/* Bookshelf */}
      <group position={[3, 0, -2]}>
        {[0.5, 1.2, 1.9, 2.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[1, 0.05, 0.3]} />
            <meshStandardMaterial color="#5a4a3a" />
          </mesh>
        ))}
        {/* Books */}
        {[
          { x: -0.3, y: 0.6, color: '#e94560' },
          { x: -0.1, y: 0.6, color: '#3498db' },
          { x: 0.1, y: 0.6, color: '#2ecc71' },
          { x: -0.2, y: 1.3, color: '#f39c12' },
          { x: 0, y: 1.3, color: '#9b59b6' },
        ].map(({ x, y, color }, i) => (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[0.1, 0.2, 0.2]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
      </group>

      {/* Plant */}
      <group position={[2, 0, 1.5]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.4]} />
          <meshStandardMaterial color="#d4a574" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshStandardMaterial color="#2ECC71" />
        </mesh>
      </group>

      {/* City ambient lighting */}
      <pointLight position={[0, 3, -2]} intensity={0.4} color="#FFE082" />
      <pointLight position={[-3, 2, 1]} intensity={0.3} color="#FF6B6B" />
      <ambientLight intensity={0.2} color="#1a1a3e" />
      <spotLight position={[0, 4, 2]} angle={0.5} intensity={0.5} color="#FFF" />
    </group>
  )
}
