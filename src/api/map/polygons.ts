import { axiosInstance } from '../abstract'
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
  updatePolygonById: ({ polygonId, name, coords, activeStatus }: EditPolygonData) => {
    return axiosInstance.put(`/polygons/${polygonId}/`, {
      coords,
      name,
      activeStatus
    })
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
