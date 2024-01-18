import './PolygonsListCSSTransition.scss'

import * as cn from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import DownloadMap from '~shared/assets/icons/download2.svg'
import settingMap from '~shared/assets/icons/equalizersoutline_114523.svg'

import { getAllPolygonsSelector, getDrawingPolygonModeSelector } from '../../../../../../redux/selectors/mapSelectors'
import { deletePolygon, setDrawingPolygonMode } from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import style from '../../field/FieldList/FieldList.module.scss'
import PolygonPreview from '../PolygonPreview/PolygonPreview'
import s from './PolygonList.module.scss'

const PolygonList: React.FC<{
  onPolygonOption?: (id: string | number) => void
}> = () => {
  const dispatch = useAppDispatch()

  const polygons = useSelector(getAllPolygonsSelector)
  const sortedPolygons = [...polygons].sort((a, b) => a.name.localeCompare(b.name))
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)

  const toggleDrawing = () => dispatch(setDrawingPolygonMode(!drawingPolygonMode))

  const polygonsTotalCount = polygons.length
  const polygonsTotalSquare = polygons
    .map(polygon => +polygon.square)
    .reduce((a, b) => a + b, 0)
    .toFixed(2)
  /*
  * Склоняем слово полигоны
  * */
  const declination = (num: number, variant: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2]
    return num % 100 > 4 && num % 100 < 20
      ? variant[2]
      : variant[cases[num % 10 < 5 ? num % 10 : 5]]
  }

  const inclinedText = `Всего ${polygonsTotalCount} ${declination(polygonsTotalCount, [
    'полигон',
    'полигона',
    'полигонов'
  ])}`

  const deleteHandler = async (id: string | number) => {
    try {
      dispatch(deletePolygon(+id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cn(s.root, style.noScrollBar)}>
      <div className={cn(s.header)}>
        <img
          className={cn(s.image)}
          src={settingMap}
          alt=''
        />
        <div className={s.headerCount}>
          <div>
            Список полей
          </div>
          <div>
            {`${inclinedText} | ${polygonsTotalSquare} Га`}
          </div>
        </div>
        <img
          className={cn(s.image)}
          src={DownloadMap}
          alt=''
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
      <TransitionGroup className='polygons'>
        {sortedPolygons.map(polygon => {
          if (!polygon.coords.length) return null
          return (
            <CSSTransition
              key={polygon.id}
              timeout={500}
              classNames='item'
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
