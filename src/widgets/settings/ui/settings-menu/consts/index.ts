import type { MenuProps } from 'antd'

export type SettingsMenuItem = Required<MenuProps>['items'][number];

export enum SettingsMenuKeys {
  main ='main',
  map ='map',
  equipment = 'equipment',
  user = 'user'
}

export const settingsMenuItems: SettingsMenuItem[] = [
  { label: 'Общее', key: 'main' },
  { label: 'Карты', key: 'map' },
  { label: 'Техника', key: 'equipment' },
  { label: 'Пользователь', key: 'user' }
]
