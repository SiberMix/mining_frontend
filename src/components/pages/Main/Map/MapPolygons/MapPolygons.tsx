import React from 'react'
import { useAtom } from 'jotai'
import { polygonsAtom } from '../../Main'
import 'leaflet-editable'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Polygon as PolygonType } from '../../../../../types/index'
import OnePolygon from './OnePolygon'

type Props = {
  selectedPolygon: number | undefined
}

const polygonDefaultStyleSettings = {
  fillOpacity: .63,
  color: '#fff',
  opacity: .6,
  weight: 1
}
export type PolygonDefaultStyleSettings = typeof polygonDefaultStyleSettings

const MapPolygons: React.FC<Props> = ({ selectedPolygon }) => {
  const [polygons] = useAtom(polygonsAtom)

  return (
    <>
      {polygons.map((polygon: PolygonType, index: number) => (
        <OnePolygon
          polygon={polygon}
          polygonDefaultStyleSettings={polygonDefaultStyleSettings}
          selectedPolygon={selectedPolygon}
          key={index}
        />
      ))}
    </>
  )
}

export default React.memo(MapPolygons)
