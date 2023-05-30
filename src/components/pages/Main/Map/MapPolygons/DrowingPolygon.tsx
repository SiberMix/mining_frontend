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

// const onPolygonEdit = (event) => {
//   const updatedCoords = event.target.getLatLngs()[0].map(({ lat, lng }) => [lat, lng])
//   setPolygonCoords(updatedCoords)
// }
// eventHandlers={{
//   edit: (event) => onPolygonEdit(event)
// }}
// editable={true}

type Props = {
  isDrawing: boolean
};

const DrowingPolygon: React.FC<Props> = ({ isDrawing }) => {
  const [polygonCoords, setPolygonCoords] = useState([])
  const [futureStart, setFutureStart] = useState<null | [number, number][]>(null)
  const [futureEnd, setFutureEnd] = useState<null | [number, number][]>(null)

  const map = useMap()

  /*
  * добавление новой точки полигона по клику
  * */

  const handleMapClick = useCallback((e: any) => {
    const { latlng } = e
    const { lat, lng } = latlng
    // добавляем координату для мнимых линий
    if (futureStart === null) {
      setFutureStart([lat, lng])
    }
    setPolygonCoords((prevCoords) => [...prevCoords, [lat, lng]] as any)
  }, [futureStart])

  /*
  * определение положения курсора для
  * вспомогательных линий
  * */

  const handleMapMouseMove = useCallback(
    (e: any) => {
      if (futureStart) {
        const { latlng } = e
        const { lat, lng } = latlng
        setFutureEnd([lat, lng])
      }
    },
    [futureStart]
  )

  /*
  * Навешиваем обработчки событий
  * click - добавление новой точки полигона
  * mousemove - отрисовка вспомогательных линий
  * */

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

  /*
  * Редактирование полигона (вообще не е*у как она работает)
  * */

  const onPolygonEdit = useCallback((event: any) => {
    const updatedCoords = event.target.getLatLngs()[0].map(({ lat, lng }: any) => [lat, lng])
    setPolygonCoords(updatedCoords)
  }, [polygonCoords])

  return (
    <>
      {polygonCoords.length > 0 && (
        <>
          <Polygon
            positions={polygonCoords}
            eventHandlers={{
              edit: (event) => onPolygonEdit(event)
            }}
            editable={true}
          />
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
