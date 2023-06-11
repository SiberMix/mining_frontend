import type { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const optionalEquipmentOpenWindow = (state: RootState) => {
  return state.optionalEquipmentReducer.optionalEquipmentOpenWindow
}
export const optionalEquipmentOpenWindowSelector = createSelector(
  optionalEquipmentOpenWindow,
  (optionalEquipmentOpenWindow) => {
    return optionalEquipmentOpenWindow
  }
)
const getOptionalEquipmentTypesList = (state: RootState) => {
  return state.optionalEquipmentReducer.optionalEquipmentTypesList
}
export const getOptionalEquipmentTypesListSelector = createSelector(
  getOptionalEquipmentTypesList,
  (TypesList) => {
    return TypesList
  }
)
const getOptionalEquipmentModelsList = (state: RootState) => {
  return state.optionalEquipmentReducer.optionalEquipmentModelList
}
export const getOptionalEquipmentModelsListSelector = createSelector(
  getOptionalEquipmentModelsList,
  (ModelList) => {
    return ModelList
  }
)
const getOptionalEquipmentTrailerList = (state: RootState) => {
  return state.optionalEquipmentReducer.optionalEquipmentTrailerList
}
export const getOptionalEquipmentTrailerListSelector = createSelector(
  getOptionalEquipmentTrailerList,
  (TrailerList) => {
    return TrailerList
  }
)
const getAddModalVisible = (state: RootState) => {
  return state.optionalEquipmentReducer.addModalVisible
}
export const getAddModalVisibleSelector = createSelector(
  getAddModalVisible,
  (addModalVisible) => {
    return addModalVisible
  }
)
const getEditedType = (state: RootState) => {
  return state.optionalEquipmentReducer.editedType
}
export const getEditedTypeSelector = createSelector(
  getEditedType,
  (editedType) => {
    return editedType
  }
)
const getEditedModel = (state: RootState) => {
  return state.optionalEquipmentReducer.editedModel
}
export const getEditedModelSelector = createSelector(
  getEditedModel,
  (editedModel) => {
    return editedModel
  }
)
const getEditedTrailer = (state: RootState) => {
  return state.optionalEquipmentReducer.editedTrailer
}
export const getEditedTrailerSelector = createSelector(
  getEditedTrailer,
  (editedTrailer) => {
    return editedTrailer
  }
)
