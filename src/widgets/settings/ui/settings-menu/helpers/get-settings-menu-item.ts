import type React from 'react'

import type { SettingsMenuItem } from '~widgets/settings/ui/settings-menu/ui/SettingsMenu'

export function getSettingsMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: SettingsMenuItem[],
  type?: 'group'
): SettingsMenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as SettingsMenuItem
}
