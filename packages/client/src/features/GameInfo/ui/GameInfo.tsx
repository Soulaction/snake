import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Flex } from 'antd'
import { GameInfoProps } from '@/features/GameInfo/model/gameInfoTypes'
import { formatTimeFromMS } from '@/features/GameInfo/lib'

export const GameInfo: FC<GameInfoProps> = ({ scope }) => {
  const startTime = useRef<number>(performance.now())
  const [timeGame, setTimeGame] = useState<string>(formatTimeFromMS(0))

  useEffect(() => {
    let animationFrameId: number

    const updateTimer = () => {
      const milliseconds = performance.now() - startTime.current

      setTimeGame(formatTimeFromMS(milliseconds))
      animationFrameId = requestAnimationFrame(updateTimer)
    }
    animationFrameId = requestAnimationFrame(updateTimer)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <Flex>
      <h1>Статистика игры</h1>
      <Flex>
        <p>
          <span>Съедено яблок: </span>
          {scope}
        </p>
        <p>
          <span>Время с начала игры: </span>
          {timeGame}
        </p>
      </Flex>
      <Flex>
        <Button color="primary" variant="outlined">
          Пауза
        </Button>
        <Button color="default" variant="outlined">
          Выйти
        </Button>
      </Flex>
    </Flex>
  )
}
