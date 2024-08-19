import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { realtyService } from '~entities/realty/api'
import type { RealtyType, UseRealtyStore } from '~entities/realty/types'

export const useRealtyStore = create<UseRealtyStore>()(immer((set, get) => ({
  realtyList: [],
  realtyForEdit: null,
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
  setRealtyFlyTo: (value) => {
    set({ realtyFlyTo: value })
  },
  setRealtyForEdit: (value) => {
    set({ realtyForEdit: value })
  },
  getRealtyList: async () => {
    try {
      const response = await realtyService.getRealtyList()
      set({ realtyList: response.data })
    } catch (err) {
      console.error(err)
    }
  },
  addRealty: async (realty) => {
    try {
      const circleToAdd = get().circleToAdd
      const realtyToAdd: Omit<RealtyType, 'id'> = {
        name: realty.name,
        type: realty.type,
        color: realty.color,
        cords: { lat: circleToAdd?.lat ?? 0, lng: circleToAdd?.lng ?? 0 },
        radius: circleToAdd?.radius ?? 0
      }
      const response = await realtyService.addRealty(realtyToAdd)
      set((state) => {
        state.realtyList.push(response.data)
        state.isOpenModal = false
        state.circleToAdd = null
      })
    } catch (err) {
      console.error(err)
    }
  },
  editRealty: async (realty) => {
    try {
      await realtyService.editRealty(realty)
      set((state) => {
        state.realtyList = state.realtyList.map(r => r.id === realty.id ? realty : r)
      })
    } catch (err) {
      console.error(err)
    }
  },
  deleteRealty: async (id) => {
    try {
      await realtyService.deleteRealty(id)
      set((state) => {
        state.realtyList = state.realtyList.filter(r => r.id !== id)
      })
    } catch (err) {
      console.error(err)
    }
  }
})))
