import { useEffect, type FC } from 'react'
import {
  Feature,
  Gameplay,
  Leaderboard,
  Main,
  Requirements,
  Reviews,
} from './sections'
import { Layout, Button, Row, Col } from 'antd'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { Navbar } from '@/shared/ui'
import { anchorItems } from './model/anchor-items'
import styles from './MainPage.module.css'

const { Content, Header } = Layout

export const MainPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    console.log({ location, params })
    if (params.has('code')) {
      navigate(RouterPaths.login, {
        state: {
          from: location,
        },
      })
    }
  }, [location.search])

  const handlePlayClick = () => {
    navigate(RouterPaths.game)
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Row justify="space-between" align="middle">
          <Col>
            <Navbar items={anchorItems} />
          </Col>
          <Col>
            <Button
              className={styles.actionBtn}
              size="large"
              onClick={handlePlayClick}>
              Играть
            </Button>
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
