import type { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const getAllFields = (state: RootState) => {
  return state.fieldsReducer.fieldList
}
export const getAllFieldsSelector = createSelector(
  getAllFields,
  (fieldList) => {
    return fieldList
  }
)
const getShowAddFieldModal = (state: RootState) => {
  return state.fieldsReducer.showAddFieldModal
}
export const getShowAddFieldModalSelector = createSelector(
  getShowAddFieldModal,
  (showAddFieldModal) => {
    return showAddFieldModal
  }
)
const getEditedField = (state: RootState) => {
  return state.fieldsReducer.editedField
}
export const getEditedFieldSelector = createSelector(
  getEditedField,
  (editedField) => {
    return editedField
  }
)
