import type React from 'react'
import { SettingsMenuItem } from '../ui/SettingsMenu'


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
