// важнейший импорт из самой карты, без него карта работает некорректно
import 'leaflet/dist/leaflet.css'
// доп файл, убирает флаг и ссылку на leaflet
import './leafletFix.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import React from 'react'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'
import DrawingPolygon from './MapPolygons/DrawingPolygon'
import MapEquipments from './MapEquipments/MapEquipments'
import * as cn from 'classnames'
import s from './Map.module.scss'
import {
  MapContainer,
  ZoomControl
} from 'react-leaflet'
import { useSelector } from 'react-redux'
import {
  getUsingBaseCoordSelector,
  getUsingZoomLevelOptionsSelector
} from '../../../../redux/selectors/settingsSelector'

type Props = {}

const Map: React.FC<Props> = () => {
  const baseCoord = useSelector(getUsingBaseCoordSelector)
  const stateZoomLevelOptions = useSelector(getUsingZoomLevelOptionsSelector)

  return (
    <MapContainer
      className={cn(s.map)}
      center={baseCoord}
      zoomControl={false}
      zoom={+stateZoomLevelOptions}
      minZoom={3}
    >
      <MapViewSelect />
      <MapPolygons />
      <DrawingPolygon />
      <MapEquipments />
      <ZoomControl position="topright" />
    </MapContainer>
  )
}

export default React.memo(Map)
