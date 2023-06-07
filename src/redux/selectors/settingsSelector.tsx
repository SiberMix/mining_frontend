import type { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const getShowSettingsModal = (state: RootState) => {
  return state.settingsSlice.showSettingsModal
}
export const getShowSettingsModalSelector = createSelector(
  getShowSettingsModal,
  (showSettingsModal) => {
    return showSettingsModal
  }
)
