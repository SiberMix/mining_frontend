import React from 'react'

import {
  SettingsEquipment,
  SettingsGeneral,
  SettingsMap,
  SettingsUser
} from '~widgets/settings/ui/settings-content/components/settings-content-modules'

import { SettingsMenuKeys } from '../../settings-menu'

export const switchSettingsMenuContent = (key: SettingsMenuKeys) => {
  switch (key) {
    case SettingsMenuKeys.main:
      return <SettingsGeneral />
    case SettingsMenuKeys.map:
      return <SettingsMap />
    case SettingsMenuKeys.equipment:
      return <SettingsEquipment />
    case SettingsMenuKeys.user:
      return <SettingsUser />
    default:
      return (<div>
        Произошла ошибка, пожалуйста перезагрузите страницу
      </div>)
  }
}
