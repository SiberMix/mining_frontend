import s from './OnePolygonText.module.scss'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import type React from 'react'

type Props = {
  position: [number, number],
  text: string
}

const PolygonText: React.FC<Props> = ({ position, text }) => {
  const map = useMap()

  const latlng = L.latLng(position[0], position[1]) // Преобразование в объект LatLng

  const point = map.latLngToLayerPoint(latlng)

  const textPane = L.DomUtil.create('div', s['leaflet-polygon-text-pane'])
  textPane.innerHTML = `<div>${text}</div>`

  // Добавляем слой на карту

  L.DomUtil.setPosition(textPane, point)
  map.getPanes().overlayPane.appendChild(textPane)

  return null
}

export default PolygonText
