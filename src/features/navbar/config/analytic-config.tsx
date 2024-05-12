import React from 'react'

import { CropRotation } from '~entities/crop-rotation'
import { EquipsAnalytic } from '~entities/equips-analytic'
import type { ConfigObjType } from '~features/navbar'
import AnalyticEquip from '~shared/assets/icons/analytic-equip.svg'
import Calendar from '~shared/assets/sevo/sevooborot.svg'

export enum AnalyticConfigEnum {
  analytics_equipments = 'analytics_equipments',
  analytics_crop_rotation = 'analytics_crop_rotation'
}

export const analyticConfig: Record<AnalyticConfigEnum, ConfigObjType> = {
  [AnalyticConfigEnum.analytics_equipments]: {
    title: 'Аналитика техники',
    iconSrc: AnalyticEquip,
    component: <EquipsAnalytic />
  },
  [AnalyticConfigEnum.analytics_crop_rotation]: {
    title: 'Севооборот',
    iconSrc: Calendar,
    component: <CropRotation />
  }
}
