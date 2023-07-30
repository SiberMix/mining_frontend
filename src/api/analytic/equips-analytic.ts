import { axiosInstanceWithoutV1 } from '../abstract'

const EquipsAnalytic = {
  getEquipsAnalytic: (data: any) => {
    return axiosInstanceWithoutV1.post('/tractors_avg_speed/', data)
  }
}

export default EquipsAnalytic
