import { MonitoringConfigEnum } from '~features/navbar/consts' // if remove "/consts" it crashes

export const startSidebarOptions: Array<{ value: MonitoringConfigEnum | null, label: string }> = [
  {
    value: null,
    label: 'Не выбрано'
  },
  {
    value: MonitoringConfigEnum.polygon_list,
    label: 'Список полигонов'
  },
  {
    value: MonitoringConfigEnum.tasks,
    label: 'Задачи'
  },
  {
    value: MonitoringConfigEnum.equipment_list,
    label: 'Техника'
  },
  {
    value: MonitoringConfigEnum.play_back,
    label: 'Плэйбэки'
  },
  {
    value: MonitoringConfigEnum.field_list,
    label: 'Культуры'
  }
]
