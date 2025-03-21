import { Layout, Flex, Dropdown, Avatar, MenuProps } from 'antd'
import { Navbar } from '../../shared/ui/Navbar'
import { Link } from 'react-router-dom'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { navbarItems } from './model/navbar-items'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to="/profile">Редактировать</Link>,
    icon: <SettingOutlined />,
  },
  {
    key: '2',
    label: <span>Выйти</span>,
    icon: <LogoutOutlined />,
  },
]

export const Header = () => {
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
