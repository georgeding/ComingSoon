import { create } from 'zustand'
import { type Stats, type LifeStage, type HistoryEntry, type GameEvent, type Choice, type GamePhase, LIFE_STAGES, STAGE_CONFIG } from '../types'
import { selectNextEvent } from '../systems/eventScheduler'
import { resolveChoice } from '../systems/choiceResolver'

interface GameState {
  phase: GamePhase
  age: number
  stage: LifeStage
  stats: Stats
  traits: Set<string>
  flags: Set<string>
  history: HistoryEntry[]
  currentEvent: GameEvent | null
  usedEventIds: Set<string>
  previousStage: LifeStage | null

  startGame: () => void
  makeChoice: (choice: Choice) => void
  advanceToNextEvent: () => void
  completeStageTransition: () => void
  returnToMenu: () => void
}

const INITIAL_STATS: Stats = {
  health: 70,
  happiness: 60,
  intelligence: 40,
  social: 50,
  wealth: 30,
  karma: 50,
}

function getStageForAge(age: number): LifeStage {
  for (const stage of LIFE_STAGES) {
    const [min, max] = STAGE_CONFIG[stage].ageRange
    if (age >= min && age <= max) return stage
  }
  return 'elder'
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'menu',
  age: 0,
  stage: 'baby',
  stats: { ...INITIAL_STATS },
  traits: new Set<string>(),
  flags: new Set<string>(),
  history: [],
  currentEvent: null,
  usedEventIds: new Set<string>(),
  previousStage: null,

  startGame: () => {
    const state: Partial<GameState> = {
      phase: 'playing',
      age: 0,
      stage: 'baby',
      stats: { ...INITIAL_STATS },
      traits: new Set<string>(),
      flags: new Set<string>(),
      history: [],
      currentEvent: null,
      usedEventIds: new Set<string>(),
      previousStage: null,
    }
    set(state)
    // Trigger first event after state is set
    setTimeout(() => get().advanceToNextEvent(), 100)
  },

  makeChoice: (choice: Choice) => {
    const { stats, traits, flags, age, stage, currentEvent, history, usedEventIds } = get()
    if (!currentEvent) return

    const result = resolveChoice(choice, stats, traits, flags)

    const entry: HistoryEntry = {
      age,
      stage,
      eventId: currentEvent.id,
      eventTitle: currentEvent.title,
      choiceId: choice.id,
      choiceLabel: choice.label,
      outcome: choice.outcome,
    }

    const newUsed = new Set(usedEventIds)
    if (currentEvent.isOnce !== false) {
      newUsed.add(currentEvent.id)
    }

    set({
      stats: result.stats,
      traits: result.traits,
      flags: result.flags,
      history: [...history, entry],
      currentEvent: null,
      usedEventIds: newUsed,
    })

    // Advance age and get next event
    setTimeout(() => {
      const { age: currentAge, stage: currentStage } = get()
      const ageIncrement = currentStage === 'baby' ? 1 : currentStage === 'toddler' ? 1 : currentStage === 'child' ? 2 : currentStage === 'teen' ? 1 : currentStage === 'youngAdult' ? 2 : currentStage === 'adult' ? 5 : 5
      const newAge = currentAge + ageIncrement
      const newStage = getStageForAge(newAge)

      if (newAge > 80) {
        set({ phase: 'gameOver', age: newAge })
        return
      }

      if (newStage !== currentStage) {
        set({ age: newAge, stage: newStage, previousStage: currentStage, phase: 'stageTransition' })
      } else {
        set({ age: newAge })
        get().advanceToNextEvent()
      }
    }, 300)
  },

  advanceToNextEvent: () => {
    const { age, stage, stats, traits, flags, usedEventIds } = get()
    const event = selectNextEvent(age, stage, stats, traits, flags, usedEventIds)
    if (event) {
      set({ currentEvent: event })
    } else {
      // No more events for this stage, skip ahead
      const stageConfig = STAGE_CONFIG[stage]
      const newAge = stageConfig.ageRange[1] + 1
      const newStage = getStageForAge(newAge)
      if (newAge > 80) {
        set({ phase: 'gameOver', age: newAge })
      } else {
        set({ age: newAge, stage: newStage, previousStage: stage, phase: 'stageTransition' })
      }
    }
  },

  completeStageTransition: () => {
    set({ phase: 'playing' })
    setTimeout(() => get().advanceToNextEvent(), 100)
  },

  returnToMenu: () => {
    set({ phase: 'menu' })
  },
}))
