import React from 'react'
import 'leaflet-editable'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Polygon as PolygonType } from '../../../../../types/index'
import OnePolygon from './OnePolygon/OnePolygon'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../redux/selectors/mapSelectors'

type Props = {}

const MapPolygons: React.FC<Props> = () => {

  const polygons = useSelector(getAllPolygonsSelector)

  return (
    <>
      {polygons.map((polygon: PolygonType, index: number) => (
        <OnePolygon
          polygon={polygon}
          key={index}
        />
      ))}
    </>
  )
}

export default React.memo(MapPolygons)
