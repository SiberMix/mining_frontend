import React, { memo } from 'react'
import { Circle } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { getAllEquipmentSelector, getZoomLevelSelector } from '~processes/redux/selectors/mapSelectors'
import type { Equip, EquipmentSocketData } from '~processes/redux/slices/mapSlice'

type MapEquipmentsCirclesProps = {
  equipmentCoordinates: EquipmentSocketData[]
}

export const MapEquipmentsCirclesRadius = memo(({ equipmentCoordinates }: MapEquipmentsCirclesProps) => {
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
              color: 'tomato', // Цвет границы круга
              fillColor: 'transparent', // Прозрачный цвет заливки
              fillOpacity: 0, // Прозрачность заливки
              weight: 2 // Толщина границы в пикселях
            }}
          />
        )
      })}
    </>
  )
})
