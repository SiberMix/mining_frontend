import React, { memo, useCallback, useEffect, useState } from 'react'
import { Marker, Polygon, Polyline, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'

import {
  getAddInternalPolygonModeSelector,
  getDrawingPolygonModeSelector,
  getEditedPolygonSelector
} from '~processes/redux/selectors/mapSelectors'

import { polygonStyle } from '../../../const/polygon-style'
import { polylineStyle } from '../../../const/polyline-style'
import { PolygonSpotMenu } from '../../drawing-polygon-spot-menu'
import { DrawingPolygonSpotMenuIcon } from '../../drawing-polygon-spot-menu-icon'

export type AddPolygonCoords = [number, number][]
export type EditPolygonCoords = [number, number][][]

export const MapDrawingPolygon = memo(() => {
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)
  const editedPolygon = useSelector(getEditedPolygonSelector)
  const addInternalPolygonMode = useSelector(getAddInternalPolygonModeSelector)

  const [polygonCoords, setPolygonCoords] = useState<AddPolygonCoords | EditPolygonCoords>([])
  const [futureStart, setFutureStart] = useState<null | AddPolygonCoords>(null)
  const [futureEnd, setFutureEnd] = useState<null | AddPolygonCoords>(null)

  const map = useMap()
  /*
  * проверка на режим редактирования у блока
  * */
  useEffect(() => {
    if (editedPolygon) {
      map?.flyTo(editedPolygon.middle_coord, 14, { animate: false })
      setPolygonCoords(editedPolygon.coords)
    } else {
      setPolygonCoords([])
    }
  }, [editedPolygon])

  /*
  * добавление дополнительного массива, для внутреннего контура
  * */
  useEffect(() => {
    if (addInternalPolygonMode) {
      setPolygonCoords(polygonCoords => [...polygonCoords, []] as EditPolygonCoords)
    }
  }, [addInternalPolygonMode])

  /*
  * добавление новой точки блока по клику
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
    if (futureStart === null && !addInternalPolygonMode) {
      setFutureStart([lat, lng])
    }

    if (editedPolygon) {
      setPolygonCoords((prevCoords) => {
        if (addInternalPolygonMode) {
          //добавление точек у внутреннего контура
          return prevCoords.map((arr, i) => {
            if (i === prevCoords.length - 1) {
              return [...arr, [lat, lng]]
            }
            return arr
          }) as EditPolygonCoords
        }
        // добавление точек у редактируемого блока
        return prevCoords.map((arr, i) => {
          if (i === 0) {
            return [...arr, [lat, lng]]
          }
          return arr
        }) as EditPolygonCoords

      })
    } else {
      //добавление точек у блока
      setPolygonCoords((prevCoords) => [...prevCoords, [lat, lng]] as AddPolygonCoords)
    }
  }, [addInternalPolygonMode, editedPolygon, futureStart, polygonCoords])

  /*
  * определение положения курсора для вспомогательных линий
  * */
  const handleMapMouseMove = useCallback((e: any) => {
    const { latlng } = e
    const {
      lat,
      lng
    } = latlng
    setFutureEnd([lat, lng])
  }, [futureStart])

  /*
  * Навешиваем обработчки событий
  * click - добавление новой точки блока
  * mousemove - отрисовка вспомогательных линий
  * */
  useEffect(() => {
    if (drawingPolygonMode || editedPolygon) {
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
  }, [drawingPolygonMode, map, futureStart, editedPolygon, addInternalPolygonMode])

  /**
   * Костыльно приводим координаты к общему виду
   **/
  const currentCoords = editedPolygon ? polygonCoords as EditPolygonCoords : [polygonCoords] as EditPolygonCoords

  /*
  * Редактирование блока
  * */
  const editEventHandlers = (id: number, arrIndex: number) => ({
    //HACK: dragend используется библиотекой! не удалять! это особенность библиотеки
    dragend(e: any) {
      const newCoords: EditPolygonCoords = currentCoords.map((arr, arrEditedIndex) => {
        if (arrEditedIndex === arrIndex) {
          return arr.map((coords, index) => {
            if (index === id) {
              const {
                lat,
                lng
              } = e.target.getLatLng()
              return [lat, lng]
            }
            return coords
          })
        }
        return arr
      })

      if (editedPolygon) {
        setPolygonCoords(newCoords)
      } else {
        setPolygonCoords(newCoords[0])
      }
    }
  })

  /*
  * удаление точки
  * */
  const deletePolygonSpot = (id: number, arrIndex: number) => {
    const newCoords: EditPolygonCoords = currentCoords.map((arr, arrEditedIndex) => {
      if (arrEditedIndex === arrIndex) {
        return arr.filter((coord, index) => id !== index)
      }
      return arr
    })

    if (editedPolygon) {
      setPolygonCoords(newCoords)
    } else {
      setPolygonCoords(newCoords[0])
    }
  }

  return (
    <>
      {
        drawingPolygonMode
          ? <Polygon
            positions={polygonCoords}
            pathOptions={polygonStyle}
          >
            {
              drawingPolygonMode
                ? currentCoords.map((arr, arrIndex) => {
                  return arr.map((coord, index) => {
                    return (
                      <Marker
                        icon={DrawingPolygonSpotMenuIcon}
                        eventHandlers={editEventHandlers(index, arrIndex)}
                        key={index}
                        draggable={true}
                        autoPan={true}
                        position={coord}
                      >
                        <PolygonSpotMenu
                          key={index}
                          polygonCoords={currentCoords}
                          deletePolygonSpot={() => deletePolygonSpot(index, arrIndex)}
                          editedPolygon={editedPolygon}
                        />
                      </Marker>
                    )
                  })
                })
                : null
            }
          </Polygon>
          : null
      }
      {polygonCoords.length > 0 && !editedPolygon && drawingPolygonMode
        ? <>
          <Polyline
            positions={[polygonCoords[0], futureEnd] as AddPolygonCoords}
            color='red'
            pathOptions={polylineStyle}
            interactive={false}
          />
          <Polyline
            positions={[polygonCoords[polygonCoords.length - 1], futureEnd] as AddPolygonCoords}
            pathOptions={polylineStyle}
            color='red'
            interactive={false}
          />
        </>
        : null}
    </>
  )
})
