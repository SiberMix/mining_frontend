import "./EquipsAnalyticDiagrams.scss"

import React from "react"
import { useSelector } from "react-redux"

import {
  getChartTypeSelector,
  getEquipsDataForChartsSelector,
  getEquipsUsingInDiagramsSelector,
  getIsLoadingSelector,
  getScheduleTypeSelector
} from "../../../../../../redux/selectors/equipsAnalyticSlectors"
import { getAllEquipmentSelector } from "../../../../../../redux/selectors/mapSelectors"
import type {
  OneEquipDataForChartsData,
  PickedEquip
} from "../../../../../../redux/slices/EquipsAnalyticSlice"
import BasePreloader from "../../../../../common/BasePreloader/BasePreloader"
import {
  createFuelCategoriesAndFuelSeries,
  createSpeedCategoriesAndSpeedSeries,
  createTextCategories
} from "./additionalFunctions/createDataForEquipAnalyticCharts"
import EquipsAnalyticDiagram from "./EquipsAnalyticDiagram/EquipsAnalyticDiagram"

const EquipsAnalyticDiagrams = () => {
  const isLoading = useSelector(getIsLoadingSelector)
  const allEquips = useSelector(getAllEquipmentSelector)
  const equipsDataForCharts = useSelector(getEquipsDataForChartsSelector)
  const scheduleType = useSelector(getScheduleTypeSelector)
  const chartType = useSelector(getChartTypeSelector)
  const equipsUsingInDiagrams: PickedEquip[] = useSelector(getEquipsUsingInDiagramsSelector)

  const {
    speedSeries,
    speedCategories
  } = createSpeedCategoriesAndSpeedSeries({
    chartType,
    allEquips,
    equipsDataForCharts
  })

  const {
    fuelSeries,
    fuelCategories
  } = createFuelCategoriesAndFuelSeries({
    chartType,
    allEquips,
    equipsDataForCharts
  })

  const createColors = () => { //todo нужно привязать к измененным данным, а не к серверным
    if (equipsDataForCharts) {
      return equipsDataForCharts.data
        .map((equip: OneEquipDataForChartsData) => {
          const findUsingEquip = equipsUsingInDiagrams.find(usingEquip => usingEquip.equipsId === equip.id)
          if (findUsingEquip !== undefined) {
            return findUsingEquip.equipColor
          }
          return "red"

        })
    }
    return []
  }

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
                series={speedSeries || []}
                categories={createTextCategories(speedCategories)}
                colors={createColors()}
              />
            )
            : (
              <EquipsAnalyticDiagram
                title="График уровня топлива"
                series={fuelSeries || []}
                categories={createTextCategories(fuelCategories)}
                colors={createColors()}
              />
            )
      }
    </div>
  )
}

export default EquipsAnalyticDiagrams
