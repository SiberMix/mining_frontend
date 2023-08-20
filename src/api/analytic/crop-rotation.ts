import { axiosInstance } from '../abstract'
import { EditCropRotationGroupCulture, PostCropRotationGroup } from '../../redux/slices/cropRotationSlice'

export const CropRotation = {
  getCropRotationGroups: async () => {
    const response = await axiosInstance.get('/sevo/get_crop_rotation/')
    return response.data
  },
  postCropRotationGroup: async (postData: PostCropRotationGroup) => {
    const response = await axiosInstance.post('/sevo/add_sevo_group/', postData)
    return response.data
  },
  editCropRotationGroupCulture: ({
    groupId,
    year,
    polygonId,
    cultureId
  }: EditCropRotationGroupCulture) => axiosInstance.put(`/sevo/update_crop_culture/${groupId}/${year}/${polygonId}/`, { id_culture: cultureId }),
  deleteCropRotationGroup: (groupId: number) => axiosInstance.delete(`/sevo/delete_sevo_group/${groupId}/`),
  setMainCropRotationGroup: (groupId: number) => axiosInstance.post(`sevo/set_main_page/${groupId}/`)
}
