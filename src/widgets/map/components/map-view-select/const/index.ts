export enum MapLayersEnum {
  GOOGLE_MAP = 'Google Map',
  ESRI_WORLD_IMAGERY = 'Esri WorldImagery',
  GOOGLE_MAP_WITH_TITLES = 'Google Map (with titles)',
  DOUBLE_GIS_MAP = '2gis Map'
}

/*
  * Объкт содержащий карты
  * доп карты можно взять https://leaflet-extras.github.io/leaflet-providers/preview/
  * */
export const mapLayers = [
  {
    name: MapLayersEnum.GOOGLE_MAP,
    url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: MapLayersEnum.ESRI_WORLD_IMAGERY,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    subdomains: ['server', 'services']
  },
  {
    name: MapLayersEnum.GOOGLE_MAP_WITH_TITLES,
    url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  {
    name: MapLayersEnum.DOUBLE_GIS_MAP,
    url: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }
]
