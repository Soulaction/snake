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
        <span className={styles.go} onAnimationEnd={handleAnimationEnd}>
          Go
        </span>
      </Flex>
    </>
  )
}
