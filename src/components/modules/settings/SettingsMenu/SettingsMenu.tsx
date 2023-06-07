import './SettingsMenu.scss'
import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useSelector } from 'react-redux'
import { getSelectedSettingsWindowSelector } from '../../../../redux/selectors/settingsSelector'
import { useAppDispatch } from '../../../../redux/store'
import { setSelectedSettingsWindow } from '../../../../redux/slices/settingsSlice'

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
  getItem('Общее', '1'),
  getItem('Карты', '2'),
  getItem('Техника', '3'),
  getItem('Пользователь', '4')
]

const SettingsMenu = () => {
  const dispatch = useAppDispatch()
  const selectedSettingsWindow = useSelector(getSelectedSettingsWindowSelector)
  return (
    <div className="settingsMenuWrapper">
      <Menu
        className=""
        defaultSelectedKeys={['' + selectedSettingsWindow]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={({ key }) => dispatch(setSelectedSettingsWindow(+key))}
      />
    </div>
  )
}

export default React.memo(SettingsMenu)
