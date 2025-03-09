import type { FC } from 'react'
import { Layout } from 'antd'
import { Header } from '@/widgets/Header'
import styles from './MainLayout.module.css'
import { Outlet, useLocation } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'

const { Content } = Layout

export const MainLayout: FC = () => {
  const { pathname } = useLocation();
  const isShowHeader = pathname !== RouterPaths.login && pathname !== RouterPaths.registration;

  console.log({location, isShowHeader});
  
  return (
    <Layout className={styles['layout']}>
      {isShowHeader && <Header />}
      <Content className={styles['content']}>
        <div className={styles['card']}><Outlet /></div>
      </Content>
    </Layout>
  )
}
