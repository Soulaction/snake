import { FC } from 'react'
import { Button, Form, Input, Flex, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'

const { Title } = Typography

export const fieldTooltip = {
  first_name:
    'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  second_name:
    'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  login:
    'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  email:
    'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
  password:
    'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  phone: 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
}

export const regExpByField = {
  first_name: /^[A-ZА-ЯЁ]{1}[-A-Za-zА-ЯЁа-яё]{2,}$/,
  second_name: /^[A-ZА-ЯЁ]{1}[-A-Za-zА-ЯЁа-яё]{2,}$/,
  login: /^[\w\d_-]{3,20}$/,
  display_name: /^[\wА-ЯЁа-яё\d_-]{3,20}$/,
  email: /^[\w_-]+@[\w]+[.]{1}[\w]+$/,
  password: /^[+]*[\d]{10,15}$/,
  phone: /^[+]*[\d]{10,15}$/,
}

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
            () => ({
              validator(_, value) {
                if (!value || regExpByField.first_name.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ошибка валидации поля Имя'));
              },
            }),
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
            () => ({
              validator(_, value) {
                if (!value || regExpByField.second_name.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ошибка валидации поля Фамилия'));
              },
            }),
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
            () => ({
              validator(_, value) {
                if (!value || regExpByField.login.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ошибка валидации поля Логин'));
              },
            }),
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
            () => ({
              validator(_, value) {
                if (!value || regExpByField.email.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ошибка валидации поля Почта'));
              },
            }),
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
            () => ({
              validator(_, value) {
                if (!value || regExpByField.phone.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ошибка валидации поля Телефон'));
              },
            }),
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
            () => ({
              validator(_, value) {
                if (!value || regExpByField.password.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ошибка валидации поля Пароль'));
              },
            }),
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
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли должны совпадать'));
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
