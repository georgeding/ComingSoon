export type LifeStage = 'baby' | 'toddler' | 'child' | 'teen' | 'youngAdult' | 'adult' | 'elder'

export interface Stats {
  health: number
  happiness: number
  intelligence: number
  social: number
  wealth: number
  karma: number
}

export interface Prerequisites {
  minStats?: Partial<Stats>
  traits?: string[]
  flags?: string[]
  excludeTraits?: string[]
  excludeFlags?: string[]
}

export interface ChoiceEffect {
  stats?: Partial<Stats>
  addTraits?: string[]
  removeTraits?: string[]
  setFlags?: string[]
}

export interface Choice {
  id: string
  label: string
  description: string
  effects: ChoiceEffect
  outcome: string
  prerequisites?: Prerequisites
}

export interface GameEvent {
  id: string
  stage: LifeStage
  ageRange: [number, number]
  prerequisites?: Prerequisites
  weight: number
  title: string
  description: string
  choices: Choice[]
  isOnce?: boolean
}

export interface HistoryEntry {
  age: number
  stage: LifeStage
  eventId: string
  eventTitle: string
  choiceId: string
  choiceLabel: string
  outcome: string
}

export const STAGE_CONFIG: Record<LifeStage, { label: string; ageRange: [number, number]; color: string }> = {
  baby: { label: 'Baby', ageRange: [0, 2], color: '#FFB6C1' },
  toddler: { label: 'Toddler', ageRange: [3, 5], color: '#FFD700' },
  child: { label: 'Child', ageRange: [6, 12], color: '#87CEEB' },
  teen: { label: 'Teenager', ageRange: [13, 17], color: '#9B59B6' },
  youngAdult: { label: 'Young Adult', ageRange: [18, 25], color: '#E94560' },
  adult: { label: 'Adult', ageRange: [26, 59], color: '#16C79A' },
  elder: { label: 'Elder', ageRange: [60, 80], color: '#F5A623' },
}

export const LIFE_STAGES: LifeStage[] = ['baby', 'toddler', 'child', 'teen', 'youngAdult', 'adult', 'elder']

export type GamePhase = 'menu' | 'playing' | 'stageTransition' | 'gameOver'
