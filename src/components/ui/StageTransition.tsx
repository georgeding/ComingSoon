import { useEffect, useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { STAGE_CONFIG } from '../../types'

export function StageTransition() {
  const stage = useGameStore((s) => s.stage)
  const previousStage = useGameStore((s) => s.previousStage)
  const completeStageTransition = useGameStore((s) => s.completeStageTransition)
  const [show, setShow] = useState(false)
  const [ready, setReady] = useState(false)

  const stageInfo = STAGE_CONFIG[stage]
  const stageNumber = Object.keys(STAGE_CONFIG).indexOf(stage) + 1

  useEffect(() => {
    setShow(false)
    setReady(false)
    const timer1 = setTimeout(() => setShow(true), 100)
    const timer2 = setTimeout(() => setReady(true), 1500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [stage])

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-game-dark">
      <div
        className={`text-center transition-all duration-1000 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {previousStage && (
          <div className="text-gray-500 text-sm mb-4 uppercase tracking-widest">
            Farewell, {STAGE_CONFIG[previousStage].label} Years
          </div>
        )}

        <div
          className="text-sm font-light tracking-[0.3em] uppercase mb-3"
          style={{ color: stageInfo.color }}
        >
          Chapter {stageNumber}
        </div>

        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: stageInfo.color }}
        >
          {stageInfo.label}
        </h1>

        <p className="text-gray-400 mb-2">
          Ages {stageInfo.ageRange[0]} — {stageInfo.ageRange[1]}
        </p>

        <div
          className="w-24 h-0.5 mx-auto my-6 rounded-full"
          style={{ backgroundColor: stageInfo.color }}
        />

        <button
          onClick={completeStageTransition}
          className={`px-8 py-3 border rounded-lg text-white font-medium transition-all duration-500 hover:scale-105 ${
            ready ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-default'
          }`}
          style={{ borderColor: stageInfo.color + '50' }}
          disabled={!ready}
        >
          Continue Your Journey
        </button>
      </div>
    </div>
  )
}
