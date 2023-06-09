import { createSlice } from '@reduxjs/toolkit'

type SettingsInitialState = {
  showSettingsModal: boolean,
  selectedSettingsWindow: number,
  mapClickForNewBaseCoord: boolean,
  settings: {
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
  },
  usingSettings: {
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
    * обновляет настройки todo перенести в санку по отправке на сервер
    * */
    setSettings: (state: SettingsInitialState) => {
      state.usingSettings = state.settings
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
  }
})

const {
  reducer,
  actions
} = settingsSlice

export const {
  setShowSettingsModal,
  setSelectedSettingsWindow,
  setSettings,
  resetSettings,
  setStartMenuOptions,
  setBaseMapOptions,
  setEquipmentOptions,
  setZoomLevelOptions,
  setBaseCoord,
  setMapClickForNewBaseCoord

} = actions

export default reducer
