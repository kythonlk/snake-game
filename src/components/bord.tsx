'use client'

export default function Game() {
  const X = 25
  const Y = 25

  return (
    <>
      <div className="bg-sky-800 p-3 m-3 rounded text-white text-center">
        Score:
      </div >
      <div className="relative">
        <canvas
          width={X * Y}
          height={Y * X}
          className="border border-white"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-8 rounded text-center">
          <h2 className="text-2xl font-bold py-4 text-sky-800">Game Over</h2>
          <button
            className="bg-sky-800 text-white font-bold p-3 rounded"
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  )
}

