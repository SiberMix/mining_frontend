import './SettingsContent.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedSettingsWindowSelector } from '../../../../redux/selectors/settingsSelector'
import SettingsMap from './SettingsMap/SettingsMap'
import SettingsEquipment from './SettingsEquipment/SettingsEquipment'
import SettingsUser from './SettingsUser/SettingsUser'
import SettingsGeneral from './SettingsGeneral/SettingsGeneral'

const SettingsContent = () => {
  const selectedSettingsWindow = useSelector(getSelectedSettingsWindowSelector)

  return (
    <div className="settingsContentWrapper">
      <div className="settingsContent">
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
}

export default React.memo(SettingsContent)
