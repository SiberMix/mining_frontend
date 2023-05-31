import s from './PolygonSpotMenu.module.scss'
import {
  CircleMarker,
  Popup
} from 'react-leaflet'
import React from 'react'
import { Button } from 'antd'

type Props = {
  position: [number, number],
  setEditMode: (editMode: boolean) => void,
  index: number,
  deletePolygonSpot: (n: number) => void,
  addNewPolygon: () => void
}

const PolygonSpotMenu: React.FC<Props> = ({
  position,
  setEditMode,
  index,
  deletePolygonSpot,
  addNewPolygon
}) => {

  const handleButtonClick = (e: any) => {
    e.stopPropagation()
    setEditMode(true)
  }

  return (
    <CircleMarker
      center={position}
      pathOptions={spotMenuStyle}
      className="polygon-spot-menu"
    >
      <Popup>
        <div className={s.polygonSpotMenuWrapper}>
          <Button
            onClick={() => addNewPolygon()}
            className={s.polygonSpotMenuBTN}
          >
            Сохранить
          </Button>
          <Button
            onClick={handleButtonClick}
            className={s.polygonSpotMenuBTN}
          >
            Редактировать
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
    </CircleMarker>
  )
}

const spotMenuStyle = {
  radius: 6,
  fillColor: '#ffffff',
  fillOpacity: 0.7,
  color: '#ffffff',
  weight: 1
}

export default PolygonSpotMenu
