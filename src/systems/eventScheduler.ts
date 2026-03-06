import { type GameEvent, type LifeStage, type Stats } from '../types'
import { allEvents } from '../data/events'

function checkPrerequisites(
  event: GameEvent,
  stats: Stats,
  traits: Set<string>,
  flags: Set<string>
): boolean {
  const prereqs = event.prerequisites
  if (!prereqs) return true

  if (prereqs.minStats) {
    for (const [key, value] of Object.entries(prereqs.minStats)) {
      if (stats[key as keyof Stats] < (value as number)) return false
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

  if (prereqs.excludeTraits) {
    for (const trait of prereqs.excludeTraits) {
      if (traits.has(trait)) return false
    }
  }

  if (prereqs.excludeFlags) {
    for (const flag of prereqs.excludeFlags) {
      if (flags.has(flag)) return false
    }
  }

  return true
}

export function selectNextEvent(
  age: number,
  stage: LifeStage,
  stats: Stats,
  traits: Set<string>,
  flags: Set<string>,
  usedEventIds: Set<string>
): GameEvent | null {
  const eligible = allEvents.filter(event => {
    if (event.stage !== stage) return false
    if (age < event.ageRange[0] || age > event.ageRange[1]) return false
    if (event.isOnce !== false && usedEventIds.has(event.id)) return false
    if (!checkPrerequisites(event, stats, traits, flags)) return false
    return true
  })

  if (eligible.length === 0) return null

  // Weighted random selection
  const totalWeight = eligible.reduce((sum, e) => sum + e.weight, 0)
  let roll = Math.random() * totalWeight
  for (const event of eligible) {
    roll -= event.weight
    if (roll <= 0) return event
  }

  return eligible[eligible.length - 1]
}
