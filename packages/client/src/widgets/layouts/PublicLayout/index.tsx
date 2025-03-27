import type { FC } from 'react'
import { Layout } from 'antd'
import { ContentContainer } from '@/features/ContentContainer'
import { RouterPaths } from '@/shared/router'
import { Navigate, useLocation } from 'react-router-dom'

interface IPublicLayout {
  isAuth: boolean
}

export const PublicLayout: FC<IPublicLayout> = ({ isAuth }) => {
  const { pathname } = useLocation()

  return (
    <>
      {isAuth && pathname == RouterPaths.login ? (
        <Navigate to={RouterPaths.game} replace />
      ) : (
        <Layout className="layout">
          <ContentContainer />
        </Layout>
      )}
    </>
  )
}
