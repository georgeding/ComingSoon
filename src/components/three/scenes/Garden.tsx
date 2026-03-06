import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Group } from 'three'

function Flower({ position, color, height = 0.5 }: { position: [number, number, number]; color: string; height?: number }) {
  const ref = useRef<Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.05
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, height]} />
        <meshStandardMaterial color="#2ECC71" />
      </mesh>
      <mesh position={[0, height, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {/* Petals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.1,
            height,
            Math.sin((i / 5) * Math.PI * 2) * 0.1,
          ]}
        >
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

function Butterfly({ startPosition }: { startPosition: [number, number, number] }) {
  const ref = useRef<Group>(null)
  const wing1Ref = useRef<Mesh>(null)
  const wing2Ref = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.position.x = startPosition[0] + Math.sin(t * 0.5) * 2
      ref.current.position.y = startPosition[1] + Math.sin(t * 0.8) * 0.3
      ref.current.position.z = startPosition[2] + Math.cos(t * 0.3) * 1
      ref.current.rotation.y = Math.atan2(Math.cos(t * 0.5), Math.sin(t * 0.3))
    }
    if (wing1Ref.current) wing1Ref.current.rotation.y = Math.sin(t * 8) * 0.5
    if (wing2Ref.current) wing2Ref.current.rotation.y = -Math.sin(t * 8) * 0.5
  })

  return (
    <group ref={ref} position={startPosition}>
      <mesh>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh ref={wing1Ref} position={[0.05, 0, 0]}>
        <planeGeometry args={[0.12, 0.08]} />
        <meshStandardMaterial color="#FF69B4" transparent opacity={0.8} side={2} />
      </mesh>
      <mesh ref={wing2Ref} position={[-0.05, 0, 0]}>
        <planeGeometry args={[0.12, 0.08]} />
        <meshStandardMaterial color="#FF69B4" transparent opacity={0.8} side={2} />
      </mesh>
    </group>
  )
}

export function Garden() {
  return (
    <group>
      {/* Ground - lush grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#5DA048" />
      </mesh>

      {/* Garden path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2]}>
        <planeGeometry args={[1.5, 6]} />
        <meshStandardMaterial color="#D4A574" />
      </mesh>

      {/* Bench */}
      <group position={[0, 0, 0]}>
        {/* Seat */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[1.5, 0.08, 0.5]} />
          <meshStandardMaterial color="#8B5E3C" />
        </mesh>
        {/* Back */}
        <mesh position={[0, 0.75, -0.2]}>
          <boxGeometry args={[1.5, 0.5, 0.05]} />
          <meshStandardMaterial color="#8B5E3C" />
        </mesh>
        {/* Legs */}
        {[[-0.6, 0.22, -0.15], [0.6, 0.22, -0.15], [-0.6, 0.22, 0.15], [0.6, 0.22, 0.15]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.05, 0.44, 0.05]} />
            <meshStandardMaterial color="#6B4226" />
          </mesh>
        ))}
        {/* Armrests */}
        {[[-0.7, 0.6, 0], [0.7, 0.6, 0]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.05, 0.05, 0.5]} />
            <meshStandardMaterial color="#7B4E2E" />
          </mesh>
        ))}
      </group>

      {/* Flower beds */}
      {[
        { x: -2, z: -1, colors: ['#FF6B6B', '#FF69B4', '#FF4757', '#e94560'] },
        { x: 2, z: -1, colors: ['#FFD93D', '#F5A623', '#FF9F43', '#FECA57'] },
        { x: -1.5, z: 1.5, colors: ['#9B59B6', '#8E44AD', '#6C5CE7', '#A29BFE'] },
        { x: 1.5, z: 1.5, colors: ['#FF69B4', '#FD79A8', '#E84393', '#D63384'] },
      ].map(({ x, z, colors }, gi) => (
        <group key={gi}>
          {colors.map((color, i) => (
            <Flower
              key={`${gi}-${i}`}
              position={[x + (i - 1.5) * 0.3, 0, z + Math.random() * 0.3]}
              color={color}
              height={0.3 + Math.random() * 0.3}
            />
          ))}
        </group>
      ))}

      {/* Trees */}
      {[[-4, -3], [4, -2], [-3, 4], [5, 3]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 2.4]} />
            <meshStandardMaterial color="#8B5E3C" />
          </mesh>
          <mesh position={[0, 3, 0]}>
            <sphereGeometry args={[1.2, 8, 8]} />
            <meshStandardMaterial color="#27AE60" />
          </mesh>
        </group>
      ))}

      {/* Butterflies */}
      <Butterfly startPosition={[0, 1.5, 1]} />
      <Butterfly startPosition={[-1, 1.2, -1]} />

      {/* Bird bath */}
      <group position={[3, 0, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 1]} />
          <meshStandardMaterial color="#999" />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 0.15]} />
          <meshStandardMaterial color="#aaa" />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Sunset lighting */}
      <directionalLight position={[-5, 3, 5]} intensity={0.8} color="#FFB347" />
      <directionalLight position={[5, 5, -3]} intensity={0.3} color="#FF6B6B" />
      <ambientLight intensity={0.4} color="#FFE4B5" />
      <hemisphereLight args={['#FF9F43', '#5DA048', 0.4]} />

      {/* Sky backdrop */}
      <mesh position={[0, 5, -10]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial color="#FF7F50" />
      </mesh>
      <mesh position={[0, 10, -10]}>
        <planeGeometry args={[30, 10]} />
        <meshBasicMaterial color="#4A90D9" />
      </mesh>
    </group>
  )
}
