import type { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import styles from './EndGame.module.css'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'

type IEndGame = {
  score: number
  rating: number
  startNewGame: () => void
}

function plural(n: number, text: string[]): string {
  let key = 2
  if (n % 10 === 1 && n % 100 !== 11) {
    key = 0
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    key = 1
  }

  return text[key]
}

export const EndGame: FC<IEndGame> = ({ score, rating, startNewGame }) => {
  const { Title } = Typography

  const navigate = useNavigate()
  const gotoMainMenu = () => {
    navigate(RouterPaths.MAIN)
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
        Ваш результат: <span className={styles['red']}>{score}</span>{' '}
        {plural(score, ['яблоко', 'яблока', 'яблок'])}
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
