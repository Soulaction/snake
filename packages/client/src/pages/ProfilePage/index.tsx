import { FC } from 'react'
import { Button, Flex, Form, FormProps, Input, Space } from 'antd'
import { UserModel } from '@/shared/types/model'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { changeAvatar, changeUser } from '@/entities/User/service'
import { FileInput } from '@/shared/ui'
import styles from './ProfilePage.module.css'
import { RouterPaths } from '@/shared/router'
import { fieldTooltip, regExpByField, validate } from '@/shared/lib/Validation'

export const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.user.user)
  const isLoading = useAppSelector(state => state.user.userLoading)

  const dispatch = useAppDispatch()

  const goToPassReset = () => {
    navigate(RouterPaths['edit-password'])
  }

  const onFinish: FormProps<UserModel>['onFinish'] = values => {
    dispatch(changeUser(values))
  }

  const onFinishFailed: FormProps<UserModel>['onFinishFailed'] = errorInfo => {
    console.log('Ошибка заполнения формы:', errorInfo)
  }

  return (
    <Form
      className={styles.form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      initialValues={{ ...user }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateTrigger={['onBlur']}>
      <Flex className={styles.avatar} align="center" justify="center">
        <FileInput imgUrl={user.avatar} />
      </Flex>
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
          validate(regExpByField.second_name, 'Ошибка валидации поля Фамилия'),
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
        name="display_name"
        label="Имя в чате"
        rules={[
          {
            required: true,
            message: 'Укажите Имя в чате',
          },
          validate(regExpByField.login, 'Ошибка валидации поля Имя в чате'),
        ]}
        tooltip={fieldTooltip.login}>
        <Input name="login" autoComplete="on" />
      </Form.Item>
      <Form.Item label={null}>
        <Flex align="end" justify="end">
          <Space>
            <Button onClick={goToPassReset}>Изменить пароль</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Сохранить
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  )
}
