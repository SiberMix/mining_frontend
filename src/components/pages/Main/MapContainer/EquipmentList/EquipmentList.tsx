import React, {
  useEffect,
  useState
} from 'react'
import { mapService } from '../../../../../api/map'
import { useAtomValue } from 'jotai'
import { isDrawingAtom } from '../../Main'

type EquipmentSocketData = {
  imei: string,
  lat: string,
  lon: string,
  datetime: string
}

type Props = {
  equipmentList: any
}

const EquipmentList:React.FC<Props> = ({ equipmentList }) => {

  const isDrawing = useAtomValue(isDrawingAtom)
  const [equipmentCoordinates, setEquipmentCoordinates] = useState<EquipmentSocketData[]>([])
  const [speed, setSpeed] = useState(0)
  const [fuel, setFuel] = useState(0)

  useEffect(() => {
    void (async () => {
      const response = await mapService.getLocation()
      setEquipmentCoordinates([response.data.lat, response.data.lon])
    })()
  }, [])

  useEffect(() => {
    const ws = new WebSocket('ws://myhectare.ru:8765/')

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data)
      if (!data) return
      console.log('Координаты тракотра:', data)

      if (isDrawing) return ws.close()

      setEquipmentCoordinates(prevState => {
        return [...prevState.filter((item) => item.imei !== data.imei), data]
      })
      setSpeed(data.speed)
      setFuel(data.fuel)
    }

    return () => {
      ws.close()
    }
  }, [isDrawing])

  return (
    <>
      {equipmentList.map((equipment: any) => {
        const { equip_name, gosnomer, image_status, imei } = equipment
        console.log(image_status)

        const coordsData = equipmentCoordinates.find(equip => equip.imei === imei)
        if (!coordsData) return <></>

        const handleMouseEnter = (e: any) => {
          const polygon = e.get('target')
          const clickCoords = e.get('coords')
          const balloonContent = `<div style='background: #232323'></div>
                                                       <div>Название: ${equip_name}</div>
                                                       <div>IMEI: ${imei}</div>
                                                       <div>Гос.номер: ${gosnomer}</div>
                                                       <div>Скорость: ${speed} км/ч</div>
                                                       <div>Уровень топлива: ${fuel} л</div>`
          polygon.properties.set('hintContent', balloonContent)
          polygon.hint.open(clickCoords, balloonContent)
        }

        return (
          // <Placemark
          //   key={coordsData.imei}
          //   geometry={[coordsData.lat, coordsData.lon]}
          //   options={{
          //     iconLayout: 'default#image',
          //     iconImageHref: new URL(
          //       `./equipment-assets/${image_status}.svg`,
          //       import.meta.url
          //     ).href,
          //     iconColor: 'red'
          //   }}
          //   instanceRef={(polygon) => {
          //     if (polygon) {
          //       polygon.events.add('click', handleMouseEnter)
          //     }
          //   }}
          // />
          <div />
        )
      })}
    </>
  )
}

export default EquipmentList
