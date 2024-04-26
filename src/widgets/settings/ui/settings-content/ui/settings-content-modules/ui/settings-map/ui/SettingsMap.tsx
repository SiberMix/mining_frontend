import './SettingsMap.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { SimpleSelect } from '~shared/ui/simple-select'

import { getBaseCoordSelector, getBaseMapOptionsSelector, getZoomLevelOptionsSelector } from '../../../../../../../../../srcOld/redux/selectors/settingsSelector'
import { setDrawingPolygonMode } from '../../../../../../../../../srcOld/redux/slices/mapSlice'
import { setBaseMapOptions, setMapClickForNewBaseCoord, setShowSettingsModal, setZoomLevelOptions } from '../../../../../../../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../../../../../../../srcOld/redux/store'
import { baseMapOptions } from '../const/base-map-options'
import { zoomLevelOptions } from '../const/zoom-level-options'

export const SettingsMap = memo(() => {
  const dispatch = useAppDispatch()
  const stateZoomInitialValue = useSelector(getZoomLevelOptionsSelector)
  const stateBaseMapOptions = useSelector(getBaseMapOptionsSelector)
  const baseCoord = useSelector(getBaseCoordSelector)

  const zoomInitialValue = zoomLevelOptions.find(zoom => zoom.value === stateZoomInitialValue)

  const mapBaseCoordBtnHandler = () => {
    dispatch(setDrawingPolygonMode(false))
    dispatch(setMapClickForNewBaseCoord(true))
    dispatch(setShowSettingsModal(false))
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
              onClick={mapBaseCoordBtnHandler}
            >
              {`${baseCoord[0]}, ${baseCoord[1]}`}
            </button>
          </div>
          <div className='settingsMapZoomLevel'>
            <span>
              Зум при первой загрузке
            </span>
            <SimpleSelect
              options={zoomLevelOptions}
              initialValue={zoomInitialValue ? zoomInitialValue.label : 'произошла ошибка'}
              handleOnChange={(value) => dispatch(setZoomLevelOptions(value))}
            />
          </div>
          <div className='settingsMapBaseMap'>
            <span>
              Изначальная карта
            </span>
            <SimpleSelect
              options={baseMapOptions}
              initialValue={stateBaseMapOptions}
              handleOnChange={(value) => dispatch(setBaseMapOptions(value))}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
