import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import styles from './Main.module.css'
import mainPageStyles from '../../MainPage.module.css'

const { Paragraph } = Typography

export const Main: FC = () => {
  const navigate = useNavigate()

  const handlePlayClick = () => {
    navigate(RouterPaths.game)
  }

  return (
    <section id="#" className={styles.section}>
      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.container}>
        <h1 className={styles.title}>
          Змейка: Классическая Игра
          <br />С Новым Поворотом
        </h1>
        <Paragraph className={styles.description}>
          Погрузись в увлекательное приключение, собирай еду и поставь новые
          рекорды
        </Paragraph>
        <Button
          className={`${mainPageStyles.actionBtn}`}
          size="large"
          icon={<ArrowRightOutlined />}
          onClick={handlePlayClick}>
          Начать игру
        </Button>
      </Flex>
    </section>
  )
}
