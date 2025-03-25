import { Avatar, Button, Dropdown, Flex, Layout, MenuProps } from 'antd'
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
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { logout } from '@/entities/User/service'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.user)

  const handleLogoutClick = useCallback(() => {
    dispatch(logout())
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
      {isAuth ? (
        <Flex align="center" justify="center">
          <Navbar />
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </Flex>
      ) : (
        <Flex align="center" justify="flex-end" style={{ height: '100%' }}>
          <Button
            color="primary"
            variant="solid"
            onClick={() => navigate(RouterPaths.login)}>
            Войти
          </Button>
        </Flex>
      )}
    </Layout.Header>
  )
}
