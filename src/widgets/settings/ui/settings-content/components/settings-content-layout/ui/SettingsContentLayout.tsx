import './SettingsContentLayout.scss'

import React, { memo } from 'react'

import { switchSettingsMenuContent } from '~widgets/settings/ui/settings-content/lib'

import type { SettingsMenuKeys } from '../../../../settings-menu'

type SettingsContentLayoutProps = {
  selectedSettingsMenuSection: SettingsMenuKeys
}

export const SettingsContentLayout = memo((props: SettingsContentLayoutProps) => {
  const { selectedSettingsMenuSection } = props

  return (
    <div className='settingsContentWrapper'>
      <div className='settingsContent'>
        {switchSettingsMenuContent(selectedSettingsMenuSection)}
      </div>
    </div>
  )
})
