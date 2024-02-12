import './EquipsAnalyticDiagrams.scss'

import React, { memo } from 'react'

import { EquipsAnalyticDiagram } from '~entities/diagrams'
import { CustomEmpty } from '~shared/ui/custom-empty'

import { useEquipAnalyticStore } from '../../../model'
import { createColorsForCharts, createDataForChart, createTextCategories } from '../lib'

export const EquipsAnalyticDiagrams = memo(() => {
  const isLoading = useEquipAnalyticStore(state => state.isLoading)
  const scheduleType = useEquipAnalyticStore(state => state.scheduleType)
  const chartType = useEquipAnalyticStore(state => state.chartType)
  const allEquipList = useEquipAnalyticStore(state => state.allEquipList)
  const chartData = useEquipAnalyticStore(state => state.chartData)
  const pikedEquip = useEquipAnalyticStore(state => state.pikedEquip)

  const [speedCategories, speedSeries] = createDataForChart({
    allEquipList,
    chartData,
    chartKey: chartType === 'AVG' ? 'avg_speed' : 'median_speed'
  })

  const [fuelCategories, fuelSeries] = createDataForChart({
    allEquipList,
    chartData,
    chartKey: chartType === 'AVG' ? 'avg_fuel' : 'median_fuel'
  })

  if (!isLoading && chartData === null || !speedSeries || speedSeries.length === 0) {
    return (<div className='fieldsAnalyticDiagrams fieldsAnalyticDiagrams_centered'>
      <CustomEmpty />
      <p>
        Выберете другой временной промежуток
      </p>
    </div>)
  }

  return (
    <div className='fieldsAnalyticDiagrams'>
      {
        scheduleType === 'Скорость'
          ? (
            <EquipsAnalyticDiagram
              title='График скорости'
              series={speedSeries}
              categories={createTextCategories(speedCategories)}
              colors={createColorsForCharts(speedSeries, pikedEquip)}
            />
          )
          : (
            <EquipsAnalyticDiagram
              title='График уровня топлива'
              series={fuelSeries}
              categories={createTextCategories(fuelCategories)}
              colors={createColorsForCharts(fuelSeries, pikedEquip)}
            />
          )
      }
    </div>
  )
})
