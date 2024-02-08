import { axiosInstanceWithoutV1 } from '~shared/api/axios-instance'

import type { CurrentPlaybackData, PlaybackPostData } from '../../redux/slices/playBackSlice'

export const playbackService = {
  /*
  * Получаем плейбэки
  * */
  getPlayback: () => {
    return axiosInstanceWithoutV1.get('/playback/')
  },
  /*
  * Отправляем новый плейбэк на сервер
  * */
  addNewPlayback: (newPlaybackData: PlaybackPostData) => {
    return axiosInstanceWithoutV1.post('/playback/', newPlaybackData)
  },
  updatePlayback: (id: number, newPlaybackData: CurrentPlaybackData) => {
    return axiosInstanceWithoutV1.put(`/playback/${id}/`, newPlaybackData)
  },
  deletePlayback: (id: number) => {
    return axiosInstanceWithoutV1.delete(`/playback/${id}`)
  }
}
