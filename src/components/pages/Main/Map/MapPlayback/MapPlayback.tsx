import { LatLngExpression } from 'leaflet'
import './MapPlayback.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { Polyline, Popup } from 'react-leaflet'

const MapPlayback = () => {
  const playbacksData = useSelector((state: RootState) => state.playBackReducer.playbacksData)
  const showingPlaybacks = useSelector((state: RootState) => state.playBackReducer.showingPlaybacks)

  return (
    <>
      {
        playbacksData
          // .filter(playback => showingPlaybacks.some(s => s === playback.id))
          .filter(playback => showingPlaybacks === playback.id)
          .map(filteredPlayback => {
            return filteredPlayback.equipments_data.map(equipData => {
              const coords = equipData.imei_data.map(e => [+e.lat, +e.lon])
              return (
                <Polyline
                  className='constant-weight-polyline'
                  key={`Polyline__${equipData.imei}__${filteredPlayback.id}`}
                  positions={coords as LatLngExpression[]}
                  color={filteredPlayback.color}
                  // weight={10} не задаем! тогда линии будут постоянно одного размера вне зависимости от зума
                  opacity={0.6}
                >
                  <Popup>
                    {equipData.name}
                  </Popup>
                </Polyline>
              )
            })
          })
      }
    </>
  )
}

/*

*/
export default MapPlayback
