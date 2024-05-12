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

import { MapEquipments } from '../../map-equipments'
import { MapPlayback } from '../../map-playback'
import { MapDrawingPolygon, MapPolygons } from '../../map-polygons'
import { PickBaseCord } from '../../pick-base-cord'

export const MonitoringMap = memo(() => {
  const baseCoord = useSelector(getUsingBaseCoordSelector)
  const stateZoomLevelOptions = useSelector(getUsingZoomLevelOptionsSelector)

  return (
    <MapContainer
      className='MonitoringMap'
      center={baseCoord}
      zoomControl={false}
      zoom={+stateZoomLevelOptions}
      minZoom={3}
    >
      <MapViewSelect />
      <MapPolygons />
      <MapDrawingPolygon />
      <MapEquipments />
      <ZoomControl position='topright' />
      <PickBaseCord />
      <MapPlayback />
    </MapContainer>
  )
})

/**
 todo тестовое оборудование потому что сокет любит отъебнуть
 <EquipCastomMarker
 key={54.925946}
 coordsData={{
 imei: '54.925946',
 lat: '54.925946',
 lon: '82.775931',
 datetime: '123'
 }}
 equip_name="equip_name"
 gosnomer={54.925946}
 image_status={2}
 imei={54.925946}
 speed={54.925946}
 fuel={54.925946}
 />
 * */
