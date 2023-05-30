// важнейший импорт из самой карты, без него происходит полный пиздец
import 'leaflet/dist/leaflet.css'
// доп файл, убирает флаг и ссылку на leaflet
import './leafletFix.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import React from 'react'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'
import DrowingPolygon from './MapPolygons/DrowingPolygon'

type Props = {
  selectedPolygon: number | undefined,
  isDrawing: boolean
}

const Map: React.FC<Props> = ({
  selectedPolygon,
  isDrawing
}) => {

  return (
    <>
      <MapViewSelect />
      <MapPolygons selectedPolygon={selectedPolygon} />
      <DrowingPolygon isDrawing={isDrawing} />
    </>
  )
}

export default React.memo(Map)
