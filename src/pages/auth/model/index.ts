import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { authService } from '~pages/auth/api/auth'
import type { AuthState } from '~pages/auth/types'
import { useTranslation } from 'react-i18next';

const TOKEN_LOCAL_STORAGE_KEY = 'token'


export const useAuthStore = create<AuthState>()(immer((set, get) => ({
  token: localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || null,
  // токен на случай какого то пиздеца '6126e8c08dbcb7cef6e4294b9eb76df6e46dc769'
  setToken: (token) => {
    set({ token })
  },

  getToken: async (data, t) => { // Принимаем t как параметр
    try {
      const response = await toast.promise(authService.login(data), {
        pending: t('Аутентификация...'), // Переведённый текст для ожидания
        success: t('Успешная аутентификация'), // Переведённый текст для успеха
        error: t('Ошибка аутентификации') // Переведённый текст для ошибки
      });
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, response.data.auth_token)
      set({ token: response.data.auth_token })
    } catch (error) {
      console.error(error)
    }
  }
})))
