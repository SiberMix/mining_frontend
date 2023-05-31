// важнейший импорт из самой карты, без него происходит полный пиздец
import 'leaflet/dist/leaflet.css'
// доп файл, убирает флаг и ссылку на leaflet
import './leafletFix.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import React from 'react'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'
import DrowingPolygon from './MapPolygons/DrowingPolygon'
import { Marker } from 'react-leaflet'
import L, { divIcon } from 'leaflet'
import MapEquipments from './MapEquipments/MapEquipments'

type Props = {
  selectedPolygon: number | undefined,
  isDrawing: boolean,
  setVisibleModal: (showModal: boolean) => void,
  selectedEquipment: number | undefined
}

const Map: React.FC<Props> = ({
  selectedPolygon,
  isDrawing,
  setVisibleModal,
  selectedEquipment
}) => {

  return (
    <>
      <MapViewSelect />
      <MapPolygons selectedPolygon={selectedPolygon} />
      <DrowingPolygon
        isDrawing={isDrawing}
        setVisibleModal={setVisibleModal}
      />
      <MapEquipments selectedEquipment={selectedEquipment} />
    </>
  )
}

export default React.memo(Map)
