import { axiosInstance } from '~shared/api/axios-instance'

import type { Equip, EquipForPost, EquipForPut, EquipModal, EquipType } from '../../redux/slices/mapSlice'

export const equipsService = {
  getAllEquips: async (): Promise<Equip[]> => {
    const response = await axiosInstance.get('/equips/')
    return response.data
  },
  addNewEquip: (params: EquipForPost) => {
    return axiosInstance.post<Equip>('/equips/', params)
  },
  editEquip: async ({
    id,
    ...params
  }: EquipForPut) => {
    const response = await axiosInstance.put<Equip>(`/equips/${id}/`, params)
    return response.data
  },
  deleteEquip: (id: number) => {
    return axiosInstance.delete(`/equips/${id}/`)
  },
  getEquipTypes: () => {
    return axiosInstance.get<EquipType[]>('/equipstype/')
  },
  deleteEquipType: (id: number) => {
    return axiosInstance.delete(`/equipstype/${id}/`)
  },
  addNewEquipType: (newEquipType: any) => {
    return axiosInstance.post('/equipstype/', newEquipType)
  },
  editEquipType: async (id: number, newData: any) => {
    return axiosInstance.put(`/equipstype/${id}/`, newData)
  },
  getEquipsModelsList: () => {
    return axiosInstance.get('/equipsmodel/')
  },
  addNewEquipsModel: (params: {
    description: string,
    length: string,
    width: string
  }) => {
    return axiosInstance.post('/equipsmodel/', params)
  },
  deleteEquipsModel: (id: number) => {
    return axiosInstance.delete(`/equipsmodel/${id}/`)
  },
  editEquipsModel: ({
    id,
    ...newParams
  }: EquipModal) => {
    return axiosInstance.put(`/equipsmodel/${id}/`, newParams)
  }
}
