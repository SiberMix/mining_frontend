import { RootState } from '../store'

export const getSelectedCropRotationGroupSelector = (state: RootState) => state.cropRotationReducer.selectedCropRotationGroup
export const getCropRotationGroupsSelector = (state: RootState) => state.cropRotationReducer.cropRotationGroups
export const getEditedCropRotationGroupSelector = (state: RootState) => state.cropRotationReducer.editedCropRotationGroup
export const getOpenCropRotationAddGroupModalSelector = (state: RootState) => state.cropRotationReducer.openCropRotationAddGroupModal
export const getArrOfLoadingCulturesSelector = (state: RootState) => state.cropRotationReducer.arrOfLoadingCultures
export const getIsLoadingCropRotation = (state: RootState) => state.cropRotationReducer.isLoadingCropRotation
