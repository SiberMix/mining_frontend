import L from 'leaflet'
import {
  Marker,
  Popup,
  useMap
} from 'react-leaflet'
import React, {
  useEffect,
  useRef
} from 'react'
import type { EquipmentSocketData } from './MapEquipments'

type Props = {
  coordsData: EquipmentSocketData,
  image_status: number,
  equip_name: string,
  imei: number,
  gosnomer: number,
  speed: number,
  fuel: number,
  selectedEquipment: number | undefined
}

const EquipCastomMarker: React.FC<Props> = ({
  coordsData,
  image_status,
  equip_name,
  imei,
  gosnomer,
  speed,
  fuel,
  selectedEquipment
}) => {
  const map = useMap()
  //из-за библиотеки react-leafet нужно указать в типизации any
  const equipRef = useRef<any>(null)

  useEffect(() => {
    if (selectedEquipment === imei) {
      map?.flyTo([+coordsData.lat, +coordsData.lon], 13, { animate: false })
      equipRef.current?.openPopup()
    }
  }, [selectedEquipment])

  return (
    <Marker
      ref={equipRef}
      position={[+coordsData.lat, +coordsData.lon]}
      icon={L.icon({
        iconUrl: `src/assets/icons_enum/${image_status}.svg`,
        iconSize: [60, 60]
      })}
    >
      <Popup>
        <div>
          Название: $
          {equip_name}
        </div>
        <div>
          IMEI: $
          {imei}
        </div>
        <div>
          Гос.номер: $
          {gosnomer}
        </div>
        <div>
          Скорость: $
          {speed}
          {' '}
          км/ч
        </div>
        <div>
          Уровень топлива: $
          {fuel}
          {' '}
          л
        </div>
      </Popup>
    </Marker>
  )
}

export default EquipCastomMarker
