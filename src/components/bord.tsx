'use client'

import { useEffect, useRef, useState } from "react"
import { Application, Graphics } from 'pixi.js'

export default function Game() {
  const S: number = 25
  const W: number = S * S
  const H: number = S * S
  const appRef = useRef<HTMLDivElement | null>(null)
  const [gameS, setGameS] = useState(false)
  const [score, setScore] = useState(0)
  const [gameO, setGameO] = useState(false)
  const [snake, setSnake] = useState([{ x: 5, y: 5 }])
  const [dots, setDots] = useState({ x: 10, y: 10 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })

  const pixiAppRef = useRef<Application | null>(null)
  const snakeGraphics = useRef<Graphics | null>(null)
  const dotsGraphics = useRef<Graphics | null>(null)

  useEffect(() => {
    const app = new Application({
      width: W,
      height: H,
      backgroundColor: 0x000000,
    })
    pixiAppRef.current = app

    if (appRef.current) {
      appRef.current.appendChild(app.view as any)
    }

    const snakeG = new Graphics()
    snakeG.beginFill(0x00ff00)
    app.stage.addChild(snakeG)
    snakeGraphics.current = snakeG

    const dotsG = new Graphics()
    dotsG.beginFill(0xff0000)
    app.stage.addChild(dotsG)
    dotsGraphics.current = dotsG

    return () => {
      app.destroy(true, { children: true })
    }
  }, [])

  useEffect(() => {
    if (!gameS || gameO) return

    const moveSnake = () => {
      const newSnake = [...snake]
      const head = { ...newSnake[0] }
      head.x += direction.x
      head.y += direction.y

      if (
        head.x < 0 || head.x >= S ||
        head.y < 0 || head.y >= S ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameO(true)
        return
      }

      newSnake.unshift(head)

      if (head.x === dots.x && head.y === dots.y) {
        setScore(prevScore => prevScore + 1)
        setDots({
          x: Math.floor(Math.random() * S),
          y: Math.floor(Math.random() * S),
        })
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)
    }

    const gameLoop = setInterval(moveSnake, 150)

    return () => {
      clearInterval(gameLoop)
    }
  }, [snake, direction, dots, gameO, gameS])



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
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction])

  useEffect(() => {
    if (!snakeGraphics.current || !dotsGraphics.current) return

    const snakeG = snakeGraphics.current
    const dotsG = dotsGraphics.current

    snakeG.clear()
    dotsG.clear()

    snakeG.beginFill(0x4CAF50)
    snake.forEach(segment => {
      snakeG.drawRoundedRect(segment.x * S, segment.y * S, S, S, 10)
    })
    snakeG.endFill()

    dotsG.beginFill(0xFF9800)
    dotsG.drawCircle(dots.x * S + S / 2, dots.y * S + S / 2, S / 2)
    dotsG.endFill()
  }, [snake, dots])

  const restartGame = () => {
    setSnake([{ x: 5, y: 5 }])
    setDirection({ x: 1, y: 0 })
    setDots({ x: 10, y: 10 })
    setGameO(false)
    setScore(0)
    setGameS(true)
  }

  console.log("gameS", gameS)
  console.log("snake", snake)
  console.log("direction", direction)
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold p-8">Snake Game</h1>
      {!gameS && (
        <div className="text-center">
          <button
            className="bg-sky-800 text-white font-bold p-3 rounded"
            onClick={() => setGameS(true)}
          >
            Start Game
          </button>
        </div>)}
      <div className="bg-sky-800 p-3 m-3 rounded text-white text-center">
        Score: {score}
      </div>
      <div ref={appRef} className="border border-gray-300"></div>
      {gameO && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
          <div className="bg-white px-20 py-10 rounded text-center">
            <h2 className="text-2xl font-bold py-4 text-sky-800">Game Over</h2>
            <h4 className="mb-4 text-sky-500 py-4 text-xl">Your score: {score}</h4>
            <button
              className="bg-sky-800 text-white font-bold p-3 rounded"
              onClick={restartGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
