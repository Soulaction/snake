<<<<<<< HEAD
import { FC } from 'react'
import { Button, Form, Input, Flex, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'

const { Title } = Typography

export const RegistrationPage: FC = () => {
  const onFinish = (values: unknown) => {
    console.log('введенные данные', values)
  }

  return (
    <Flex justify="center" align="center" style={{ height: '100%' }} vertical>
      <Title>Регистрация</Title>
      <Form
        name="registration"
        style={{ minWidth: 400 }}
        onFinish={onFinish}
        layout="vertical">
        <Form.Item name="first_name" label="Имя">
          <Input name="first_name" />
        </Form.Item>
        <Form.Item name="second_name" label="Фамилия">
          <Input name="second_name" />
        </Form.Item>
        <Form.Item name="login" label="Логин">
          <Input name="login" />
        </Form.Item>
        <Form.Item name="email" label="Почта">
          <Input name="email" />
        </Form.Item>
        <Form.Item name="phone" label="Телефон">
          <Input name="phone" />
        </Form.Item>
        <Form.Item name="password" label="Пароль">
          <Input.Password name="password" />
        </Form.Item>
        <Form.Item name="password2" label="Повторите пароль">
          <Input.Password name="password2" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
          Уже есть аккаунт? <NavLink to={RouterPaths.login}>Войти</NavLink>
        </Form.Item>
      </Form>
    </Flex>
=======
import type { FC } from "react"

export const RegistrationPage: FC = () => {
  return (
      <div>Registration Page</div>
>>>>>>> 039e0da86072dcd7380a9c7c515e2c5b6e98579a
  )
}
