import type { CurrentPlaybackData, PlaybackPostData } from '~processes/redux/slices/playBackSlice'
import { axiosInstance } from '~shared/api/axios-instance'

export const playbackService = {
  /*
  * Получаем плейбэки
  * */
  getPlayback: () => {
    return axiosInstance.get('/playback/')
  },
  /*
  * Отправляем новый плейбэк на сервер
  * */
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
