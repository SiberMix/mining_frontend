import './SettingsMenu.scss'

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getSelectedSettingsWindowSelector } from '../../../../../../srcOld/redux/selectors/settingsSelector'
import { setSelectedSettingsWindow } from '../../../../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../../../../srcOld/redux/store'
import { settingsMenuItems } from '../const/settings-menu-items'

export type SettingsMenuItem = Required<MenuProps>['items'][number];

export const SettingsMenu = memo(() => {
  const dispatch = useAppDispatch()
  const selectedSettingsWindow = useSelector(getSelectedSettingsWindowSelector)
  return (
    <div className='settingsMenuWrapper'>
      <Menu
        className=''
        defaultSelectedKeys={['' + selectedSettingsWindow]}
        mode='inline'
        theme='dark'
        items={settingsMenuItems}
        onClick={({ key }) => dispatch(setSelectedSettingsWindow(+key))}
      />
    </div>
  )
})
