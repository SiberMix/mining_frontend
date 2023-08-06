import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { analyticService } from '../../api/analytic'
import { RootState } from '../store'
import { getRandomColor } from '../../components/pages/Analytic/modules/EquipsAnalytic/reusingFunctions'

type EquipAnalyticSliceInitialState = {
  chartType: 'AVG' | 'MEDIAN'
  equipsData: EquipsData | undefined
  tsStart: number
  tsEnd: number
  pikedEquips: PickedEquip[]
  equipsUsingInDiagrams: PickedEquip[]
  scheduleType: ChartType
  isLoading: boolean
}
export type ChartType = 'Скорость' | 'Тип'

const equipAnalyticSliceInitialState: EquipAnalyticSliceInitialState = {
  chartType: 'AVG',
  equipsData: undefined,
  tsStart: 0,
  tsEnd: 0,
  pikedEquips: [],
  equipsUsingInDiagrams: [],
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
        state.equipsData = action.payload.data
        state.equipsUsingInDiagrams = state.pikedEquips
      })
      .addCase(resetEquipsAnalyticThunk.pending, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = true
      })
      .addCase(resetEquipsAnalyticThunk.rejected, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = false
      })
      .addCase(resetEquipsAnalyticThunk.fulfilled, (state: EquipAnalyticSliceInitialState, action) => {
        state.isLoading = false
        state.equipsData = action.payload.data
        state.equipsUsingInDiagrams = state.pikedEquips
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

export type PickedEquip = {
  equipsId: number
  equipColor: string
}
export type EquipsData = {
  time_range: {
    'ts_from': number,
    'ts_to': number
  },
  data: EquipsDataData[]
}
export type EquipsDataData = {
  id: number
  imei_str: string
  imei_data: EquipsDataImeiData[]
}
export type EquipsDataImeiData = {
  timestamp: string
  avg_speed: number
  avg_fuel: number
  median_speed: number
  median_fuel: number
}

