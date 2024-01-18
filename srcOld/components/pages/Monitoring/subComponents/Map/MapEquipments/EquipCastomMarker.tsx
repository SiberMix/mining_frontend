import './EquipCastomMarker.scss'

import L from 'leaflet'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { getEquipmentFlyToSelector, getZoomLevelSelector } from '../../../../../../redux/selectors/mapSelectors'
import type { EquipStatus } from '../../../../../../redux/slices/mapSlice'
import { setEquipmentFlyTo, setShowRightSideEquipInfo } from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import { createCustomMarkerHtml } from './EquipCustomMarkerStyles'

type Props = {
  coordsData: { lat: string, lon: string },
  image_status: string,
  equip_name: string,
  imei: string,
  direction: number,
  status: EquipStatus
}

const EquipCustomMarker: React.FC<Props> = ({
  coordsData,
  image_status,
  equip_name,
  imei,
  direction,
  status
}) => {

  const map = useMap()
  const dispatch = useAppDispatch()
  const equipmentFlyTo = useSelector(getEquipmentFlyToSelector)
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
     * если нужно отключить - то меняем с 17 на 18. Больше 18 он быть не может
     * по дефолту 17
     * */
    return '/src/shared/assets/icons_enum/' + (zoomLevel > 17 ? 'mini_icons/' : 'equips_events/') + `${image_status}${status}.svg`
  }, [zoomLevel, status, image_status])

  const createEquipIcon = useCallback(() => {
    const customMarkerHtml = createCustomMarkerHtml({
      zoomLevel,
      direction,
      alt: equip_name,
      src: imagePath,
      equipName: equip_name
    })
    return L.divIcon({
      className: 'custom-marker-icon',
      iconSize: [50, 50],
      html: customMarkerHtml
    })
  }, [imagePath, direction])

  const onClickMarkerHandler = () => {
    dispatch(setShowRightSideEquipInfo(+imei))
  }

  return (
    <Marker
      position={[+coordsData.lat, +coordsData.lon]}
      icon={createEquipIcon()}
      eventHandlers={{
        click: onClickMarkerHandler
      }}
    />
  )
}

export default React.memo(EquipCustomMarker)
