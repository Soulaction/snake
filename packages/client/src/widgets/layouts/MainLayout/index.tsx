import type { FC, PropsWithChildren } from 'react'
import { Layout } from 'antd'
import { Header } from '@/widgets/Header'
import styles from './MainLayout.module.css'

const { Content } = Layout

interface IMainLayoutProps {
  isHeader?: boolean
}

export const MainLayout: FC<PropsWithChildren<IMainLayoutProps>> = ({
  isHeader = true,
  children,
}) => {
  return (
    <Layout className={styles['layout']}>
      {isHeader && <Header />}
      <Content className={styles['content']}>
        <div className={styles['card']}>{children}</div>
      </Content>
    </Layout>
  )
}
