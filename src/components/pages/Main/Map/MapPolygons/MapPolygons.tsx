import React from 'react'
import 'leaflet-editable'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Polygon as PolygonType } from '../../../../../types/index'
import OnePolygon from './OnePolygon'
import { useSelector } from 'react-redux'
import {
  getAllPolygonsSelector,
  getEditedPolygonSelector
} from '../../../../../redux/selectors/mapSelectors'

type Props = {}

const MapPolygons: React.FC<Props> = () => {
  const polygons = useSelector(getAllPolygonsSelector)
  const editedPolygon = useSelector(getEditedPolygonSelector)
  const test: Array<[number, number][]> = [
    [
      [54.847905636034305, 82.71584987640382],
      [54.85161173508108, 82.72572040557863],
      [54.83893546739568, 82.73958206176759],
      [54.83488217525723, 82.73868083953859],
      [54.83436312674409, 82.7373504638672],
      [54.83376992027077, 82.73520469665529],
      [54.83265763463699, 82.73262977600098],
      [54.847905636034305, 82.71584987640382]
    ],
    [
      [54.84469340812888, 82.72327423095705],
      [54.846423101086124, 82.72773742675781],
      [54.841579773949746, 82.73280143737794],
      [54.840097006565735, 82.72808074951172],
      [54.84469340812888, 82.72327423095705]
    ]
  ]

  return (
    <>
      {/*<Polygon positions={test} />*/}
      {polygons.map((polygon: PolygonType, index: number) => {
        //фильтр для редактируемого полигона
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
}

export default React.memo(MapPolygons)
