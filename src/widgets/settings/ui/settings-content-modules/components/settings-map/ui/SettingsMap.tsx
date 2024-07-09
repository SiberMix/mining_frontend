import './SettingsMap.scss'

import { useField } from 'formik'
import React, { memo } from 'react'

import { setDrawingPolygonMode } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import { SimpleSelect } from '~shared/ui/simple-select'
import { settingsStore } from '~widgets/settings'

import { baseMapOptions } from '../const/base-map-options'
import { zoomLevelOptions } from '../const/zoom-level-options'

export const SettingsMap = memo(() => {
  const dispatch = useAppDispatch()
  // formik
  const [fieldMapType, _metaMapType_, helpersMapType] = useField('baseMapType')
  const [fieldZoomLevel, _metaZoomLevel_, helpersZoomLevel] = useField('baseZoomLevel')

  // zustand
  const setIsSettingsOpen = settingsStore(state => state.setIsSettingsOpen)
  const setIsClickMapForNewBaseCord = settingsStore(state => state.setIsClickMapForNewBaseCord)
  const newBaseCord = settingsStore(state => state.newBaseCord)

  const zoomInitialValue = zoomLevelOptions.find(zoom => zoom.value === fieldZoomLevel.value)

  const mapBaseCordBtnHandler = () => {
    dispatch(setDrawingPolygonMode(false))
    setIsClickMapForNewBaseCord(true)
    setIsSettingsOpen(false)
  }

  return (
    <div className='settingsMapWrapper'>
      <div className='settingsMap'>
        <div className='settingsMapSidebar'>
          <div className='settingsMapBaseCoord'>
            <span>
              Базовая точка координат:
            </span>
            <button
              className='settingsMapBaseCoordBtn'
              onClick={mapBaseCordBtnHandler}
            >
              {`${newBaseCord[0]}, ${newBaseCord[1]}`}
            </button>
          </div>
          <div className='settingsMapZoomLevel'>
            <span>
              Зум при первой загрузке
            </span>
            <SimpleSelect
              options={zoomLevelOptions}
              initialValue={zoomInitialValue ? zoomInitialValue.label : 'произошла ошибка'}
              handleOnChange={(value) => helpersZoomLevel.setValue(value)}
            />
          </div>
          <div className='settingsMapBaseMap'>
            <span>
              Изначальная карта
            </span>
            <SimpleSelect
              options={baseMapOptions}
              initialValue={fieldMapType.value}
              handleOnChange={(value) => helpersMapType.setValue(value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
