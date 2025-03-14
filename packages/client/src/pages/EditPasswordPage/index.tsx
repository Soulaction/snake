import { FC } from 'react'
import { Button, Flex, Form, Input, Space, FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import styles from './EditPasswordPage.module.css'

export const EditPasswordPage: FC = () => {
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate(RouterPaths.profile)
  }

  interface IPasswordChangeForm {
    oldPassword: string
    newPassword: string
    repeatNewPassword: string
  }

  const onFinish: FormProps<IPasswordChangeForm>['onFinish'] = values => {
    console.log('Форма изменения пароля: ', values)
  }

  const onFinishFailed: FormProps<IPasswordChangeForm>['onFinishFailed'] =
    errorInfo => {
      console.log('Ошибка в форме изменения пароля:', errorInfo)
    }

  return (
    <Form
      className={styles.form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 9 }}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Form.Item
        name="oldPassword"
        label="Старый пароль"
        rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="Новый пароль"
        rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="repeatNewPassword"
        label="Повторите новый пароль"
        rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>

      <Form.Item label={null}>
        <Flex align="end" justify="end">
          <Space>
            <Button onClick={goToProfile}>Профиль</Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  )
}
