import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import authReducer from './slices/authSlice'
import cropRotationReducer from './slices/cropRotationSlice'
import fieldsReducer from './slices/fieldSlice'
import mapReducer from './slices/mapSlice'
import optionalEquipmentReducer from './slices/optionalEquipmentSlice'
import playBackReducer from './slices/playBackSlice'

const rootReducer = combineReducers({
  mapReducer,
  fieldsReducer,
  optionalEquipmentReducer,
  authReducer,
  playBackReducer,
  cropRotationReducer
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
