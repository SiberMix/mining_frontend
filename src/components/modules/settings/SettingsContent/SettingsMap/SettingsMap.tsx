import './SettingsMap.scss'
import React from 'react'
import SimpleSelect from '../../../../common/SimpleSelect/SimpleSelect'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../../redux/store'
import {
  setBaseMapOptions,
  setMapClickForNewBaseCoord,
  setShowSettingsModal,
  setZoomLevelOptions
} from '../../../../../redux/slices/settingsSlice'
import { setDrawingPolygonMode } from '../../../../../redux/slices/mapSlice'
import {
  getBaseCoordSelector,
  getBaseMapOptionsSelector,
  getZoomLevelOptionsSelector
} from '../../../../../redux/selectors/settingsSelector'

const baseMapOptions: Array<{value: string, label: string}> = [
  {
    value: 'Google Map',
    label: 'Google Map'
  },
  {
    value: 'Esri WorldImagery',
    label: 'Esri WorldImagery'
  },
  {
    value: 'Google Map (with titles)',
    label: 'Google Map (with titles)'
  },
  {
    value: '2gis Map',
    label: '2gis Map'
  }
]
const zoomLevelOptions: Array<{value: string, label: string}> = [
  {
    value: '13',
    label: 'стандарт'
  },
  {
    value: '15',
    label: 'маленький'
  },
  {
    value: '14',
    label: 'средний'
  },
  {
    value: '12',
    label: 'большой'
  }
]

const SettingsMap = () => {
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
    <div className="settingsMapWrapper">
      <div className="settingsMap">
        <div className="settingsMapSidebar">
          <div className="settingsMapBaseCoord">
            <span>
              Базовая точка координат:
            </span>
            <button
              className="settingsMapBaseCoordBtn"
              onClick={mapBaseCoordBtnHandler}
            >
              {`${baseCoord[0]}, ${baseCoord[1]}`}
            </button>
          </div>
          <div className="settingsMapZoomLevel">
            <span>
              Зум при первой загрузке
            </span>
            <SimpleSelect
              options={zoomLevelOptions}
              initialValue={zoomInitialValue ? zoomInitialValue.label : 'произошла ошибка'}
              handleOnChange={(value: string) => dispatch(setZoomLevelOptions(value))}
            />
          </div>
          <div className="settingsMapBaseMap">
            <span>
              Изначальная карта
            </span>
            <SimpleSelect
              options={baseMapOptions}
              initialValue={stateBaseMapOptions}
              handleOnChange={(value: string) => dispatch(setBaseMapOptions(value))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SettingsMap)
