import './SettingsContentLayout.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getSelectedSettingsWindowSelector } from '../../../../../../../srcOld/redux/selectors/settingsSelector'
import { SettingsEquipment, SettingsGeneral, SettingsMap, SettingsUser } from '../../settings-content-modules'

export const SettingsContentLayout = memo(() => {
  const selectedSettingsWindow = useSelector(getSelectedSettingsWindowSelector)

  return (
    <div className='settingsContentWrapper'>
      <div className='settingsContent'>
        {selectedSettingsWindow === 1
          ? <SettingsGeneral />
          : selectedSettingsWindow === 2
            ? <SettingsMap />
            : selectedSettingsWindow === 3
              ? <SettingsEquipment />
              : selectedSettingsWindow === 4
                ? <SettingsUser />
                : <div>
                  Произошла ошибка, пожалуйста перезагрузите страницу
                </div>}
      </div>
    </div>
  )
})
