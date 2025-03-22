import { FC } from 'react'
import { Button, Flex, Form, Input, Space, FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import styles from './EditPasswordPage.module.css'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { changeUserPassword } from '@/entities/User/service'

interface IPasswordChangeForm {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

export const EditPasswordPage: FC = () => {
  const navigate = useNavigate()
  const isLoading = useAppSelector(state => state.user.passwordChanging)
  const dispatch = useAppDispatch()

  const goToProfile = () => {
    navigate(RouterPaths.profile)
  }

  const onFinish: FormProps<IPasswordChangeForm>['onFinish'] = values => {
    dispatch(changeUserPassword(values))
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Сохранить
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  )
}
