import 'leaflet/dist/leaflet.css' // важнейший импорт из самой карты, без него карта работает некорректно
import './leafletFix.css' // доп файл, убирает флаг и ссылку на leaflet
import 'leaflet-draw/dist/leaflet.draw-src.css'
import './MonitoringMap.scss'

import React, { memo } from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { MapViewSelect } from '~features/map-view-select'
import {
  getUsingBaseCoordSelector,
  getUsingZoomLevelOptionsSelector
} from '~processes/redux/selectors/settingsSelector'
import { PickWeatherCord } from '~widgets/weather'

import { MapEquipments } from '../../map-equipments'
import { MapPlayback } from '../../map-playback'
import { MapDrawingPolygon, MapPolygons } from '../../map-polygons'
import { PickBaseCord } from '../../pick-base-cord'

export const MonitoringMap = memo(() => {
  const baseCord = useSelector(getUsingBaseCoordSelector)
  const stateZoomLevelOptions = useSelector(getUsingZoomLevelOptionsSelector)

  return (
    <MapContainer
      className='MonitoringMap'
      center={baseCord}
      zoomControl={false}
      zoom={+stateZoomLevelOptions}
      minZoom={3}
    >
      {/** Map controls */}
      <MapViewSelect />
      <ZoomControl position='topright' />

      {/** Polygons */}
      <MapPolygons />
      <MapDrawingPolygon />

      {/** Equips */}
      <MapEquipments />
      <MapPlayback />

      {/** Cord pickers */}
      <PickBaseCord />
      <PickWeatherCord />
    </MapContainer>
  )
})
