import React from 'react'

import { CalendarSideOut } from '~entities/calendar'
import { EquipmentSideOut } from '~entities/equipment'
import { FieldListSideOut } from '~entities/field'
import { PlayBackSideOut } from '~entities/playback'
import { PolygonListSideOut } from '~entities/polygon'
import { RealtySideOut } from '~entities/realty'
import type { ConfigObjType } from '~features/navbar'
import { MonitoringConfigEnum } from '~features/navbar'
import Trava from '~shared/assets/icons/corn-seeds-svgrepo-com.svg'
import Field from '~shared/assets/icons/field.svg'
import Equip from '~shared/assets/icons/harvester2.svg'
import HouseIcon from '~shared/assets/icons/house.svg'
import Job from '~shared/assets/icons/job.svg'
import PlayBack from '~shared/assets/icons/playback.svg'

export const monitoringConfig: Record<MonitoringConfigEnum, ConfigObjType> = {
  [MonitoringConfigEnum.polygon_list]: {
    title: 'Список полей',
    iconSrc: Field,
    component: <PolygonListSideOut />
  },
  [MonitoringConfigEnum.tasks]: {
    title: 'Задания',
    iconSrc: Job,
    component: <CalendarSideOut />
  },
  [MonitoringConfigEnum.equipment_list]: {
    title: 'Оборудование',
    iconSrc: Equip,
    component: <EquipmentSideOut />
  },
  [MonitoringConfigEnum.realty]: {
    title: 'Недвижимость',
    iconSrc: HouseIcon,
    component: <RealtySideOut />
  },
  [MonitoringConfigEnum.play_back]: {
    title: 'Плэйбэк',
    iconSrc: PlayBack,
    component: <PlayBackSideOut />
  },
  [MonitoringConfigEnum.field_list]: {
    title: 'Культура',
    iconSrc: Trava,
    component: <FieldListSideOut />
  }
}
