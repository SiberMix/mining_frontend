import type { RootState } from '../store'

export const getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
export const getShowingPlaybackSelector = (state: RootState) => state.playBackReducer.showingPlayback
// consts getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
// consts getPlaybacksDataSelector = (state: RootState) => state.playBackReducer.playbacksData
