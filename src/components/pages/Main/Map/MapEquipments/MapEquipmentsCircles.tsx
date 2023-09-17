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

        const noCoords = !lastCoords && !wsDataForEquip
        const noRadius = radius === null
        const isMinZoom = zoomLevel > 17

        if (noCoords || noRadius || !isMinZoom) return

        return (
          <Circle
            key={'circle_' + imei}
            center={wsDataForEquip || lastCoords}
            radius={radius as number} //убрали все случаи null чуть выше
            pathOptions={{
              color: '#ffffff', // Цвет границы круга
              fillColor: 'transparent', // Прозрачный цвет заливки
              fillOpacity: 0, // Прозрачность заливки
              weight: 1 // Толщина границы в пикселях
            }}
          />
        )
      })}
    </>
  )
}

export default MapEquipmentsCircles
