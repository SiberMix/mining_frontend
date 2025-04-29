import './PolygonSpotMenu.scss'

import { Button, message } from 'antd'
import React, { memo } from 'react'
import { Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { getAddInternalPolygonModeSelector } from '~processes/redux/selectors/mapSelectors'
import type { PolygonType } from '~processes/redux/slices/mapSlice'
import {
  putEditPolygon,
  setAddInternalPolygonMode,
  setDrawingPolygonMode,
  setNewPolygonCoords,
  setShowAddNewPolygonModal
} from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'

import type { AddPolygonCoords, EditPolygonCoords } from '../../map-drawing-polygon/ui/MapDrawingPolygon'

type PolygonSpotMenuProps = {
  deletePolygonSpot: () => void,
  polygonCoords: EditPolygonCoords,
  editedPolygon: PolygonType | undefined
}

export const PolygonSpotMenu = memo(({
  deletePolygonSpot,
  polygonCoords,
  editedPolygon
}: PolygonSpotMenuProps) => {
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
        messageApi.info(`В одном из вашех блоков указано неправильное число точек, минимальное число: ${p.length}. Пожалуйста проверьте введенные данные`)
      }
    })
    // прерывание функции если допущена ошибка в количестве координат
    if (isErrorInPolygonData) return

    if (editedPolygon) {
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
      <div className='PolygonSpotMenuWrapper'>
        <Button
          onClick={buttonsSaveHandler}
          className='PolygonSpotMenuBTN'

        >
          Сохранить блок
        </Button>
        <Button
          className='PolygonSpotMenuBTN'
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
                className='PolygonSpotMenuBTN'
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(setDrawingPolygonMode(false))
                }}
              >
                Выкл. редактирование
              </Button>
              <Button
                className='PolygonSpotMenuBTN'
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
                className='PolygonSpotMenuBTN'
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
})
