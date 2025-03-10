import { MainLayout } from '@/widgets'
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  ConfigCanvas,
  useConfigurateCanvas,
} from '@/pages/GamePage/hooks/useCulcSizeCanvas'
import s from './GamePage.module.css'
import { GameInfo } from '@/features/GameInfo/ui/GameInfo'

export type Snake = GameItem[]

export type GameItem = {
  x: number
  y: number
}

export enum Direction {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

export const SIZE_OBJECT = 10
export const COLOR_SNAKE = 'green'
export const COLOR_APPLE = 'red'
export const DEFAULT_SPEED = 200

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}

const drawGame = (
  configCanvas: ConfigCanvas,
  snake: Snake,
  apple: GameItem
) => {
  const {
    ctx,
    sizeCanvas: { width, height },
  } = configCanvas
  if (ctx) {
    ctx.clearRect(0, 0, width, height)

    if (apple) {
      ctx.rect(apple.x, apple.y, SIZE_OBJECT, SIZE_OBJECT)
      drawGameItem(ctx, apple, SIZE_OBJECT, COLOR_APPLE)
    }
    snake.forEach(snakeItem => {
      drawGameItem(ctx, snakeItem, SIZE_OBJECT, COLOR_SNAKE)
    })
  }
}

const drawGameItem = (
  ctxCanvas: CanvasRenderingContext2D,
  gameItem: GameItem,
  sizeObject: number,
  color: string
) => {
  ctxCanvas.fillStyle = color
  ctxCanvas.beginPath()
  ctxCanvas.rect(gameItem.x, gameItem.y, sizeObject, sizeObject)
  ctxCanvas.fill()
}

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previousTime = useRef<number>(0)
  const requestId = useRef<number>(0)

  const [snake, setSnake] = useState<Snake>([])
  const [direction, setDirection] = useState<Direction>(Direction.ArrowRight)
  const [endGame, setEndGame] = useState<boolean>(false)
  const [apple, setApple] = useState<GameItem>()
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED)

  const configCanvas = useConfigurateCanvas<HTMLCanvasElement>(
    canvasRef,
    SIZE_OBJECT
  )

  const updateGame = useCallback(() => {
    const { width: widthCanvas, height: heightCanvas } = configCanvas.sizeCanvas
    const headNode = snake.at(-1)
    if (!headNode || !apple) {
      return
    }

    const newHeadNode: GameItem = transformSnake(headNode)
    let newSnake: Snake

    if (newHeadNode.x === apple.x && newHeadNode.y === apple.y) {
      const dopItemSnake: GameItem = transformSnake(newHeadNode)
      newSnake = [...snake.slice(1), newHeadNode, dopItemSnake]
      generateApple()
    } else {
      newSnake = [...snake.slice(1), newHeadNode]
    }

    let intersectionWithMyself = false
    // на длине - 3 не имеет смысл проверять, и первые три узла не могут быть в пересечении
    for (let i = 0; newSnake.length > 3 && i < newSnake.length - 3; i++) {
      const checkNode = newSnake[i]
      if (checkNode.x === newHeadNode.x && checkNode.y === newHeadNode.y) {
        intersectionWithMyself = true
      }
    }

    if (
      intersectionWithMyself ||
      0 > newHeadNode.x ||
      0 > newHeadNode.y ||
      widthCanvas < newHeadNode.x ||
      heightCanvas < newHeadNode.y
    ) {
      setEndGame(true)
    } else {
      drawGame(configCanvas, newSnake, apple)
      setSnake(newSnake)
    }
  }, [configCanvas, snake, direction])

  const transformSnake = useCallback(
    (oldHeadNode: GameItem): GameItem => {
      const { x: headX, y: headY } = oldHeadNode
      const newHeadNode = {
        x: headX,
        y: headY,
      }

      switch (direction) {
        case Direction.ArrowUp:
          newHeadNode.y = headY - SIZE_OBJECT
          break
        case Direction.ArrowDown:
          newHeadNode.y = headY + SIZE_OBJECT
          break
        case Direction.ArrowLeft:
          newHeadNode.x = headX - SIZE_OBJECT
          break
        default:
          newHeadNode.x = headX + SIZE_OBJECT
          break
      }
      return newHeadNode
    },
    [direction]
  )

  const gameLoop = useCallback(
    (timestamp: number) => {
      const deltaTime = timestamp - previousTime.current
      if (deltaTime > speed) {
        previousTime.current = timestamp
        updateGame()
        return
      }
      requestId.current = requestAnimationFrame(gameLoop)
    },
    [updateGame, speed]
  )

  const generateApple = useCallback(() => {
    const freedomCells: GameItem[] = []

    for (let i = 0; i < configCanvas.sizeCanvas.countCellWidth; i++) {
      for (let j = 0; j < configCanvas.sizeCanvas.countCellHeight; j++) {
        const checkCell: GameItem = { x: i * SIZE_OBJECT, y: j * SIZE_OBJECT }
        const isExist = snake.find(
          item => item.x === checkCell.x && item.y === checkCell.y
        )
        if (isExist) {
          continue
        }
        freedomCells.push(checkCell)
      }
    }

    const indexRandom = getRandomInt(0, freedomCells.length)
    setApple(freedomCells[indexRandom])
  }, [configCanvas, snake])

  useEffect(() => {
    if (endGame) {
      console.log('end')
    } else {
      requestId.current = requestAnimationFrame(gameLoop)
      return () => {
        cancelAnimationFrame(requestId.current)
      }
    }
  }, [snake, apple, direction, endGame])

  useEffect(() => {
    const {
      center: { x: snakeX, y: snakeY },
    } = configCanvas

    if (snakeX !== 0 && snakeY !== 0) {
      generateApple()
      setSnake([{ x: snakeX, y: snakeY }])
    }
  }, [configCanvas])

  useEffect(() => {
    const handleKeyDown = (event: Event): void => {
      const keyboardEvent = event as unknown as KeyboardEvent

      switch (keyboardEvent.code) {
        case Direction.ArrowUp:
          setDirection(prevDirection => {
            if (prevDirection === Direction.ArrowDown) {
              return prevDirection
            }
            return keyboardEvent.code as Direction
          })
          break
        case Direction.ArrowDown:
          setDirection(prevDirection => {
            if (prevDirection === Direction.ArrowUp) {
              return prevDirection
            }
            return keyboardEvent.code as Direction
          })
          break
        case Direction.ArrowLeft:
          setDirection(prevDirection => {
            if (prevDirection === Direction.ArrowRight) {
              return prevDirection
            }
            return keyboardEvent.code as Direction
          })
          break
        case Direction.ArrowRight:
          setDirection(prevDirection => {
            if (prevDirection === Direction.ArrowLeft) {
              return prevDirection
            }
            return keyboardEvent.code as Direction
          })
          break
        case 'Space':
          setSpeed(prevSpeed => {
            if (DEFAULT_SPEED === prevSpeed) {
              return prevSpeed / 5
            }
            return DEFAULT_SPEED
          })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <MainLayout isHeader={false} className={s.canvasGame}>
        <canvas
          style={{
            border: '1px solid black',
          }}
          ref={canvasRef}></canvas>
      </MainLayout>
      <GameInfo scope={snake.length - 1}></GameInfo>
    </>
  )
}
