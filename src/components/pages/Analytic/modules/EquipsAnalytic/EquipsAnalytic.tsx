import './EquipsAnalytic.scss'
import EquipsAnalyticMenu from './EquipsAnalyticMenu/EquipsAnalyticMenu'
import EquipsAnalyticDiagrams from './EquipsAnalyticDiagrams/EquipsAnalyticDiagrams'

const EquipsAnalytic = () => {
  return (
    <div className='equips-analytic-wrapper'>
      <EquipsAnalyticDiagrams />
      <EquipsAnalyticMenu />
    </div>
  )
}

export default EquipsAnalytic
