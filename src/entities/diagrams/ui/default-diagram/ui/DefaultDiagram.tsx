import type { ApexOptions } from 'apexcharts'
import classNames from 'classnames'
import React, { memo, useMemo } from 'react'
import ApexChart from 'react-apexcharts'

import { createDefaultChartOptions } from '~entities/diagrams/lib'
import { CustomEmpty } from '~shared/ui/custom-empty'

import type { DiagramSeriesType } from '../../../types'

type DefaultDiagramProps = {
  title: string,
  series: DiagramSeriesType[],
  categories?: (string | number)[],
  className?: classNames.Value | classNames.ArgumentArray | classNames.Argument,
  colors?: string[],
  isEmpty?: boolean,
  withGrid?: boolean,
  withDataLabels?: boolean,
  withAnimation?: boolean
}

export const DefaultDiagram = memo(({
  series,
  title,
  categories,
  className,
  colors,
  isEmpty,
  withGrid,
  withDataLabels,
  withAnimation
}: DefaultDiagramProps) => {

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
      categories,
      withGrid,
      withDataLabels,
      withAnimation
    }),
    [title, colors, categories, withGrid, withDataLabels, withAnimation]
  )

  return (
    <div className={classNames(className)}>
      {
        isEmpty
          ? (
            <CustomEmpty
              className={className}
              description='Нет данных'
            />
          )
          : (
            <ApexChart
              options={options}
              series={seriesWithoutNull}
              width='100%'
              height='100%'
            />
          )
      }
    </div>
  )
})
