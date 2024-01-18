import { axiosInstance } from '~shared/api/axios-instance'

export const fieldsService = {
  /*
  * Получаем Список полей
  */
  getFieldList: () => {
    return axiosInstance.get('/fieldtype/')
  },
  /*
  * Добавление нового поля
  * */
  addField: async (params: any) => {
    return axiosInstance.post('/fieldtype/', params)
  },
  /*
  * Редактирование поля
  * */
  editField: ({
    id,
    ...params
  }: any) => {
    return axiosInstance.put(`/fieldtype/${id}/`, params)
  },
  /*
  * удаление поля
  * */
  deleteField: (id: number) => {
    return axiosInstance.delete(`/fieldtype/${id}/`)
  }
}
