import './SettingsEquipment.scss'
import React from 'react'
import CheckboxList from '../../../../common/CheckboxList/CheckboxList'

const options = {
  'Название': true,
  'IMEI': true,
  'Гос.номер': true,
  'Скорость': true,
  'Уровень топлива': true
}

const SettingsEquipment = () => {

  const handleCheckedItemsChange = (checkedItems: Record<string, boolean>) => {
    console.log(checkedItems)
  }

  return (
    <div>
      <div className="settingsEquipmentWrapper">
        <div className="settingsEquipment">
          <div className="settingsEquipmentSidebar">
            <div>
              <span>
                Видимая информация техники
              </span>
              <div className="showEquipmentsCheckbox">
                <CheckboxList
                  options={options}
                  onCheckedItemsChange={handleCheckedItemsChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SettingsEquipment)
