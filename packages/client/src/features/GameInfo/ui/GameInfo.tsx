import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Flex } from 'antd'

type GameInfoProps = {
  scope: number
}

export const GameInfo: FC<GameInfoProps> = ({ scope }) => {
  const startTime = useRef<number>(performance.now())
  const [timeGame, setTimeGame] = useState<string>('00:00:00')

  useEffect(() => {
    let animationFrameId: number

    const updateTimer = () => {
      const milliseconds = performance.now() - startTime.current
      const second = Math.floor(milliseconds / 1000)
      const minute = Math.floor(second / 60)
      const hour = Math.floor(minute / 60)

      setTimeGame(
        `${hour.toString().padStart(2, '0')}:${getFormatedMinute(
          hour,
          minute
        )}:${getFormatedSecond(hour, minute, second)}`
      )
      animationFrameId = requestAnimationFrame(updateTimer)
    }
    animationFrameId = requestAnimationFrame(updateTimer)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const getFormatedMinute = (hour: number, minute: number): string => {
    const formatedHour = hour ? minute - hour * 60 : minute
    return formatedHour.toString().padStart(2, '0')
  }

  const getFormatedSecond = (
    hour: number,
    minute: number,
    second: number
  ): string => {
    const allMinute = parseInt(getFormatedMinute(hour, minute))
    const formatedHour = allMinute ? second - allMinute * 60 : second
    return formatedHour.toString().padStart(2, '0')
  }

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
