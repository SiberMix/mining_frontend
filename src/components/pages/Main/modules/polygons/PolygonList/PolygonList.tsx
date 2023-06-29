import './PolygonsListCSSTransition.scss'
import s from './PolygonList.module.scss'
import style from '../../field/FieldList/FieldList.module.scss'
import * as cn from 'classnames'
import React from 'react'
import * as turf from '@turf/turf'
import settingMap from '/src/assets/icons/equalizersoutline_114523.svg'
import DownloadMap from '/src/assets/icons/download2.svg'
import PolygonPreview from '../PolygonPreview/PolygonPreview'
import { useSelector } from 'react-redux'
import {
  getAllPolygonsSelector,
  getDrawingPolygonModeSelector
} from '../../../../../../redux/selectors/mapSelectors'
import {
  deletePolygon,
  setDrawingPolygonMode
} from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'

const PolygonList: React.FC<{
  onPolygonOption?: (id: string | number) => void
}> = () => {
  const dispatch = useAppDispatch()

  const polygons = useSelector(getAllPolygonsSelector)
  const sortedPolygons = [...polygons].sort((a, b) => a.name.localeCompare(b.name))
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)

  const toggleDrawing = () => dispatch(setDrawingPolygonMode(!drawingPolygonMode))

  const numPolygons = polygons.reduce((count, polygon) => {
    if (polygon.coords.length) {
      return count + 1
    }
    return count
  }, 0)

  //todo сыпятся ошибки из-за разных типов координат полигонов
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
        const area = calculateArea(polygon.coords[0])
        totalArea += area
      }
    })
    return totalArea.toFixed(2)
  }

  const hectares = calculateTotalArea()

  const deleteHandler = async (id: string | number) => {
    if (confirm('Вы уверены, что хотите удалить полигон?')) {
      try {
        dispatch(deletePolygon(+id))
      } catch (e) {
        console.log(e)
      }
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
        <div className={s.headerCount}>
          <div>
            Список полей
          </div>
          <div>
            {`Всего ${numPolygons} | ${hectares} Га`}
          </div>
        </div>
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
        {drawingPolygonMode
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
      <TransitionGroup className="polygons">
        {sortedPolygons.map(polygon => {
          if (!polygon.coords.length) return null
          return (
            <CSSTransition
              key={polygon.id}
              timeout={500}
              classNames="item"
            >
              <PolygonPreview
                polygon={polygon}
                onDelete={() => deleteHandler(polygon.id)}
                key={polygon.id}
              />
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </div>
  )
}

export default PolygonList
