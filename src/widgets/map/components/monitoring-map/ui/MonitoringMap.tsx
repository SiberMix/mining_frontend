import 'leaflet/dist/leaflet.css' // важнейший импорт из самой карты, без него карта работает некорректно
import './leafletFix.css' // доп файл, убирает флаг и ссылку на leaflet
import 'leaflet-draw/dist/leaflet.draw-src.css'
import './MonitoringMap.scss'

import React, { memo } from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'

import { RealtyMapPicker } from '~entities/realty'
import { MapViewSelect } from '~widgets/map'
import { MapRealty } from '~widgets/map/components/map-realty'
import { settingsStore } from '~widgets/settings'
import { PickWeatherCord } from '~widgets/weather'

import { MapEquipments } from '../../map-equipments'
import { MapPlayback } from '../../map-playback'
import { MapDrawingPolygon, MapPolygons } from '../../map-polygons'
import { PickBaseCord } from '../../pick-base-cord'

export const MonitoringMap = memo(() => {
  const baseCord = settingsStore(state => state.settings.baseCord)
  const baseZoomLevel = settingsStore(state => state.settings.baseZoomLevel)

  return (
    <MapContainer
      className='MonitoringMap'
      center={baseCord}
      zoomControl={false}
      zoom={baseZoomLevel}
      minZoom={3}
    >
      {/** Map controls */}
      <MapViewSelect />


      {/** Polygons */}
      <MapPolygons />
      <MapDrawingPolygon />

      {/** Equips */}
      <MapEquipments />
      <MapPlayback />

      {/** Realty */}
      <MapRealty />

      {/** Cord pickers */}
      <PickBaseCord />
      <PickWeatherCord />
      <RealtyMapPicker />
    </MapContainer>
  )
})
