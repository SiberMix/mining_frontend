import 'leaflet/dist/leaflet.css' // важнейший импорт из самой карты, без него карта работает некорректно
import './MiniMap.scss'
import React from 'react'
import { MapContainer, Polygon } from 'react-leaflet'
import MapViewSelect from '../../pages/Main/Map/MapViewSelect/MapViewSelect'
import { Polygon as PolygonType } from '../../../types'

type Props = {
  polygon: PolygonType
}

const MiniMap: React.FC<Props> = ({
  polygon
}) => {

  const polygonColor = polygon.sequence === null ? '#FCD9D0' : polygon.sequence.color

  const createBaseZoom = () => {
    if (+polygon.square < 100) {
      return 14
    } else {
      return 13
    }
  }

  return (
    <MapContainer
      className='miniMap'
      center={polygon.middle_coord}
      zoomControl={false}
      zoom={createBaseZoom()}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      dragging={false}
    >
      <MapViewSelect />
      <Polygon
        key={polygon.id}
        positions={polygon.coords}
        pathOptions={{ fillColor: polygonColor, ...polygonDefaultStyleSettings }}
      />
    </MapContainer>
  )
}

export default MiniMap

const polygonDefaultStyleSettings = {
  fillOpacity: .63,
  color: '#fff',
  opacity: .6,
  weight: 3
}
