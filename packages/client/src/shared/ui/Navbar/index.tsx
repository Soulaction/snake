import { FC } from 'react'
import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

interface INavbarItem {
  key: string
  label: string
  href?: string
}

interface INavbarProps {
  items: INavbarItem[]
}

export const Navbar: FC<INavbarProps> = ({ items }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick: MenuProps['onClick'] = e => {
    const item = items.find(i => i.key === e.key)
    if (item?.href) {
      window.location.href = item.href
    } else {
      navigate(e.key)
    }
  }

  return (
    <Menu
      onClick={handleClick}
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items.map(({ key, label, href }) => ({
        key,
        label: href ? <a href={href}>{label}</a> : label,
      }))}
      style={{ flex: 1, minWidth: 0 }}
    />
  )
}
