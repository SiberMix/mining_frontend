import React from 'react'

import { CropRotation } from '~entities/crop-rotation'
import { EquipsAnalytic } from '~entities/equips-analytic'
import type { ConfigObjType } from '~features/navbar'
import { AnalyticConfigEnum } from '~features/navbar'
import AnalyticEquip from '~shared/assets/icons/analytic-equip.svg'
import Calendar from '~shared/assets/sevo/sevooborot.svg'

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
