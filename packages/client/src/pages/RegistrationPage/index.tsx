import { FC } from 'react'
import { Button, Form, Input, Flex, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { useAuth } from '@/shared/hooks'
import { fieldTooltip, regExpByField, validate } from '@/shared/lib/Validation'

const { Title } = Typography

export const RegistrationPage: FC = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const onFinish = (values: unknown) => {
    console.log('введенные данные', values)
    setAuth(true)
    navigate(RouterPaths.main)
  }

  return (
    <Flex justify="center" align="center" style={{ height: '100%' }} vertical>
      <Title>Регистрация</Title>
      <Form
        name="registration"
        style={{ minWidth: 400 }}
        onFinish={onFinish}
        layout="vertical"
        validateTrigger={['onFinish', 'onBlur']}>
        <Form.Item
          name="first_name"
          label="Имя"
          rules={[
            {
              required: true,
              message: 'Укажите Имя',
            },
            validate(regExpByField.first_name, 'Ошибка валидации поля Имя'),
          ]}
          tooltip={fieldTooltip.first_name}>
          <Input name="first_name" />
        </Form.Item>
        <Form.Item
          name="second_name"
          label="Фамилия"
          rules={[
            {
              required: true,
              message: 'Укажите Фамилию',
            },
            validate(
              regExpByField.second_name,
              'Ошибка валидации поля Фамилия'
            ),
          ]}
          tooltip={fieldTooltip.second_name}>
          <Input name="second_name" />
        </Form.Item>
        <Form.Item
          name="login"
          label="Логин"
          rules={[
            {
              required: true,
              message: 'Укажите Логин',
            },
            validate(regExpByField.login, 'Ошибка валидации поля Логин'),
          ]}
          tooltip={fieldTooltip.login}>
          <Input name="login" autoComplete="on" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            {
              required: true,
              message: 'Ошибка валидации E-mail!',
            },
            validate(regExpByField.email, 'Ошибка валидации поля Почта'),
          ]}
          tooltip={fieldTooltip.email}>
          <Input name="email" autoComplete="on" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            {
              required: true,
              message: 'Укажите Телефон',
            },
            validate(regExpByField.phone, 'Ошибка валидации поля Телефон'),
          ]}
          tooltip={fieldTooltip.phone}>
          <Input name="phone" autoComplete="on" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Укажите Пароль',
            },
            validate(regExpByField.password, 'Ошибка валидации поля Пароль'),
          ]}
          tooltip={fieldTooltip.password}>
          <Input.Password name="password" />
        </Form.Item>
        <Form.Item
          name="password2"
          label="Повторите пароль"
          rules={[
            {
              required: true,
              message: 'Повторите пароль',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли должны совпадать'))
              },
            }),
          ]}
          tooltip={fieldTooltip.password}>
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
  )
}
