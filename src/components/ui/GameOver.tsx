import { useGameStore } from '../../store/gameStore'
import { STAGE_CONFIG, type Stats } from '../../types'

const STAT_LABELS: Record<keyof Stats, { label: string; icon: string; color: string }> = {
  health: { label: 'Health', icon: '♥', color: '#e94560' },
  happiness: { label: 'Happiness', icon: '☺', color: '#f5a623' },
  intelligence: { label: 'Intelligence', icon: '✦', color: '#3498db' },
  social: { label: 'Social', icon: '◎', color: '#9b59b6' },
  wealth: { label: 'Wealth', icon: '$', color: '#16c79a' },
  karma: { label: 'Karma', icon: '✿', color: '#e8e8e8' },
}

function getLifeTitle(stats: Stats, traits: Set<string>): string {
  const top = (Object.entries(stats) as [keyof Stats, number][])
    .sort(([, a], [, b]) => b - a)[0][0]

  const titles: Record<string, string> = {
    health: 'The Vital Spirit',
    happiness: 'The Joyful Soul',
    intelligence: 'The Brilliant Mind',
    social: 'The Beloved Friend',
    wealth: 'The Great Provider',
    karma: 'The Virtuous Heart',
  }

  if (traits.has('philanthropist')) return 'The Philanthropist'
  if (traits.has('author')) return 'The Storyteller'
  if (traits.has('community-leader')) return 'The People\'s Champion'
  if (traits.has('mentor')) return 'The Wise Guide'
  if (traits.has('entrepreneur')) return 'The Visionary'
  if (traits.has('rebel') && traits.has('reinvented')) return 'The Transformer'
  if (traits.has('no-regrets')) return 'The Fearless One'

  return titles[top] || 'A Life Well Lived'
}

export function GameOver() {
  const age = useGameStore((s) => s.age)
  const stats = useGameStore((s) => s.stats)
  const traits = useGameStore((s) => s.traits)
  const history = useGameStore((s) => s.history)
  const returnToMenu = useGameStore((s) => s.returnToMenu)
  const startGame = useGameStore((s) => s.startGame)

  const title = getLifeTitle(stats, traits)

  // Key moments (one per stage)
  const keyMoments = history.reduce((acc, entry) => {
    if (!acc.find((e) => e.stage === entry.stage)) {
      acc.push(entry)
    }
    return acc
  }, [] as typeof history)

  return (
    <div className="absolute inset-0 z-30 overflow-y-auto bg-gradient-to-b from-game-dark via-game-panel to-game-dark">
      <div className="max-w-2xl mx-auto px-6 py-16 animate-fade-in">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm tracking-widest uppercase mb-3">A Life Remembered</p>
          <h1 className="text-5xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">Lived to age {Math.min(age, 80)}</p>
        </div>

        {/* Final Stats */}
        <div className="bg-game-panel/50 rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Life Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {(Object.entries(stats) as [keyof Stats, number][]).map(([key, value]) => {
              const config = STAT_LABELS[key]
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-lg" style={{ color: config.color }}>{config.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{config.label}</span>
                      <span className="text-white font-mono">{value}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${value}%`, backgroundColor: config.color }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Traits Collected */}
        {traits.size > 0 && (
          <div className="bg-game-panel/50 rounded-2xl border border-white/10 p-6 mb-8">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Character Traits</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(traits).map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-game-gold/10 text-game-gold text-sm rounded-full border border-game-gold/20"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Moments Timeline */}
        <div className="bg-game-panel/50 rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Key Moments</h2>
          <div className="space-y-4">
            {keyMoments.map((entry, i) => {
              const stageInfo = STAGE_CONFIG[entry.stage]
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ backgroundColor: stageInfo.color + '30', color: stageInfo.color }}
                    >
                      {entry.age}
                    </div>
                    {i < keyMoments.length - 1 && (
                      <div className="w-px flex-1 bg-gray-700 my-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="text-white text-sm font-medium">{entry.eventTitle}</div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      Chose: <span className="text-gray-400">{entry.choiceLabel}</span>
                    </div>
                    <div className="text-gray-500 text-xs mt-1 italic">"{entry.outcome}"</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={startGame}
            className="px-8 py-3 bg-game-accent hover:bg-game-accent/80 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
          >
            Live Again
          </button>
          <button
            onClick={returnToMenu}
            className="px-8 py-3 border border-white/20 hover:border-white/40 text-gray-300 font-semibold rounded-xl transition-all duration-200"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  )
}
