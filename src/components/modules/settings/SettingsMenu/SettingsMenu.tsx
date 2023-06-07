import './SettingsMenu.scss'
import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Карты', '1'),
  getItem('Техника', '2'),
  getItem('Пользователь', '3')
]

const SettingsMenu = () => {
  return (
    <div className="settingsMenuWrapper">
      <Menu
        className=""
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        items={items}
        onClick={({ key }) => console.log(key)}
      />
    </div>
  )
}

export default React.memo(SettingsMenu)
