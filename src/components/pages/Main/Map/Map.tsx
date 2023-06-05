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
import { MapContainer } from 'react-leaflet'

type Props = {}

const Map: React.FC<Props> = () => {

  return (
    <MapContainer
      className={cn(s.map)}
      center={[54.925946, 82.775931]}
      zoom={13}
      minZoom={3}
    >
      <MapViewSelect />
      <MapPolygons />
      <DrawingPolygon />
      <MapEquipments />
    </MapContainer>
  )
}

export default React.memo(Map)
