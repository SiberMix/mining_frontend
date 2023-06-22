import { axiosInstance } from '../abstract'

export const mapGeneral = {
  getLocation: (token: string) => {
    return axiosInstance.get(`/get_location/${token}/`)
  }
}
