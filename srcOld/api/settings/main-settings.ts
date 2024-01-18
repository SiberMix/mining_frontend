import { axiosInstance } from '~shared/api/axios-instance'

import type { SettingsData } from '../../redux/slices/settingsSlice'

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
