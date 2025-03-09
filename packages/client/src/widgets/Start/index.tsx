import { useState } from 'react'
import { Button } from 'antd'
import styles from './Start.module.css'

export const Start = () => {
  const [started, setStarted] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const startAnimation = () => {
    setStarted(true)
    setIsAnimationComplete(false)
  }

  const handleAnimationEnd = () => {
    setIsAnimationComplete(true)
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
        <div className={styles['container']}>
          <div className={styles['wrapper']}>
            <span className={styles['five']}>5</span>
            <span className={styles['four']}>4</span>
            <span className={styles['three']}>3</span>
            <span className={styles['two']}>2</span>
            <span className={styles['one']}>1</span>
            <span className={styles['go']} onAnimationEnd={handleAnimationEnd}>
              Go
            </span>
          </div>
        </div>
      )}
    </>
  )
}
