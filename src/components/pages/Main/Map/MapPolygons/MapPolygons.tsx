import {
  Polygon,
  Popup
} from 'react-leaflet'
import { useAtom } from 'jotai'
import { polygonsAtom } from '../../Main'
import 'leaflet-editable'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Polygon as PolygonType } from '../../../../../types/index'

const polygonDefaultStyleSettings = {
  fillOpacity: .63,
  color: '#fff',
  opacity: .6,
  weight: 1
}

const MapPolygons = () => {
  const [polygons] = useAtom(polygonsAtom)

  console.log('render polygons')
  return (
    <>
      {polygons.map((polygon: PolygonType) => (
        <Polygon
          key={polygon.id}
          positions={polygon.coords as [number, number][]}
          pathOptions={{ fillColor: polygon.field.color, ...polygonDefaultStyleSettings }}
        >
          <Popup>
            <div>
              {polygon.name}
            </div>
            <div>
              {`Культура: ${polygon.field.name}`}
            </div>
          </Popup>
        </Polygon>
      ))}
    </>
  )
}

export default MapPolygons
