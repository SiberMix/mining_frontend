import './PolygonsListCSSTransition.scss'
import './PolygonListSideOut.scss'

import React from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import DownloadMap from '~shared/assets/icons/download2.svg'
import settingMap from '~shared/assets/icons/equalizersoutline_114523.svg'
import { SideOutLayout } from '~shared/ui/side-out-layout'

import { getAllPolygonsSelector, getDrawingPolygonModeSelector } from '../../../../../../srcOld/redux/selectors/mapSelectors'
import { deletePolygon, setDrawingPolygonMode } from '../../../../../../srcOld/redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../srcOld/redux/store'
import { PolygonAddModal } from '../../polygon-add-modal'
import { PolygonPreview } from '../../polygon-preview'

export const PolygonListSideOut: React.FC<{
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
    <SideOutLayout className='PolygonList'>
      <div className='header'>
        <img
          className='image'
          src={settingMap}
          alt=''
        />
        <div className='headerCount'>
          <div>
            Список полей
          </div>
          <div>
            {`${inclinedText} | ${polygonsTotalSquare} Га`}
          </div>
        </div>
        <img
          className='image'
          src={DownloadMap}
          alt=''
        />
      </div>
      <button
        className='addButton'
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
      <PolygonAddModal />
    </SideOutLayout>
  )
}
