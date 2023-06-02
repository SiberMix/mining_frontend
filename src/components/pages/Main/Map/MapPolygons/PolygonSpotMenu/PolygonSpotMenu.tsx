import s from './PolygonSpotMenu.module.scss'
import { Popup } from 'react-leaflet'
import React from 'react'
import { Button } from 'antd'

type Props = {
  index: number,
  deletePolygonSpot: (n: number) => void,
  addNewPolygon: () => void
}

const PolygonSpotMenu: React.FC<Props> = ({
  index,
  deletePolygonSpot,
  addNewPolygon
}) => {

  return (
    <Popup>
      <div className={s.polygonSpotMenuWrapper}>
        <Button
          onClick={() => addNewPolygon()}
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
