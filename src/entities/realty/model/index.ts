import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { realtyFakeData } from '~entities/realty/const/fakedata'
import type { UseRealtyStore } from '~entities/realty/types'

export const useRealtyStore = create<UseRealtyStore>()(immer((set, get) => ({
  realtyList: realtyFakeData,
  isOpenModal: false,
  isPickCenter: false,
  circleToAdd: null,
  realtyFlyTo: undefined,
  setIsOpenModal: (value) => {
    set({ isOpenModal: value })
  },
  setIsPickCenter: (value) => {
    set({ isPickCenter: value })
  },
  setCircleToAdd: (circle) => {
    set({ circleToAdd: circle })
  },
  addRealty: (realty) => {
    const circleToAdd = get().circleToAdd
    console.log('Adding realty', { ...realty, ...circleToAdd })
  },
  setRealtyFlyTo: (value) => {
    set({ realtyFlyTo: value })
  }
})))
