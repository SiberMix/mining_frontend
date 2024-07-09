import type { MenuProps } from 'antd'

export type SettingsMenuItem = Required<MenuProps>['items'][number];

export enum SettingsMenuKeys {
  main ='main',
  map ='map',
  equipment = 'equipment',
  notification = 'notification',
  user = 'user'
}

export const settingsMenuItems: Array<{label: string, key: SettingsMenuKeys}> = [
  { label: 'Общее', key: SettingsMenuKeys.main },
  { label: 'Карты', key: SettingsMenuKeys.map },
  { label: 'Техника', key: SettingsMenuKeys.equipment },
  { label: 'Уведомления', key: SettingsMenuKeys.notification },
  { label: 'Пользователь', key: SettingsMenuKeys.user }
]
