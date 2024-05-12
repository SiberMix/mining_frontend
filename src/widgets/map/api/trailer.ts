import type { EquipTrailer } from '~processes/redux/slices/mapSlice'
import { axiosInstance } from '~shared/api/axios-instance'

export const trailerService = {
  /*
  * Получение списка видов растений
  * */
  getTrailerList: () => {
    return axiosInstance.get('/trailer/')
  },
  /*
  * Добавление видов растений
  * */
  addTrailer: (params: any) => {
    return axiosInstance.post('/trailer/', params)
  },
  /*
  * Редактирование одного типа растений
  * */
  editTrailer: ({
    id,
    ...params
  }: EquipTrailer) => {
    return axiosInstance.put(`/trailer/${id}/`, params)
  },
  /*
  * Получение одного типа растений
  * */
  deleteTrailer: (id: number) => {
    return axiosInstance.delete(`/trailer/${id}/`)
  }
}
