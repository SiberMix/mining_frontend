import React from 'react'
import type { Equip } from '../../../../../types/equip'
import EquipCastomMarker from './EquipCastomMarker'
// импорты для кластеров
import 'react-leaflet-markercluster/dist/styles.min.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector, getEquipmentCoordinatesWebSocket, getEquipStatusArrWebSocket } from '../../../../../redux/selectors/mapSelectors'
import MapEquipmentsCircles from './MapEquipmentsCircles'

type Props = {}

const MapEquipments: React.FC<Props> = () => {
  const equipList = useSelector(getAllEquipmentSelector)
  const equipmentCoordinates = useSelector(getEquipmentCoordinatesWebSocket)
  const equipStatusArr = useSelector(getEquipStatusArrWebSocket)

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
          gosnomer,
          image_status,
          imei,
          last_coord,
          fuel,
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
              gosnomer={gosnomer}
              image_status={image_status}
              imei={imei}
              speed={wsDataForEquip?.speed || 0}
              fuel_s={wsDataForEquip?.fuel_s || fuel || null}
              fuel_s_second={wsDataForEquip?.fuel_s_second || fuel || null}
              direction={wsDataForEquip?.direction || last_coord?.direction || 0}
              lastUpdDtt={last_coord?.last_upd_ts || ''}
              status={equipSocketStatus || last_status || 'Offline'}
            />
          )
        })}
      </MarkerClusterGroup>
      <MapEquipmentsCircles equipmentCoordinates={equipmentCoordinates} />
    </>
  )
}

export default MapEquipments
