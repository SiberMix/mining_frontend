import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { settingsService } from '../../api/settings'
import type { RootState } from '../store'

type SettingsInitialState = {
  showSettingsModal: boolean,
  selectedSettingsWindow: number,
  mapClickForNewBaseCoord: boolean,
  settings: SettingsData,
  usingSettings: SettingsData
}

const settingsInitialState: SettingsInitialState = {
  showSettingsModal: false,
  selectedSettingsWindow: 1,
  mapClickForNewBaseCoord: false,
  settings: {
    startMenuOptions: 'undefined',
    baseMapOptions: 'Google Map',
    zoomLevelOptions: '13',
    baseCoord: [54.925946, 82.775931],
    equipmentOptions: {
      'Название': true,
      'IMEI': true,
      'Гос.номер': true,
      'Скорость': true,
      'Уровень топлива': true
    }
  },
  usingSettings: {
    startMenuOptions: 'undefined',
    baseMapOptions: 'Google Map',
    zoomLevelOptions: '13',
    baseCoord: [54.925946, 82.775931],
    equipmentOptions: {
      'Название': true,
      'IMEI': true,
      'Гос.номер': true,
      'Скорость': true,
      'Уровень топлива': true
    }
  }
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
    },
    /*
    * обнуляет настройки на старые (например если закрыли модалку)
    * */
    resetSettings: (state: SettingsInitialState) => {
      state.settings = state.usingSettings
    },
    setStartMenuOptions: (state: SettingsInitialState, action) => {
      state.settings.startMenuOptions = action.payload
    },
    setBaseMapOptions: (state: SettingsInitialState, action) => {
      state.settings.baseMapOptions = action.payload
    },
    setZoomLevelOptions: (state: SettingsInitialState, action) => {
      state.settings.zoomLevelOptions = action.payload
    },
    setEquipmentOptions: (state: SettingsInitialState, action) => {
      state.settings.equipmentOptions = action.payload
    },
    setBaseCoord: (state: SettingsInitialState, action) => {
      state.settings.baseCoord = action.payload
    },
    setMapClickForNewBaseCoord: (state: SettingsInitialState, action) => {
      state.mapClickForNewBaseCoord = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.fulfilled, (state: SettingsInitialState, action) => {
        state.settings = action.payload?.data
        state.usingSettings = action.payload?.data
      })
      .addCase(postSettings.fulfilled, (state: SettingsInitialState) => {
        state.usingSettings = state.settings
      })
      .addDefaultCase(() => {
      })
  }
})

export const getSettings = createAsyncThunk(
  'settings/getSettingsThunk',
  (token: string) => {
    if (token) {
      return settingsService.getSettings(token)
    }
  }
)
export const postSettings = createAsyncThunk(
  'settings/postSettingsThunk',
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const data = state.settingsReducer.settings
    const token = state.authReducer.token
    return settingsService.postSettings({ token, data })
  }
)

const {
  reducer,
  actions
} = settingsSlice

export const {
  setShowSettingsModal,
  setSelectedSettingsWindow,
  resetSettings,
  setStartMenuOptions,
  setBaseMapOptions,
  setEquipmentOptions,
  setZoomLevelOptions,
  setBaseCoord,
  setMapClickForNewBaseCoord

} = actions

export default reducer

export type SettingsData = {
  startMenuOptions: string,
  baseMapOptions: string,
  zoomLevelOptions: string,
  baseCoord: [number, number],
  equipmentOptions: {
    'Название': boolean,
    'IMEI': boolean,
    'Гос.номер': boolean,
    'Скорость': boolean,
    'Уровень топлива': boolean
  }
}
