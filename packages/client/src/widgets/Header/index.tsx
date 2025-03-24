import { Layout, Flex, Dropdown, Avatar, MenuProps } from 'antd'
import { Navbar } from '../Navbar'
import { Link, useNavigate } from 'react-router-dom'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { signController } from '@/shared/controllers/sign-controller'
import { useCallback, useMemo } from 'react'
import { RouterPaths } from '@/shared/router'
import { useAuth } from '@/shared/hooks'

export const Header = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleLogoutClick = useCallback(() => {
    signController.logout()
    setAuth(false)
    navigate(RouterPaths.login)
  }, [signController.logout])

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
        onClick: handleLogoutClick,
      },
    ],
    []
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
