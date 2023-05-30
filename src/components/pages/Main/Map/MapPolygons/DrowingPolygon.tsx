import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  Polygon,
  Polyline,
  useMap
} from 'react-leaflet'

type Props = {
  isDrawing: boolean
};

const DrowingPolygon: React.FC<Props> = ({ isDrawing }) => {
  const [polygonCoords, setPolygonCoords] = useState([])
  const [futureStart, setFutureStart] = useState<null | [number, number][]>(null)
  const [futureEnd, setFutureEnd] = useState<null | [number, number][]>(null)

  console.log(isDrawing)
  console.log(`futureStart ${futureStart}`, `futureEnd ${futureEnd}`)

  const map = useMap()

  const handleMapClick = useCallback((e: any) => {
    const { latlng } = e
    const { lat, lng } = latlng
    // добавляем координату для мнимых линий
    if (futureStart === null) {
      setFutureStart([lat, lng])
    }
    setPolygonCoords((prevCoords) => [...prevCoords, [lat, lng]] as any)
  }, [futureStart])

  const handleMapMouseMove = useCallback(
    (e: any) => {
      console.log('move', futureStart)
      if (futureStart) {
        console.log('inside')
        const { latlng } = e
        const { lat, lng } = latlng
        setFutureEnd([lat, lng])
      }
    },
    [futureStart]
  )

  useEffect(() => {
    if (isDrawing) {
      map.on('click', handleMapClick)
      map.on('mousemove', handleMapMouseMove)
    } else {
      setPolygonCoords([])
      setFutureStart(null)
      setFutureEnd(null)
      map.off('click', handleMapClick)
      map.off('mousemove', handleMapMouseMove)
    }
    return () => {
      map.off('click', handleMapClick)
      map.off('mousemove', handleMapMouseMove)
    }
  }, [isDrawing, map, futureStart])

  return (
    <>
      {polygonCoords.length > 0 && (
        <>
          <Polygon positions={polygonCoords} />
          {futureStart && futureEnd
            ? <>
              <Polyline
                positions={[polygonCoords[0], futureEnd]}
                color="red"
              />
              <Polyline
                positions={[polygonCoords[polygonCoords.length - 1], futureEnd]}
                color="red"
              />
            </>
            : null}
        </>
      )}
    </>
  )
}

export default React.memo(DrowingPolygon)
