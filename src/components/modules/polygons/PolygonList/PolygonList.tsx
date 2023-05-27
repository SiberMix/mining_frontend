import s from './PolygonList.module.scss'
import style from '../../field/FieldList/FieldList.module.scss'
import * as cn from 'classnames'
import React from 'react'
import { useAtom } from 'jotai'
import * as turf from '@turf/turf'
import {
  isDrawingAtom,
  isFetchingAtom,
  polygonsAtom
} from '../../../pages/Main/Main'
import settingMap from '/src/assets/icons/equalizersoutline_114523.svg'
import DownloadMap from '/src/assets/icons/download2.svg'
import PolygonPreview from '../PolygonPreview/PolygonPreview'

import { mapService } from '../../../../api/map'

const PolygonList: React.FC<{
  onPolygonClick: (id: string | number) => void,
  onEdit: (id: string | number) => void,
  onPolygonOption?: (id: string | number) => void

}> = ({ onPolygonClick, onEdit, onPolygonOption }) => {

  const [isFetching, setIsFetching] = useAtom(isFetchingAtom)
  const [polygons, setPolygons] = useAtom(polygonsAtom)
  const [isDrawing, setIsDrawing] = useAtom(isDrawingAtom)
  const toggleDrawing = () => setIsDrawing(prev => !prev)

  const numPolygons = polygons.reduce((count, polygon) => {
    if (polygon.coords.length) {
      return count + 1
    }
    return count

  }, 0)

  function calculateArea(coords: any) {
    if (coords.length < 3) {
      console.log('Invalid polygon, not enough coordinates')
      return 0
    }
    const polygon = turf.polygon([coords])
    const areaInSqMeters = turf.area(polygon)
    return areaInSqMeters / 2000
  }

  const calculateTotalArea = () => {
    let totalArea = 0
    polygons.forEach((polygon) => {
      if (polygon.coords.length) {
        const area = calculateArea(polygon.coords)
        totalArea += area
      }
    })
    return totalArea.toFixed(2)
  }

  const hectares = calculateTotalArea()

  const deleteHandler = async (id: string | number) => {
    try {
      if (isFetching) return
      setIsFetching(true)

      //Удаление полигона по Id
      await mapService.removePolygonById(id)

      setPolygons(polygons.filter((p) => p.id !== id))
    } catch (e) {
      console.log(e)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div className={cn(s.root, style.noScrollBar)}>
      <div className={cn(s.header)}>
        <img
          className={cn(s.image)}
          src={settingMap}
          alt=""
        />
        <p style={{ textAlign: 'center' }}>
          <div>
            Список полей
          </div>
          <div>
            {`Всего ${numPolygons} | ${hectares} Га`}
          </div>
        </p>
        <img
          className={cn(s.image)}
          src={DownloadMap}
          alt=""
        />
      </div>
      <button
        className={cn(s.addButton)}
        onClick={toggleDrawing}
      >
        {isDrawing
          ? <div>
            Выключить режим редактирования
          </div>
          : <>
            <span style={{ marginRight: '0.5rem' }}>
                +
            </span>
            Добавить поле
          </>}
      </button>
      {polygons.map((polygon) => {
        if (!polygon.coords.length) return null
        return (
          <PolygonPreview
            onEditPolygon={() => onEdit(polygon.id)}
            onPolygonClick={() => onPolygonClick(polygon.id)}
            polygon={polygon}
            onDelete={() => deleteHandler(polygon.id)}
            key={polygon.id}
          />
        )
      })}
    </div>
  )
}

export default PolygonList
