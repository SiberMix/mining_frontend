import React from 'react'
import SimpleSelect from '../../../../common/SimpleSelect/SimpleSelect'

const SettingsUser = () => {
  return (
    <div className="settingsMapWrapper">
      <div className="settingsMap">
        <div className="settingsMapSidebar">
          <div className="settingsMapZoomLevel">
            Аватарка:
          </div>
          <div className="settingsMapBaseMap">
            <span>
            Изначальная точка координат
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SettingsUser)
