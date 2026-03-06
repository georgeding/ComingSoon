import { useGameStore } from '../../store/gameStore'

export function MainMenu() {
  const startGame = useGameStore((s) => s.startGame)

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-game-dark via-game-blue/30 to-game-dark">
      <div className="text-center animate-fade-in">
        <h1 className="text-7xl font-bold text-white mb-2 tracking-tight">
          Life<span className="text-game-accent">Sim</span>
        </h1>
        <p className="text-xl text-gray-400 mb-2 font-light tracking-widest uppercase">
          Live Your Story
        </p>
        <p className="text-sm text-gray-500 mb-12 max-w-md mx-auto">
          From first breath to final wisdom — every choice shapes your destiny.
          No two lives are the same.
        </p>

        <button
          onClick={startGame}
          className="group relative px-12 py-4 bg-game-accent hover:bg-game-accent/80 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-game-accent/30"
        >
          <span className="relative z-10">Begin New Life</span>
          <div className="absolute inset-0 rounded-lg bg-game-accent/50 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50" />
        </button>

        <div className="mt-16 flex gap-8 text-gray-500 text-xs">
          <div className="flex flex-col items-center">
            <span className="text-2xl text-game-gold mb-1">7</span>
            <span>Life Stages</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl text-game-green mb-1">50+</span>
            <span>Events</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl text-game-accent mb-1">∞</span>
            <span>Possibilities</span>
          </div>
        </div>
      </div>
    </div>
  )
}
