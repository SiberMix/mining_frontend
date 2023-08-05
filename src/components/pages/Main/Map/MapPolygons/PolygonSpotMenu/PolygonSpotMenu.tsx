import s from './PolygonSpotMenu.module.scss'
import { Popup } from 'react-leaflet'
import React from 'react'
import { Button, message } from 'antd'
import { putEditPolygon, setAddInternalPolygonMode, setDrawingPolygonMode, setNewPolygonCoords, setShowAddNewPolygonModal } from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import type { Polygon } from '../../../../../../types'
import { useSelector } from 'react-redux'
import { getAddInternalPolygonModeSelector } from '../../../../../../redux/selectors/mapSelectors'
import type { AddPolygonCoords, EditPolygonCoords } from '../DrawingPolygon'

type Props = {
  deletePolygonSpot: () => void,
  polygonCoords: EditPolygonCoords,
  editedPolygon: Polygon | undefined
}

const PolygonSpotMenu: React.FC<Props> = ({
  deletePolygonSpot,
  polygonCoords,
  editedPolygon
}) => {
  const dispatch = useAppDispatch()
  const addInternalPolygonMode = useSelector(getAddInternalPolygonModeSelector)

  const [messageApi, contextHolder] = message.useMessage()
  const buttonsSaveHandler = () => {
    let isErrorInPolygonData = false

    polygonCoords.forEach((p: AddPolygonCoords, i: number) => {
      if (i === 0 && p.length < 4) {
        isErrorInPolygonData = true
        messageApi.info(`Необходимо указать не менее 4 точек полингона на карте! Вы указали: ${p.length}`)
      } else if (i !== 0 && p.length < 5) {
        isErrorInPolygonData = true
        messageApi.info(`В одном из вашех полигонов указано неправильное число точек, минимальное число: ${p.length}. Пожалуйста проверьте введенные данные`)
      }
    })
    // прерывание функции если допущена ошибка в количестве координат
    if (isErrorInPolygonData) return

    if (editedPolygon) {
      console.log(polygonCoords)
      dispatch(putEditPolygon({
        polygonId: +editedPolygon.id,
        newOption: { coords: polygonCoords }
      }))
    } else {
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
          Сохранить полигон
        </Button>
        <Button
          className={s.polygonSpotMenuBTN}
          onClick={(e) => {
            e.stopPropagation()
            deletePolygonSpot()
          }}
        >
          Удалить точку
        </Button>
        {
          editedPolygon && !addInternalPolygonMode
            ? <>
              <Button
                className={s.polygonSpotMenuBTN}
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(setDrawingPolygonMode(false))
                }}
              >
                Выкл. редактирование
              </Button>
              <Button
                className={s.polygonSpotMenuBTN}
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(setAddInternalPolygonMode(true))
                }}
              >
                Внутренний контур
              </Button>
            </>
            : null
        }
        {
          editedPolygon && addInternalPolygonMode
            ? <>
              <Button
                className={s.polygonSpotMenuBTN}
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(setAddInternalPolygonMode(false))
                }}
              >
                Закончить вн. контур
              </Button>
            </>
            : null
        }
      </div>
      {contextHolder}
    </Popup>
  )
}

export default PolygonSpotMenu
