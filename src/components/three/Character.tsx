import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../../store/gameStore'
import { STAGE_CONFIG } from '../../types'
import type { Group } from 'three'

const STAGE_SCALE: Record<string, number> = {
  baby: 0.3,
  toddler: 0.45,
  child: 0.6,
  teen: 0.8,
  youngAdult: 1,
  adult: 1,
  elder: 0.9,
}

const STAGE_POSITION: Record<string, [number, number, number]> = {
  baby: [0, 0.3, 1.5],
  toddler: [0.5, 0, 2],
  child: [0, 0, 3],
  teen: [1, 0, 1],
  youngAdult: [1, 0, 2],
  adult: [1.5, 0, 1],
  elder: [0, 0, 1.5],
}

export function Character() {
  const stage = useGameStore((s) => s.stage)
  const groupRef = useRef<Group>(null)

  const scale = STAGE_SCALE[stage] || 1
  const position = STAGE_POSITION[stage] || [0, 0, 2]
  const color = STAGE_CONFIG[stage].color

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing animation
      const t = state.clock.elapsedTime
      groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.02 * scale
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFD5B8" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 1.2, 0.22]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.08, 1.2, 0.22]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 1.1, 0.23]}>
        <boxGeometry args={[0.1, 0.02, 0.01]} />
        <meshStandardMaterial color="#e94560" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.3, 0.65, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.65, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.1, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0.1, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  )
}
