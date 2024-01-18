import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { getRandomColor } from '~shared/lib/get-random-color'

import { analyticService } from '../../api/analytic'
import type { RootState } from '../store'

type EquipAnalyticSliceInitialState = {
  chartType: ChartType,
  equipsDataForCharts: EquipsDataForCharts | undefined,
  tsStart: number,
  tsEnd: number,
  pikedEquips: PickedEquip[],
  equipColorsUsingInDiagrams: PickedEquip[],
  scheduleType: ScheduleType,
  isLoading: boolean
}
export type ScheduleType = 'Скорость' | 'Тип'

const equipAnalyticSliceInitialState: EquipAnalyticSliceInitialState = {
  chartType: 'AVG',
  equipsDataForCharts: undefined,
  tsStart: 0,
  tsEnd: 0,
  pikedEquips: [],
  equipColorsUsingInDiagrams: [],
  scheduleType: 'Скорость',
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
    setPikedEquips: (state: EquipAnalyticSliceInitialState, action) => {
      state.pikedEquips = action.payload
    },
    setScheduleType: (state: EquipAnalyticSliceInitialState, action) => {
      state.scheduleType = action.payload
    },
    setChartType: (state: EquipAnalyticSliceInitialState, action) => {
      state.chartType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEquipsAnalyticThunk.pending, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = true
      })
      .addCase(getEquipsAnalyticThunk.rejected, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = false
      })
      .addCase(getEquipsAnalyticThunk.fulfilled, (state: EquipAnalyticSliceInitialState, action) => {
        state.isLoading = false
        state.equipsDataForCharts = action.payload.data
        state.equipColorsUsingInDiagrams = state.pikedEquips
      })
      .addCase(resetEquipsAnalyticThunk.pending, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = true
      })
      .addCase(resetEquipsAnalyticThunk.rejected, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = false
      })
      .addCase(resetEquipsAnalyticThunk.fulfilled, (state: EquipAnalyticSliceInitialState, action) => {
        state.isLoading = false
        state.equipsDataForCharts = action.payload.data
        state.equipColorsUsingInDiagrams = state.pikedEquips
      })
      .addDefaultCase(() => {
      })
  }
})

export const getEquipsAnalyticThunk = createAsyncThunk(
  'equipAnalytic/getEquipsAnalyticThunk',
  (_, thunkAPI) => {
    const {
      tsStart,
      tsEnd,
      pikedEquips
    } = (thunkAPI.getState() as RootState).equipAnalyticReducer
    const equipsId = pikedEquips.map(pickedEquip => pickedEquip.equipsId)

    return toast.promise(analyticService.getEquipsAnalytic({
      ts_start: tsStart,
      ts_end: tsEnd,
      imei_ids: equipsId
    }), {
      pending: 'Подгружаю статистику техники',
      success: 'Статистика техники успешно загружена',
      error: 'Ошибка при сборе статистики'
    })
  }
)
export const resetEquipsAnalyticThunk = createAsyncThunk(
  'equipAnalytic/resetEquipsAnalyticThunk',
  (_, thunkAPI) => {
    const { equipmentList } = (thunkAPI.getState() as RootState).mapReducer
    const dispatch = thunkAPI.dispatch
    const now = new Date().getTime() // Текущая временная метка
    const dayAgo = now - 24 * 60 * 60 * 1000
    dispatch(setTsEnd(now))
    dispatch(setTsStart(dayAgo))
    dispatch(setScheduleType('Скорость'))
    dispatch(setChartType('AVG'))
    dispatch(setPikedEquips([{
      equipsId: equipmentList[0].id,
      equipColor: getRandomColor()
    }]))

    return toast.promise(analyticService.getEquipsAnalytic({
      ts_start: dayAgo,
      ts_end: now,
      imei_ids: [equipmentList[0].id]
    }), {
      pending: 'Сбрасываю фильтры, пожалуйста подождите',
      success: 'Сброс прошел успешно',
      error: 'Ошибка при сбросе фильтров'
    })
  }
)

const {
  reducer,
  actions
} = equipAnalyticSlice

export const {
  setTsStart,
  setTsEnd,
  setPikedEquips,
  setScheduleType,
  setChartType
} = actions

export default reducer

export type ChartType = 'AVG' | 'MEDIAN'

export type PickedEquip = {
  equipsId: number,
  equipColor: string
}
export type EquipsDataForCharts = Record<
  string, //ключ - это дата в виде "1700784000"
  OneEquipDataForChartsData[]>

export type OneEquipDataForChartsData = {
  id: number,
  imei_str: string,
  avg_speed: number | null,
  avg_fuel: number | null,
  median_speed: number | null,
  median_fuel: number | null
}
