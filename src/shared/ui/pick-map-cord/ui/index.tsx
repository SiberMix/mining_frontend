import './index.scss'

import type { LatLngLiteral, LeafletMouseEvent } from 'leaflet'
import L from 'leaflet'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { Marker, useMapEvents } from 'react-leaflet'

import { useEscapeKey } from '~shared/hooks/use-escape-key'

type PickMapCordProps = {
  shown: boolean,
  onClick: (cords: LatLngLiteral) => void,
  title?: string,
  onEscapeKey?: () => void
}

export const PickMapCord: FC<PickMapCordProps> = memo((props) => {
  const {
    shown,
    onClick,
    title = 'Нажмите для выбора координат',
    onEscapeKey
  } = props

  const [cursorPosition, setCursorPosition] = useState<LatLngLiteral | null>(null)

  /*
  * Функционал для нажатия на Escape
  * */
  useEscapeKey(() => {
    if (onEscapeKey) {
      onEscapeKey()
      setCursorPosition(null)
    }
  })

  /*
  * функционал для настройки базовой точки координаты
  * */
  const handleClick = useCallback((e: LeafletMouseEvent) => {
    if (shown) {
      const {
        lat,
        lng
      } = e.latlng
      onClick({ lat, lng })
      setCursorPosition(null)
    }
  }, [shown, onClick])

  const handleMouseMove = useCallback((e: LeafletMouseEvent) => {
    if (shown) {
      const {
        lat,
        lng
      } = e.latlng
      setCursorPosition({
        lat,
        lng
      })
    }
  }, [shown])

  useMapEvents({
    click: handleClick,
    mousemove: handleMouseMove
  })

  const CustomIcon = L.divIcon({
    className: 'custom-marker',
    iconAnchor: [12, 24],
    html: `<div class="pick-cord-marker">${title}</div>`
  })

  if (!shown || !cursorPosition) {
    return null
  }

  return (
    <Marker
      position={cursorPosition}
      icon={CustomIcon}
      interactive={false}
    />
  )
})
