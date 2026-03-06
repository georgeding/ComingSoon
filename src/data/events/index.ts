import { type GameEvent } from '../../types'
import { babyEvents } from './baby'
import { toddlerEvents } from './toddler'
import { childEvents } from './child'
import { teenEvents } from './teen'
import { youngAdultEvents } from './youngAdult'
import { adultEvents } from './adult'
import { elderEvents } from './elder'

export const allEvents: GameEvent[] = [
  ...babyEvents,
  ...toddlerEvents,
  ...childEvents,
  ...teenEvents,
  ...youngAdultEvents,
  ...adultEvents,
  ...elderEvents,
]
