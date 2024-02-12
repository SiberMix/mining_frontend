import type { ApexOptions } from 'apexcharts'
import classNames from 'classnames'
import React, { memo } from 'react'
import ApexChart from 'react-apexcharts'

import { createDefaultChartOptions } from '~entities/diagrams/lib'
import { CustomEmpty } from '~shared/ui/custom-empty'

import { defaultDiagramDataExample } from '../const/default-diagram-data-example'

type DefaultDiagramProps = {
  title: string,
  series?: ApexOptions['series'],
  categories?: (string | number)[],
  className?: classNames.Value | classNames.ArgumentArray | classNames.Argument,
  colors?: string[],
  isEmpty?: boolean,
  withGrid?: boolean,
  withDataLabels?: boolean
}

export const DefaultDiagram = memo(({
  series = defaultDiagramDataExample.series,
  title,
  categories,
  className,
  colors,
  isEmpty,
  withGrid,
  withDataLabels
}: DefaultDiagramProps) => {

  const options: ApexOptions = createDefaultChartOptions({
    title,
    colors,
    categories,
    withGrid,
    withDataLabels
  })

  return (
    <div className={classNames(className)}>
      {
        isEmpty
          ? <CustomEmpty
            className={className}
            description='Нет данных'
          />
          : <ApexChart
            options={options}
            series={series}
            width='100%'
            height='100%'
          />
      }
    </div>
  )
})
