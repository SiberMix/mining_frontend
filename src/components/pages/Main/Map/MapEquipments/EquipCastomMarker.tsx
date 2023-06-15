import L from 'leaflet'
import {
  Marker,
  Popup,
  useMap
} from 'react-leaflet'
import React, { useEffect } from 'react'
import type { EquipmentSocketData } from './MapEquipments'
import { useAppDispatch } from '../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getEquipmentFlyToSelector } from '../../../../../redux/selectors/mapSelectors'
import { setEquipmentFlyTo } from '../../../../../redux/slices/mapSlice'
import { getUsingEquipmentOptionsSelector } from '../../../../../redux/selectors/settingsSelector'

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
  const stateEquipmentOptions = useSelector(getUsingEquipmentOptionsSelector)
  console.log(stateEquipmentOptions)

  useEffect(() => {
    if (equipmentFlyTo === +coordsData.imei) {
      map?.flyTo([+coordsData.lat, +coordsData.lon], 18, { animate: false })
      //обнуление id после того как перенесли карту, и даже если не перенесли
      dispatch(setEquipmentFlyTo(undefined))
    }
  }, [equipmentFlyTo])

  /*
  * меняет изображение техники при минимальном зуме
  * */
  // const [zoomLevel, setZoomLevel] = useState(1)
  //
  // // webstorm просто не видит использование события zoom, поэтому ловим предупредение
  // // НЕ ТРОГАТЬ!!!
  // useMapEvents({
  //   zoom: () => {
  //     const newZoomLevel = map.getZoom()
  //     setZoomLevel(newZoomLevel)
  //   }
  // })
  // const imagePath = useMemo(() => {
  //   /**
  //   * todo если нужно отключить то меняем с 17 на 18. Больше 18 он быть не может
  //   * todo по дефолту 17
  //   * */
  //   return zoomLevel > 18 ? 'src/assets/icons_enum/hoveraster-mini.png' : `src/assets/icons_enum/${image_status}.svg`
  // }, [zoomLevel])
  //
  // const markerIcon = useMemo(() => {
  //   return L.divIcon({
  //     className: 'custom-marker-icon',
  //     iconSize: [60, 60],
  //     html: `<img style='transform: rotate(${0}deg); width: 60px; height: 60px;' alt='${equip_name}' src=${imagePath} />`
  //   })
  // }, [imagePath])

  const markerIcon = L.divIcon({
    className: 'custom-marker-icon',
    iconSize: [60, 60],
    html: `<img style='transform: rotate(${0}deg); width: 60px; height: 60px;' alt='${equip_name}' src='src/assets/icons_enum/${image_status}.svg' />`
  })

  return (
    <Marker
      position={[+coordsData.lat, +coordsData.lon]}
      icon={markerIcon}
    >
      <Popup>
        <div>
          {stateEquipmentOptions['Название'] ? `Название: ${equip_name}` : null}
        </div>
        <div>
          {stateEquipmentOptions['IMEI'] ? `IMEI: ${imei}` : null}
        </div>
        <div>
          {stateEquipmentOptions['Гос.номер'] ? `Гос.номер: ${gosnomer}` : null}
        </div>
        <div>
          {stateEquipmentOptions['Скорость'] ? `Скорость: ${speed} км/ч` : null}
        </div>
        <div>
          {stateEquipmentOptions['Уровень топлива'] ? `Уровень топлива: ${fuel} л` : null}
        </div>
      </Popup>
    </Marker>
  )
}

export default React.memo(EquipCastomMarker)
