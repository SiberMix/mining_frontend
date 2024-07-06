import { axiosInstance } from '~shared/api/axios-instance'

import type { CurrentPlaybackData, PlaybackPostData } from '../types'

export const playbackService = {
  getPlayback: () => {
    return axiosInstance.get('/playback/')
  },
  addNewPlayback: (newPlaybackData: PlaybackPostData) => {
    return axiosInstance.post('/playback/', newPlaybackData)
  },
  updatePlayback: (id: number, newPlaybackData: CurrentPlaybackData) => {
    return axiosInstance.put(`/playback/${id}/`, newPlaybackData)
  },
  deletePlayback: (id: number) => {
    return axiosInstance.delete(`/playback/${id}`)
  }
}
