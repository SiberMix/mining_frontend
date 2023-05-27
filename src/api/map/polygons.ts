import { axiosInstance } from '../abstract'

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
  updatePolygonById: (polygonId: string | number, polygon: any, coords: number) => {
    return axiosInstance.put(`/polygons/${polygonId}/`, {
      ...polygon,
      coords: coords
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
