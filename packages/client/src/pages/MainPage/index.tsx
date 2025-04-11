import type { FC } from 'react'
import {
  Feature,
  Gameplay,
  Leaderboard,
  Main,
  Requirements,
  Reviews,
} from './sections'
import { Layout, Button, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { Navbar } from '@/shared/ui'
import { anchorItems } from './model/anchor-items'
import styles from './MainPage.module.css'
import { useAppSelector } from '@/shared/hooks'

const { Content, Header } = Layout

export const MainPage: FC = () => {
  const navigate = useNavigate()
  const { isAuth } = useAppSelector(state => state.user)
  const handlePlayClick = () => {
    navigate(RouterPaths.LOGIN)
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Row justify="space-between" align="middle">
          <Col>
            <Navbar items={anchorItems} />
          </Col>
          <Col>
            {!isAuth && (
              <Button
                className={styles.actionBtn}
                size="large"
                onClick={handlePlayClick}>
                Войти
              </Button>
            )}
          </Col>
        </Row>
      </Header>
      <Content>
        <Main />
        <Feature />
        <Gameplay />
        <Leaderboard />
        <Reviews />
        <Requirements />
      </Content>
    </Layout>
  )
}
