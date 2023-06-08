import './SettingsMap.scss'
import React from 'react'
import SimpleSelect from '../../../../common/SimpleSelect/SimpleSelect'

const SettingsMap = () => {
  const options: Array<{value: string, label: string}> = [
    {
      value: 'Google Map',
      label: 'Google Map'
    },
    {
      value: 'Esri WorldImagery',
      label: 'Esri WorldImagery'
    },
    {
      value: 'Google Map (with titles)',
      label: 'Google Map (with titles)'
    },
    {
      value: '2gis Map',
      label: '2gis Map'
    }
  ]

  return (
    <div className="settingsMapWrapper">
      <div className="settingsMap">
        <div className="settingsMapSidebar">
          <div className="settingsMapZoomLevel">
            zoom level?
          </div>
          <div className="settingsMapBaseMap">
            <span>
              Изначальная карта
            </span>
            <SimpleSelect
              options={options}
              initialValue={options[0].label}
              handleOnChange={(value: string) => console.log(value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SettingsMap)
