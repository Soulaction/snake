import type { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import styles from './EndGame.module.css'

type IEndGame = {
  score: number
  rating: number
  startNewGame: () => void
  gotoMainMenu: () => void
}

export const EndGame: FC<IEndGame> = ({
  score,
  rating,
  startNewGame,
  gotoMainMenu,
}) => {
  const { Title } = Typography

  return (
    <Flex
      className={styles['inlet']}
      gap="middle"
      vertical
      align="center"
      justify="center">
      <Title>Вы молодец!</Title>
      <Title level={3}>
        Ваш результат: <span className={styles['red']}>{score}</span> яблок
      </Title>
      <Title level={3}>
        Вы сейчас на <span className={styles['green']}>{rating}</span> месте в
        общем зачете
      </Title>
      <Flex gap="middle" className={styles['margins-48']}>
        <Button type="primary" onClick={startNewGame}>
          Начать заново
        </Button>
        <Button onClick={gotoMainMenu}>В главное меню</Button>
      </Flex>
    </Flex>
  )
}
