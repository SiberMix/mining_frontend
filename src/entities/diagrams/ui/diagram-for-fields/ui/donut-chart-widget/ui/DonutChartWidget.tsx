import { Card } from 'antd'
import React, { memo } from 'react'
import ApexChart from 'react-apexcharts'

import { apexPieChartDefaultOption } from '~entities/diagrams/ui/diagram-for-fields/const/default-data'

export const DonutChartWidget = memo((props: any) => {
  const {
    series,
    customOptions,
    labels,
    width,
    height,
    title,
    extra
  } = props
  let options = apexPieChartDefaultOption
  options.labels = labels
  options.plotOptions.pie.donut.labels.total.label = title
  if (!title) {
    options.plotOptions.pie.donut.labels.show = false
  }
  if (customOptions) {
    options = { ...options, ...customOptions }
  }
  return (
    <Card className='diagram'>
      <div className='text-center'>
        <ApexChart
          type='donut'
          options={options}
          series={series}
          width={width}
          height={height}
        />
        {extra}
      </div>
    </Card>
  )
})
