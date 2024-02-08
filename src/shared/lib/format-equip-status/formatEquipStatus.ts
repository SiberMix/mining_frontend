import type { EquipStatus } from '../../../srcOld/redux/slices/mapSlice'

export function formatEquipStatus(status: EquipStatus) {
  switch (status) {
    case 'Active':
      return 'Активно'
    case 'Idle':
      return 'Бездействующий'
    case 'Offline':
      return 'Недоступно'
  }
}
