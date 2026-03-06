import { useGameStore } from '../../store/gameStore'
import { Nursery } from './scenes/Nursery'
import { LivingRoom } from './scenes/LivingRoom'
import { Playground } from './scenes/Playground'
import { Bedroom } from './scenes/Bedroom'
import { CityApartment } from './scenes/CityApartment'
import { Office } from './scenes/Office'
import { Garden } from './scenes/Garden'
import { Character } from './Character'
import type { LifeStage } from '../../types'

const SCENE_MAP: Record<LifeStage, React.FC> = {
  baby: Nursery,
  toddler: LivingRoom,
  child: Playground,
  teen: Bedroom,
  youngAdult: CityApartment,
  adult: Office,
  elder: Garden,
}

const CAMERA_POSITIONS: Record<LifeStage, [number, number, number]> = {
  baby: [0, 2.5, 4],
  toddler: [0, 2, 5],
  child: [0, 3, 8],
  teen: [0, 2.5, 4],
  youngAdult: [0, 2.5, 5],
  adult: [0, 2.5, 5],
  elder: [0, 2.5, 6],
}

export function SceneManager() {
  const stage = useGameStore((s) => s.stage)
  const phase = useGameStore((s) => s.phase)

  const SceneComponent = SCENE_MAP[phase === 'menu' ? 'baby' : stage]
  const cameraPos = CAMERA_POSITIONS[phase === 'menu' ? 'baby' : stage]

  return (
    <>
      <perspectiveCamera position={cameraPos} />
      <SceneComponent />
      {phase === 'playing' && <Character />}
    </>
  )
}

export { CAMERA_POSITIONS }
