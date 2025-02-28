import { Menu, MenuProps } from 'antd'
import { NavbarItemsList } from './model/navbar-items'
import { useLocation, useNavigate } from 'react-router'

const items = NavbarItemsList.map(navItem => ({
  key: navItem.path,
  label: navItem.title,
}))

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick: MenuProps['onClick'] = e => {
    navigate(e.key)
  }

  return (
    <Menu
      onClick={handleClick}
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
    />
  )
}
