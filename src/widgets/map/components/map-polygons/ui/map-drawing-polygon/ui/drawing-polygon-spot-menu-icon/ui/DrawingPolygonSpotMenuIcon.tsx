import './DrawingPolygonSpotMenuIcon.scss'

import L from 'leaflet'

export const DrawingPolygonSpotMenuIcon = L.divIcon({
  className: 'DrawingPolygonSpotMenuIcon', // CSS класс для стилизации иконки
  html: '<div class="DrawingPolygonSpotMenuIcon__IconContent"></div>',
  iconSize: [12, 12] // размер иконки в пикселях
})
