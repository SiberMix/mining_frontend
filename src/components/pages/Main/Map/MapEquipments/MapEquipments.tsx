// импорты для кластеров
import "react-leaflet-markercluster/dist/styles.min.css"

import React from "react"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useSelector } from "react-redux"

import {
  getAllEquipmentSelector,
  getEquipmentCoordinatesWebSocketSelector,
  getEquipStatusArrWebSocketSelector
} from "../../../../../redux/selectors/mapSelectors"
import type { Equip } from "../../../../../types/equip"
import EquipCastomMarker from "./EquipCastomMarker"
import MapEquipmentsCircles from "./MapEquipmentsCircles"

type Props = {}

const MapEquipments: React.FC<Props> = () => {
  const equipList = useSelector(getAllEquipmentSelector)
  const equipmentCoordinates = useSelector(getEquipmentCoordinatesWebSocketSelector)
  const equipStatusArr = useSelector(getEquipStatusArrWebSocketSelector)

  return (
    <>
      {/*@ts-ignore немного устаревшая технология кластеров, задача с решением типов займет очень много времени*/}
      <MarkerClusterGroup
        spiderfyDistanceMultiplier={1}
        showCoverageOnHover={true}
        maxClusterRadius={45}
      >
        {equipList.map(({
          equip_name,
          image_status,
          imei,
          last_coord,
          last_status
        }: Equip) => {
          //костыльно подтягиваем данные бека под нужные нам
          const lastCoords = last_coord
            ? {
              lat: last_coord.lat,
              lon: last_coord.lon
            }
            : undefined
          const wsDataForEquip = equipmentCoordinates.find(equip => equip.imei === imei)
          const equipSocketStatus = equipStatusArr.find(e => e.imei === imei)?.status

          if (!lastCoords && !wsDataForEquip) return

          return (
            <EquipCastomMarker
              key={imei}
              coordsData={wsDataForEquip || lastCoords as any}
              equip_name={equip_name}
              image_status={image_status}
              imei={imei}
              direction={wsDataForEquip?.direction || last_coord?.direction || 0}
              status={equipSocketStatus || last_status || "Offline"}
            />
          )
        })}
      </MarkerClusterGroup>
      <MapEquipmentsCircles equipmentCoordinates={equipmentCoordinates} />
    </>
  )
}

export default MapEquipments
