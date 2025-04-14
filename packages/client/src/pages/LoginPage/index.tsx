import { FC, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Typography } from 'antd'
import {
  ISigninDTO,
  signController,
} from '@/shared/controllers/sign-controller'
import { useAppDispatch } from '@/shared/hooks'
import { NavLink, redirect, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { getUserData } from '@/entities/User/service'

const { Title } = Typography

export const REDIRECT_URI = 'http://localhost:3000'

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [urlOAuth, setUrlOAuth] = useState('')

  useEffect(() => {
    signController.getServiceId({ redirect_uri: REDIRECT_URI }, service_id =>
      setUrlOAuth(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${encodeURIComponent(
          REDIRECT_URI
        )}`
      )
    )    

    if (location.state?.from.search) {
      const params = new URLSearchParams(location.state?.from.search)
      const path = location.state?.from.pathname || RouterPaths.main
      const oauthData = {
        code: params.get('code') || '',
        redirect_uri: REDIRECT_URI,
      }
      signController.loginOAuth(oauthData, () => {
        dispatch(getUserData())
        navigate(path)
      })
    }
  }, [])

  const onFinish = async (values: ISigninDTO) => {
    const path = location.state?.from.pathname || RouterPaths.main
    await signController.login(values, () => {
      dispatch(getUserData())
      navigate(path)
    })
  }

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
          <NavLink to={RouterPaths.registration}>Зарегистрироваться</NavLink>
          { urlOAuth && <a href={urlOAuth}>Войти через яндекс</a> }
        </Form.Item>
      </Form>
    </Flex>
  )
}
