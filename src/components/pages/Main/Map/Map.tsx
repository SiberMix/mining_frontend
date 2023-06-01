// важнейший импорт из самой карты, без него происходит полный пиздец
import 'leaflet/dist/leaflet.css'
// доп файл, убирает флаг и ссылку на leaflet
import './leafletFix.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import React from 'react'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'
import DrowingPolygon from './MapPolygons/DrowingPolygon'
import MapEquipments from './MapEquipments/MapEquipments'

type Props = {
  selectedPolygon: number | undefined,
  isDrawing: boolean,
  setVisibleModal: (showModal: boolean) => void,
  selectedEquipment: number | undefined,
  setSelectedEquipment: (id: number | undefined) => void,
  setSelectedPolygon: (id: number | undefined) => void
}

const Map: React.FC<Props> = ({
  selectedPolygon,
  isDrawing,
  setVisibleModal,
  selectedEquipment,
  setSelectedEquipment,
  setSelectedPolygon
}) => {

  return (
    <>
      <MapViewSelect />
      <MapPolygons
        selectedPolygon={selectedPolygon}
        setSelectedPolygon={setSelectedPolygon}
      />
      <DrowingPolygon
        isDrawing={isDrawing}
        setVisibleModal={setVisibleModal}
      />
      <MapEquipments
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
    </>
  )
}

export default React.memo(Map)
