import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '../store'

const getShowSettingsModal = (state: RootState) => {
  return state.settingsReducer.showSettingsModal
}
export const getShowSettingsModalSelector = createSelector(
  getShowSettingsModal,
  (showSettingsModal) => {
    return showSettingsModal
  }
)
const getSelectedSettingsWindow = (state: RootState) => {
  return state.settingsReducer.selectedSettingsWindow
}
export const getSelectedSettingsWindowSelector = createSelector(
  getSelectedSettingsWindow,
  (selectedSettingsWindow) => {
    return selectedSettingsWindow
  }
)
const getEquipmentOptions = (state: RootState) => {
  return state.settingsReducer.settings.equipmentOptions
}

export const getEquipmentOptionsSelector = createSelector(
  getEquipmentOptions,
  (equipmentOptions) => {
    return equipmentOptions
  }
)
const getStartMenuOptions = (state: RootState) => {
  return state.settingsReducer.settings.startMenuOptions
}

export const getStartMenuOptionsSelector = createSelector(
  getStartMenuOptions,
  (startMenuOptions) => {
    return startMenuOptions
  }
)
const getZoomLevelOptions = (state: RootState) => {
  return state.settingsReducer.settings.zoomLevelOptions
}

export const getZoomLevelOptionsSelector = createSelector(
  getZoomLevelOptions,
  (zoomLevelOptions) => {
    return zoomLevelOptions
  }
)
const getBaseMapOptions = (state: RootState) => {
  return state.settingsReducer.settings.baseMapOptions
}

export const getBaseMapOptionsSelector = createSelector(
  getBaseMapOptions,
  (baseMapOptions) => {
    return baseMapOptions
  }
)
const getBaseCoord = (state: RootState) => {
  return state.settingsReducer.settings.baseCoord
}

export const getBaseCoordSelector = createSelector(
  getBaseCoord,
  (baseCoord) => {
    return baseCoord
  }
)
const getUsingBaseCoord = (state: RootState) => {
  return state.settingsReducer.usingSettings.baseCoord
}

export const getUsingBaseCoordSelector = createSelector(
  getUsingBaseCoord,
  (usingBaseCoord) => {
    return usingBaseCoord
  }
)
const getUsingZoomLevelOptions = (state: RootState) => {
  return state.settingsReducer.usingSettings.zoomLevelOptions
}

export const getUsingZoomLevelOptionsSelector = createSelector(
  getUsingZoomLevelOptions,
  (usingZoomLevelOptions) => {
    return usingZoomLevelOptions
  }
)
const getUsingStartMenuOptions = (state: RootState) => {
  return state.settingsReducer.usingSettings.startMenuOptions
}

export const getUsingStartMenuOptionsSelector = createSelector(
  getUsingStartMenuOptions,
  (usingStartMenuOptions) => {
    return usingStartMenuOptions
  }
)
export const getMapClickForNewBaseCordSelector = (state: RootState) => {
  return state.settingsReducer.mapClickForNewBaseCoord
}
const getUsingBaseMapOptions = (state: RootState) => {
  return state.settingsReducer.usingSettings.baseMapOptions
}

export const getUsingBaseMapOptionsSelector = createSelector(
  getUsingBaseMapOptions,
  (usingBaseMapOptions) => {
    return usingBaseMapOptions
  }
)
const getUsingEquipmentOptions = (state: RootState) => {
  return state.settingsReducer.usingSettings.equipmentOptions
}

export const getUsingEquipmentOptionsSelector = createSelector(
  getUsingEquipmentOptions,
  (usingEquipmentOptions) => {
    return usingEquipmentOptions
  }
)
