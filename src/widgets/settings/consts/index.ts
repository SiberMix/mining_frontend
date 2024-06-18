import { MonitoringConfigEnum } from '~features/navbar/consts'
import { MapLayersEnum } from '~widgets/map'
import type { Settings } from '~widgets/settings/types'

export const initialSettings: Settings = {
  monitoringStartMenuSection: MonitoringConfigEnum.field_list,
  baseMapType: MapLayersEnum.GOOGLE_MAP,
  baseZoomLevel: 13,
  baseCord: [55.030204, 82.920430],
  equipmentOptions: [
    { title: 'Название', value: true },
    { title: 'IMEI', value: true },
    { title: 'Гос.номер', value: true },
    { title: 'Скорость', value: true },
    { title: 'Уровень топлива', value: true },
    { title: 'Последняя активность', value: true }
  ]
}

export const SETTINGS_OPTIONS_STORE_KEY = 'SETTINGS_OPTIONS_STORE_KEY'
