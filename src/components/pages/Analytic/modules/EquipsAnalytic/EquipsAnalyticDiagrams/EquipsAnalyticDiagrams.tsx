import "./EquipsAnalyticDiagrams.scss"

import React from "react"
import { useSelector } from "react-redux"

import {
  getChartTypeSelector,
  getEquipColorsUsingInDiagramsSelector,
  getEquipsDataForChartsSelector,
  getIsLoadingSelector,
  getScheduleTypeSelector
} from "../../../../../../redux/selectors/equipsAnalyticSlectors"
import { getAllEquipmentSelector } from "../../../../../../redux/selectors/mapSelectors"
import type { PickedEquip } from "../../../../../../redux/slices/EquipsAnalyticSlice"
import BasePreloader from "../../../../../common/BasePreloader/BasePreloader"
import {
  createColorsForCharts,
  createTextCategories,
  getDataForChart
} from "./additionalFunctions/createDataForEquipAnalyticCharts"
import EquipsAnalyticDiagram from "./EquipsAnalyticDiagram/EquipsAnalyticDiagram"

const EquipsAnalyticDiagrams = () => {
  const isLoading = useSelector(getIsLoadingSelector)
  const allEquips = useSelector(getAllEquipmentSelector)
  const equipsDataForCharts = useSelector(getEquipsDataForChartsSelector)
  const scheduleType = useSelector(getScheduleTypeSelector)
  const chartType = useSelector(getChartTypeSelector)
  const equipColorsUsingInDiagrams: PickedEquip[] = useSelector(getEquipColorsUsingInDiagramsSelector)

  const [speedCategories, speedSeries] = getDataForChart({
    allEquips,
    equipsDataForCharts,
    chartKey: chartType === "AVG" ? "avg_speed" : "median_speed"
  })

  const [fuelCategories, fuelSeries] = getDataForChart({
    allEquips,
    equipsDataForCharts,
    chartKey: chartType === "AVG" ? "avg_fuel" : "median_fuel"
  })

  console.log("speedSeries", speedSeries)

  return (
    <div className="fieldsAnalyticDiagrams">
      {
        isLoading
          ? (
            <BasePreloader position="relative" />
          )
          : scheduleType === "Скорость"
            ? (
              <EquipsAnalyticDiagram
                title="График скорости"
                series={speedSeries}
                categories={createTextCategories(speedCategories)}
                colors={createColorsForCharts(speedSeries, equipColorsUsingInDiagrams)}
              />
            )
            : (
              <EquipsAnalyticDiagram
                title="График уровня топлива"
                series={fuelSeries}
                categories={createTextCategories(fuelCategories)}
                colors={createColorsForCharts(fuelSeries, equipColorsUsingInDiagrams)}
              />
            )
      }
    </div>
  )
}

export default EquipsAnalyticDiagrams
