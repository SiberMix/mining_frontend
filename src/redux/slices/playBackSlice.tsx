import { createSlice } from '@reduxjs/toolkit'

type PlayBackSliceInitialState = {
  playBacksData: PlayBacksData[],
  isOpenPlayBackAddModal: boolean
}

const playBackSliceInitialState: PlayBackSliceInitialState = {
  playBacksData: [
    { title: 'Техника', watching_equips: [ 'Трактор', 'ВАЗ 2105', 'Газель'] },
    { title: 'Странная техника', watching_equips: [ 'Вертолет', 'Самолет', 'Теплоход'] },
    { title: 'Очень странная техника', watching_equips: [ 'Моноколесо', 'Мотоцикл', 'Самокат'] }
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
    addPlayBacksData: (state: PlayBackSliceInitialState, action: {type: string, payload: PlayBacksData}) => {
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

type PlayBacksData = {
  title: string,
  watching_equips: string[]
}
