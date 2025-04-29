import { EquipsAnalytic } from '~entities/equips-analytic'
import { AnalyticConfigEnum } from '~features/navbar'
import AnalyticEquip from '~shared/assets/icons/analytic-equip.svg'

export const analyticConfig: {
  [AnalyticConfigEnum.analytics_equipments]: { title: string; iconSrc: string; component: React.JSX.Element }
} = {
  [AnalyticConfigEnum.analytics_equipments]: {
    title: 'Аналитика техники',
    iconSrc: AnalyticEquip as unknown as string,
    component: <EquipsAnalytic />
  }
}
