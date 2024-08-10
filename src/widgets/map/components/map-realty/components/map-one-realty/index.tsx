import React, { useEffect, useRef } from 'react'
import { Circle, Popup, useMap } from 'react-leaflet'

import { useRealtyStore } from '~entities/realty'
import type { RealtyType } from '~entities/realty/types'

type MapOneRealtyProps = {
  item: RealtyType
}

export const MapOneRealty = ({ item }: MapOneRealtyProps) => {
  const realtyFlyTo = useRealtyStore(state => state.realtyFlyTo)
  const setRealtyFlyTo = useRealtyStore(state => state.setRealtyFlyTo)

  const map = useMap()

  const polygonRef = useRef<any>(null)
  useEffect(() => {
    if (realtyFlyTo === item.id) {
      map?.flyTo(item.cord, 13, { animate: false })
      polygonRef.current?.openPopup()
      //обнуление id после того как перенесли карту или даже если не перенесли
      setRealtyFlyTo(undefined)
    }
  }, [item.cord, item.id, map, realtyFlyTo, setRealtyFlyTo])

  /*
  * выделение выбранной недвижимости в боковом меню
  * */
  useEffect(() => {
    map.on('popupopen', (e) => {
      // Приведение типов для доступа к _source
      const source = (e.popup as any)._source
      if (source === polygonRef.current) {
        setRealtyFlyTo(item.id)
      }
    })
    map.on('popupclose', (e) => {
      const source = (e.popup as any)._source
      if (source === polygonRef.current) {
        setRealtyFlyTo(undefined)
      }
    })

    return () => {
      map.off('popupopen')
      map.off('popupclose')
    }
  }, [item.id, map, setRealtyFlyTo])

  return (
    <Circle
      key={item.id}
      center={item.cord}
      radius={item.radius}
      color={item.color}
    >
      <Popup>
        <div>
          {item.name}
        </div>
        <div>
          {`Тип: ${item.type}`}
        </div>
      </Popup>
    </Circle>
  )
}
