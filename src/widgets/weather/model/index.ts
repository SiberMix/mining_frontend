import type { LatLngLiteral } from 'leaflet'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { WeatherStore } from '../types'

export const weatherStore = create<WeatherStore>()(immer((set) => ({
  isWeatherModalOpen: false,
  isWeatherPickModActive: false,
  weatherTime: new Date(),
  weatherCords: null,
  setWeatherModalOpen: (isOpen: boolean) => {
    set({ isWeatherModalOpen: isOpen })
  },
  setIsWeatherPickModActive: (isOpen: boolean) => {
    set({ isWeatherPickModActive: isOpen })
  },
  setWeatherCords: (cords: LatLngLiteral | null) => {
    set({ weatherCords: cords })
  }
})))
