import './index.scss'

import type { LatLngLiteral } from 'leaflet'
import { memo, useCallback } from 'react'

import { PickMapCord } from '~shared/ui/pick-map-cord'

import { weatherStore } from '../../../model'

export const PickWeatherCord = memo(() => {
  const isWeatherPickModActive = weatherStore(state => state.isWeatherPickModActive)
  const setWeatherModalOpen = weatherStore(state => state.setWeatherModalOpen)
  const setIsWeatherPickModActive = weatherStore(state => state.setIsWeatherPickModActive)
  const setWeatherCords = weatherStore(state => state.setWeatherCords)

  const close = useCallback(() => {
    setIsWeatherPickModActive(false)
  }, [setIsWeatherPickModActive])

  const clickHandler = useCallback((cords: LatLngLiteral) => {
    setWeatherCords(cords)
    setWeatherModalOpen(true)
    setIsWeatherPickModActive(false)
  }, [setIsWeatherPickModActive, setWeatherCords, setWeatherModalOpen])

  return (
    <PickMapCord
      shown={isWeatherPickModActive}
      onClick={clickHandler}
      onEscapeKey={close}
    />
  )
})
