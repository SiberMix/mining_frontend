import {
  LayersControl,
  TileLayer,
  useMapEvents
} from 'react-leaflet'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../../redux/store'
import {
  setBaseCoord,
  setMapClickForNewBaseCoord,
  setShowSettingsModal
} from '../../../../../redux/slices/settingsSlice'
import {
  getMapClickForNewBaseCoordSelector,
  getUsingBaseMapOptionsSelector
} from '../../../../../redux/selectors/settingsSelector'

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
  const dispatch = useAppDispatch()
  const usingStateBaseMapOptions = useSelector(getUsingBaseMapOptionsSelector)
  const firstLayer = layers.find(layer => layer.name === usingStateBaseMapOptions)
  const mapLayersWithSettings = [firstLayer, ...layers.filter(layer => layer.name !== usingStateBaseMapOptions)]
  const mapClickForNewBaseCoord = useSelector(getMapClickForNewBaseCoordSelector)

  /*
  * функционал для настройки базовой точки координаты
  * */
  const handleClick = useCallback((e: any) => {
    if (mapClickForNewBaseCoord) {
      const { lat, lng } = e.latlng
      dispatch(setBaseCoord([lat, lng]))
      dispatch(setMapClickForNewBaseCoord(false))
      dispatch(setShowSettingsModal(true))
    }
  }, [mapClickForNewBaseCoord])

  useMapEvents({
    click: handleClick
  })

  return (
    <LayersControl
      position="topright"
      collapsed={true}
    >
      {mapLayersWithSettings.map((layer, index) => {
        return (
          <LayersControl.BaseLayer
            key={index}
            checked={index === 0}
            name={layer ? layer.name : layers[index].name}
          >
            <TileLayer
              url={layer ? layer.url : layers[index].url}
              subdomains={layer ? layer.subdomains : layers[index].subdomains || ''}
            />
          </LayersControl.BaseLayer>
        )
      })}
    </LayersControl>
  )
}

export default MapViewSelect
