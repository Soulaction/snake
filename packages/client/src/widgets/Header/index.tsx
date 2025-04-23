import { Avatar, Dropdown, Flex, Layout, MenuProps } from 'antd'
import { Navbar } from '@/shared/ui/Navbar'

import { Link, useNavigate } from 'react-router-dom'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { navbarItems } from './model/navbar-items'

import { signController } from '@/shared/controllers/sign-controller'
import { useCallback, useMemo } from 'react'
import { RouterPaths } from '@/shared/router'
import { useAppDispatch } from '@/shared/hooks'
import { logout } from '@/entities/User/service'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogoutClick = useCallback(() => {
    dispatch(logout())
    navigate(RouterPaths.LOGIN)
  }, [signController.logout])

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'profile',
        label: <Link to={RouterPaths.PROFILE}>Редактировать</Link>,
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
        <Navbar items={navbarItems} />
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
