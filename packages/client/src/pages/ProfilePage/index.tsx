import { FC } from 'react'
import { Button, Flex, Form, FormProps, Input, Space } from 'antd'
import { UserModel } from '@/shared/types/model'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { changeAvatar, changeUser } from '@/entities/User/service'
import { FileInput } from '@/shared/ui'
import styles from './ProfilePage.module.css'
import { RouterPaths } from '@/shared/router'

const formFields = [
  { name: 'first_name', label: 'Имя' },
  { name: 'second_name', label: 'Фамилия' },
  { name: 'login', label: 'Логин' },
  { name: 'email', label: 'Почта' },
  { name: 'phone', label: 'Телефон' },
  { name: 'display_name', label: 'Имя в чате' },
]

export const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.user.user)
  const isLoading = useAppSelector(state => state.user.userLoading)

  const dispatch = useAppDispatch()

  const handleChangeAvatar = (newAvatar: File) => {
    const formData = new FormData()
    const file = newAvatar
    formData.append('avatar', file)
    dispatch(changeAvatar(formData))
  }

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
      onFinishFailed={onFinishFailed}>
      <Flex className={styles.avatar} align="center" justify="center">
        <FileInput
          imgUrl={user.avatar}
        />
      </Flex>
      {formFields.map(({ name, label }) => (
        <Form.Item key={name} name={name} label={label}>
          <Input />
        </Form.Item>
      ))}
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
