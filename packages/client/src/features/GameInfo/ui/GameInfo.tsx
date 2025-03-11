import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Card, Flex } from 'antd'
import { GameInfoProps } from '@/features/GameInfo/model/gameInfoTypes'
import { formatTimeFromMS } from '@/features/GameInfo/lib'
import s from './GameInfo.module.css'

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
    <Flex className={s.gameInfo} vertical>
      <h1 className={s.gameInfoTitle}>Информация об игре</h1>
      <Flex vertical>
        <p>
          <span className={s.gameDescriptionTitle}>Съедено яблок: </span>
          {scope}
        </p>
        <p>
          <span className={s.gameDescriptionTitle}>Время с начала игры: </span>
          {timeGame}
        </p>
      </Flex>
      <Card
        title="🎮 Управление игрой"
        variant="borderless"
        className={s.gameInfoManagement}>
        <Flex vertical gap={10}>
          <Flex align="center">
            <Button color="default" variant="text">
              ⬆
            </Button>
            <p>&nbsp;- движение вверх</p>
          </Flex>
          <Flex align="center">
            <Button color="default" variant="text">
              ⬇
            </Button>
            <p>&nbsp;- движение вниз</p>
          </Flex>
          <Flex align="center">
            <Button color="default" variant="text">
              ⬅
            </Button>
            <p>&nbsp;- движение влево</p>
          </Flex>
          <Flex align="center">
            <Button color="default" variant="text">
              ➡
            </Button>
            <p>&nbsp;- движение вправо</p>
          </Flex>
          <Flex align="center">
            <Button size="small">Space</Button>
            <p>&nbsp;- усколениеи (вкл./выкл. по нажатию)</p>
          </Flex>
        </Flex>
      </Card>
      <Flex justify="space-between">
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
