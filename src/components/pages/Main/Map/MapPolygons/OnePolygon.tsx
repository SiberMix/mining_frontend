import {
  Polygon,
  Popup,
  useMap
} from 'react-leaflet'
import React, {
  useEffect,
  useRef
} from 'react'
import type { Polygon as PolygonType } from '../../../../../types'
import type { PolygonDefaultStyleSettings } from './MapPolygons'

type Props = {
  polygon: PolygonType,
  polygonDefaultStyleSettings: PolygonDefaultStyleSettings,
  selectedPolygon: number | undefined,
  setSelectedPolygon: (id: number | undefined) => void
}

const OnePolygon: React.FC<Props> = ({ polygon, polygonDefaultStyleSettings, selectedPolygon, setSelectedPolygon }) => {
  const map = useMap()
  //из-за библиотеки react-leafet нужно указать в типизации any
  const polygonRef = useRef<any>(null)

  useEffect(() => {
    if (selectedPolygon === polygon.id) {
      map?.flyTo(polygon.middle_coord, 13, { animate: false })
      polygonRef.current?.openPopup()
      //обнуление id после того как перенесли карту
      setSelectedPolygon(undefined)
    }
  }, [selectedPolygon])

  return (
    <Polygon
      ref={polygonRef}
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
  )
}

export default OnePolygon
