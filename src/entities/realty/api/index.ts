import type { RealtyType } from '~entities/realty/types'
import { axiosInstance } from '~shared/api/axios-instance'

const realtyBaseUrl = '/realty/'

export const realtyService = {
  getRealtyList: () => {
    return axiosInstance.get(realtyBaseUrl)
  },
  addRealty: (data: Omit<RealtyType, 'id'>) => {
    return axiosInstance.post(realtyBaseUrl, data)
  },
  editRealty: ({ id, ...data }: RealtyType) => {
    return axiosInstance.patch(realtyBaseUrl + id, data)
  },
  deleteRealty: (id: number) => {
    return axiosInstance.delete(realtyBaseUrl + id)
  }
}
