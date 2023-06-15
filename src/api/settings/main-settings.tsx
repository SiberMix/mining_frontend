import type { SettingsData } from '../../redux/slices/settingsSlice'
import { axiosInstance } from '../abstract'

export const mainSettings = {
  getSettings: (token: string) => {
    return axiosInstance.get(`/user-settings/${token}`)
  },
  postSettings: ({ token, data }: {token: string, data: SettingsData}) => {
    return axiosInstance.post(`/user-settings/${token}`, data)
  }
}
