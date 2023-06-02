import type { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const getAllPolygons = (state: RootState) => {
  return state.mapReducer.polygonsList
}
export const getAllPolygonsSelector = createSelector(
  getAllPolygons,
  (polygons) => {
    return polygons
  }
)

const getAllEquipment = (state: RootState) => {
  return state.mapReducer.equipmentList
}
export const getAllEquipmentSelector = createSelector(
  getAllEquipment,
  (equip) => {
    return equip
  }
)
