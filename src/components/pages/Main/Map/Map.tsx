// важнейший импорт из самой карты, без него происходит полный пиздец
import 'leaflet/dist/leaflet.css'
// доп файл, убирает флаг и ссылку на leaflet
import './leafletFix.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import React from 'react'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'
import DrawingPolygon from './MapPolygons/DrawingPolygon'
import MapEquipments from './MapEquipments/MapEquipments'

type Props = {}

const Map: React.FC<Props> = () => {

  return (
    <>
      <MapViewSelect />
      <MapPolygons />
      <DrawingPolygon />
      <MapEquipments />
    </>
  )
}

export default React.memo(Map)
