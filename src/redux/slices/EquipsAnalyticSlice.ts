import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { analyticService } from '../../api/analytic'
import { RootState } from '../store'
import { getRandomColor } from '../../components/pages/Analytic/modules/EquipsAnalytic/reusingFunctions'

type EquipAnalyticSliceInitialState = {
  equipsData: EquipsData | undefined
  tsStart: number
  tsEnd: number
  pikedEquipsId: number[]
  scheduleType: ChartType
  pikedEquipsColors: string[]
  isLoading: boolean
}
export type ChartType = 'Скорость' | 'Тип'

const equipAnalyticSliceInitialState: EquipAnalyticSliceInitialState = {
  equipsData: undefined,
  tsStart: 0,
  tsEnd: 0,
  pikedEquipsId: [],
  scheduleType: 'Скорость',
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
        console.log(action.payload.data)
        state.equipsData = action.payload.data
      })
      .addCase(resetEquipsAnalyticThunk.pending, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = true
      })
      .addCase(resetEquipsAnalyticThunk.rejected, (state: EquipAnalyticSliceInitialState) => {
        state.isLoading = false
      })
      .addCase(resetEquipsAnalyticThunk.fulfilled, (state: EquipAnalyticSliceInitialState, action) => {
        state.isLoading = false
        console.log(action.payload.data)
        state.equipsData = action.payload.data
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
      pikedEquipsId
    } = (thunkAPI.getState() as RootState).equipAnalyticReducer

    return toast.promise(analyticService.getEquipsAnalytic({
      ts_start: tsStart,
      ts_end: tsEnd, //ваще хз зачем так сделано
      imei_ids: pikedEquipsId
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
    dispatch(setPikedEquipsId([equipmentList[0].id]))
    dispatch(setPikedEquipsColors([getRandomColor()]))

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
  setPikedEquipsId,
  setPikedEquipsColors,
  setScheduleType
} = actions

export default reducer

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
}

