import { memo, useState } from 'react'

import { SettingsContentLayout } from '../../settings-content-layout'
import { SettingsMenu, SettingsMenuKeys } from '../../settings-menu'

export const SettingsContent = memo(() => {
  const [selectedSettingsMenuSection, setSelectedSettingsMenuSection] = useState(SettingsMenuKeys.main)

  return (
    <>
      <SettingsMenu
        selectedSettingsMenuSection={selectedSettingsMenuSection}
        setSelectedSettingsMenuSection={setSelectedSettingsMenuSection}
      />
      <SettingsContentLayout selectedSettingsMenuSection={selectedSettingsMenuSection} />
    </>
  )
})
