import type { EditPolygonData } from '~processes/redux/slices/mapSlice'
import { axiosInstance } from '~shared/api/axios-instance'

export const polygonsService = {
  /*
  * Получаем блокы
  * */
  getPolygons: () => {
    return axiosInstance.get('/polygons/')
  },
  /*
  * Получение блока по айди
  * */
  getPolygonById: (id: string | number) => {
    return axiosInstance.get(`/polygons/${id}/`)
  },
  /*
  * Редактируем данные о блоке по айди
  * */
  updatePolygonById: ({
    polygonId,
    newOption
  }: EditPolygonData) => {
    return axiosInstance.put(`/polygons/${polygonId}/`, newOption)
  },
  /*
  * добавление нового блока
  * */
  addNewPolygon: (updatedPolygonData: any) => {
    return axiosInstance.post('/polygons/', updatedPolygonData)
  },
  /*
  * Удаление блока по Id
  * */
  removePolygonById: (id: string | number) => {
    return axiosInstance.delete(`/polygons/${id}/`)
  }
}
