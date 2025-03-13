import { FC, useState } from 'react'
import { Button } from 'antd'
import styles from './Start.module.css'
import { CounterAnimation } from '@/shared/ui'

interface IStartGameProps {
  onStartClick?: () => void
  playGame: () => void
}

export const StartGame: FC<IStartGameProps> = ({ onStartClick, playGame }) => {
  const [started, setStarted] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const startAnimation = () => {
    if (onStartClick) {
      onStartClick()
    }
    setStarted(true)
    setIsAnimationComplete(false)
  }

  const handleAnimationEnd = () => {
    setIsAnimationComplete(true)
    playGame()
  }

  return (
    <>
      {!started && (
        <div className={styles['button-container']}>
          <Button
            className={styles['button']}
            type="primary"
            size="large"
            onClick={startAnimation}>
            <span className={styles['button-text']}>Старт</span>
          </Button>
        </div>
      )}
      {started && !isAnimationComplete && (
        <CounterAnimation handleAnimationEnd={handleAnimationEnd} />
      )}
    </>
  )
}
