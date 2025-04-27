import { axiosInstance } from '~shared/api/axios-instance'

export const fieldsService = {
  /*
  * Получаем Список Блоков
  */
  getFieldList: () => {
    return axiosInstance.get('/fieldtype/')
  },
  /*
  * Добавление нового материала
  * */
  addField: async (params: any) => {
    return axiosInstance.post('/fieldtype/', params)
  },
  /*
  * Редактирование материала
  * */
  editField: ({
    id,
    ...params
  }: any) => {
    return axiosInstance.put(`/fieldtype/${id}/`, params)
  },
  /*
  * удаление материала
  * */
  deleteField: (id: number) => {
    return axiosInstance.delete(`/fieldtype/${id}/`)
  }
}
