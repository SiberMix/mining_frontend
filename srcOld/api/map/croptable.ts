import { axiosInstance } from '~shared/api/axios-instance'

export const croptableService = {
  /*
  * Удаляем урожай по Id
  * */
  deleteCroptable: (id: string | number) => {
    return axiosInstance.delete(`/croptable/${id}/`)
  }
}
