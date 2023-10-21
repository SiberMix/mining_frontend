import './EquipCastomMarker.scss'
import L from 'leaflet'
import { Marker, Popup, useMap } from 'react-leaflet'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getEquipmentFlyToSelector, getZoomLevelSelector } from '../../../../../redux/selectors/mapSelectors'
import { EquipStatus, setEquipmentFlyTo } from '../../../../../redux/slices/mapSlice'
import { getUsingEquipmentOptionsSelector } from '../../../../../redux/selectors/settingsSelector'
import moment from 'moment'

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
    return 'src/assets/icons_enum/' + (zoomLevel > 17 ? 'mini_icons/' : 'equips_events/') + `${image_status}${status}.svg`
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

  /**
   * таймер простоя техники без дела
   * */
  const [timeEquipIsNotActive, setTimeEquipIsNotActive] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (status === 'Offline') {
      timeout = setTimeout(() => {
        const timeNotActive = moment()
          .valueOf() / 1000 - +lastUpdDtt

        const duration = moment.duration(timeNotActive, 'seconds')
        setTimeEquipIsNotActive({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        })
      }, 1000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [status, timeEquipIsNotActive])

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
        {
          Object.values(timeEquipIsNotActive)
            .some(value => value > 0)
            ? <div>
              {
                `Оборудование не активно:
               Дней: ${timeEquipIsNotActive.days}
               Часов: ${timeEquipIsNotActive.hours}
               Минут: ${timeEquipIsNotActive.minutes}
               Секунд: ${timeEquipIsNotActive.seconds}`
              }
            </div>
            : null
        }
      </Popup>
    </Marker>
  )
}

export default React.memo(EquipCastomMarker)
