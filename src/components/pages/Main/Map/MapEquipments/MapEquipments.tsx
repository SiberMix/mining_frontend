import React, { useEffect, useState } from 'react'
import type { Equip } from '../../../../../types/equip'
import EquipCastomMarker from './EquipCastomMarker'
// импорты для кластеров
import 'react-leaflet-markercluster/dist/styles.min.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector, getDrawingPolygonModeSelector } from '../../../../../redux/selectors/mapSelectors'
import MapEquipmentsCircles from './MapEquipmentsCircles'

type Props = {}

export type EquipmentSocketData = {
  imei: string,
  lat: string,
  lon: string,
  datetime: string,
  direction: number,
  speed: number,
  fuel: number
}
const MapEquipments: React.FC<Props> = () => {
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)
  const equipList = useSelector(getAllEquipmentSelector)

  const [equipmentCoordinates, setEquipmentCoordinates] = useState<EquipmentSocketData[]>([])

  useEffect(() => {
    const ws = new WebSocket('ws://myhectare.ru:8765/')

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data)
      if (!data) return
      console.log('Координаты тракотра:', data)

      if (drawingPolygonMode) return ws.close()

      setEquipmentCoordinates(prevState => {
        return [...prevState.filter((item) => item.imei !== data.imei), data]
      })
    }

    return () => {
      ws.close()
    }
  }, [drawingPolygonMode])

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
          radius
        }: Equip) => {
          //костыльно подтягиваем данные бека под нужные нам
          const lastCoords = last_coord
            ? {
              lat: last_coord.lat,
              lon: last_coord.lon
            }
            : undefined
          const wsDataForEquip: any = equipmentCoordinates.find(equip => equip.imei === imei)

          if (!lastCoords && !wsDataForEquip) return

          return (
            <EquipCastomMarker
              key={imei}
              coordsData={wsDataForEquip || lastCoords}
              equip_name={equip_name}
              gosnomer={gosnomer}
              image_status={image_status}
              imei={imei}
              speed={wsDataForEquip?.speed || 0}
              fuel={wsDataForEquip?.fuel || fuel || null}
              direction={wsDataForEquip?.direction || last_coord?.direction}
              lastUpdDtt={last_coord?.last_upd_ts || ''}
            />
          )
        })}
      </MarkerClusterGroup>
      <MapEquipmentsCircles equipmentCoordinates={equipmentCoordinates} />
    </>
  )
}

export default MapEquipments
