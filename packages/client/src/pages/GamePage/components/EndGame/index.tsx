import type { FC } from 'react'
import { Button, Flex, Typography } from 'antd'

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
      style={{ width: '100%', height: '100%' }}
      gap="middle"
      vertical
      align="center"
      justify="center">
      <Title>Вы молодец!</Title>
      <Title level={3}>
        Ваш результат: <span style={{ color: 'red' }}>{score}</span> яблок
      </Title>
      <Title level={3}>
        Вы сейчас на <span style={{ color: 'green' }}>{rating}</span> месте в
        общем зачете
      </Title>
      <Flex gap="middle" style={{ marginTop: '48px', marginBottom: '48px' }}>
        <Button type="primary" onClick={startNewGame}>
          Начать заново
        </Button>
        <Button onClick={gotoMainMenu}>В главное меню</Button>
      </Flex>
    </Flex>
  )
}
