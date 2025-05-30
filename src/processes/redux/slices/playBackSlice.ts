import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { mapService } from '~widgets/map/api'

type PlayBackSliceInitialState = {
  playbacksData: CurrentPlaybackData[],
  isOpenPlayBackAddModal: boolean,
  showingPlayback: number | null,
  editedPlayback: CurrentPlaybackData | null
}

const playBackSliceInitialState: PlayBackSliceInitialState = {
  playbacksData: [],
  isOpenPlayBackAddModal: false,
  showingPlayback: null,
  editedPlayback: null
}

const playbackSlice = createSlice({
  name: 'playback',
  initialState: playBackSliceInitialState,
  reducers: {
    setIsOpenPlayBackAddModal: (state: PlayBackSliceInitialState, action) => {
      state.isOpenPlayBackAddModal = action.payload
    },
    addShowingPlayback: (state: PlayBackSliceInitialState, action) => {
      state.showingPlayback = action.payload
    },
    removeShowingPlayback: (state: PlayBackSliceInitialState, action) => {
      state.showingPlayback = null
    },
    setEditedPlayback: (state: PlayBackSliceInitialState, action) => {
      state.editedPlayback = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlaybacks.fulfilled, (state: PlayBackSliceInitialState, action) => {
        state.playbacksData = action.payload?.data
      })
      .addCase(postNewPlayback.fulfilled, (state: PlayBackSliceInitialState, action) => {
        state.playbacksData.push(action.payload?.data)
      })
      .addCase(editeNewPlayback.fulfilled, (state: PlayBackSliceInitialState, action) => {
        state.playbacksData = state.playbacksData.map(playback => {
          if (playback.id === action.payload.id) {
            return action.payload.newPlaybackData
          }
          return playback
        })
      })
      .addCase(deletePlayback.fulfilled, (state: PlayBackSliceInitialState, action) => {
        state.showingPlayback = null
        state.playbacksData = state.playbacksData.filter(playback => playback.id !== action.payload.id)
      })
      .addDefaultCase(() => {
      })
  }
})

export const getAllPlaybacks = createAsyncThunk(
  'playback-side-out/getAllPlaybacks',
  () => {
    return mapService.getPlayback()
  }
)
export const postNewPlayback = createAsyncThunk(
  'playback-side-out/postNewPlayback',
  (newPlaybackData: PlaybackPostData) => {
    return toast.promise(mapService.addNewPlayback(newPlaybackData), {
      pending: 'Собираем новый плейбэк на сервере...',
      success: 'Плэйбэк успешно собран',
      error: 'Произошла ошибка при сборке плэйбэка'
    })
  }
)
export const editeNewPlayback = createAsyncThunk(
  'playback-side-out/editeNewPlayback',
  async ({
    id,
    newPlaybackData
  }: PlaybackDataForEdit) => {
    const response = await toast.promise(mapService.updatePlayback(id, newPlaybackData), {
      pending: 'Редактируем плейбэк на сервере...',
      success: 'Плэйбэк успешно изменен',
      error: 'Произошла ошибка при изменении плэйбэка'
    })
    return {
      id,
      newPlaybackData,
      response
    }
  }
)
export const deletePlayback = createAsyncThunk(
  'playback-side-out/deletePlayback',
  async (id: number) => {
    const response = await toast.promise(mapService.deletePlayback(id), {
      pending: 'Удаляем плейбэк на сервере...',
      success: 'Плэйбэк успешно удален',
      error: 'Произошла ошибка при удалении плэйбэка'
    })

    return {
      id,
      response
    }
  }
)

const {
  reducer,
  actions
} = playbackSlice

export const {
  setIsOpenPlayBackAddModal,
  addShowingPlayback,
  removeShowingPlayback,
  setEditedPlayback
} = actions

export default reducer

export type CurrentPlaybackData = {
  id: number,
  name: string,
  color: string,
  time_step: {
    end: number,
    start: number
  },
  equipment: number[],
  equipments_data: EquipmentsData[]
}

export type PlaybackPostData = {
  equipment: EquipmentData[],
  name: string,
  time_step: {
    start: number,
    end: number
  }
}

export type EquipmentData = {
  equip_id: number,
  equip_color: string
}

export type PlaybackDataForEdit = {
  id: number,
  newPlaybackData: CurrentPlaybackData
}

export type EquipmentsData = {
  id: number,
  imei: string,
  name: string,
  color: string,
  imei_data: imeiData[]
}

export type imeiData = {
  lat: number,
  lon: number,
  ts: number
}
