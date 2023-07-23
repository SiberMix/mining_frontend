import { createSlice } from '@reduxjs/toolkit'

type CropRotationSliceInitialState = {
  openCropRotationAddGroupModal: boolean
  cropRotationGroups: CropRotationGroup[]
  selectedCropRotationGroup: number | null
  editedCropRotationGroup: CropRotationGroup | undefined
}

const cropRotationSliceInitialState: CropRotationSliceInitialState = {
  openCropRotationAddGroupModal: false,
  cropRotationGroups: [],
  selectedCropRotationGroup: null,
  editedCropRotationGroup: undefined
}

const cropRotationSlice = createSlice({
  name: 'cropRotation',
  initialState: cropRotationSliceInitialState,
  reducers: {
    setCropRotationGroup: (state: CropRotationSliceInitialState, action) => {
      if (state.cropRotationGroups.some(group => group.id === action.payload.id)) {
        state.cropRotationGroups = state.cropRotationGroups.map(group => {
          if (group.id === action.payload.id) {
            return action.payload
          } else {
            return group
          }
        })
        state.selectedCropRotationGroup = action.payload.id
      } else {
        state.selectedCropRotationGroup = action.payload.id
        state.cropRotationGroups.push(action.payload)
      }
    },
    setOpenCropRotationAddGroupModal: (state: CropRotationSliceInitialState, action) => {
      state.openCropRotationAddGroupModal = action.payload
    },
    setSelectedCropRotationGroup: (state: CropRotationSliceInitialState, action) => {
      state.selectedCropRotationGroup = action.payload
    },
    setEditedCropRotationGroup: (state: CropRotationSliceInitialState, action) => {
      if (action.payload !== undefined) {
        state.editedCropRotationGroup = state.cropRotationGroups.find(group => group.id === action.payload)
        state.openCropRotationAddGroupModal = true
      } else {
        state.editedCropRotationGroup = action.payload
        state.openCropRotationAddGroupModal = false
      }
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
  setSelectedCropRotationGroup,
  setEditedCropRotationGroup
} = actions

export default reducer

export type CropRotationGroup = {
  id: number
  groupName: string,
  description: string
  groupData: number[]
}
