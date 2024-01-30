import type { ApexOptions } from 'apexcharts'
import React, { memo } from 'react'
import ApexChart from 'react-apexcharts'

import type { EquipsAnalyticDiagramProps } from '../types/equips-diagram-data-types'

export const EquipsAnalyticDiagram = memo(({
  categories,
  series,
  title,
  colors
}: EquipsAnalyticDiagramProps) => {

  //  TODO сделать функцию форматер, которая будет выводить все значения по срезу если это конечно еще нужно будет
  // config customTooltipFormatter = (params: CustomTooltipFormatterParams): string => {
  //   config dataPoint = params.series[params.seriesIndex].data[params.dataPointIndex]
  //   return `${params.series[params.seriesIndex].name}: ${dataPoint}`
  // }

  const options: ApexOptions = {
    title: {
      text: title,
      align: 'left'
    },
    tooltip: {
      enabled: true,
      theme: 'dark'
      // custom: customTooltipFormatter
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
        show: true
      }
    },
    dataLabels: {
      enabled: true //подпись точек
    },
    stroke: {
      width: 3,
      curve: Array.from({ length: series.length })
        .fill('smooth') as 'smooth'[], //почему то простое указание "smooth" очень сильно корявит график
      lineCap: 'round'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -15,
      itemMargin: {
        vertical: 20
      }
      // tooltipHoverFormatter: function(val: any, opts: any) { //ваще хз че это такое
      //   return val + " : " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ""
      // }
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
    },
    //здесь передаются данные по категориям и цветам которые у нас есть=
    xaxis: {
      categories: categories
    },
    colors: [...colors]
  }

  return (
    <ApexChart
      options={options}
      series={series}
      width='100%'
      height='100%'
    />
  )
})
