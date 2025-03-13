import { FC } from 'react'
import styles from './CounterAnimation.module.css'
import { Flex } from 'antd'

interface ICounterAnimationProps {
  handleAnimationEnd: () => void
}

export const CounterAnimation: FC<ICounterAnimationProps> = ({
  handleAnimationEnd,
}) => {
  return (
    <>
      <Flex className={styles.container} justify="center" align="center">
        <span className={styles.five}>5</span>
        <span className={styles.four}>4</span>
        <span className={styles.three}>3</span>
        <span className={styles.two}>2</span>
        <span className={styles.one}>1</span>
        <span className={styles.go} onAnimationEnd={handleAnimationEnd}>
          Go
        </span>
      </Flex>
    </>
  )
}
