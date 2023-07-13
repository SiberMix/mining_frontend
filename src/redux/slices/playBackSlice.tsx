import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { mapService } from '../../api/map'

type PlayBackSliceInitialState = {
  playbacksData: CurrentPlaybackData[]
  isOpenPlayBackAddModal: boolean
  showingPlaybacks: number | null
}

const playBackSliceInitialState: PlayBackSliceInitialState = {
  playbacksData: [],
  isOpenPlayBackAddModal: false,
  showingPlaybacks: null
}

const playbackSlice = createSlice({
  name: 'playback',
  initialState: playBackSliceInitialState,
  reducers: {
    setIsOpenPlayBackAddModal: (state: PlayBackSliceInitialState, action) => {
      state.isOpenPlayBackAddModal = action.payload
    },
    addShowingPlayback: (state: PlayBackSliceInitialState, action) => {
      state.showingPlaybacks = action.payload
    },
    removeShowingPlayback: (state: PlayBackSliceInitialState, action) => {
      state.showingPlaybacks = null
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
        state.playbacksData = state.playbacksData.filter(playback => playback.id !== action.payload.id)
      })
      .addDefaultCase(() => {
      })
  }
})

export const getAllPlaybacks = createAsyncThunk(
  'playback/getAllPlaybacks',
  () => {
    return mapService.getPlayback()
  }
)
export const postNewPlayback = createAsyncThunk(
  'playback/postNewPlayback',
  (newPlaybackData: PlaybackPostData) => {
    return mapService.addNewPlayback(newPlaybackData)
  }
)
export const editeNewPlayback = createAsyncThunk(
  'playback/editeNewPlayback',
  async ({
    id,
    newPlaybackData
  }: PlaybackDataForEdit) => {
    const response = await mapService.updatePlayback(id, newPlaybackData)
    return {
      id,
      newPlaybackData,
      response
    }
  }
)
export const deletePlayback = createAsyncThunk(
  'playback/deletePlayback',
  async (id: number) => {
    const response = await mapService.deletePlayback(id)
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
  removeShowingPlayback
} = actions

export default reducer

export type CurrentPlaybackData = {
  id: number
  name: string
  color: string
  time_step: {
    end: number
    start: number
  }
  equipment: string[]
  equipments_data: EquipmentsData[]
}

export type PlaybackPostData = {
  color: string,
  equipment: string[],
  name: string,
  time_step: {
    start: number,
    end: number
  }
}

export type PlaybackDataForEdit = {
  id: number,
  newPlaybackData: CurrentPlaybackData
}

export type EquipmentsData = {
  id: number,
  imei: string,
  name: string
  imei_data: imeiData[]
}

export type imeiData = {
  lat: number
  lon: number
  datetime: number
}
