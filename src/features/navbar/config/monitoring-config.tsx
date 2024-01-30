import React from 'react'

import { EquipmentSideOut } from '~entities/equipment'
import { FieldListSideOut } from '~entities/field'
import { PlayBackSideOut } from '~entities/playback'
import { PolygonListSideOut } from '~entities/polygon'
import Trava from '~shared/assets/icons/corn-seeds-svgrepo-com.svg'
import Field from '~shared/assets/icons/field.svg'
import Equip from '~shared/assets/icons/harvester2.svg'
import Job from '~shared/assets/icons/job.svg'
import PlayBack from '~shared/assets/icons/playback.svg'

import type { ConfigObjType } from '../type/config-obj-type'

export enum MonitoringConfigEnum {
  polygon_list = 'polygon_list',
  tasks = 'tasks',
  equipment_list = 'equipment_list',
  play_back = 'play_back',
  field_list = 'field_list'
}

export const monitoringConfig: Record<MonitoringConfigEnum, ConfigObjType> = {
  [MonitoringConfigEnum.polygon_list]: {
    title: 'Список полей',
    iconSrc: Field,
    component: <PolygonListSideOut />
  },
  [MonitoringConfigEnum.tasks]: {
    title: 'Задания',
    iconSrc: Job,
    component: null
  },
  [MonitoringConfigEnum.equipment_list]: {
    title: 'Оборудование',
    iconSrc: Equip,
    component: <EquipmentSideOut />
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

/*
* export const monitoringConfig: Array<MonitoringConfigObj> = [
  {
    id: 'PolygonList',
    title: 'Список полей',
    iconSrc: Field,
    component: <PolygonListSideOut />
  },
  {
    id: 'Tasks',
    title: 'Задания',
    iconSrc: Job,
    component: <EquipmentSideOut />
  },
  {
    id: 'EquipmentList',
    title: 'Оборудование',
    iconSrc: Equip,
    component: <FieldListSideOut />
  },
  {
    id: 'PlayBack',
    title: 'Плэйбэк',
    iconSrc: PlayBack,
    component: <PlayBackSideOut />
  },
  {
    id: 'FieldList',
    title: 'Культура',
    iconSrc: Trava,
    component: null
  }
]
* */
