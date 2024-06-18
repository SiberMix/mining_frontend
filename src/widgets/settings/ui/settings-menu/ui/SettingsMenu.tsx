import './SettingsMenu.scss'

import { Menu } from 'antd'
import React, { memo } from 'react'

import type { SettingsMenuKeys } from '../consts'
import { settingsMenuItems } from '../consts'

type SettingsMenuProps = {
  selectedSettingsMenuSection: SettingsMenuKeys,
  setSelectedSettingsMenuSection: (key: SettingsMenuKeys) => void
}

export const SettingsMenu = memo((props: SettingsMenuProps) => {
  const {
    selectedSettingsMenuSection,
    setSelectedSettingsMenuSection
  } = props

  return (
    <div className='settingsMenuWrapper'>
      <Menu
        className=''
        defaultSelectedKeys={[selectedSettingsMenuSection]}
        mode='inline'
        theme='dark'
        items={settingsMenuItems}
        onClick={({ key }) => setSelectedSettingsMenuSection(key as SettingsMenuKeys)}
      />
    </div>
  )
})
