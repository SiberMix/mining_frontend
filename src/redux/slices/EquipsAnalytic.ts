import { createSlice } from '@reduxjs/toolkit'

type EquipAnalyticSliceInitialState = {
  equipsData: any
  tsStart: number
  tsEnd: number
  pikedEquipsId: number[]
  scheduleType: 'speed' | 'fuel'
  pikedEquipsColors: string[]
  isLoading: boolean
}

const equipAnalyticSliceInitialState: EquipAnalyticSliceInitialState = {
  equipsData: undefined,
  tsStart: 0,
  tsEnd: 0,
  pikedEquipsId: [],
  scheduleType: 'speed',
  pikedEquipsColors: [],
  isLoading: false
}

const equipAnalyticSlice = createSlice({
  name: 'equipAnalytic',
  initialState: equipAnalyticSliceInitialState,
  reducers: {
    setTsStart: (state: EquipAnalyticSliceInitialState, action) => {
      state.tsStart = action.payload
    },
    setTsEnd: (state: EquipAnalyticSliceInitialState, action) => {
      state.tsEnd = action.payload
    },
    setPikedEquipsId: (state: EquipAnalyticSliceInitialState, action) => {
      state.pikedEquipsId = action.payload
    },
    setPikedEquipsColors: (state: EquipAnalyticSliceInitialState, action) => {
      state.pikedEquipsColors = action.payload
    },
    setScheduleType: (state: EquipAnalyticSliceInitialState, action) => {
      state.scheduleType = action.payload
    }
  }
})

const {
  reducer,
  actions
} = equipAnalyticSlice

export const {
  setTsStart,
  setTsEnd,
  setPikedEquipsId,
  setPikedEquipsColors,
  setScheduleType
} = actions

export default reducer

export type EquipsData = {}
