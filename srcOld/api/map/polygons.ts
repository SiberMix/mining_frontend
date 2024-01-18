import { axiosInstance } from '~shared/api/axios-instance'

import type { EditPolygonData } from '../../redux/slices/mapSlice'

export const polygonsService = {
  /*
  * Получаем полигоны
  * */
  getPolygons: () => {
    return axiosInstance.get('/polygons/')
  },
  /*
  * Получение полигона по айди
  * */
  getPolygonById: (id: string | number) => {
    return axiosInstance.get(`/polygons/${id}/`)
  },
  /*
  * Редактируем данные о полигоне по айди
  * */
  updatePolygonById: ({
    polygonId,
    newOption
  }: EditPolygonData) => {
    return axiosInstance.put(`/polygons/${polygonId}/`, newOption)
  },
  /*
  * добавление нового полигона
  * */
  addNewPolygon: (updatedPolygonData: any) => {
    return axiosInstance.post('/polygons/', updatedPolygonData)
  },
  /*
  * Удаление полигона по Id
  * */
  removePolygonById: (id: string | number) => {
    return axiosInstance.delete(`/polygons/${id}/`)
  }
}
