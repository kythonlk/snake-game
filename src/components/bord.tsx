'use client'

import { useEffect, useState } from "react"

export default function Game() {
  const X_S: number = 25
  const Y_S: number = 25
  const [score, setScore] = useState(0)
  const [direction, setDirection] = useState<any>({ x: 1, y: 0 })

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [direction])

  console.log("direction", direction)

  return (
    <>
      <div className="bg-sky-800 p-3 m-3 rounded text-white text-center">
        Score: {score}
      </div >
      <div className="relative">
        <canvas
          width={X_S * Y_S}
          height={X_S * Y_S}
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

