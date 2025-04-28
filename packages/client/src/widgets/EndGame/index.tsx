import { useEffect, type FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import styles from './EndGame.module.css'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { useAppSelector } from '@/shared/hooks'
import { leaderboardController } from '@/shared/controllers/leaderboard-controller'

type IEndGame = {
  score: number
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

export const EndGame: FC<IEndGame> = ({ score, startNewGame }) => {
  const { Title } = Typography

  const navigate = useNavigate()
  const gotoMainMenu = () => {
    navigate(RouterPaths.MAIN)
  }

  const first_name = useAppSelector(state => state.user.user?.first_name)

  useEffect(() => {
    const data = {
      name: first_name as string,
      score_ypgang: score,
    }
    leaderboardController.createLeader(data)
  }, [])

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
      <Flex gap="middle" className={styles['margins-48']}>
        <Button type="primary" onClick={startNewGame}>
          Начать заново
        </Button>
        <Button onClick={gotoMainMenu}>В главное меню</Button>
      </Flex>
    </Flex>
  )
}
