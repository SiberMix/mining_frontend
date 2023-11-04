import { RootState } from '../store'

export const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
export const getShowingPlaybackSelector = (state: RootState) => state.playBackReducer.showingPlayback
// const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
// const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
