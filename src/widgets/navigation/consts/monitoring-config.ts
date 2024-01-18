import Trava from '~shared/assets/icons/corn-seeds-svgrepo-com.svg'
import Field from '~shared/assets/icons/field.svg'
import Equip from '~shared/assets/icons/harvester2.svg'
import Job from '~shared/assets/icons/job.svg'
import PlayBack from '~shared/assets/icons/playback.svg'
import type { SidebarOpenWindow } from '~widgets/navigation/ui/container/SidebarContainer'

type MonitoringConfigObj = {
  id: SidebarOpenWindow,
  title: string,
  src: string
}

export const monitoringConfig: Array<MonitoringConfigObj> = [
  {
    id: 'PolygonList',
    title: 'Список полей',
    src: Field
  },
  {
    id: 'Tasks',
    title: 'Задания',
    src: Job
  },
  {
    id: 'EquipmentList',
    title: 'Оборудование',
    src: Equip
  },
  {
    id: 'PlayBack',
    title: 'Плэйбэк',
    src: PlayBack
  },
  {
    id: 'FieldList',
    title: 'Культура',
    src: Trava
  }
]
