import { type LatLngLiteral } from 'leaflet'
import React, { memo, useCallback } from 'react'

import { PickMapCord } from '~shared/ui/pick-map-cord'
import { settingsStore } from '~widgets/settings'

export const PickBaseCord = memo(() => {
  const isClickMapForNewBaseCord = settingsStore(state => state.isClickMapForNewBaseCord)
  const setIsSettingsOpen = settingsStore(state => state.setIsSettingsOpen)
  const setIsClickMapForNewBaseCord = settingsStore(state => state.setIsClickMapForNewBaseCord)
  const setNewBaseCord = settingsStore(state => state.setNewBaseCord)

  const close = useCallback(() => {
    if (isClickMapForNewBaseCord) {
      setIsSettingsOpen(true)
      setIsClickMapForNewBaseCord(false)
    }
  }, [isClickMapForNewBaseCord, setIsSettingsOpen, setIsClickMapForNewBaseCord])

  const clickHandler = useCallback(({ lat, lng }: LatLngLiteral) => {
    setNewBaseCord([lat, lng])
    close()
  }, [close, setNewBaseCord])

  const escapeHandler = () => {
    close()
  }

  return (
    <PickMapCord
      shown={isClickMapForNewBaseCord}
      onClick={clickHandler}
      onEscapeKey={escapeHandler}
    />
  )
})
