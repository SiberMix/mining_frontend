import s from './PolygonSpotMenu.module.scss'
import { Popup } from 'react-leaflet'
import React from 'react'
import { Button } from 'antd'
import {
  putEditPolygon,
  setDrawingPolygonMode,
  setNewPolygonCoords,
  setShowAddNewPolygonModal
} from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import type { Polygon } from '../../../../../../types'

type Props = {
  index: number,
  deletePolygonSpot: (n: number) => void,
  polygonCoords: [number, number][],
  editedPolygon: Polygon | undefined
}

const PolygonSpotMenu: React.FC<Props> = ({
  index,
  deletePolygonSpot,
  polygonCoords,
  editedPolygon
}) => {
  const dispatch = useAppDispatch()

  const buttonsSaveHandler = () => {
    if (editedPolygon) {
      //проверям на наличие замыкающей координаты
      const firstSpot = polygonCoords[0]
      const lastSpot = polygonCoords[polygonCoords.length - 1]
      const spotsCondition = firstSpot[0] === lastSpot[0] && firstSpot[1] === lastSpot[1]
      let currentCoords: [number, number][]
      if (spotsCondition) {
        currentCoords = polygonCoords
      } else {
        currentCoords = [...polygonCoords, polygonCoords[0]]
      }
      // проверка на удаление точек полигона
      if (polygonCoords.length < 5) {
        alert(`Необходимо указать не менее 4 точек на карте! Вы указали: ${polygonCoords.length}`)
      } else {
        dispatch(putEditPolygon({
          polygonId: +editedPolygon.id,
          newOption: { coords: currentCoords }
        }))
      }
    } else {
      if (polygonCoords.length < 4) {
        if (polygonCoords.length === 0) {
          return
        }
        alert(`Необходимо указать не менее 4 точек на карте! Вы указали: ${polygonCoords.length}`)
        return
      }
      dispatch(setNewPolygonCoords(polygonCoords))
      dispatch(setShowAddNewPolygonModal(true))
    }
  }

  return (
    <Popup>
      <div className={s.polygonSpotMenuWrapper}>
        <Button
          onClick={buttonsSaveHandler}
          className={s.polygonSpotMenuBTN}

        >
          Сохранить
        </Button>
        <Button
          className={s.polygonSpotMenuBTN}
          onClick={(e) => {
            e.stopPropagation()
            deletePolygonSpot(index)
          }}
        >
          Удалить
        </Button>
        {
          editedPolygon
            ? <Button
              className={s.polygonSpotMenuBTN}
              onClick={(e) => {
                e.stopPropagation()
                dispatch(setDrawingPolygonMode(false))
              }}
              >
            Выкл. редактирование
            </Button>
            : null
        }
      </div>
    </Popup>
  )
}

export default PolygonSpotMenu
