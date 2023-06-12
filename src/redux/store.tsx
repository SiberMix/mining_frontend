import {
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import mapReducer from './slices/mapSlice'
import sidebarReducer from './slices/sidebarSlice'
import fieldsReducer from './slices/fieldSlice'
import settingsReducer from './slices/settingsSlice'
import optionalEquipmentReducer from './slices/optionalEquipmentSlice'
import authReducer from './slices/authSlice'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  mapReducer,
  sidebarReducer,
  fieldsReducer,
  settingsReducer,
  optionalEquipmentReducer,
  authReducer
})
export type RootReducer = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
