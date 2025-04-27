import 'leaflet-editable'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getAllPolygonsSelector, getEditedPolygonSelector } from '~processes/redux/selectors/mapSelectors'
import type { PolygonType } from '~processes/redux/slices/mapSlice'

import { OnePolygon } from '../../one-polygon'

export const MapPolygons = memo(() => {
  const polygons = useSelector(getAllPolygonsSelector)
  const editedPolygon = useSelector(getEditedPolygonSelector)

  return (
    <>
      {polygons.map((polygon: PolygonType, index: number) => {
        //фильтр для редактируемого блока
        if (polygon.id === editedPolygon?.id) return null
        return (
          <OnePolygon
            polygon={polygon}
            key={index}
          />
        )
      })}
    </>
  )
})
