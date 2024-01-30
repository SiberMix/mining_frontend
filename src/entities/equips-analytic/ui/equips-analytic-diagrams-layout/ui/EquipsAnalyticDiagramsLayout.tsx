import './EquipsAnalyticDiagramsLayout.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { EquipsAnalyticDiagram } from '~entities/diagrams/ui/equips-analytic-diagram'
import { BasePreloader } from '~shared/ui/base-preloader'

import {
  getChartTypeSelector,
  getEquipColorsUsingInDiagramsSelector,
  getEquipsDataForChartsSelector,
  getIsLoadingSelector,
  getScheduleTypeSelector
} from '../../../../../../srcOld/redux/selectors/equipsAnalyticSlectors'
import { getAllEquipmentSelector } from '../../../../../../srcOld/redux/selectors/mapSelectors'
import type { PickedEquip } from '../../../../../../srcOld/redux/slices/EquipsAnalyticSlice'
import { createColorsForCharts, createDataForChart, createTextCategories } from '../lib/create-data-for-equip-analytic-charts'

export const EquipsAnalyticDiagramsLayout = memo(() => {
  const isLoading = useSelector(getIsLoadingSelector)
  const allEquips = useSelector(getAllEquipmentSelector)
  const equipsDataForCharts = useSelector(getEquipsDataForChartsSelector)
  const scheduleType = useSelector(getScheduleTypeSelector)
  const chartType = useSelector(getChartTypeSelector)
  const equipColorsUsingInDiagrams: PickedEquip[] = useSelector(getEquipColorsUsingInDiagramsSelector)

  const [speedCategories, speedSeries] = createDataForChart({
    allEquips,
    equipsDataForCharts,
    chartKey: chartType === 'AVG' ? 'avg_speed' : 'median_speed'
  })

  const [fuelCategories, fuelSeries] = createDataForChart({
    allEquips,
    equipsDataForCharts,
    chartKey: chartType === 'AVG' ? 'avg_fuel' : 'median_fuel'
  })

  return (
    <div className='fieldsAnalyticDiagrams'>
      {
        isLoading
          ? (
            <BasePreloader position='relative' />
          )
          : scheduleType === 'Скорость'
            ? (
              <EquipsAnalyticDiagram
                title='График скорости'
                series={speedSeries}
                categories={createTextCategories(speedCategories)}
                colors={createColorsForCharts(speedSeries, equipColorsUsingInDiagrams)}
              />
            )
            : (
              <EquipsAnalyticDiagram
                title='График уровня топлива'
                series={fuelSeries}
                categories={createTextCategories(fuelCategories)}
                colors={createColorsForCharts(fuelSeries, equipColorsUsingInDiagrams)}
              />
            )
      }
    </div>
  )
})
