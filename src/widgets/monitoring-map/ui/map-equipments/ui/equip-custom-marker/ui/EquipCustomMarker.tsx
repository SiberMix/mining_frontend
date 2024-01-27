import './EquipCustomMarker.scss'

import L from 'leaflet'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { getEquipmentFlyToSelector, getZoomLevelSelector } from '../../../../../../../../srcOld/redux/selectors/mapSelectors'
import type { EquipStatus } from '../../../../../../../../srcOld/redux/slices/mapSlice'
import { setEquipmentFlyTo, setShowRightSideEquipInfo } from '../../../../../../../../srcOld/redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../../../srcOld/redux/store'
import { createCustomMarkerHtml } from '../../../lib/create-custom-marker-html'

type EquipCustomMarkerProps = {
  coordsData: { lat: string, lon: string },
  image_status: string,
  equip_name: string,
  imei: string,
  direction: number,
  status: EquipStatus
}

export const EquipCustomMarker = memo(({
  coordsData,
  image_status,
  equip_name,
  imei,
  direction,
  status
}: EquipCustomMarkerProps) => {

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
})
