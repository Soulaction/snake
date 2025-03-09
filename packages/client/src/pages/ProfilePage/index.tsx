import { FC } from 'react'
import { MainLayout } from '@/widgets/layouts/MainLayout'
import { Button, Flex, Form, FormProps, Input } from 'antd'
import { UserModel } from '@/shared/types/model'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { changeAvatar, changeUser } from '@/entities/User/service'
import { FileInput } from '@/shared/ui/FileInput'
import { apiYandex } from '@/shared/constants/api'
import styles from './ProfilePage.module.css'

export const ProfilePage: FC = () => {
  const user = useAppSelector(state => state.user.user)
  const isLoading = useAppSelector(state => state.user.userLoading)

  const dispatch = useAppDispatch()

  const handleChangeAvatar = (newAvatar: File) => {
    const formData = new FormData()
    const file = newAvatar
    formData.append('avatar', file)
    dispatch(changeAvatar(formData))
  }

  const onFinish: FormProps<UserModel>['onFinish'] = values => {
    dispatch(changeUser(values))
  }

  const onFinishFailed: FormProps<UserModel>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <MainLayout>
      <div>
        <Flex
          className={styles['avatar-container']}
          align="center"
          justify="center">
          <FileInput imgUrl={`${apiYandex}/resources${user.avatar}`} />
        </Flex>
        <Form
          className={styles['form']}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ ...user }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item name="first_name" label="Имя">
            <Input />
          </Form.Item>
          <Form.Item name="second_name" label="Фамилия">
            <Input />
          </Form.Item>
          <Form.Item name="login" label="Логин">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Почта">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Телефон">
            <Input />
          </Form.Item>
          <Form.Item name="display_name" label="Имя в чате">
            <Input />
          </Form.Item>
          <Form.Item name="display_name" label={null}>
            <Flex align="end" justify="end">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Сохранить
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  )
}
