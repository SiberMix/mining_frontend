import type { ApexOptions } from 'apexcharts'
import classNames from 'classnames'
import React, { useMemo } from 'react'
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
  isEmpty?: boolean
}

export const DefaultDiagram = ({
  series = defaultDiagramDataExample.series,
  title,
  categories,
  className,
  colors,
  isEmpty
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
}
