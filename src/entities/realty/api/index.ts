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

const realtyTypeBaseUrl = '/realtytype/'

export const realtyTypeService = {
  getRealtyList: () => {
    return axiosInstance.get(realtyTypeBaseUrl)
  },
  addRealtyType: (data: Omit<RealtyType, 'id'>) => {
    return axiosInstance.post(realtyTypeBaseUrl, data)
  },
  editRealtyType: ({ id, ...data }: RealtyType) => {
    return axiosInstance.patch(realtyTypeBaseUrl + id, data)
  },
  deleteRealtyType: (id: number) => {
    return axiosInstance.delete(realtyTypeBaseUrl + id)
  }
}
