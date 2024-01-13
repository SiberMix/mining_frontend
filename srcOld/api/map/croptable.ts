import { axiosInstance } from '../abstract'

export const croptableService = {
  /*
  * Удаляем урожай по Id
  * */
  deleteCroptable: (id: string | number) => {
    return axiosInstance.delete(`/croptable/${id}/`)
  }
}
