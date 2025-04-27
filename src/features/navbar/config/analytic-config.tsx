import React from 'react'

import { EquipsAnalytic } from '~entities/equips-analytic'
import type { ConfigObjType } from '~features/navbar'
import { AnalyticConfigEnum } from '~features/navbar'
import AnalyticEquip from '~shared/assets/icons/analytic-equip.svg'

export const analyticConfig: {
  [AnalyticConfigEnum.analytics_equipments]: { title: string; iconSrc: NonNullable<unknown>; component: React.JSX.Element }
} = {
  [AnalyticConfigEnum.analytics_equipments]: {
    title: 'Аналитика техники',
    iconSrc: AnalyticEquip,
    component: <EquipsAnalytic />
  }
}
