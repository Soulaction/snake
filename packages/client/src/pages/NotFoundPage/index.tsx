import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import { RouterPaths } from '@/shared/router'

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(RouterPaths.MAIN)
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Cтраница, которую вы ищете, не существует."
      extra={
        <Button type="primary" onClick={handleClick}>
          Назад в меню
        </Button>
      }
    />
  )
}
