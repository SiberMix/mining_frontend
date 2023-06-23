import L from 'leaflet'
import {
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useAppDispatch } from '../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getEquipmentFlyToSelector } from '../../../../../redux/selectors/mapSelectors'
import { setEquipmentFlyTo } from '../../../../../redux/slices/mapSlice'
import { getUsingEquipmentOptionsSelector } from '../../../../../redux/selectors/settingsSelector'

type Props = {
  coordsData: {lat: string, lon: string},
  image_status: string,
  equip_name: string,
  imei: string,
  gosnomer: string,
  speed: number,
  fuel: number,
  direction: number,
  lastUpdDtt: string
}

const EquipCastomMarker: React.FC<Props> = ({
  coordsData,
  image_status,
  equip_name,
  imei,
  gosnomer,
  speed,
  fuel,
  direction,
  lastUpdDtt
}) => {

  const map = useMap()
  const dispatch = useAppDispatch()
  const equipmentFlyTo = useSelector(getEquipmentFlyToSelector)
  const stateEquipmentOptions = useSelector(getUsingEquipmentOptionsSelector)
  // console.log(stateEquipmentOptions)

  useEffect(() => {
    if (equipmentFlyTo === +imei) {
      map?.flyTo([+coordsData.lat, +coordsData.lon], 17, { animate: false })
      //обнуление id после того как перенесли карту, и даже если не перенесли
      dispatch(setEquipmentFlyTo(undefined))
    }
  }, [equipmentFlyTo])

  /*
  * меняет изображение техники при минимальном зуме
  * */
  const [zoomLevel, setZoomLevel] = useState(1)

  // webstorm просто не видит использование события zoom, поэтому ловим предупредение
  // НЕ ТРОГАТЬ!!!
  useMapEvents({
    zoom: () => {
      const newZoomLevel = map.getZoom()
      setZoomLevel(newZoomLevel)
    }
  })
  const imagePath = useMemo(() => {
    /**
    * если нужно отключить то меняем с 17 на 18. Больше 18 он быть не может
    * по дефолту 17
    * */
    return zoomLevel > 17 ? 'src/assets/icons_enum/hoveraster-mini.png' : `src/assets/icons_enum/${image_status}.svg`
  }, [zoomLevel])

  const createEquipIcon = useCallback(() => {
    return L.divIcon({
      className: 'custom-marker-icon',
      iconSize: [60, 60],
      html: `<img style='transform: rotate(${zoomLevel > 17 ? direction : 0}deg); width: 60px; height: 60px;' alt='${equip_name}' src=${imagePath} />`
    })
  }, [imagePath, direction])

  // const markerIcon = useMemo(() => {
  //   return L.divIcon({
  //     className: 'custom-marker-icon',
  //     iconSize: [60, 60],
  //     html: `<img style='transform: rotate(${zoomLevel > 17 ? direction : 0}deg); width: 60px; height: 60px;' alt='${equip_name}' src=${imagePath} />`
  //   })
  // }, [imagePath, direction])

  // const markerIcon = L.divIcon({
  //   className: 'custom-marker-icon',
  //   iconSize: [60, 60],
  //   html: `<img style='transform: rotate(${Math.abs(-90 + coordsData.direction)}deg); width: 60px; height: 60px;' alt='${equip_name}' src='src/assets/icons_enum/${image_status}.svg' />`
  // }))

  return (
    <Marker
      position={[+coordsData.lat, +coordsData.lon]}
      icon={createEquipIcon()}
    >
      <Popup>
        <div>
          {stateEquipmentOptions['Название'] ? `Название: ${equip_name}` : null}
        </div>
        <div>
          {stateEquipmentOptions['IMEI'] ? `IMEI: ${imei}` : null}
        </div>
        <div>
          {stateEquipmentOptions['Гос.номер'] ? `Гос.номер: ${gosnomer.toUpperCase()}` : null}
        </div>
        <div>
          {stateEquipmentOptions['Скорость'] ? `Скорость: ${speed} км/ч` : null}
        </div>
        <div>
          {stateEquipmentOptions['Уровень топлива'] ? `Уровень топлива: ${fuel} л` : null}
        </div>
        <div>
          {stateEquipmentOptions['Уровень топлива'] ? `Уровень топлива: ${fuel} л` : null}
        </div>
        <div>
          {stateEquipmentOptions['Последняя активность'] ? `Последняя активность: ${new Date(+lastUpdDtt * 1000)}` : null}
        </div>
      </Popup>
    </Marker>
  )
}

export default React.memo(EquipCastomMarker)
