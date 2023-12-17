import './SettingsGeneral.scss'
import React from 'react'
import SimpleSelect from '../../../../../../common/SimpleSelect/SimpleSelect'
import { useAppDispatch } from '../../../../../../../redux/store'
import { setStartMenuOptions } from '../../../../../../../redux/slices/settingsSlice'
import { useSelector } from 'react-redux'
import { getStartMenuOptionsSelector } from '../../../../../../../redux/selectors/settingsSelector'

const startSidebarOptions: Array<{value: string, label: string}> = [
  {
    value: 'undefined',
    label: 'Не выбрано'
  },
  {
    value: 'PolygonList',
    label: 'Список полигонов'
  },
  {
    value: 'EquipmentList',
    label: 'Техника'
  },
  {
    value: 'PlayBack',
    label: 'Плэйбэк'
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

const SettingsGeneral = () => {
  const dispatch = useAppDispatch()
  const stateStartSidebarOptions = useSelector(getStartMenuOptionsSelector)
  const initialStartSidebarOptions = startSidebarOptions.find(option => option.value === stateStartSidebarOptions)

  return (
    <div className="settingsGeneralWrapper">
      <div className="settingsGeneral">
        <div className="settingsGeneralSidebar">
          <span>
          Стартовая страница меню
          </span>
          <SimpleSelect
            options={startSidebarOptions}
            initialValue={initialStartSidebarOptions ? initialStartSidebarOptions.label : 'произошла ошибка'}
            handleOnChange={(value: string) => dispatch(setStartMenuOptions(value))}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(SettingsGeneral)
