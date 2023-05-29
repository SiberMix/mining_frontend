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

//цвета будем предлогать на выбор при создании поля? Или лучше чтоб они приходили с сервера?
const greenOptions = { color: 'blue', opacity: .6 }

const MapPolygons = () => {
  const [polygons] = useAtom(polygonsAtom)

  return (
    <>
      {polygons.map((polygon: PolygonType) => (
        <Polygon
          key={polygon.id}
          positions={polygon.coords as [number, number][]}
          pathOptions={greenOptions}
        >
          <Popup>
            <div>
              {polygon.name}
            </div>
            <div>
              {`Культура: ${polygon.sequence}`}
            </div>
          </Popup>
        </Polygon>
      ))}
    </>
  )
}

export default MapPolygons
