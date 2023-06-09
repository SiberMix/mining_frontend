import './SettingsEquipment.scss'
import React from 'react'
import CheckboxList from '../../../../common/CheckboxList/CheckboxList'
import type { RootState } from '../../../../../redux/store'
import { useAppDispatch } from '../../../../../redux/store'
import { setEquipmentOptions } from '../../../../../redux/slices/settingsSlice'
import { useSelector } from 'react-redux'

const SettingsEquipment = () => {
  const dispatch = useAppDispatch()
  const stateEquipmentOptions = useSelector((state: RootState) => state.settingsSlice.settings.equipmentOptions)
  const handleCheckedItemsChange = (checkedItems: Record<string, boolean>) => {
    dispatch(setEquipmentOptions(checkedItems))
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
                  options={stateEquipmentOptions}
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
