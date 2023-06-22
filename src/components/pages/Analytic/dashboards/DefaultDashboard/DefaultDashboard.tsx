import { useState } from 'react'
import ApexChart from 'react-apexcharts'
import { COLORS } from '../ChartConstant'
import { Card } from 'antd'

const VisitorChartData = {
  title: 'Пример простого графика',
  series: [
    {
      name: 'Заглушка 1',
      data: [41, 23, 68, 21, 23, 36, 61, 10, 16, 28, 12, 11]
    },
    {
      name: 'Заглушка 2',
      data: [35, 41, 22, 12, 34, 33, 22, 41, 66, 17, 23, 50]
    },
    {
      name: 'Заглушка 3',
      data: [15, 55, 22, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
      name: 'Заглушка 4',
      data: [12, 15, 28, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    }
  ],
  categories: [
    '01 Jan',
    '02 Jan',
    '03 Jan',
    '04 Jan',
    '05 Jan',
    '06 Jan',
    '07 Jan',
    '08 Jan',
    '09 Jan',
    '10 Jan',
    '11 Jan',
    '12 Jan'
  ]
}

const DefaultDashboard = () => {
  const [visitorChartData] = useState(VisitorChartData)

  return (
    <Card>
      <ApexChart
        //@ts-ignore почему то библиотека ругается на legend.position, но ошибок нет, все работает как и было задумано
        options={options}
        series={visitorChartData.series}
        width="100%"
        height={400}
      />
    </Card>
  )
}

const options = {
  title: {
    text: VisitorChartData.title,
    align: 'left'
  },
  chart: {
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
    categories: VisitorChartData.categories
  },
  grid: {
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

export default DefaultDashboard
