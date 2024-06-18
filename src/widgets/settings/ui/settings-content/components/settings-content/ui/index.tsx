import { memo, useState } from 'react'

import { SettingsMenu, SettingsMenuKeys } from '../../../../settings-menu'
import { SettingsContentLayout } from '../../settings-content-layout'

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
