import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { type Choice } from '../../types'

export function EventDialog() {
  const currentEvent = useGameStore((s) => s.currentEvent)
  const makeChoice = useGameStore((s) => s.makeChoice)
  const stats = useGameStore((s) => s.stats)
  const traits = useGameStore((s) => s.traits)
  const flags = useGameStore((s) => s.flags)
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [showOutcome, setShowOutcome] = useState(false)

  if (!currentEvent) return null

  function isChoiceAvailable(choice: Choice): boolean {
    if (!choice.prerequisites) return true
    const prereqs = choice.prerequisites
    if (prereqs.minStats) {
      for (const [key, value] of Object.entries(prereqs.minStats)) {
        if (stats[key as keyof typeof stats] < (value as number)) return false
      }
    }
    if (prereqs.traits) {
      for (const trait of prereqs.traits) {
        if (!traits.has(trait)) return false
      }
    }
    if (prereqs.flags) {
      for (const flag of prereqs.flags) {
        if (!flags.has(flag)) return false
      }
    }
    return true
  }

  function handleChoice(choice: Choice) {
    setSelectedChoice(choice)
    setShowOutcome(true)
  }

  function handleContinue() {
    if (selectedChoice) {
      makeChoice(selectedChoice)
      setSelectedChoice(null)
      setShowOutcome(false)
    }
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl animate-slide-up">
        {!showOutcome ? (
          <div className="bg-game-panel/95 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Event Header */}
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-2xl font-bold text-white mb-3">{currentEvent.title}</h2>
              <p className="text-gray-300 leading-relaxed">{currentEvent.description}</p>
            </div>

            {/* Choices */}
            <div className="px-6 pb-6 space-y-3">
              {currentEvent.choices.map((choice) => {
                const available = isChoiceAvailable(choice)
                return (
                  <button
                    key={choice.id}
                    onClick={() => available && handleChoice(choice)}
                    disabled={!available}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                      available
                        ? 'border-white/10 hover:border-game-accent/50 hover:bg-game-accent/10 cursor-pointer'
                        : 'border-white/5 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${available ? 'bg-game-accent group-hover:scale-125' : 'bg-gray-600'} transition-transform`} />
                      <div>
                        <div className={`font-semibold ${available ? 'text-white' : 'text-gray-500'}`}>
                          {choice.label}
                        </div>
                        <div className={`text-sm mt-0.5 ${available ? 'text-gray-400' : 'text-gray-600'}`}>
                          {choice.description}
                        </div>
                        {!available && choice.prerequisites && (
                          <div className="text-xs text-game-accent/60 mt-1">
                            Requires: {choice.prerequisites.traits?.join(', ') || 'higher stats'}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-game-panel/95 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-fade-in">
            <div className="px-6 py-6">
              <h3 className="text-lg font-semibold text-game-gold mb-1">
                {selectedChoice?.label}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {selectedChoice?.outcome}
              </p>

              {/* Stat changes preview */}
              {selectedChoice?.effects.stats && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.entries(selectedChoice.effects.stats).map(([key, value]) => (
                    <span
                      key={key}
                      className={`px-2 py-1 rounded text-xs font-mono ${
                        (value as number) > 0
                          ? 'bg-game-green/20 text-game-green'
                          : 'bg-game-accent/20 text-game-accent'
                      }`}
                    >
                      {key} {(value as number) > 0 ? '+' : ''}{value as number}
                    </span>
                  ))}
                </div>
              )}

              {/* New traits */}
              {selectedChoice?.effects.addTraits && selectedChoice.effects.addTraits.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedChoice.effects.addTraits.map((trait) => (
                    <span key={trait} className="px-2 py-1 rounded text-xs bg-game-gold/20 text-game-gold">
                      + {trait}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={handleContinue}
                className="w-full py-3 bg-game-accent hover:bg-game-accent/80 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
