import 'leaflet/dist/leaflet.css' // важнейший импорт из самой карты, без него карта работает некорректно
import './leafletFix.css' // доп файл, убирает флаг и ссылку на leaflet
import 'leaflet-draw/dist/leaflet.draw-src.css'
import React from 'react'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'
import DrawingPolygon from './MapPolygons/DrawingPolygon'
import MapEquipments from './MapEquipments/MapEquipments'
import * as cn from 'classnames'
import s from './Map.module.scss'
import { MapContainer, ZoomControl } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { getUsingBaseCoordSelector, getUsingZoomLevelOptionsSelector } from '../../../../redux/selectors/settingsSelector'
import PickBaseCoord from './PickBaseCoord/PickBaseCoord'
import MapPlayback from './MapPlayback/MapPlayback'

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
      <ZoomControl position='topright' />
      <PickBaseCoord />
      <MapPlayback />
    </MapContainer>
  )
}

export default React.memo(Map)

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
