import React from 'react'
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

type Props = {
  title: string,
  series: {
    name: string,
    data: number[]
  }[]
  categories: string[]
  colors: string[]
}

const EquipsAnalyticDiagram: React.FC<Props> = ({
  categories,
  series,
  title,
  colors
}) => {

  //  TODO сделать функцию форматер, которая будет выводить все значения по срезу
  // const customTooltipFormatter = (params: CustomTooltipFormatterParams): string => {
  //   const dataPoint = params.series[params.seriesIndex].data[params.dataPointIndex]
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
    colors: [...colors],
    dataLabels: {
      enabled: false //подпись точек
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
      tooltipHoverFormatter: function(val: any, opts: any) {
        return val + ' : ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    xaxis: {
      categories: categories
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
      series={series}
      width='100%'
      height='100%'
    />
  )
}

export default EquipsAnalyticDiagram
