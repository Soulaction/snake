import { useEffect, type FC } from 'react'
import {
  Feature,
  Gameplay,
  Leaderboard,
  Main,
  Requirements,
  Reviews,
} from './sections'
import { Button, Col, Layout, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { Navbar } from '@/shared/ui'
import { anchorItems } from './model/anchor-items'
import styles from './MainPage.module.css'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useInitStatePage } from '@/shared/hooks/useInitStatePage'
import { signController } from '@/shared/controllers/sign-controller'
import { REDIRECT_URI } from '@/shared/constants/api'
import { getUserData } from '@/entities/User/service'

const { Content, Header } = Layout

export const MainPage: FC = () => {
  useInitStatePage({ initPage: initMainPage })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    console.log({ location, params })
    if (code) {
      const oauthData = {
        code,
        redirect_uri: REDIRECT_URI,
      }
      signController.loginOAuth(oauthData, () => {
        dispatch(getUserData())
        navigate(RouterPaths.GAME)
      })
    }
  }, [location.search])

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

export const initMainPage = () => Promise.resolve()
