import type { ApexOptions } from 'apexcharts'
import React, { useState } from 'react'
import ApexChart from 'react-apexcharts'

import { COLORS } from '../../../const/diagrams-colors'
import { defaultDiagramDataExample } from '../const/default-diagram-data-example'

export const DefaultDiagram = () => {
  const [visitorChartData] = useState(defaultDiagramDataExample)

  const options: ApexOptions = {
    title: {
      text: visitorChartData.title,
      align: 'left'
    },
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 300, // Длительность анимации в миллисекундах
        animateGradually: {
          enabled: true,
          delay: 100 // Задержка перед стартом анимации
        }
      },
      foreColor: '#6B6B6B', //цвета всех текстовых обозначений на графике
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: [...COLORS],
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -15,
      itemMargin: {
        vertical: 20
      },
      //используюется, но вебшторм этого не видит
      tooltipHoverFormatter: function(val: any, opts: any) {
        return val + ' : ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    xaxis: {
      categories: visitorChartData.categories
    },
    grid: {
      borderColor: '#6B6B6B', //это свойство для цвета вертикальных линий на графике
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    }
  }

  return (
    <ApexChart
      options={options}
      series={visitorChartData.series}
      width='100%'
      height='100%'
    />
  )
}
