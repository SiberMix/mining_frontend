import { useAtomValue } from 'jotai'
import { isDrawingAtom } from '../../Main'
import React, {
  useEffect,
  useState
} from 'react'
import { mapService } from '../../../../../api/map'
import type { Equip } from '../../../../../types/equip'
import EquipCastomMarker from './EquipCastomMarker'

type Props = {
  selectedEquipment: number | undefined,
  setSelectedEquipment: (id: number | undefined) => void
}

export type EquipmentSocketData = {
  imei: string,
  lat: string,
  lon: string,
  datetime: string
}
const MapEquipments: React.FC<Props> = ({ selectedEquipment, setSelectedEquipment }) => {
  const [equipmentList, setEquipmentList] = useState<Equip[]>([])
  //todo перенести в Redux
  const isDrawing = useAtomValue(isDrawingAtom)
  const [equipmentCoordinates, setEquipmentCoordinates] = useState<EquipmentSocketData[]>([])
  const [speed, setSpeed] = useState(0)
  const [fuel, setFuel] = useState(0)

  useEffect(() => {
    // Получаем список оборудования с имей через API
    mapService.getEquips()
      .then(data => setEquipmentList(data.data))
  }, [])

  useEffect(() => {
    void (async () => {
      const response = await mapService.getLocation()
      setEquipmentCoordinates([response.data.lat, response.data.lon])
      // todo Проверить на наличие изначальноего imei
    })()
  }, [])

  useEffect(() => {
    const ws = new WebSocket('ws://myhectare.ru:8765/')

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data)
      if (!data) return
      // console.log('Координаты тракотра:', data)

      // закрывает канал, пока идет отрисовка полигона?
      if (isDrawing) return ws.close()

      setEquipmentCoordinates(prevState => {
        return [...prevState.filter((item) => item.imei !== data.imei), data]
      })
      setSpeed(data.speed)
      setFuel(data.fuel)
      // todo почему все координаты льются
    }

    return () => {
      ws.close()
    }
  }, [isDrawing])

  return (
    <>
      {equipmentList.map((equipment: any) => {
        const {
          equip_name,
          gosnomer,
          image_status,
          imei
        } = equipment
        const coordsData = equipmentCoordinates.find(equip => equip.imei === imei)
        if (!coordsData) return
        return (
          <EquipCastomMarker
            coordsData={coordsData}
            equip_name={equip_name}
            gosnomer={gosnomer}
            image_status={image_status}
            imei={imei}
            speed={speed}
            fuel={fuel}
            selectedEquipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
          />
        )
      })}
    </>
  )
}

export default MapEquipments
