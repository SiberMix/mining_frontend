import './SettingsEquipment.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getEquipmentOptionsSelector } from '~processes/redux/selectors/settingsSelector'
import { setEquipmentOptions } from '~processes/redux/slices/settingsSlice'
import { useAppDispatch } from '~processes/redux/store'
import { CheckboxList } from '~shared/ui/checkbox-list'

export const SettingsEquipment = memo(() => {
  const dispatch = useAppDispatch()
  const stateEquipmentOptions = useSelector(getEquipmentOptionsSelector)

  const handleCheckedItemsChange = (checkedItems: Record<string, boolean>) => {
    dispatch(setEquipmentOptions(checkedItems))
  }

  return (
    <div>
      <div className='settingsEquipmentWrapper'>
        <div className='settingsEquipment'>
          <div className='settingsEquipmentSidebar'>
            <div>
              <span>
                Видимая информация техники
              </span>
              <div className='showEquipmentsCheckbox'>
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
})
