import type { Settings } from '~widgets/settings/types'

import { initialSettings, SETTINGS_OPTIONS_STORE_KEY } from '../consts'

/**
 * Get settings from local storage
 * */
export const getSettingsFromLocalStorage = (): Settings => {
  const lsSettings = localStorage.getItem(SETTINGS_OPTIONS_STORE_KEY)
  if (lsSettings === null) {
    return initialSettings
  }

  return JSON.parse(lsSettings) as Settings
}

/**
 * Set settings to local storage
 * */
export const setSettingsToLocalStorage = (settings: Settings) => {
  localStorage.setItem(SETTINGS_OPTIONS_STORE_KEY, JSON.stringify(settings))
}
