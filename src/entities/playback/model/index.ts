import type { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { playbackService } from '~entities/playback/api'
import type { CurrentPlaybackData, PlaybackInitialState } from '~entities/playback/types'

export const usePlaybackStore = create<PlaybackInitialState>()(immer((set, get) => ({
  playbacksData: [],
  isOpenPlayBackAddModal: false,
  showingPlayback: null,
  editedPlayback: null,
  setIsOpenPlayBackAddModal: (val) => {
    set({ isOpenPlayBackAddModal: val })
  },
  setShowingPlayback: (val) => {
    set({ showingPlayback: val })
  },
  setEditedPlayback: (val) => {
    set({ editedPlayback: val })
  },
  getAllPlaybacks: async () => {
    try {
      const response = await playbackService.getPlayback()
      set({ playbacksData: response?.data })
    } catch (err) {
      console.error(err)
    }
  },
  postNewPlayback: async (newPlaybackData) => {
    try {
      const response: AxiosResponse<CurrentPlaybackData> = await toast.promise(playbackService.addNewPlayback(newPlaybackData), {
        pending: 'Собираем новый плейбэк на сервере...',
        success: 'Плэйбэк успешно собран',
        error: 'Произошла ошибка при сборке плэйбэка'
      })
      set((state) => ({
        playbacksData: [...state.playbacksData, response.data]
      }))
    } catch (err) {
      console.error(err)
    }
  },
  editeNewPlayback: async ({ id, newPlaybackData }) => {
    try {
      await toast.promise(playbackService.updatePlayback(id, newPlaybackData), {
        pending: 'Редактируем плейбэк на сервере...',
        success: 'Плэйбэк успешно изменен',
        error: 'Произошла ошибка при изменении плэйбэка'
      })
      set((state) => ({
        playbacksData: state.playbacksData.map(playback => {
          return playback.id === id ? newPlaybackData : playback
        })
      }))
    } catch (err) {
      console.error(err)
    }
  },
  deletePlayback: async (id) => {
    try {
      await toast.promise(playbackService.deletePlayback(id), {
        pending: 'Удаляем плейбэк на сервере...',
        success: 'Плэйбэк успешно удален',
        error: 'Произошла ошибка при удалении плэйбэка'
      })
      set({ showingPlayback: null })
      set((state) => ({
        playbacksData: state.playbacksData.filter(playback => playback.id !== id)
      }))
    } catch (err) {
      console.error(err)
    }
  }
})))
