export const COLOR_1 = '#3e82f7' // blue
export const COLOR_2 = '#04d182' // cyan
export const COLOR_3 = '#ff6b72' // volcano
export const COLOR_4 = '#ffc107' // gold
export const COLOR_5 = '#a461d8' // purple
export const COLOR_6 = '#fa8c16' // orange
export const COLOR_7 = '#17bcff' // geekblue
export const COLORS = [
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7
]

/**
 * Дефолтные значения для круговой диаграммы
 * */

export const apexPieChartDefaultOption = {
  colors: [...COLORS],
  stroke: { width: 0 },
  plotOptions: {
    pie: {
      size: 50,
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: '',
            fontSize: '17px',
            fontFamily: 'Helvetica, monospace;',
            fontWeight: 'bold',
            color: '#f3f3f3',
            formatter: function(w: any) {
              const total = w.globals.seriesTotals.reduce((a: any, b: any) => {
                return a + b
              }, 0)
              return `${total} Га`
            }
          },
          value: {
            show: true,
            fontSize: '17px',
            fontFamily: 'Helvetica, monospace;',
            fontWeight: 'bold',
            color: '#ffffff'
          }
        },
        size: '83%'
      }
    }
  },
  labels: [],
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  }
}

/**
 * Функционал для настройки внутреннего контента
 * */

export const sessionColor = [COLORS[0], COLORS[1], COLORS[3]]
export const sessionData = [3, 10, 20]
export const sessionLabels = ['Пшеница', 'Ячмень', 'Кукуруза']
const jointSessionData = () => {
  let arr: any = []
  for (let i = 0; i < sessionData.length; i++) {
    const data = sessionData[i]
    const label = sessionLabels[i]
    const color = sessionColor[i]
    arr = [...arr, {
      data: data,
      label: label,
      color: color
    }]
  }
  return arr
}
export const conbinedSessionData = jointSessionData()
