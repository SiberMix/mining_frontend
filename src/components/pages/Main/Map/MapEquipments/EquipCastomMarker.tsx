import './EquipCastomMarker.scss'
import L from 'leaflet'
import { Marker, Popup, useMap } from 'react-leaflet'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch } from '../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getEquipmentFlyToSelector, getZoomLevelSelector } from '../../../../../redux/selectors/mapSelectors'
import { EquipStatus, setEquipmentFlyTo } from '../../../../../redux/slices/mapSlice'
import { getUsingEquipmentOptionsSelector } from '../../../../../redux/selectors/settingsSelector'

type Props = {
  coordsData: { lat: string, lon: string },
  image_status: string,
  equip_name: string,
  imei: string,
  gosnomer: string,
  speed: number,
  fuel: number,
  direction: number,
  lastUpdDtt: string
  status: EquipStatus
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
  lastUpdDtt,
  status
}) => {

  const map = useMap()
  const dispatch = useAppDispatch()
  const equipmentFlyTo = useSelector(getEquipmentFlyToSelector)
  const stateEquipmentOptions = useSelector(getUsingEquipmentOptionsSelector)
  const zoomLevel = useSelector(getZoomLevelSelector)

  useEffect(() => {
    if (equipmentFlyTo === +imei) {
      map?.flyTo([+coordsData.lat, +coordsData.lon], 17, { animate: false })
      //обнуление id после того как перенесли карту, и даже если не перенесли
      dispatch(setEquipmentFlyTo(undefined))
    }
  }, [equipmentFlyTo])

  const imagePath = useMemo(() => {
    /**
     * если нужно отключить то меняем с 17 на 18. Больше 18 он быть не может
     * по дефолту 17
     * */
    return 'src/assets/icons_enum/' + (zoomLevel > 17 ? 'mini_icons/' : '') + `${image_status}${status}.svg`
  }, [zoomLevel, status, image_status])

  const createEquipIcon = useCallback(() => {
    return L.divIcon({
      className: 'custom-marker-icon',
      iconSize: [50, 50],
      html: `<img
                style='
                transform: rotate(${zoomLevel > 17 ? direction : 0}deg); 
                width: 50px; 
                height: 50px;
                '
                alt='${equip_name}' 
                src='${imagePath}' 
              />`
    })
  }, [imagePath, direction])

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
          {
            fuel === null
              ? stateEquipmentOptions['Уровень топлива'] ? 'Уровень топлива: данные не зарегистрированы' : null
              : stateEquipmentOptions['Уровень топлива'] ? `Уровень топлива: ${fuel} л` : null
          }
        </div>
        <div>
          {stateEquipmentOptions['Последняя активность'] ? `Последняя активность: ${new Date(+lastUpdDtt * 1000)}` : null}
        </div>
      </Popup>
    </Marker>
  )
}

export default React.memo(EquipCastomMarker)
