import type { ApexOptions } from 'apexcharts'

import { COLORS } from '../const/diagrams-colors'

type CreateDefaultChartOptions = {
  title: string,
  categories?: (string | number)[],
  colors?: string[],
  withGrid?: boolean,
  withDataLabels?: boolean,
  withAnimation?: boolean
}

export function createDefaultChartOptions({
  title,
  categories,
  colors = COLORS,
  withGrid = true,
  withDataLabels = true,
  withAnimation = true
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
        enabled: withAnimation,
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
    dataLabels: withDataLabels
      ? {
        enabled: true //подпись точек
      }
      : {},
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
    grid: withGrid
      ? {
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
      }
      : {},
    //здесь передаются данные по категориям и цветам которые у нас есть=
    xaxis: {
      categories: categories
    },
    colors: [...colors]
  }
}
