import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import { RouterPaths } from '@/shared/router'

export const ErrorPage: FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(RouterPaths.MAIN)
  }

  return (
    <Result
      status="500"
      title="500"
      subTitle="Простите, что-то пошло не так."
      extra={
        <Button type="primary" onClick={handleClick}>
          Назад в меню
        </Button>
      }
    />
  )
}
