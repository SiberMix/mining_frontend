import './SettingsGeneral.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getStartMenuOptionsSelector } from '~processes/redux/selectors/settingsSelector'
import { setStartMenuOptions } from '~processes/redux/slices/settingsSlice'
import { useAppDispatch } from '~processes/redux/store'
import { SimpleSelect } from '~shared/ui/simple-select'

import { startSidebarOptions } from '../const/start-sidebar-options'

export const SettingsGeneral = memo(() => {
  const dispatch = useAppDispatch()
  const stateStartSidebarOptions = useSelector(getStartMenuOptionsSelector)
  const initialStartSidebarOptions = startSidebarOptions.find(option => option.value === stateStartSidebarOptions)

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
            handleOnChange={(value) => dispatch(setStartMenuOptions(value))}
          />
        </div>
      </div>
    </div>
  )
})
