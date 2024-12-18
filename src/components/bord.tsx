'use client'

import { useEffect, useRef, useState } from "react"
import * as PIXI from "pixi.js"

export default function Game() {
  const W: number = 500
  const H: number = 500
  const appRef = useRef<PIXI.Application | null>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [snake, setSnake] = useState([{ x: 5, y: 5 }])
  const [dots, setDots] = useState({ x: 10, y: 10 })
  const [direction, setDirection] = useState<any>({ x: 1, y: 0 })

  useEffect(() => {
    const app = new PIXI.Application({
      width: W,
      height: H,
      backgroundColor: 0x1099bb,
    })
    appRef.current = app
    document.getElementById("game")?.appendChild(app.view as any)

    const snakeGraphics = new PIXI.Graphics()
    app.stage.addChild(snakeGraphics)

    const dotsGraphics = new PIXI.Graphics()
    app.stage.addChild(dotsGraphics)


    const render = () => {
      snakeGraphics.clear()
      dotsGraphics.clear()

      snakeGraphics.beginFill(0x00ff00)
      snake.forEach(segment => {
        snakeGraphics.drawRect(segment.x * 25, segment.y * 25, 25, 25)
      })
      snakeGraphics.endFill()

      dotsGraphics.beginFill(0xff0000)
      dotsGraphics.drawRect(dots.x * 25, dots.y * 25, 25, 25)
      dotsGraphics.endFill()
    }
    app.ticker.add(render)

    return () => {
      app.ticker.remove(render)
      app.destroy(true, true)
    }
  }, [snake, dots])


  useEffect(() => {
    const ticker = new PIXI.Ticker()
    ticker.add(() => {
      if (gameOver) return

      const newSnake = [...snake]
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y }

      if (
        head.x < 0 || head.x >= 25 ||
        head.y < 0 || head.y >= 25 ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true)
        ticker.stop()
        return
      }

      newSnake.unshift(head)

      if (head.x === dots.x && head.y === dots.y) {
        setScore(prev => prev + 1)
        setDots({ x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25) })
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)
    })

    ticker.start()

    return () => {
      ticker.stop()
    }
  }, [snake, direction, dots, gameOver])

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

