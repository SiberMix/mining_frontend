import "./EquipsAnalytic.scss"

import EquipsAnalyticDiagrams from "./EquipsAnalyticDiagrams/EquipsAnalyticDiagrams"
import EquipsAnalyticMenu from "./EquipsAnalyticMenu/EquipsAnalyticMenu"

const EquipsAnalytic = () => {
  return (
    <div className="equips-analytic-wrapper">
      <EquipsAnalyticDiagrams />
      <EquipsAnalyticMenu />
    </div>
  )
}

export default EquipsAnalytic
