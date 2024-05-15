import { type LatLngLiteral } from 'leaflet'
import React, { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { getMapClickForNewBaseCordSelector } from '~processes/redux/selectors/settingsSelector'
import { setBaseCoord, setMapClickForNewBaseCoord, setShowSettingsModal } from '~processes/redux/slices/settingsSlice'
import { useAppDispatch } from '~processes/redux/store'
import { PickMapCord } from '~shared/ui/pick-map-cord'

export const PickBaseCord = memo(() => {
  const dispatch = useAppDispatch()
  const mapClickForNewBaseCord = useSelector(getMapClickForNewBaseCordSelector)

  const close = useCallback(() => {
    dispatch(setMapClickForNewBaseCoord(false))
    dispatch(setShowSettingsModal(true))
  }, [dispatch])

  const clickHandler = useCallback(({ lat, lng }: LatLngLiteral) => {
    dispatch(setBaseCoord([lat, lng]))
    close()
  }, [close, dispatch])

  const escapeHandler = () => {
    close()
  }

  return (
    <PickMapCord
      shown={mapClickForNewBaseCord}
      onClick={clickHandler}
      onEscapeKey={escapeHandler}
    />
  )
})
