import './SettingsEquipment.scss'

import { useField } from 'formik'
import React, { memo, useCallback } from 'react'

import { CheckboxList } from '~shared/ui/checkbox-list'

export const SettingsEquipment = memo(() => {
  const [field, _, helpers] = useField('equipmentOptions')

  const handleCheckedItemsChange = useCallback((itemsArr: Array<{title: string, value: boolean}>) => {
    helpers.setValue(itemsArr)
  }, [helpers])

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
                  options={field.value}
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
