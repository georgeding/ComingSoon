import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { useGameStore } from './store/gameStore'
import { SceneManager, CAMERA_POSITIONS } from './components/three/SceneManager'
import { MainMenu } from './components/ui/MainMenu'
import { HUD } from './components/ui/HUD'
import { EventDialog } from './components/ui/EventDialog'
import { StageTransition } from './components/ui/StageTransition'
import { GameOver } from './components/ui/GameOver'

function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-dark">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-game-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading your life...</p>
      </div>
    </div>
  )
}

export default function App() {
  const phase = useGameStore((s) => s.phase)
  const stage = useGameStore((s) => s.stage)

  const cameraPos = CAMERA_POSITIONS[phase === 'menu' ? 'baby' : stage]

  return (
    <div className="w-full h-full relative">
      {/* 3D Canvas - always visible as background */}
      <Canvas
        camera={{ position: cameraPos, fov: 50 }}
        className="absolute inset-0"
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <SceneManager />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={phase === 'menu'}
          autoRotate={phase === 'menu'}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* UI Overlay */}
      <Suspense fallback={<LoadingScreen />}>
        {phase === 'menu' && <MainMenu />}
        {phase === 'playing' && (
          <>
            <HUD />
            <EventDialog />
          </>
        )}
        {phase === 'stageTransition' && <StageTransition />}
        {phase === 'gameOver' && <GameOver />}
      </Suspense>
    </div>
  )
}
