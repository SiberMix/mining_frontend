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
    <div className='settings-equipment'>
      <span>
        Видимая информация техники
      </span>
      <CheckboxList
        className='settings-equipment-list'
        options={field.value}
        onCheckedItemsChange={handleCheckedItemsChange}
      />
    </div>
  )
})
