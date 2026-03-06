import { useGameStore } from '../../store/gameStore'
import { STAGE_CONFIG, type Stats } from '../../types'

const STAT_CONFIG: { key: keyof Stats; label: string; color: string; icon: string }[] = [
  { key: 'health', label: 'Health', color: '#e94560', icon: '♥' },
  { key: 'happiness', label: 'Happy', color: '#f5a623', icon: '☺' },
  { key: 'intelligence', label: 'Intel', color: '#3498db', icon: '✦' },
  { key: 'social', label: 'Social', color: '#9b59b6', icon: '◎' },
  { key: 'wealth', label: 'Wealth', color: '#16c79a', icon: '$' },
  { key: 'karma', label: 'Karma', color: '#e8e8e8', icon: '✿' },
]

export function HUD() {
  const age = useGameStore((s) => s.age)
  const stage = useGameStore((s) => s.stage)
  const stats = useGameStore((s) => s.stats)
  const traits = useGameStore((s) => s.traits)

  const stageInfo = STAGE_CONFIG[stage]

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 pointer-events-none">
      <div className="flex items-start justify-between max-w-4xl mx-auto">
        {/* Age & Stage */}
        <div className="bg-game-panel/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: stageInfo.color + '30', color: stageInfo.color }}
            >
              {age}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">{stageInfo.label}</div>
              <div className="text-gray-400 text-xs">Age {age}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-game-panel/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
          <div className="flex gap-3">
            {STAT_CONFIG.map(({ key, label, color, icon }) => (
              <div key={key} className="flex flex-col items-center min-w-[40px]">
                <span className="text-xs mb-1" style={{ color }}>{icon}</span>
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats[key]}%`, backgroundColor: color }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traits */}
      {traits.size > 0 && (
        <div className="flex justify-center mt-2 flex-wrap gap-1">
          {Array.from(traits).slice(-6).map((trait) => (
            <span
              key={trait}
              className="px-2 py-0.5 bg-game-panel/70 text-gray-400 text-[10px] rounded-full border border-white/5"
            >
              {trait}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
