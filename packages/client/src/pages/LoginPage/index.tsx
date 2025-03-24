import type { FC } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Flex, Typography } from 'antd'
import { signController } from '@/shared/controllers/sign-controller'
import { ISigninDTO } from '@/shared/controllers/sign-controller'
import { getUserData } from '@/entities/User/service'
import { useAppDispatch } from '@/shared/hooks'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { useAuth } from '@/shared/hooks'

const { Title } = Typography

export const LoginPage: FC = () => {
  const { setAuth } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const onFinish = async (values: ISigninDTO) => {
    const path = location.state?.from || RouterPaths.main
    await signController.login(values, () => {
      dispatch(getUserData())
      setAuth(true)
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
        validateTrigger={['onFinish', 'onBlur']}>
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
          <Button block type="primary" htmlType="submit">
            Войти
          </Button>
          или{' '}
          <NavLink to={RouterPaths.registration}>Зарегистрироваться</NavLink>
        </Form.Item>
      </Form>
    </Flex>
  )
}
