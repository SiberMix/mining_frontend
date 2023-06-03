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
import { useAppDispatch } from '../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getEquipmentFlyToSelector } from '../../../../../redux/selectors/mapSelectors'
import { setEquipmentFlyTo } from '../../../../../redux/slices/mapSlice'

type Props = {
  coordsData: EquipmentSocketData,
  image_status: number,
  equip_name: string,
  imei: number,
  gosnomer: number,
  speed: number,
  fuel: number
}

const EquipCastomMarker: React.FC<Props> = ({
  coordsData,
  image_status,
  equip_name,
  imei,
  gosnomer,
  speed,
  fuel
}) => {

  const map = useMap()
  const dispatch = useAppDispatch()
  const equipmentFlyTo = useSelector(getEquipmentFlyToSelector)

  //из-за библиотеки react-leafet нужно указать в типизации any
  const equipRef = useRef<any>(null)
  useEffect(() => {
    if (equipmentFlyTo === +coordsData.imei) {
      map?.flyTo([+coordsData.lat, +coordsData.lon], 15, { animate: false })
      equipRef.current?.openPopup()
      //обнуление id после того как перенесли карту, и даже если не перенесли
      dispatch(setEquipmentFlyTo(undefined))
    }
  }, [equipmentFlyTo])

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
          Название:
          {equip_name}
        </div>
        <div>
          IMEI:
          {imei}
        </div>
        <div>
          Гос.номер:
          {gosnomer}
        </div>
        <div>
          Скорость:
          {speed}
          {' '}
          км/ч
        </div>
        <div>
          Уровень топлива:
          {fuel}
          {' '}
          л
        </div>
      </Popup>
    </Marker>
  )
}

export default EquipCastomMarker
