import { equipsService } from './equips'
import { fieldsService } from './fields'
import { playbackService } from './playback'
import { polygonsService } from './polygons'
import { trailerService } from './trailer'

export const mapService = {
  ...fieldsService,
  ...polygonsService,
  ...equipsService,
  ...trailerService,
  ...playbackService
}
