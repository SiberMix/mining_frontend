import { getSettingsMenuItem } from '../helpers/get-settings-menu-item'
import type { SettingsMenuItem } from '../ui/SettingsMenu'

export const settingsMenuItems: SettingsMenuItem[] = [
  getSettingsMenuItem('Общее', '1'),
  getSettingsMenuItem('Карты', '2'),
  getSettingsMenuItem('Техника', '3'),
  getSettingsMenuItem('Пользователь', '4')
]
