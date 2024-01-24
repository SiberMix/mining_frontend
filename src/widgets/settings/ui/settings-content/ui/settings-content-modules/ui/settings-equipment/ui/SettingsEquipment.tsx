import './SettingsEquipment.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import CheckboxList from '../../../../../../../../../../srcOld/components/common/CheckboxList/CheckboxList'
import { getEquipmentOptionsSelector } from '../../../../../../../../../../srcOld/redux/selectors/settingsSelector'
import { setEquipmentOptions } from '../../../../../../../../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../../../../../../../../srcOld/redux/store'

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
