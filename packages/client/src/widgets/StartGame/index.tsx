import { FC, useState } from 'react'
import { Button, Flex } from 'antd'
import styles from './Start.module.css'
import { CounterAnimation } from '@/shared/ui'

interface IStartGameProps {
  playGame: () => void
}

export const StartGame: FC<IStartGameProps> = ({ playGame }) => {
  const [started, setStarted] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const startAnimation = () => {
    setStarted(true)
    setIsAnimationComplete(false)
  }

  const handleAnimationEnd = () => {
    setIsAnimationComplete(true)
    playGame()
  }

  return (
    <>
      <Flex className={styles.container} justify="center" align="center">
        {!started && (
          <Button
            className={styles.button}
            type="primary"
            size="large"
            onClick={startAnimation}>
            <span className={styles['button-text']}>Старт</span>
          </Button>
        )}
        {started && !isAnimationComplete && (
          <CounterAnimation handleAnimationEnd={handleAnimationEnd} />
        )}
      </Flex>
    </>
  )
}
