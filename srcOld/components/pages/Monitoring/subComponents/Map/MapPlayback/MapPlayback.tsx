import "./MapPlayback.scss"

import type { LatLngExpression } from "leaflet"
import React, {
  useEffect,
  useState
} from "react"
import {
  Circle,
  Polyline,
  Popup
} from "react-leaflet"
import { useSelector } from "react-redux"

import {
  getPlaybacksDataSelector,
  getShowingPlaybackSelector
} from "../../../../../../redux/selectors/playbackSelectors"
import type { CurrentPlaybackData } from "../../../../../../redux/slices/playBackSlice"
import {
  MapPlaybackSpeedController
} from "./subComponents/MapPlaybackSpeedController/MapPlaybackSpeedController"

const MapPlayback = () => {
  const playbacksData = useSelector(getPlaybacksDataSelector)
  const showingPlayback = useSelector(getShowingPlaybackSelector)

  const [playbackDataWithFilter, setPlaybackDataWithFilter] = useState<CurrentPlaybackData | undefined>(undefined)
  const [playbackDataWithDaley, setPlaybackDataWithDaley] = useState<LatLngExpression[]>([])
  const [cordsIndexForDaley, setCordsIndexForDaley] = useState(0)
  const [prevPlayback, setPrevPlayback] = useState(showingPlayback)
  const [isPlayerPaused, setIsPlayerPaused] = useState(false)
  const [playerSpeed, setPlayerSpeed] = useState(10)

  const toggleIsPlayerPaused = () => {
    setIsPlayerPaused(prev => !prev)
  }

  const resetDrawingPlaybackData = () => {
    setPlaybackDataWithDaley([])
    setCordsIndexForDaley(0)
    setPlayerSpeed(10)
    setIsPlayerPaused(false)
  }

  useEffect(() => {
    const filteredPlaybackData = playbacksData.find(playback => showingPlayback === playback.id)
    setPlaybackDataWithFilter(filteredPlaybackData)
  }, [playbacksData, showingPlayback])

  useEffect(() => {
    //обнуляем массив координат, если у нас переключили плейбек
    if (prevPlayback !== showingPlayback) {
      resetDrawingPlaybackData()
      setPrevPlayback(showingPlayback)
    }

    //ставим плеер на паузу
    if (isPlayerPaused) {
      return
    }

    // сама работа отрисовки плейбека через таймер
    let timeout: NodeJS.Timeout
    if (showingPlayback !== null && playbackDataWithFilter?.equipments_data.length === 1) { //проверка на то, точно ли у нас 1 техника в плейбэке, которую нужно отрисовать
      timeout = setTimeout(() => {
        const imeiDataForDaley = playbackDataWithFilter?.equipments_data[0].imei_data

        if (imeiDataForDaley?.length - 1 <= cordsIndexForDaley) { //во избежание ошибок прерываем таймер, если индекс для новых координат дошел до максимума
          return
        }

        const newCoordsForSingleLine = imeiDataForDaley[cordsIndexForDaley]

        setPlaybackDataWithDaley(prev => [...prev, [newCoordsForSingleLine.lat, newCoordsForSingleLine.lon]])
        setCordsIndexForDaley(prevState => prevState + 1)
      }, playerSpeed)

    } else { //Сброс всех данных массива и индекса нужных координат, при выключении плейбека
      if (playbackDataWithDaley.length > 0) {
        resetDrawingPlaybackData()
      }
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [showingPlayback, playbackDataWithDaley, playbackDataWithFilter, playerSpeed, isPlayerPaused])

  const countProgressForProgressBar = () => {
    const totalLength = playbackDataWithFilter?.equipments_data[0].imei_data?.length
    if (totalLength) {
      const total = playbackDataWithFilter?.equipments_data[0].imei_data?.length - 1

      return (cordsIndexForDaley * 100 / total).toFixed(1)
    }
  }

  return (
    <>
      {
        playbackDataWithFilter?.equipments_data.map(equipData => {

          //проверка на то что техника одна
          const cords = playbackDataWithFilter?.equipments_data.length === 1
            ? playbackDataWithDaley
            : equipData.imei_data.map(e => [+e.lat, +e.lon]) as LatLngExpression[]

          return (
            <Polyline
              className="constant-weight-polyline"
              key={`Polyline__${equipData.imei}__${playbackDataWithFilter?.id}`}
              positions={cords}
              color={equipData.color}
              // weight={4}
              opacity={.7}
            >
              <Popup>
                {equipData.name}
              </Popup>
            </Polyline>
          )
        })
      }
      {
        (playbackDataWithFilter?.equipments_data.length === 1 && playbackDataWithDaley)
          ? <Circle
            center={playbackDataWithDaley.at(-1) || [0, 0]}
            radius={1}
            pathOptions={{
              color: "red", // Цвет границы круга
              fillColor: "transparent", // Прозрачный цвет заливки
              fillOpacity: 1, // Прозрачность заливки
              weight: 10 // Толщина границы в пикселях
            }}
          />
          : null
      }
      {
        playbackDataWithFilter?.equipments_data.length === 1
          ? <MapPlaybackSpeedController
            playerSpeed={playerSpeed}
            isPlayerPaused={isPlayerPaused}
            toggleIsPlayerPaused={toggleIsPlayerPaused}
            setPlayerSpeed={setPlayerSpeed}
            progressForProgressBar={countProgressForProgressBar()}
            timeStamp={playbackDataWithFilter?.equipments_data[0].imei_data[cordsIndexForDaley - 1]?.ts}
            isPlaybackEnd={playbackDataWithFilter?.equipments_data[0].imei_data?.length === cordsIndexForDaley}
            replayPlayback={resetDrawingPlaybackData}
          />
          : null
      }
    </>
  )
}

export default MapPlayback
