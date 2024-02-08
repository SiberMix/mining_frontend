import './PickBaseCord.scss'

import L from 'leaflet'
import React, { memo, useCallback, useState } from 'react'
import { Marker, useMapEvents } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { getMapClickForNewBaseCoordSelector } from '../../../../../srcOld/redux/selectors/settingsSelector'
import { setBaseCoord, setMapClickForNewBaseCoord, setShowSettingsModal } from '../../../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../../../srcOld/redux/store'

export const PickBaseCord = memo(() => {
  const dispatch = useAppDispatch()
  const mapClickForNewBaseCoord = useSelector(getMapClickForNewBaseCoordSelector)
  const [cursorPosition, setCursorPosition] = useState<any>(null)
  /*
  * функционал для настройки базовой точки координаты
  * */
  const handleClick = useCallback((e: any) => {
    if (mapClickForNewBaseCoord) {
      const {
        lat,
        lng
      } = e.latlng
      dispatch(setBaseCoord([lat, lng]))
      dispatch(setMapClickForNewBaseCoord(false))
      dispatch(setShowSettingsModal(true))
      setCursorPosition(null)
    }
  }, [mapClickForNewBaseCoord])

  const handleMouseMove = useCallback((e: any) => {
    if (mapClickForNewBaseCoord) {
      const {
        lat,
        lng
      } = e.latlng
      setCursorPosition({
        lat,
        lng
      })
    }
  }, [mapClickForNewBaseCoord])

  useMapEvents({
    click: handleClick,
    mousemove: handleMouseMove
  })

  const CustomIcon = L.divIcon({
    className: 'custom-marker',
    iconAnchor: [12, 24],
    html: '<div class="pick-cord-marker">Нажмите для выбора координат</div>'
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
})
