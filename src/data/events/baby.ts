import { type GameEvent } from '../../types'

export const babyEvents: GameEvent[] = [
  {
    id: 'baby_first_words',
    stage: 'baby',
    ageRange: [0, 1],
    weight: 10,
    title: 'First Words',
    description: 'Your tiny mouth forms shapes, and the adults around you lean in excitedly. What sound do you try to make?',
    choices: [
      {
        id: 'say_mama',
        label: 'Mama!',
        description: 'Reach toward the warm figure who holds you most.',
        effects: { stats: { social: 5, happiness: 5 }, addTraits: ['attached'] },
        outcome: 'Your mother\'s eyes light up with pure joy. She holds you close, and you feel safe and warm. This bond will shape who you become.',
      },
      {
        id: 'say_dada',
        label: 'Dada!',
        description: 'Look at the tall figure making funny faces.',
        effects: { stats: { social: 5, happiness: 5 }, addTraits: ['playful'] },
        outcome: 'Your father scoops you up and spins around the room. His laughter fills you with delight. You\'ve discovered the joy of play.',
      },
      {
        id: 'baby_babble',
        label: 'Babababa!',
        description: 'Just enjoy making sounds for the fun of it.',
        effects: { stats: { happiness: 8, intelligence: 3 }, addTraits: ['curious'] },
        outcome: 'You babble endlessly, experimenting with every sound you can make. The world is full of fascinating noises, and you want to make them all.',
      },
    ],
  },
  {
    id: 'baby_crawling',
    stage: 'baby',
    ageRange: [0, 1],
    weight: 10,
    title: 'Learning to Move',
    description: 'The world is so big, and you can see interesting things just out of reach. Your little body wants to move!',
    choices: [
      {
        id: 'crawl_fast',
        label: 'Speed Crawl',
        description: 'Race across the floor with reckless abandon.',
        effects: { stats: { health: 8, happiness: 5 }, addTraits: ['adventurous'] },
        outcome: 'You zoom across the room, bumping into furniture and laughing. The adults scramble to keep up. You\'ve discovered the thrill of speed!',
      },
      {
        id: 'crawl_careful',
        label: 'Careful Exploration',
        description: 'Slowly examine everything you can reach.',
        effects: { stats: { intelligence: 8, health: 3 }, addTraits: ['observant'] },
        outcome: 'You carefully touch and inspect everything within reach. Each texture, each shape is a new discovery. The world is your laboratory.',
      },
      {
        id: 'stand_early',
        label: 'Try to Stand',
        description: 'Grab onto furniture and pull yourself up.',
        effects: { stats: { health: 5, intelligence: 5 }, setFlags: ['early_walker'], addTraits: ['determined'] },
        outcome: 'Wobbling on unsteady legs, you pull yourself up on the coffee table. You fall, get up, fall again. But each time you hold on a little longer.',
      },
    ],
  },
  {
    id: 'baby_night',
    stage: 'baby',
    ageRange: [1, 2],
    weight: 8,
    title: 'Things That Go Bump',
    description: 'It\'s dark and quiet. Strange shadows dance on the wall. Something feels different about nighttime.',
    choices: [
      {
        id: 'cry_comfort',
        label: 'Cry for Comfort',
        description: 'Call out until someone comes to hold you.',
        effects: { stats: { social: 5, happiness: 3 }, addTraits: ['sensitive'] },
        outcome: 'Warm arms lift you up, and a gentle voice hums a lullaby. The shadows don\'t seem so scary anymore. You learn that asking for help is okay.',
      },
      {
        id: 'brave_dark',
        label: 'Watch Quietly',
        description: 'Observe the shadows with wide, curious eyes.',
        effects: { stats: { intelligence: 5, karma: 3 }, addTraits: ['brave'] },
        outcome: 'You watch the shadows dance and realize they\'re just the trees outside. A sense of calm fills you. The dark isn\'t so bad after all.',
      },
    ],
  },
  {
    id: 'baby_food',
    stage: 'baby',
    ageRange: [1, 2],
    weight: 8,
    title: 'New Flavors',
    description: 'A spoon approaches your mouth with something that smells... different. The adults watch you expectantly.',
    choices: [
      {
        id: 'eat_eagerly',
        label: 'Open Wide!',
        description: 'Try everything with enthusiasm.',
        effects: { stats: { health: 8, happiness: 5 }, addTraits: ['open-minded'] },
        outcome: 'Spinach, carrots, peas — you devour it all! Some of it ends up on your face, but you don\'t care. Every bite is an adventure.',
      },
      {
        id: 'picky_eater',
        label: 'Spit It Out',
        description: 'Make a face and refuse the strange food.',
        effects: { stats: { happiness: 3 }, addTraits: ['stubborn'], setFlags: ['picky_eater'] },
        outcome: 'BLEH! You send the green mush flying across the kitchen. The adults sigh, but eventually bring you something sweeter. You know what you like.',
      },
    ],
  },
]
