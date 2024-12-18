'use client'

import { useEffect, useRef, useState } from "react"
import * as PIXI from "pixi.js"

export default function Game() {
  const W: number = 500
  const H: number = 500
  const appRef = useRef<PIXI.Application | null>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [snake, setSnake] = useState()
  const [dots, setDots] = useState()
  const [direction, setDirection] = useState<any>({ x: 1, y: 0 })

  useEffect(() => {
    const app = new PIXI.Application({
      width: W,
      height: H,
      backgroundColor: 0x1099bb,
    })
    appRef.current = app
    document.getElementById("game")?.appendChild(app.view)

    return () => {
      app.destroy(true, true)
    }
  }, [])

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
        {/* <canvas */}
        {/*   width={X_S * Y_S} */}
        {/*   height={X_S * Y_S} */}
        {/*   className="border border-white" */}
        {/* /> */}
        <div id="game" className="relative border border-white" />
      </div>
      {gameOver &&
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
      }
    </>
  )
}

