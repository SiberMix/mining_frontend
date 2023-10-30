import { RootState } from '../store'

export const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
export const getShowingPlaybacksSelector = (state: RootState) => state.playBackReducer.showingPlaybacks
// const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
// const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
