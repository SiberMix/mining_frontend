import s from './PolygonSpotMenu.module.scss'
import { Popup } from 'react-leaflet'
import React from 'react'
import { Button } from 'antd'
import { setShowAddNewPolygonModal } from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'

type Props = {
  index: number,
  deletePolygonSpot: (n: number) => void
}

const PolygonSpotMenu: React.FC<Props> = ({
  index,
  deletePolygonSpot
}) => {
  const dispatch = useAppDispatch()

  return (
    <Popup>
      <div className={s.polygonSpotMenuWrapper}>
        <Button
          onClick={() => dispatch(setShowAddNewPolygonModal(true))}
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
      </div>
    </Popup>
  )
}

export default PolygonSpotMenu
