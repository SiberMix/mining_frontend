import type { RootState } from '../store'

export const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
export const getShowingPlaybackSelector = (state: RootState) => state.playBackReducer.showingPlayback
// config getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
// config getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
