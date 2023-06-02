import React from 'react'
import 'leaflet-editable'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Polygon as PolygonType } from '../../../../../types/index'
import OnePolygon from './OnePolygon'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../redux/selectors/mapSelectors'

type Props = {
  selectedPolygon: number | undefined,
  setSelectedPolygon: (id: number | undefined) => void
}

const MapPolygons: React.FC<Props> = ({ selectedPolygon, setSelectedPolygon }) => {

  const polygons = useSelector(getAllPolygonsSelector)

  return (
    <>
      {polygons.map((polygon: PolygonType, index: number) => (
        <OnePolygon
          polygon={polygon}
          selectedPolygon={selectedPolygon}
          key={index}
          setSelectedPolygon={setSelectedPolygon}
        />
      ))}
    </>
  )
}

export default React.memo(MapPolygons)
