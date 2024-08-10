import type { LatLngLiteral, LeafletMouseEvent } from 'leaflet'
import L from 'leaflet'
import { useCallback, useState } from 'react'
import { Circle } from 'react-leaflet'

import { useRealtyStore } from '~entities/realty'
import { PickMapCord } from '~shared/ui/pick-map-cord'

export const RealtyMapPicker = () => {
  /** Zustand */
  const isPickCenterModeActive = useRealtyStore(state => state.isPickCenter)
  const setIsPickCenterModeActive = useRealtyStore(state => state.setIsPickCenter)
  const setCircleToAdd = useRealtyStore(state => state.setCircleToAdd)
  const setIsOpenModal = useRealtyStore(state => state.setIsOpenModal)
  /** States */
  const [centerCord, setCenterCord] = useState<LatLngLiteral | null>(null)
  const [isPickRadius, setIsPickRadius] = useState(false)
  const [radius, setRadius] = useState<number | null>(null)

  const close = useCallback(() => {
    setIsPickCenterModeActive(false)
    setCenterCord(null)
    setIsPickRadius(false)
    setRadius(null)
  }, [setIsPickCenterModeActive])

  const circleCentreClick = useCallback((cords: LatLngLiteral) => {
    setCenterCord(cords)
    setIsPickRadius(true)
    setIsPickCenterModeActive(false)
  }, [setIsPickCenterModeActive])

  const radiusClick = useCallback(() => {
    setIsPickRadius(false)
    const circle = {
      lat: centerCord?.lat ?? 0,
      lng: centerCord?.lng ?? 0,
      radius: radius ?? 0
    }
    setCircleToAdd(circle)
    setIsOpenModal(true)
    close()
  }, [centerCord?.lat, centerCord?.lng, close, radius, setCircleToAdd, setIsOpenModal])

  const onMouseMoveHandler = useCallback((event: LeafletMouseEvent) => {
    if (centerCord) {
      const secondCord = event.latlng
      const calkedRadius = L.latLng(centerCord).distanceTo(secondCord)
      setRadius(calkedRadius)
    }
  }, [centerCord])

  return (
    <>
      {/* Клик для определения центра */}
      <PickMapCord
        shown={isPickCenterModeActive}
        title='Выберете центр области'
        onClick={circleCentreClick}
        onEscapeKey={close}
      />
      {/* Клик для установления радиуса круга */}
      <PickMapCord
        shown={isPickRadius}
        title='Выберете радиус'
        onClick={radiusClick}
        onEscapeKey={close}
        onMouseMove={onMouseMoveHandler}
      />
      {/* Мнимый круг */}
      {
        centerCord && radius
          ? (
            <Circle
              center={centerCord}
              radius={radius}
              pathOptions={{
                color: 'blue', // цвет линии
                dashArray: '5, 10' // задаем пунктирную линию (5px линия, 10px пробел)
              }}
            />
          )
          : null
      }
    </>
  )
}
