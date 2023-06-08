import { createSlice } from '@reduxjs/toolkit'

type SettingsInitialState = {
  showSettingsModal: boolean,
  selectedSettingsWindow: number
}

const settingsInitialState: SettingsInitialState = {
  showSettingsModal: false,
  selectedSettingsWindow: 1
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsInitialState,
  reducers: {
    setShowSettingsModal: (state: SettingsInitialState, action) => {
      state.showSettingsModal = action.payload
    },
    setSelectedSettingsWindow: (state: SettingsInitialState, action) => {
      state.selectedSettingsWindow = action.payload
    }
  }
})

const {
  reducer,
  actions
} = settingsSlice

export const {
  setShowSettingsModal,
  setSelectedSettingsWindow
} = actions

export default reducer
