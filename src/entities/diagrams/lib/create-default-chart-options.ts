import type { ApexOptions } from 'apexcharts'

import { COLORS } from '../const/diagrams-colors'

type CreateDefaultChartOptions = {
  title: string,
  categories?: (string | number)[],
  colors?: string[]
}

export function createDefaultChartOptions({
  title,
  categories,
  colors = COLORS
}: CreateDefaultChartOptions): ApexOptions {
  return {
    title: {
      text: title,
      align: 'left'
    },
    tooltip: {
      enabled: true,
      theme: 'dark'
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
      foreColor: 'var(--gray-200)', //цвета всех текстовых обозначений на графике
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
      curve: 'straight',
      lineCap: 'round'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -15,
      itemMargin: {
        vertical: 20
      }
    },
    grid: {
      borderColor: 'var(--gray-200)', //это свойство для цвета вертикальных линий на графике
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
}
