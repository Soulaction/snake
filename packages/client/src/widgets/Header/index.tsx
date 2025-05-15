import { Avatar, Button, Dropdown, Flex, Layout, MenuProps, Space } from 'antd'
import { Navbar } from '@/shared/ui/Navbar'

import { Link, useNavigate } from 'react-router-dom'
import {
  LogoutOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { navbarItems } from './model/navbar-items'

import { signController } from '@/shared/controllers/sign-controller'
import { useCallback, useMemo } from 'react'
import { RouterPaths } from '@/shared/router'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { logout } from '@/entities/User/service'
import { toggleTheme } from '@/entities/User/slice'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(state => state.user.theme)

  const handleLogoutClick = useCallback(() => {
    dispatch(logout())
    navigate(RouterPaths.LOGIN)
  }, [signController.logout])

  const handleThemeSwitchClick = useCallback(() => {
    dispatch(toggleTheme())
  }, [])

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
        <Space style={{ textAlign: 'center' }}>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
          <Button
            shape="circle"
            icon={currentTheme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={handleThemeSwitchClick}
          />
        </Space>
      </Flex>
    </Layout.Header>
  )
}
