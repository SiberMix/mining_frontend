import { createSlice } from '@reduxjs/toolkit'

type SettingsInitialState = {
  showSettingsModal: boolean
}

const settingsInitialState: SettingsInitialState = {
  showSettingsModal: false
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsInitialState,
  reducers: {
    setShowSettingsModal: (state: SettingsInitialState, action) => {
      state.showSettingsModal = action.payload
    }
  }
})

const {
  reducer,
  actions
} = settingsSlice

export const {
  setShowSettingsModal
} = actions

export default reducer
