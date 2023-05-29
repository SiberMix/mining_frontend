import {
  LayersControl,
  TileLayer
} from 'react-leaflet'
import React from 'react'

/*
* Объкт содержащий карты
* доп карты можно взять https://leaflet-extras.github.io/leaflet-providers/preview/
* */
const layers = [
  {
    name: 'OSM',
    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: 'Map data &copy; OpenStreetMap contributors'
  },
  {
    name: 'Esri WorldImagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Map data &copy; Esri'
  },
  {
    name: 'Yandex',
    url: 'https://vec0{s}.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&lang=ru_RU',
    attribution: 'Данные карт &copy; <a href="https://yandex.ru/maps">Яндекс.Карты</a>'
  }
]

const MapViewSelect = () => {
  return (
    <LayersControl
      position="topright"
      collapsed={true}
    >
      {layers.map((layer, index) => {
        return (
          <LayersControl.BaseLayer
            key={index}
            checked={index === 0}
            name={layer.name}
          >
            <TileLayer
              // attribution={layer.attribution}
              url={layer.url}
              attribution={layer.attribution}
            />
          </LayersControl.BaseLayer>
        )
      })}
    </LayersControl>
  )
}

export default MapViewSelect
