import { createSlice } from '@reduxjs/toolkit'

type CropRotationSliceInitialState = {
  openCropRotationAddGroupModal: boolean
  cropRotationGroups: CropRotationGroup[]
  selectedCropRotationGroup: number | null
}

const cropRotationSliceInitialState: CropRotationSliceInitialState = {
  openCropRotationAddGroupModal: false,
  cropRotationGroups: [],
  selectedCropRotationGroup: null
}

const cropRotationSlice = createSlice({
  name: 'cropRotation',
  initialState: cropRotationSliceInitialState,
  reducers: {
    setOpenCropRotationAddGroupModal: (state: CropRotationSliceInitialState, action) => {
      state.openCropRotationAddGroupModal = action.payload
    },
    setCropRotationGroup: (state: CropRotationSliceInitialState, action) => {
      state.cropRotationGroups.push(action.payload)
    },
    setSelectedCropRotationGroup: (state: CropRotationSliceInitialState, action) => {
      state.selectedCropRotationGroup = action.payload
    }
  }
})

const {
  reducer,
  actions
} = cropRotationSlice

export const {
  setOpenCropRotationAddGroupModal,
  setCropRotationGroup,
  setSelectedCropRotationGroup
} = actions

export default reducer

export type CropRotationGroup = {
  id: number
  groupName: string,
  description: string
  groupData: number[]
}
