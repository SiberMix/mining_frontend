import type {
  Equip,
  EquipModal,
  EquipType
} from '../../types/equip'
import { axiosInstance } from '../abstract'

export const equipsService = {
  /*
  * Получаем список оборудования с именем через API
  * */
  getEquips: () => {
    return axiosInstance.get<Equip[]>('/equips/')
  },
  /*
  * Добавление новой техники
  * */
  addNewEquip: (params: Omit<Equip, 'id'>) => {
    return axiosInstance.post<EquipModal>('/equips/', params)
  },
  /*
  * Редактирование техники
  * */
  editEquip: ({ id, ...params }: Equip) => {
    return axiosInstance.put<EquipModal>(`/equips/${id}/`, params)
  },
  /*
  * Удаление техники
  * */
  deleteEquip: (id: number) => {
    return axiosInstance.delete(`/equips/${id}/`)
  },
  /*
  * Получение всех типов техники
  * */
  getEquipTypes: () => {
    return axiosInstance.get<EquipType[]>('/equipstype/')
  },
  /*
  * Удаление типа техники
  * */
  deleteEquipType: (id: number) => {
    return axiosInstance.delete(`/equipstype/${id}/`)
  },
  /*
  * Добавление нового типа техники
  * */
  addNewEquipType: (newEquipType: any) => {
    return axiosInstance.post('/equipstype/', newEquipType)
  },
  /*
  * Удаление типа техники
  * */
  editEquipType: async (id: number, newData: any) => {

    return axiosInstance.put(`/equipstype/${id}/`, newData)
  },
  /*
  * Получает полный список моделей техники
  * */
  getEquipsModelsList: () => {
    return axiosInstance.get('/equipsmodel/')
  },
  /*
  * Добавление новой модели техники
  * todo узнать, что за модель техники
  * */
  addNewEquipsModel: (params: {
    description: string,
    length: string,
    width: string
  }) => {
    return axiosInstance.post('/equipsmodel/', params)
  },
  /*
  * Удаление модели техники
  * */
  deleteEquipsModel: (id: number) => {
    return axiosInstance.delete(`/equipsmodel/${id}/`)
  },
  /*
  * Редактирование модели техники
  * todo узнать, что за модель техники
  * */
  editEquipsModel: ({ id, ...newParams }: EquipModal) => {
    return axiosInstance.put(`/equipsmodel/${id}/`, newParams)
  }
}
