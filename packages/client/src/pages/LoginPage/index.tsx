import { FC, useEffect, useRef, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Typography } from 'antd'
import {
  ISigninDTO,
  signController,
} from '@/shared/controllers/sign-controller'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { getUserData } from '@/entities/User/service'
import { useInitStatePage } from '@/shared/hooks/useInitStatePage'
import { REDIRECT_URI } from '@/shared/constants/api'

const { Title } = Typography

export const LoginPage: FC = () => {
  useInitStatePage({ initPage: initLoginPage })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)
  const userWasFetchedRef = useRef(false)
  const [urlOAuth, setUrlOAuth] = useState('')

  useEffect(() => {
    if (!urlOAuth) {
      signController.getServiceId({ redirect_uri: REDIRECT_URI }, service_id =>
        setUrlOAuth(
          `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
          )}`
        )
      )
    }
  }, [])

  const onFinish = async (values: ISigninDTO) => {
    const path = location.state?.from || RouterPaths.GAME
    await signController.login(values, () => {
      dispatch(getUserData())
      navigate(path)
      userWasFetchedRef.current = true
    })
  }

  useEffect(() => {
    if (userWasFetchedRef.current && user) {
      userWasFetchedRef.current = false
      signController.createAccountInSnakeService(user)
    }
  }, [user])

  return (
    <Flex justify="center" align="center" style={{ height: '100%' }} vertical>
      <Title>Вход</Title>
      <Form
        name="login"
        style={{ minWidth: 400 }}
        onFinish={onFinish}
        validateTrigger={['onBlur']}>
        <Form.Item
          name="login"
          rules={[{ required: true, message: 'Введите логин' }]}>
          <Input prefix={<UserOutlined />} placeholder="Логин" name="login" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
            name="password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            icon={<LockOutlined />}>
            Войти
          </Button>
          или{' '}
          <NavLink to={RouterPaths.REGISTRATION}>Зарегистрироваться</NavLink>
          {urlOAuth && (
            <>
              {' '}
              <a href={urlOAuth}>Войти через яндекс</a>
            </>
          )}
        </Form.Item>
      </Form>
    </Flex>
  )
}

export const initLoginPage = () => Promise.resolve()
