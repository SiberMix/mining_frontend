import { axiosInstance } from '~shared/api/axios-instance'

export const fieldsService = {
  /*
  * Получаем Список Блоков
  */
  getFieldList: () => {
    return axiosInstance.get('/property_manager/zone/')
  },
  /*
  * Добавление нового материала
  * */
  addField: async (params: any) => {
    return axiosInstance.post('/property_manager/zone/', params)
  },
  /*
  * Редактирование материала
  * */
  editField: ({
    id,
    ...params
  }: any) => {
    return axiosInstance.put(`/property_manager/zone/${id}/`, params)
  },
  /*
  * удаление материала
  * */
  deleteField: (id: number) => {
    return axiosInstance.delete(`/property_manager/zone/${id}/`)
  }
}
