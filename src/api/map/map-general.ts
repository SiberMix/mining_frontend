import { axiosInstance } from '../abstract'

export const mapGeneral = {
  getLocation: () => {
    return axiosInstance.get('/get_location/866854055062445/')
  }
}
