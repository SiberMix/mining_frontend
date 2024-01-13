import EquipsAnalytic from './equips-analytic'
import { CropRotation } from './crop-rotation'

export const analyticService = {
  ...EquipsAnalytic,
  ...CropRotation
}
