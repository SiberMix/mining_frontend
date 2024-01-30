import './EquipsAnalytic.scss'

import { EquipsAnalyticDiagramsLayout } from '../../equips-analytic-diagrams-layout'
import { EquipsAnalyticMenu } from '../../equips-analytic-menu'

export const EquipsAnalytic = () => {
  return (
    <div className='equips-analytic-wrapper'>
      <EquipsAnalyticDiagramsLayout />
      <EquipsAnalyticMenu />
    </div>
  )
}
