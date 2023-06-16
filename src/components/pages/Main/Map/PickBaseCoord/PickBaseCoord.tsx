import './PickBaseCoord.scss'
import { useAppDispatch } from '../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getMapClickForNewBaseCoordSelector } from '../../../../../redux/selectors/settingsSelector'
import React, {
  useCallback,
  useState
} from 'react'
import {
  setBaseCoord,
  setMapClickForNewBaseCoord,
  setShowSettingsModal
} from '../../../../../redux/slices/settingsSlice'
import {
  Marker,
  useMapEvents
} from 'react-leaflet'
import L from 'leaflet'

const PickBaseCoord = () => {
  const dispatch = useAppDispatch()
  const mapClickForNewBaseCoord = useSelector(getMapClickForNewBaseCoordSelector)
  const [cursorPosition, setCursorPosition] = useState<any>(null)
  /*
  * функционал для настройки базовой точки координаты
  * */
  const handleClick = useCallback((e: any) => {
    if (mapClickForNewBaseCoord) {
      const { lat, lng } = e.latlng
      dispatch(setBaseCoord([lat, lng]))
      dispatch(setMapClickForNewBaseCoord(false))
      dispatch(setShowSettingsModal(true))
      setCursorPosition(null)
    }
  }, [mapClickForNewBaseCoord])

  const handleMouseMove = useCallback((e: any) => {
    if (mapClickForNewBaseCoord) {
      const { lat, lng } = e.latlng
      setCursorPosition({ lat, lng })
    }
  }, [mapClickForNewBaseCoord])

  useMapEvents({
    click: handleClick,
    mousemove: handleMouseMove
  })

  const CustomIcon = L.divIcon({
    className: 'custom-marker',
    iconAnchor: [12, 24],
    html: '<div class="pick-coord-marker">Нажмите для выбора координат</div>'
  })

  return (
    <>
      {mapClickForNewBaseCoord && cursorPosition
        ? <Marker
          position={cursorPosition}
          icon={CustomIcon}
          interactive={false}
        />
        : null}
    </>
  )
}
export default PickBaseCoord
