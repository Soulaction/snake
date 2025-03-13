import type { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import styles from './EndGame.module.css'
import { useNavigate } from 'react-router-dom'

type IEndGame = {
  score: number
  rating: number
  startNewGame: () => void
}

export const EndGame: FC<IEndGame> = ({ score, rating, startNewGame }) => {
  const { Title } = Typography

  const navigate = useNavigate()
  const gotoMainMenu = () => {
    navigate('/')
  }

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
