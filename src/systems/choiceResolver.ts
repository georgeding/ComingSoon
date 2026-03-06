import { type Choice, type Stats } from '../types'

function clampStat(value: number): number {
  return Math.max(0, Math.min(100, value))
}

export function resolveChoice(
  choice: Choice,
  currentStats: Stats,
  currentTraits: Set<string>,
  currentFlags: Set<string>
): { stats: Stats; traits: Set<string>; flags: Set<string> } {
  const newStats = { ...currentStats }
  const newTraits = new Set(currentTraits)
  const newFlags = new Set(currentFlags)

  if (choice.effects.stats) {
    for (const [key, value] of Object.entries(choice.effects.stats)) {
      newStats[key as keyof Stats] = clampStat(newStats[key as keyof Stats] + (value as number))
    }
  }

  if (choice.effects.addTraits) {
    for (const trait of choice.effects.addTraits) {
      newTraits.add(trait)
    }
  }

  if (choice.effects.removeTraits) {
    for (const trait of choice.effects.removeTraits) {
      newTraits.delete(trait)
    }
  }

  if (choice.effects.setFlags) {
    for (const flag of choice.effects.setFlags) {
      newFlags.add(flag)
    }
  }

  return { stats: newStats, traits: newTraits, flags: newFlags }
}
