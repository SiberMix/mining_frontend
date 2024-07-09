import './SettingsGeneral.scss'

import { useField } from 'formik'
import React, { memo } from 'react'

import { SimpleSelect } from '~shared/ui/simple-select'

import { startSidebarOptions } from '../const'

export const SettingsGeneral = memo(() => {
  const [field, _, helpers] = useField('monitoringStartMenuSection')

  const initialStartSidebarOptions = startSidebarOptions.find(option => option.value === field?.value)

  return (
    <div className='settingsGeneralWrapper'>
      <div className='settingsGeneral'>
        <div className='settingsGeneralSidebar'>
          <span>
            Стартовая страница меню
          </span>
          <SimpleSelect
            options={startSidebarOptions}
            initialValue={initialStartSidebarOptions ? initialStartSidebarOptions.label : 'произошла ошибка'}
            handleOnChange={(value) => helpers.setValue(value)}
          />
        </div>
      </div>
    </div>
  )
})
