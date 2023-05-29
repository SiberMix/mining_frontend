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
    subdomains: ['a', 'b', 'c']
  },
  {
    name: 'Esri WorldImagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  {
    name: 'Esri World Topographic Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
  },
  {
    name: 'Wikimedia Maps',
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
  },
  {
    name: 'Stamen Terrain',
    url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.png'
  },
  {
    name: '1',
    url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: '2',
    url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: '3',
    url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: '4',
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
