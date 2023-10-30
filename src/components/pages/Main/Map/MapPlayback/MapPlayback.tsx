import './MapPlayback.scss'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Circle, Polyline, Popup } from 'react-leaflet'
import { getPlaybacksDataSelector, getShowingPlaybacksSelector } from '../../../../../redux/selectors/playbackSelectors'
import { CurrentPlaybackData } from '../../../../../redux/slices/playBackSlice'
import { LatLngExpression } from 'leaflet'

const MapPlayback = () => {
  const playbacksData = useSelector(getPlaybacksDataSelector)
  const showingPlaybacks = useSelector(getShowingPlaybacksSelector)

  const [playbackDataWithFilter, setPlaybackDataWithFilter] = useState<CurrentPlaybackData | undefined>(undefined)
  const [playbackDataWithDaley, setPlaybackDataWithDaley] = useState<LatLngExpression[]>([])
  const [cordsIndexForDaley, setCordsIndexForDaley] = useState(0)

  useEffect(() => {
    const filteredPlaybackData = playbacksData.find(playback => showingPlaybacks === playback.id)
    setPlaybackDataWithFilter(filteredPlaybackData)
  }, [playbacksData, showingPlaybacks])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (showingPlaybacks !== null && playbackDataWithFilter?.equipments_data.length === 1) {//проверка на то, точно ли у нас 1 техника в плейбэке, которую нужно отрисовать
      timeout = setTimeout(() => {
        const imeiDataForDaley = playbackDataWithFilter?.equipments_data[0].imei_data

        if (imeiDataForDaley?.length - 1 <= cordsIndexForDaley) { //во избежание ошибок прерываем таймер, если индекс для новых координат дошел до максимума
          return
        }

        const newCoordsForSingleLine = imeiDataForDaley[cordsIndexForDaley]

        setPlaybackDataWithDaley(prev => [...prev, [newCoordsForSingleLine.lat, newCoordsForSingleLine.lon]])
        setCordsIndexForDaley(prevState => prevState + 1)
      }, 5)

    } else { //Сброс всех данных массива при выключении плейбека
      if (playbackDataWithDaley.length > 0) {
        setPlaybackDataWithDaley([])
      }
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [showingPlaybacks, playbackDataWithDaley, playbackDataWithFilter])

  return (
    <>
      {
        playbackDataWithFilter?.equipments_data.map(equipData => {

          //проверка на то что техника одна
          const cords = playbackDataWithFilter?.equipments_data.length === 1 ? playbackDataWithDaley : equipData.imei_data.map(e => [+e.lat, +e.lon]) as LatLngExpression[]
          console.log('playbackDataWithDaley', playbackDataWithDaley)
          // const cords = equipData.imei_data.map(e => [+e.lat, +e.lon]) as LatLngExpression[]

          console.log('cords.length', cords.length)

          return (
            <Polyline
              className='constant-weight-polyline'
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
              color: 'red', // Цвет границы круга
              fillColor: 'transparent', // Прозрачный цвет заливки
              fillOpacity: 1, // Прозрачность заливки
              weight: 10 // Толщина границы в пикселях
            }}
          />
          : null
      }
    </>
  )
}

export default MapPlayback
