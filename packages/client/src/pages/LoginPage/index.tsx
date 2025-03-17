import type { FC } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Flex, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { signController } from '@/shared/controllers/sign-controller'
import { ISigninDTO } from '@/shared/api/sign-api'

const { Title } = Typography

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const onFinish = (values: unknown) => {
    console.log('введенные данные', values)
    signController.login(values as ISigninDTO, navigate);
  }

  return (
    <Flex justify="center" align="center" style={{ height: '100%' }} vertical>
      <Title>Вход</Title>
      <Form name="login" style={{ minWidth: 400 }} onFinish={onFinish}>
        <Form.Item name="login">
          <Input prefix={<UserOutlined />} placeholder="Логин" name="login" />
        </Form.Item>
        <Form.Item name="password">
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
          или <NavLink to={RouterPaths.registration}>Зарегистрироваться</NavLink>
        </Form.Item>
      </Form>
    </Flex>
  )
}
