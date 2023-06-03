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
    name: 'Google Map',
    url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: 'Esri WorldImagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  {
    name: 'Google Map (with titles)',
    url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: '2gis Map',
    url: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
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
              url={layer.url}
              subdomains={layer.subdomains || ''}
            />
          </LayersControl.BaseLayer>
        )
      })}
    </LayersControl>
  )
}

export default MapViewSelect
