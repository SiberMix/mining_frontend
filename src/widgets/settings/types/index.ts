import type { MonitoringConfigEnum } from '~features/navbar'
import type { MapLayersEnum } from '~widgets/map'
import type { NotificationEventNames } from '~widgets/notifications'

export type SettingsStore = {
  isSettingsOpen: boolean,
  setIsSettingsOpen: (isOpen: boolean) => void,
  isClickMapForNewBaseCord: boolean,
  setIsClickMapForNewBaseCord: (isOpen: boolean) => void,
  settings: Settings,
  newBaseCord: [number, number],
  setSettings: (settings: Settings) => void,
  resetSettings: () => void,
  setNewBaseCord: (cord: [number, number]) => void
}

export type Settings = {
  monitoringStartMenuSection: MonitoringConfigEnum | null,
  baseMapType: MapLayersEnum,
  baseZoomLevel: number,
  baseCord: [number, number],
  equipmentOptions: [
    {title: 'Название', value: boolean},
    {title: 'IMEI', value: boolean},
    {title: 'Гос.номер', value: boolean},
    {title: 'Скорость', value: boolean},
    {title: 'Уровень топлива', value: boolean},
    {title: 'Последняя активность', value: boolean}
  ],
  notificationOptions: [
    {id: NotificationEventNames.LOW_FUEL, title: 'Низкий уровень топлива', value: boolean},
    {id: NotificationEventNames.SPEED_UP, title: 'Превышение скорости', value: boolean},
    {id: NotificationEventNames.WORK_START, title: 'Начало работ', value: boolean},
    {id: NotificationEventNames.NOT_ACTIVE, title: 'Длительное время не активен', value: boolean}
  ]
}
