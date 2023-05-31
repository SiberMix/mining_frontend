import {
  CircleMarker,
  Popup
} from 'react-leaflet'
import React from 'react'

type Props = {
  position: [number, number],
  setEditMode: (editMode: boolean) => void
}

const PolygonSpotMenu: React.FC<Props> = ({
  position,
  setEditMode
}) => {

  const handleButtonClick = (e: any) => {
    e.stopPropagation()
    setEditMode(true)
    console.log('Button clicked!')
  }

  return (
    <CircleMarker
      center={position}
      pathOptions={spotMenuStyle}
      className="polygon-spot-menu"
    >
      <Popup>
        <div>
          <button onClick={handleButtonClick}>
            Сохранить
          </button>
          <button onClick={handleButtonClick}>
            Редактировать
          </button>
          <button onClick={handleButtonClick}>
            Удалить
          </button>
        </div>
      </Popup>
    </CircleMarker>
  )
}

const spotMenuStyle = {
  radius: 7,
  fillColor: '#fff',
  fillOpacity: 0.5,
  color: '#fff',
  weight: 2
}

export default PolygonSpotMenu
