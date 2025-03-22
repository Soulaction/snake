import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Card, Flex, Popconfirm, PopconfirmProps } from 'antd'
import s from './GameInfo.module.css'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { StatusGame } from '@/widgets/Game/model/types'
import { setStatusGame } from '@/widgets/Game/model/gemeSlice'
import { formatTimeFromSecond } from '@/features/GameInfo/lib/formatedTimeFromMS'
import { store } from '@/app/store'

export const GameInfo: FC = () => {
  const timeGameSecond = useRef<number>(0)
  const intervalId = useRef<ReturnType<typeof setInterval>>()
  const [timeGame, setTimeGame] = useState<string>(formatTimeFromSecond(0))
  const [isPause, setIsPause] = useState<boolean>(false)

  const score = useAppSelector(state => state.game.score)
  const currentLevel = useAppSelector(state => state.game.level)
  const statusGame = useAppSelector(state => state.game.statusGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (statusGame === StatusGame.Process) {
      const updateTimer = () => {
        timeGameSecond.current += 1
        setTimeGame(formatTimeFromSecond(timeGameSecond.current))
      }

      intervalId.current = setInterval(updateTimer, 1000)
      return () => {
        updateTimer()
        clearInterval(intervalId.current)
      }
    }
  }, [statusGame])

  const togglePause = useCallback(() => {
    if (statusGame === StatusGame.Pause) {
      setIsPause(false)
      dispatch(setStatusGame(StatusGame.Process))
    } else {
      setIsPause(true)
      dispatch(setStatusGame(StatusGame.Pause))
    }
  }, [isPause])

  const handleOpenChange = useCallback((isOpen: boolean): void => {
    if (store.getState().game.statusGame === StatusGame.End) {
      return
    }
    if (isOpen) {
      dispatch(setStatusGame(StatusGame.Pause))
    } else {
      dispatch(setStatusGame(StatusGame.Process))
    }
  }, [])

  const confirm: PopconfirmProps['onConfirm'] = useCallback(() => {
    dispatch(setStatusGame(StatusGame.End))
  }, [])

  return (
    <Flex className={s.gameInfo} vertical>
      <h1 className={s.gameInfoTitle}>Информация об игре</h1>
      <Flex vertical>
        <p>
          <span className={s.gameDescriptionTitle}>Съедено яблок: </span>
          {score}
        </p>
        <p>
          <span className={s.gameDescriptionTitle}>Текущий уровень: </span>
          {currentLevel}
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
            <p>&nbsp;- ускорение (вкл./выкл. по нажатию)</p>
          </Flex>
        </Flex>
      </Card>
      <Flex justify="space-between">
        <Button color="primary" variant="outlined" onClick={togglePause}>
          {isPause ? 'Продолжить' : 'Пауза'}
        </Button>
        <Popconfirm
          placement="topRight"
          title="Вы действительно хотите покинуть игру?"
          onConfirm={confirm}
          onOpenChange={handleOpenChange}
          okText="Закончить игру"
          cancelText="Продолжить игру">
          <Button color="default" variant="outlined">
            Закончить игру
          </Button>
        </Popconfirm>
      </Flex>
    </Flex>
  )
}
