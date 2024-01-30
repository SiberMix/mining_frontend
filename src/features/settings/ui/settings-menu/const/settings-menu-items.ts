import type { SettingsMenuItem } from '~widgets/settings/ui/settings-menu/ui/SettingsMenu'

import { getSettingsMenuItem } from '../helpers/get-settings-menu-item'

export const settingsMenuItems: SettingsMenuItem[] = [
  getSettingsMenuItem('Общее', '1'),
  getSettingsMenuItem('Карты', '2'),
  getSettingsMenuItem('Техника', '3'),
  getSettingsMenuItem('Пользователь', '4')
]
