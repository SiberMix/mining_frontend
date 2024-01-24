import './SettingsGeneral.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import SimpleSelect from '../../../../../../../../../../srcOld/components/common/SimpleSelect/SimpleSelect'
import { getStartMenuOptionsSelector } from '../../../../../../../../../../srcOld/redux/selectors/settingsSelector'
import { setStartMenuOptions } from '../../../../../../../../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../../../../../../../../srcOld/redux/store'
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
            handleOnChange={(value: string | null) => dispatch(setStartMenuOptions(value))}
          />
        </div>
      </div>
    </div>
  )
})
