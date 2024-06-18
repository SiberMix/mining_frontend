import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { getSettingsFromLocalStorage, setSettingsToLocalStorage } from '~widgets/settings/lib'

import { initialSettings } from '../../consts'
import type { Settings, SettingsStore } from '../../types'

export const settingsStore = create<SettingsStore>()(immer((set) => ({
  isSettingsOpen: false,
  isClickMapForNewBaseCord: false,
  settings: getSettingsFromLocalStorage(), // todo LS,
  newBaseCord: getSettingsFromLocalStorage().baseCord, // костыль
  setIsSettingsOpen: (isOpen: boolean) => {
    set({ isSettingsOpen: isOpen })
  },
  setIsClickMapForNewBaseCord: (isOpen: boolean) => {
    set({ isClickMapForNewBaseCord: isOpen })
  },
  setSettings: (settings: Settings) => {
    set({ settings })
    console.log(settings)
    setSettingsToLocalStorage(settings)
  },
  resetSettings: () => {
    set({ settings: initialSettings })
  },
  setNewBaseCord: (cord: [number, number]) => {
    set({ newBaseCord: cord })
  }
})))
