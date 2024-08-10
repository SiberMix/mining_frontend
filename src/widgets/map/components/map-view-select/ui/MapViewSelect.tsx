import React from 'react'
import { LayersControl, TileLayer, useMap, useMapEvents } from 'react-leaflet'

import { setZoomLevel } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import { settingsStore } from '~widgets/settings'

import { mapLayers } from '../const'

export const MapViewSelect = () => {
  const dispatch = useAppDispatch()
  const map = useMap()

  /*
  * отслеживает зум. Нельзя вынести на уровень выше
  * */
  useMapEvents({
    zoom: () => {
      const newZoomLevel = map.getZoom()
      dispatch(setZoomLevel(newZoomLevel))
    }
  })

  const baseMapType = settingsStore(state => state.settings.baseMapType)

  const firstLayer = mapLayers.find(layer => layer.name === baseMapType)
  const mapLayersWithSettings = [firstLayer, ...mapLayers.filter(layer => layer.name !== baseMapType)]

  return (
    <LayersControl
      position='topright'
      collapsed={true}
    >
      {mapLayersWithSettings.map((layer, index) => {
        return (
          <LayersControl.BaseLayer
            key={index}
            checked={index === 0}
            name={layer ? layer.name : mapLayers[index].name}
          >
            <TileLayer
              url={layer ? layer.url : mapLayers[index].url}
              subdomains={layer ? layer.subdomains : mapLayers[index].subdomains || ''}
            />
          </LayersControl.BaseLayer>
        )
      })}
    </LayersControl>
  )
}
