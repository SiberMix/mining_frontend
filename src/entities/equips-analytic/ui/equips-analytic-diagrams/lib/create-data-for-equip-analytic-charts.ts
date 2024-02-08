import dayjs from 'dayjs'

import type { EquipsAnalyticDiagramSeriesType } from '~entities/diagrams/ui/equips-analytic-diagram'

import type { Equip } from '../../../../../srcOld/redux/slices/mapSlice'
import type { ChartData, EquipDataForChart, PickedEquip } from '../../../types'

type CreateSpeedCategoriesAndSpeedSeriesType = {
  chartData: ChartData | null,
  allEquipList: Equip[],
  chartKey: keyof Omit<EquipDataForChart, keyof OmitOneEquipDataForChartsData>
}

type OmitOneEquipDataForChartsData = {
  id: number,
  imei_str: string
}

export const createDataForChart = ({
  chartData,
  allEquipList,
  chartKey
}: CreateSpeedCategoriesAndSpeedSeriesType): [(string | number)[], EquipsAnalyticDiagramSeriesType[]] => {
  if (!chartData) return [[], []]

  const [dates, result] = Object.entries(chartData)
    .reduce(
      ([datesAcc, resultAcc], [date, equipData]) => {

        // пробегаем по всем данным за день, и закидываем в нужный объект в аккумуляторе
        equipData.forEach(equipDataObj => {

          //просто данные из дня, по нужному ключу например avg_speed
          const chartDayDataForKey = equipDataObj[chartKey]
          // индекс объекта в котором нужный id
          const objIndexById = resultAcc.findIndex(resultAccObj => resultAccObj.id === equipDataObj.id)

          if (objIndexById !== -1) {
            // Если объект с таким id уже существует, добавляем данные
            resultAcc[objIndexById].data.push(chartDayDataForKey)
          } else {
            // Если объекта с таким id еще нет, создаем новый
            resultAcc.push({
              id: equipDataObj.id,
              name: allEquipList.find(e => e.id === equipDataObj.id)?.equip_name || 'Ошибка',
              data: [chartDayDataForKey]
            })
          }
        })

        //не отходя от дела формируем массив дней
        datesAcc.push(date)

        //возвращаем измененные данные дней и данных
        return [datesAcc, resultAcc]
      },
      [[], []] as [(string | number)[], EquipsAnalyticDiagramSeriesType[]]
    )

  return [dates, result]
}

export const createTextCategories = (numCategories: (number | string)[]) => {
  return numCategories.map(num => {
    const dateObj = dayjs.unix(+num) // Создаем объект dayjs из Unix timestamp

    // Получаем объект. DateTimeFormat с указанной локалью и опциями форматирования
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short'
    })
    // Получаем строку с отформатированной датой
    return dateFormatter.format(dateObj.toDate())
  })
}

export const createColorsForCharts = (chartData: EquipsAnalyticDiagramSeriesType[], equipColorsUsingInDiagrams: PickedEquip[]) => {
  return chartData.map(chartDataObj => {
    const findUsingEquip = equipColorsUsingInDiagrams.find(usingEquip => usingEquip.equipId === chartDataObj.id)

    if (findUsingEquip) {
      return findUsingEquip.equipColor
    }
    return 'red'
  })
}
