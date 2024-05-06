import type { SettingsData } from '~processes/redux/slices/settingsSlice'
import { axiosInstance } from '~shared/api/axios-instance'

export const mainSettings = {
  getSettings: (token: string) => {
    return axiosInstance.get(`/find_setting_by_id/${token}/`)
  },
  postSettings: ({
    token,
    data
  }: { token: string, data: SettingsData }) => {
    return axiosInstance.post('/user-settings/', {
      user_id: token,
      value: data
    })
  }
}
