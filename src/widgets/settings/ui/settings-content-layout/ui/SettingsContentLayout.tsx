import './SettingsContentLayout.scss'

import React, { memo } from 'react'

import { settingsMenuContentConfig } from '~widgets/settings/consts'

import type { SettingsMenuKeys } from '../../settings-menu'

type SettingsContentLayoutProps = {
  selectedSettingsMenuSection: SettingsMenuKeys
}

export const SettingsContentLayout = memo((props: SettingsContentLayoutProps) => {
  const { selectedSettingsMenuSection } = props

  return (
    <div className='settingsContentWrapper'>
      <div className='settingsContent'>
        {settingsMenuContentConfig[selectedSettingsMenuSection]}
      </div>
    </div>
  )
})
