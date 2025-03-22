import { KeyboardEvent, useEffect, useState } from 'react'
import { Direction } from '@/features/GameCanvas/model/types'
import { DEFAULT_SPEED } from '@/features/GameCanvas/model/gameConstant'

export const useGameControls = (): {
  direction: Direction
  speed: number
  increaseSpeed: () => void
} => {
  const [direction, setDirection] = useState<Direction>(Direction.ArrowRight)
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED)
  const [isBoosted, setIsBoosted] = useState<boolean>(false)

  const increaseSpeed = () => {
    setSpeed(prevSpeed => {
      return prevSpeed / 1.1
    })
  }

  const toggleBoost = () => {
    setIsBoosted(isBoosted => {
      setSpeed(prevSpeed => {
        return !isBoosted ? prevSpeed / 2 : prevSpeed * 2
      })

      return !isBoosted
    })
  }

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
          toggleBoost()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { direction, speed, increaseSpeed }
}
