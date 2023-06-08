import './SettingsGeneral.scss'
import React from 'react'
import SimpleSelect from '../../../../common/SimpleSelect/SimpleSelect'

const SettingsGeneral = () => {
  // const defaultValue = useSelector(getSidebarOpenWindowSelector)

  const options: Array<{value: string, label: string}> = [
    {
      value: 'undefined',
      label: 'Не выбрано'
    },
    {
      value: 'PolygonList',
      label: 'Список полигонов'
    },
    {
      value: 'optionЗаметки',
      label: 'Заметки'
    },
    {
      value: 'EquipmentList',
      label: 'Техника'
    },
    {
      value: 'FieldList',
      label: 'Культура'
    },
    {
      value: 'Calendar',
      label: 'Севооборот'
    }
  ]

  return (
    <div className="settingsGeneralWrapper">
      <div className="settingsGeneral">
        <div className="settingsGeneralSidebar">
          <span>
          Стартовая страница меню
          </span>
          <SimpleSelect
            options={options}
            initialValue={options[0].label}
            handleOnChange={(value: string) => console.log(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(SettingsGeneral)
