import type { Equip, EquipForPost, EquipForPut, EquipModal, EquipType } from '~processes/redux/slices/mapSlice'
import { axiosInstance } from '~shared/api/axios-instance'

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
    return axiosInstance.get<EquipType[]>('/equips/type/')
  },
  deleteEquipType: (id: number) => {
    return axiosInstance.delete(`/equips/type/${id}/`)
  },
  addNewEquipType: (newEquipType: any) => {
    return axiosInstance.post('/equips/type/', newEquipType)
  },
  editEquipType: async (id: number, newData: any) => {
    return axiosInstance.put(`/equips/type/${id}/`, newData)
  },
  getEquipsModelsList: () => {
    return axiosInstance.get('/equips/model/')
  },
  addNewEquipsModel: (params: {
    description: string,
    length: string,
    width: string
  }) => {
    return axiosInstance.post('/equips/model/', params)
  },
  deleteEquipsModel: (id: number) => {
    return axiosInstance.delete(`/equips/model/${id}/`)
  },
  editEquipsModel: ({
    id,
    ...newParams
  }: EquipModal) => {
    return axiosInstance.put(`/equips/model/${id}/`, newParams)
  }
}
