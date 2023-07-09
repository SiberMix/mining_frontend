import { createSlice } from '@reduxjs/toolkit'

type PlayBackSliceInitialState = {
  playBacksData: PlayBacksData[],
  isOpenPlayBackAddModal: boolean
}

const playBackSliceInitialState: PlayBackSliceInitialState = {
  playBacksData: [
    {
      color: '#1677ff',
      equipment: ['4', '10', '1', '12', '11'],
      name: 'Плэйбэк #1',
      time_step: {
        start: 1689708930,
        end: 1690396593
      }
    },
    {
      color: '#F85F73',
      equipment: ['1', '12', '11'],
      name: 'Плэйбэк #2',
      time_step: {
        start: 1689708930,
        end: 1690396593
      }
    }
  ],
  isOpenPlayBackAddModal: false
}

const playBackSlice = createSlice({
  name: 'sidebar',
  initialState: playBackSliceInitialState,
  reducers: {
    setIsOpenPlayBackAddModal: (state: PlayBackSliceInitialState, action) => {
      state.isOpenPlayBackAddModal = action.payload
    },
    setPlayBacksData: (state: PlayBackSliceInitialState, action) => {
      state.playBacksData = action.payload
    },
    addPlayBacksData: (state: PlayBackSliceInitialState, action: { type: string, payload: PlayBacksData }) => {
      state.playBacksData.push(action.payload)
    }
  }
})

const {
  reducer,
  actions
} = playBackSlice

export const {
  setIsOpenPlayBackAddModal,
  setPlayBacksData,
  addPlayBacksData
} = actions

export default reducer

export type PlayBacksData = {
  color: string,
  equipment: string[],
  name: string,
  time_step: {
    start: number,
    end: number
  }
}
