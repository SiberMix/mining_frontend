import type { ApexOptions } from 'apexcharts'
import classNames from 'classnames'
import React, { useMemo } from 'react'
import ApexChart from 'react-apexcharts'

import { createDefaultChartOptions } from '~entities/diagrams/lib'

import { defaultDiagramDataExample } from '../const/default-diagram-data-example'

type DefaultDiagramProps = {
  title: string,
  series?: ApexOptions['series'],
  categories?: (string | number)[],
  className?: classNames.Value | classNames.ArgumentArray | classNames.Argument,
  colors?: string[]
}

export const DefaultDiagram = ({
  series = defaultDiagramDataExample.series,
  title,
  categories,
  className,
  colors
}: DefaultDiagramProps) => {

  const options: ApexOptions = useMemo(
    () => createDefaultChartOptions({
      title,
      colors,
      categories
    }),
    [title, colors, categories]
  )

  return (
    <div className={classNames(className)}>
      <ApexChart
        options={options}
        series={series}
        width='100%'
        height='100%'
      />
    </div>
  )
}
