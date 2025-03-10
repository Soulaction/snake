import { useCallback, useEffect, useRef, useState } from 'react'
import { Flex } from 'antd'
import { Direction, GameItem, Snake } from '@/features/GameCanvas/model/types'
import {
  useConfigurateCanvas,
  useGameControls,
} from '@/features/GameCanvas/model/hocs'
import { SIZE_OBJECT } from '@/features/GameCanvas/model/gameConstant'
import { drawGame } from '@/features/GameCanvas/lib/drawGame'
import { getRandomInt } from '@/features/GameCanvas/lib'

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previousTime = useRef<number>(0)
  const requestAnimationId = useRef<number>(0)

  const [snake, setSnake] = useState<Snake>([])
  const [endGame, setEndGame] = useState<boolean>(false)
  const [apple, setApple] = useState<GameItem>()

  const configCanvas = useConfigurateCanvas<HTMLCanvasElement>(
    canvasRef,
    SIZE_OBJECT
  )
  const { direction, speed } = useGameControls()

  useEffect(() => {
    if (endGame) {
      console.log('end')
    } else {
      requestAnimationId.current = requestAnimationFrame(gameLoop)
      return () => {
        cancelAnimationFrame(requestAnimationId.current)
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

  const gameLoop = useCallback(
    (timestamp: number) => {
      const deltaTime = timestamp - previousTime.current
      if (deltaTime > speed) {
        previousTime.current = timestamp
        updateGame()
        return
      }
      requestAnimationId.current = requestAnimationFrame(gameLoop)
    },
    [updateGame, speed]
  )

  return (
    <Flex>
      <canvas
        style={{
          border: '1px solid black',
        }}
        ref={canvasRef}></canvas>
    </Flex>
  )
}
