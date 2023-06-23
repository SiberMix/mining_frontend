import React, {
  useEffect,
  useState
} from 'react'
import { mapService } from '../../../../../api/map'
import type { Equip } from '../../../../../types/equip'
import EquipCastomMarker from './EquipCastomMarker'
// импорты для кластеров
import 'react-leaflet-markercluster/dist/styles.min.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useSelector } from 'react-redux'
import {
  getAllEquipmentSelector,
  getDrawingPolygonModeSelector
} from '../../../../../redux/selectors/mapSelectors'
import { getTokenSelector } from '../../../../../redux/selectors/authSelectors'

type Props = {}

export type EquipmentSocketData = {
  imei: string,
  lat: string,
  lon: string,
  datetime: string,
  direction: number
}
const MapEquipments: React.FC<Props> = () => {
  const token = useSelector(getTokenSelector)
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)
  const equipList = useSelector(getAllEquipmentSelector)

  const [equipmentCoordinates, setEquipmentCoordinates] = useState<EquipmentSocketData[]>([])
  const [speed, setSpeed] = useState(0)
  const [fuel, setFuel] = useState(0)

  useEffect(() => {
    void (async () => {
      const response = await mapService.getLocation(token)
      setEquipmentCoordinates([response.data.lat, response.data.lon])
      // todo Проверить на наличие изначальноего imei \ запрос вообще не прохоит
    })()
  }, [])

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
      setSpeed(data.speed)
      setFuel(data.fuel)
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
        {equipList.map((equipment: Equip) => {
          const {
            equip_name,
            gosnomer,
            image_status,
            imei,
            last_coord
          } = equipment
          //костыльно подтягиваем данные бека под нужные нам
          const lastCoords = last_coord
            ? {
              lat: last_coord.lat,
              lon: last_coord.lon
            }
            : undefined
          const coordsData: any = equipmentCoordinates.find(equip => equip.imei === imei)

          if (!lastCoords && !coordsData) return

          return (
            <EquipCastomMarker
              key={imei}
              coordsData={coordsData || lastCoords}
              equip_name={equip_name}
              gosnomer={gosnomer}
              image_status={image_status}
              imei={imei}
              speed={speed}
              fuel={fuel}
              direction={coordsData?.direction || last_coord?.direction}
              lastUpdDtt={last_coord?.last_upd_ts || ''}
            />
          )
        })}
      </MarkerClusterGroup>
    </>
  )
}

export default MapEquipments
