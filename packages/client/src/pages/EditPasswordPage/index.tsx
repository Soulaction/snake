import { FC } from 'react'
import { Button, Flex, Form, Input, Space, FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import styles from './EditPasswordPage.module.css'
import { fieldTooltip, regExpByField, validate } from '@/shared/lib/Validation'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { changeUserPassword } from '@/entities/User/service'
import { useInitStatePage } from '@/shared/hooks/useInitStatePage'

interface IPasswordChangeForm {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

export const EditPasswordPage: FC = () => {
  useInitStatePage({ initPage: initEditPasswordPage })
  const navigate = useNavigate()
  const isLoading = useAppSelector(state => state.user.passwordChanging)
  const dispatch = useAppDispatch()

  const goToProfile = () => {
    navigate(RouterPaths.PROFILE)
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
      onFinishFailed={onFinishFailed}
      validateTrigger={['onBlur']}>
      <Form.Item
        name="oldPassword"
        label="Старый пароль"
        rules={[
          {
            required: true,
            message: 'Укажите старый пароль',
          },
          validate(regExpByField.password, 'Ошибка валидации поля Пароль'),
        ]}
        tooltip={fieldTooltip.password}>
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="Новый пароль"
        rules={[
          {
            required: true,
            message: 'Укажите Новый пароль',
          },
          validate(regExpByField.password, 'Ошибка валидации поля Пароль'),
        ]}
        tooltip={fieldTooltip.password}>
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="repeatNewPassword"
        label="Повторите новый пароль"
        rules={[
          {
            required: true,
            message: 'Повторите пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Пароли должны совпадать'))
            },
          }),
        ]}
        tooltip={fieldTooltip.password}>
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

export const initEditPasswordPage = () => Promise.resolve()
