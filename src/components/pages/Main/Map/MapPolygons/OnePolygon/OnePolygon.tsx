import {
  Polygon,
  Popup,
  useMap
} from 'react-leaflet'
import React, {
  useEffect,
  useRef
} from 'react'
import type { Polygon as PolygonType } from '../../../../../../types'
import { useAppDispatch } from '../../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getPolygonFlyToSelector } from '../../../../../../redux/selectors/mapSelectors'
import { setPolygonFlyTo } from '../../../../../../redux/slices/mapSlice'
// import OnePolygonText from './OnePolygonText'

type Props = {
  polygon: PolygonType
}

const OnePolygon: React.FC<Props> = ({ polygon }) => {
  const dispatch = useAppDispatch()
  const polygonFlyTo = useSelector(getPolygonFlyToSelector)

  const map = useMap()

  const polygonRef = useRef<any>(null)
  useEffect(() => {
    if (polygonFlyTo === polygon.id) {
      map?.flyTo(polygon.middle_coord, 13, { animate: false })
      polygonRef.current?.openPopup()
      //обнуление id после того как перенесли карту или даже если не перенесли
      dispatch(setPolygonFlyTo(undefined))
    }
  }, [polygonFlyTo])

  const polygonColor = polygon.sequence === null ? '#FCD9D0' : polygon.sequence.color

  return (
    <Polygon
      ref={polygonRef}
      key={polygon.id}
      positions={polygon.coords as [number, number][]}
      pathOptions={{ fillColor: polygonColor, ...polygonDefaultStyleSettings }}
    >
      {/*<OnePolygonText*/}
      {/*  text="что то рандомное"*/}
      {/*  position={polygon.middle_coord}*/}
      {/*/>*/}
      <Popup>
        <div>
          {polygon.name}
        </div>
        <div>
          {`Культура: ${polygon.sequence === null ? 'культура не выбрана' : polygon.sequence.name}`}
        </div>
      </Popup>
    </Polygon>
  )
}

const polygonDefaultStyleSettings = {
  fillOpacity: .63,
  color: '#fff',
  opacity: .6,
  weight: 1
}

export default OnePolygon
