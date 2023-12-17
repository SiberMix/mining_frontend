import React from "react"
import {
  LayersControl,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet"
import { useSelector } from "react-redux"

import { getUsingBaseMapOptionsSelector } from "../../../../../../redux/selectors/settingsSelector"
import { setZoomLevel } from "../../../../../../redux/slices/mapSlice"
import { useAppDispatch } from "../../../../../../redux/store"

const MapViewSelect = () => {
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

  /*
  * Объкт содержащий карты
  * доп карты можно взять https://leaflet-extras.github.io/leaflet-providers/preview/
  * */
  const layers = [
    {
      name: "Google Map",
      url: "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    },
    {
      name: "Esri WorldImagery",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      subdomains: ["server", "services"]
    },
    {
      name: "Google Map (with titles)",
      url: "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    },
    {
      name: "2gis Map",
      url: "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }
  ]

  const usingStateBaseMapOptions = useSelector(getUsingBaseMapOptionsSelector)
  const firstLayer = layers.find(layer => layer.name === usingStateBaseMapOptions)
  const mapLayersWithSettings = [firstLayer, ...layers.filter(layer => layer.name !== usingStateBaseMapOptions)]

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
              subdomains={layer ? layer.subdomains : layers[index].subdomains || ""}
            />
          </LayersControl.BaseLayer>
        )
      })}
    </LayersControl>
  )
}

export default MapViewSelect
