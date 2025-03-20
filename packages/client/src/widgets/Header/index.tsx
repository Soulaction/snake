import { Layout, Flex, Dropdown, Avatar, MenuProps } from 'antd'
import { Navbar } from '../Navbar'
import { Link, useNavigate } from 'react-router-dom'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useCallback, useMemo } from 'react'
import { useAuth } from '@/shared/hooks'
import { RouterPaths } from '@/shared/router'

export const Header = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    setAuth(false)
    navigate(RouterPaths.login)
  }, [])

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'profile',
        label: <Link to={RouterPaths.profile}>Редактировать</Link>,
        icon: <SettingOutlined />,
      },
      {
        key: 'logout',
        label: <span>Выйти</span>,
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
    [handleLogout]
  )

  return (
    <Layout.Header>
      <Flex align="center" justify="center">
        <Navbar />
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </Flex>
    </Layout.Header>
  )
}
