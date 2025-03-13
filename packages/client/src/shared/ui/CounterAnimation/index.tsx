import { FC } from 'react'
import styles from './CounterAnimation.module.css'

interface ICounterAnimation {
  handleAnimationEnd: () => void
}

export const CounterAnimation: FC<ICounterAnimation> = ({
  handleAnimationEnd,
}) => {
  return (
    <>
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
    </>
  )
}
