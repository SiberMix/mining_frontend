import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from '../ChartConstant'
import { Card } from 'antd'
import type { ApexOptions } from 'apexcharts'

const AngleCircleDiagramData = {
  title: 'Пример простого кругового графика НО ТОЛЬКО ДЛЯ %',
  series: [30, 50, 79, 67],
  labels: [
    '1 заглушка',
    '2 заглушка',
    '3 заглушка',
    '4 заглушка'
  ]
}

const AngleCircleDiagram = () => {
  const [visitorChartData] = useState(AngleCircleDiagramData)

  const options: ApexOptions = {
    title: {
      text: visitorChartData.title,
      align: 'left'
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined
        },
        dataLabels: {
          name: {
            show: true
          },
          value: {
            color: '#2C2C2C',
            show: true
          }
        }
      }
    },
    colors: [...COLORS],
    labels: visitorChartData.labels,
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 55,
      offsetY: 36,
      labels: {
        useSeriesColors: true
      },
      formatter: function(seriesName: any, opts: any) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + '%'
      },
      itemMargin: {
        vertical: 3
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          show: false
        }
      }
    }]
  }

  return (
    <Card>
      <Chart
        options={options}
        type="radialBar"
        series={visitorChartData.series}
        width="100%"
        height={415}
      />
    </Card>
  )
}

export default React.memo(AngleCircleDiagram)
