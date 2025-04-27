import type { ReactElement } from 'react'

import { MonitoringConfigEnum } from '~features/navbar/consts'
import { MapLayersEnum } from '~widgets/map'
import { NotificationEventNames } from '~widgets/notifications'
import type { Settings } from '~widgets/settings/types'
import { SettingsMenuKeys } from '~widgets/settings/ui/settings-menu'

import {
  SettingsAi,
  SettingsEquipment,
  SettingsGeneral,
  SettingsMap,
  SettingsNotification,
  SettingsUser
} from '../ui/settings-content-modules';

export const initialSettings: Settings = {
  monitoringStartMenuSection: MonitoringConfigEnum.field_list,
  baseMapType: MapLayersEnum.GOOGLE_MAP,
  baseZoomLevel: 13,
  baseCord: [55.791987166800126, 37.760676348484395],
  equipmentOptions: [
    { title: 'Название', value: true },
    { title: 'IMEI', value: true },
    { title: 'Гос.номер', value: true },
    { title: 'Скорость', value: true },
    { title: 'Уровень топлива', value: true },
    { title: 'Последняя активность', value: true }
  ],
  notificationOptions: [
    { id: NotificationEventNames.LOW_FUEL, title: 'Низкий уровень топлива', value: true },
    { id: NotificationEventNames.SPEED_UP, title: 'Превышение скорости', value: true },
    { id: NotificationEventNames.WORK_START, title: 'Начало работ', value: true },
    { id: NotificationEventNames.NOT_ACTIVE, title: 'Длительное время не активен', value: true }
  ]
}

export const SETTINGS_OPTIONS_STORE_KEY = 'SETTINGS_OPTIONS_STORE_KEY'

export const settingsMenuContentConfig: Record<SettingsMenuKeys, ReactElement> = {
  [SettingsMenuKeys.main]: <SettingsGeneral />,
  [SettingsMenuKeys.map]: <SettingsMap />,
  [SettingsMenuKeys.equipment]: <SettingsEquipment />,
  [SettingsMenuKeys.notification]: <SettingsNotification />,
  [SettingsMenuKeys.user]: <SettingsUser />,
  [SettingsMenuKeys.ai]: <SettingsAi />,
  [SettingsMenuKeys.event]: <SettingsUser />
}
