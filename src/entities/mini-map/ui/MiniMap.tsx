import 'leaflet/dist/leaflet.css' // важнейший импорт из самой карты, без него карта работает некорректно
import './MiniMap.scss'

import React, { memo } from 'react'
import { MapContainer, Polygon } from 'react-leaflet'

import { MapViewSelect } from '~features/map-view-select'

import type { PolygonType } from '../../../../srcOld/redux/slices/mapSlice'
import { polygonDefaultStyleSettings } from '../const/mini-map-polygon-default-style'

type MiniMapProps = {
  polygon: PolygonType
}

export const MiniMap = memo(({ polygon }: MiniMapProps) => {

  const polygonColor = polygon.sequence === null ? '#FCD9D0' : polygon.sequence.color

  const createBaseZoom = () => {
    if (+polygon.square < 100) {
      return 14
    }
    return 13

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
})
