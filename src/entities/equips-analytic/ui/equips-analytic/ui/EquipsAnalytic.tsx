import './EquipsAnalytic.scss'

import { EquipsAnalyticDiagrams } from '../../equips-analytic-diagrams'
import { EquipsAnalyticMenu } from '../../equips-analytic-menu'
import { EquipsAnalyticReport } from '../../equips-analytic-report'

export const EquipsAnalytic = () => {
  return (
    <div className='EquipsAnalytic'>
      <div className='EquipsAnalytic_menu'>
        <EquipsAnalyticMenu />
      </div>
      <div className='EquipsAnalytic_report'>
        <EquipsAnalyticReport />
      </div>
      <div className='EquipsAnalytic_charts'>
        <EquipsAnalyticDiagrams />
      </div>
    </div>
  )
}
