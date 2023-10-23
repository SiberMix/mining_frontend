import React, { useEffect, useState } from 'react'
import type { Equip } from '../../../../../types/equip'
import EquipCastomMarker from './EquipCastomMarker'
// импорты для кластеров
import 'react-leaflet-markercluster/dist/styles.min.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector, getDrawingPolygonModeSelector } from '../../../../../redux/selectors/mapSelectors'
import MapEquipmentsCircles from './MapEquipmentsCircles'
import { webSocketServices } from '../../../../../api/sockets'
import { EquipEventsSocket, EquipEventsSocketDataArr, EquipmentSocketData } from '../../../../../redux/slices/mapSlice'

type Props = {}

const MapEquipments: React.FC<Props> = () => {
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)
  const equipList = useSelector(getAllEquipmentSelector)

  const [equipmentCoordinates, setEquipmentCoordinates] = useState<EquipmentSocketData[]>([])
  const [equipStatusArr, setEquipStatusArr] = useState<EquipEventsSocketDataArr>([])

  const equipCoordsSocketHandler = (data: EquipmentSocketData) => {
    console.log('новые координаты трактора:', data)
    if (drawingPolygonMode) {
      webSocketServices.equipCoordsSocket.disconnect()
      return
    }
    setEquipmentCoordinates((prevState) => [...prevState.filter((item) => item.imei !== data.imei), data])
  }

  const equipEventsSocketHandler = (data: EquipEventsSocket) => {
    console.log('новые данные по ивентам тракторов:', data)
    data.data.forEach((newData) => {
      const dataIndex = equipStatusArr.findIndex((item) => item.imei === newData.imei)

      if (dataIndex !== -1) {
        const updatedDataList = [...equipStatusArr]
        updatedDataList[dataIndex] = newData
        setEquipStatusArr(updatedDataList)
      } else {
        setEquipStatusArr((prevDataList) => [...prevDataList, newData])
      }
    })
  }

  useEffect(() => { //todo почему блять два сокета а не 1 для работы с оборудованиями??? въебать бэкендерам.
    webSocketServices.equipCoordsSocket.connect(equipCoordsSocketHandler)
    webSocketServices.equipEventsSocket.connect(equipEventsSocketHandler)
    return () => {
      webSocketServices.equipCoordsSocket.disconnect()
      webSocketServices.equipEventsSocket.disconnect()
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
          last_status
        }: Equip) => {
          //костыльно подтягиваем данные бека под нужные нам
          const lastCoords = last_coord
            ? {
              lat: last_coord.lat,
              lon: last_coord.lon
            }
            : undefined
          const wsDataForEquip: any = equipmentCoordinates.find(equip => equip.imei === imei)
          const equipSocketStatus = equipStatusArr.find(e => e.imei === imei)?.status

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
