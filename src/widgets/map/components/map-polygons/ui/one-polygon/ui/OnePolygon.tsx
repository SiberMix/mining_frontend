import React, { memo, useEffect, useRef } from 'react'
import { Polygon, Popup, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { getPolygonFlyToSelector } from '~processes/redux/selectors/mapSelectors'
import type { PolygonType } from '~processes/redux/slices/mapSlice'
import { removeSelectedPolygon, setPolygonFlyTo, setSelectedPolygon } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'

import { polygonDefaultStyleSettings } from '../const/polygon-default-style-settings'

type OnePolygonProps = {
  polygon: PolygonType
}

export const OnePolygon = memo(({ polygon }: OnePolygonProps) => {
  const dispatch = useAppDispatch()
  const polygonFlyTo = useSelector(getPolygonFlyToSelector)

  const map = useMap()

  const polygonRef = useRef<any>(null)
  useEffect(() => {
    if (polygonFlyTo === polygon.id) {
      map?.flyTo(polygon.middle_coord, 13, { animate: false })
      polygonRef.current?.openPopup()
      //обнуление id после того как перенесли карту или даже если не перенесли
      dispatch(setPolygonFlyTo(undefined))
    }
  }, [polygonFlyTo])

  /*
  * выделение выбранного блока в боковом меню
  * */
  useEffect(() => {
    map.on('popupopen', (e) => {
      // Приведение типов для доступа к _source
      const source = (e.popup as any)._source
      if (source === polygonRef.current) {
        dispatch(setSelectedPolygon(polygon.id))
      }
    })
    map.on('popupclose', (e) => {
      const source = (e.popup as any)._source
      if (source === polygonRef.current) {
        dispatch(removeSelectedPolygon())
      }
    })

    return () => {
      map.off('popupopen')
      map.off('popupclose')
    }
  }, [])

  const polygonColor = polygon.sequence === null ? '#FCD9D0' : polygon.sequence.color

  return (
    <Polygon
      ref={polygonRef}
      key={polygon.id}
      positions={polygon.coords}
      pathOptions={{ fillColor: polygonColor, ...polygonDefaultStyleSettings }}
    >
      <Popup>
        <div>
          {polygon.name}
        </div>
        <div>
          {`Материал: ${polygon.sequence === null ? 'Материал не выбрана' : polygon.sequence_details.name}`}
        </div>
        <div>
          {`Площадь блока: ${(+polygon.square).toFixed(2)} Га`}
        </div>
      </Popup>
    </Polygon>
  )
})
