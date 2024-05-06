import type { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const getToken = (state: RootState) => {
  return state.authReducer.token
}
export const getTokenSelector = createSelector(
  getToken,
  (token) => {
    return token
  }
)
