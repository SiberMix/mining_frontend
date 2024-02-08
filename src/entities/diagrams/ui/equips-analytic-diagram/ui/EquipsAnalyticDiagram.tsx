import type { ApexOptions } from 'apexcharts'
import React, { memo, useMemo } from 'react'
import ApexChart from 'react-apexcharts'

import { createDefaultChartOptions } from '~entities/diagrams'

import type { EquipsAnalyticDiagramProps } from '../types/equips-diagram-data-types'

export const EquipsAnalyticDiagram = memo(({
  categories,
  series,
  title,
  colors
}: EquipsAnalyticDiagramProps) => {

  const seriesWithoutNull = useMemo(() => {
    return series.map(el => {
      return {
        ...el,
        data: el.data.map(n => n === null ? 0 : n)
      }
    })
  }, [series])

  const options: ApexOptions = useMemo(
    () => createDefaultChartOptions({
      title,
      colors,
      categories
    }),
    [title, colors, categories, seriesWithoutNull]
  )

  return (
    <ApexChart
      options={options}
      series={seriesWithoutNull}
      width='100%'
      height='100%'
    />
  )
})
