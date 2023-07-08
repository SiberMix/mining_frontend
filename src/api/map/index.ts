import { fieldsService } from './fields'
import { polygonsService } from './polygons'
import { equipsService } from './equips'
import { trailerService } from './trailer'
import { croptableService } from './croptable'

export const mapService = {
  ...fieldsService,
  ...polygonsService,
  ...equipsService,
  ...trailerService,
  ...croptableService
}
