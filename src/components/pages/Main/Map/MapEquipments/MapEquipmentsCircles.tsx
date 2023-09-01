import React from 'react'
import { Equip } from '../../../../../types/equip'
import { Circle } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector, getZoomLevelSelector } from '../../../../../redux/selectors/mapSelectors'
import { EquipmentSocketData } from './MapEquipments'

type Props = {
  equipmentCoordinates: EquipmentSocketData[]
}

const MapEquipmentsCircles: React.FC<Props> = ({ equipmentCoordinates }) => {
  const equipList = useSelector(getAllEquipmentSelector)
  const zoomLevel = useSelector(getZoomLevelSelector)

  return (
    <>
      {equipList.map(({
        imei,
        last_coord,
        radius
      }: Equip) => {
        const lastCoords = last_coord
          ? {
            lat: last_coord.lat,
            lon: last_coord.lon
          }
          : undefined
        const wsDataForEquip: any = equipmentCoordinates.find(equip => equip.imei === imei)

        if (!lastCoords && !wsDataForEquip && radius === null) return

        return (
          <>
            {
              zoomLevel > 17 &&
              <Circle
                key={'circle_' + imei}
                center={lastCoords ? [+lastCoords?.lat, +lastCoords?.lon] : [+wsDataForEquip?.lat, +wsDataForEquip?.lon]}
                radius={radius as number} //убрали все случаи null чуть выше
                pathOptions={{
                  color: '#ffffff', // Цвет границы круга
                  fillColor: 'transparent', // Прозрачный цвет заливки
                  fillOpacity: 0, // Прозрачность заливки
                  weight: 1 // Толщина границы в пикселях
                }}
              />
            }
          </>
        )
      })}
    </>
  )
}

export default MapEquipmentsCircles
