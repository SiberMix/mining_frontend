import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  Marker,
  Polygon,
  Polyline,
  Popup,
  useMap
} from 'react-leaflet'
import PolygonSpotMenu from './PolygonSpotMenu/PolygonSpotMenu'

type Props = {
  isDrawing: boolean,
  setVisibleModal: (showModal: boolean) => void
};

const DrowingPolygon: React.FC<Props> = ({ isDrawing, setVisibleModal }) => {

  const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([])
  const [futureStart, setFutureStart] = useState<null | [number, number][]>(null)
  const [futureEnd, setFutureEnd] = useState<null | [number, number][]>(null)

  const map = useMap()

  /*
  * добавление новой точки полигона по клику
  * */
  const handleMapClick = useCallback((e: any) => {
    const {
      latlng,
      originalEvent
    } = e
    const {
      lat,
      lng
    } = latlng

    // Получаем элемент, на который был произведен клик
    const clickedElement = originalEvent.target
    // Проверяем, находится ли кликнутый элемент внутри PolygonSpotMenu
    const isClickInsidePolygonSpotMenu = clickedElement.closest('.polygon-spot-menu') !== null
    // Если клик произошел внутри PolygonSpotMenu, то игнорируем его
    if (isClickInsidePolygonSpotMenu) {
      return
    }

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

      // if (futureStart) {
      const { latlng } = e
      const {
        lat,
        lng
      } = latlng
      setFutureEnd([lat, lng])
      // }
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
  * Редактирование полигона
  * */
  const [editMode, setEditMode] = useState(false)
  const editEventHandlers = (id: number) => ({
    dragend(e: any) {
      const newCoords: [number, number][] = polygonCoords.map((coord, index) => {
        if (index === id) {
          return e.target.getLatLng()
        }
        return coord
      })
      setPolygonCoords(newCoords)
    }
  })

  /*
  * удаление точки
  * */
  const deletePolygonSpot = (n: number) => {
    const newPolygonCoords = polygonCoords.filter((coord, index) => n !== index)
    setPolygonCoords(newPolygonCoords)
  }

  /*
  * Добавление полигона
  * todo изменить на отправку на сервер
  * */
  const addNewPolygon = () => {
    setVisibleModal(true)
  }

  return (
    <>
      <Polygon
        positions={polygonCoords}
        pathOptions={polygonStyle}
      >
        {polygonCoords.map((coord, index) => {
          return (
            editMode
              ? <Marker
                eventHandlers={editEventHandlers(index)}
                key={index}
                draggable={true}
                autoPan={true}
                position={coord}
              >
                <Popup>
                  <button onClick={(e) => {
                    e.stopPropagation()
                    setEditMode(false)
                  }}
                  >
                    Завершить редактирование
                  </button>
                </Popup>
              </Marker>
              : <PolygonSpotMenu
                key={index}
                index={index}
                position={coord}
                setEditMode={setEditMode}
                deletePolygonSpot={deletePolygonSpot}
                addNewPolygon={addNewPolygon}
              />
          )
        })}
      </Polygon>
      {polygonCoords.length > 0
        ? <>
          <Polyline
            positions={[polygonCoords[0], futureEnd] as [number, number][]}
            color="red"
            pathOptions={polylineStyle}
            interactive={false}
          />
          <Polyline
            positions={[polygonCoords[polygonCoords.length - 1], futureEnd] as [number, number][]}
            pathOptions={polylineStyle}
            color="red"
            interactive={false}
          />
        </>
        : null}
    </>
  )
}

const polygonStyle = {
  fillOpacity: 0.7,
  stroke: true,
  color: '#19a2d3',
  weight: 2
}

const polylineStyle = {
  weight: 2,
  color: 'red',
  dashArray: '5, 10',
  dashOffset: '5'
}

export default React.memo(DrowingPolygon)
