import type { FC } from 'react'
import { Layout } from 'antd'
import { Header } from '@/widgets/Header'
import styles from './MainLayout.module.css'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

export const MainLayout: FC = () => {
  return (
    <Layout className={styles['layout']}>
      <Header />
      <Content className={styles['content']}>
        <div className={styles['card']}><Outlet /></div>
      </Content>
    </Layout>
  )
}
