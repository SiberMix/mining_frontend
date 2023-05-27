import { fieldsService } from './fields'
import { polygonsService } from './polygons'
import { equipsService } from './equips'
import { mapGeneral } from './map-general'
import { trailerService } from './trailer'
import { croptableService } from './croptable'

export const mapService = {
  ...mapGeneral,
  ...fieldsService,
  ...polygonsService,
  ...equipsService,
  ...trailerService,
  ...croptableService
}
