import s from './PolygonSpotMenu/PolygonSpotMenu.module.scss'
import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  Marker,
  Polygon,
  Polyline,
  useMap
} from 'react-leaflet'
import PolygonSpotMenu from './PolygonSpotMenu/PolygonSpotMenu'
import L from 'leaflet'
import { useSelector } from 'react-redux'
import { getDrawingPolygonModeSelector } from '../../../../../redux/selectors/mapSelectors'

type Props = {};

const DrawingPolygon: React.FC<Props> = () => {
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)

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
  * определение положения курсора для вспомогательных линий
  * */
  const handleMapMouseMove = useCallback(
    (e: any) => {
      const { latlng } = e
      const {
        lat,
        lng
      } = latlng
      setFutureEnd([lat, lng])
    },
    [futureStart]
  )

  /*
  * Навешиваем обработчки событий
  * click - добавление новой точки полигона
  * mousemove - отрисовка вспомогательных линий
  * */
  useEffect(() => {
    if (drawingPolygonMode) {
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
  }, [drawingPolygonMode, map, futureStart])

  /*
  * Редактирование полигона
  * */
  const editEventHandlers = (id: number) => ({
    //HACK: dragend используется библиотекой! не удалять! это особенность библиотеки
    dragend(e: any) {
      const newCoords: [number, number][] = polygonCoords.map((coords, index) => {
        if (index === id) {
          return e.target.getLatLng()
        }
        return coords
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

  return (
    <>
      <Polygon
        positions={polygonCoords}
        pathOptions={polygonStyle}
      >
        {polygonCoords.map((coord, index) => {
          return (
            <Marker
              icon={customIcon}
              eventHandlers={editEventHandlers(index)}
              key={index}
              draggable={true}
              autoPan={true}
              position={coord}
            >
              <PolygonSpotMenu
                key={index}
                index={index}
                deletePolygonSpot={deletePolygonSpot}
              />
            </Marker>
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

// Создаем кастомную иконку маркера
const customIcon = L.divIcon({
  className: s.polygonSpotMenu, // CSS класс для стилизации иконки
  html: '<div class="' + s.iconContent + '"></div>',
  iconSize: [12, 12] // размер иконки в пикселях
})

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

export default React.memo(DrawingPolygon)
