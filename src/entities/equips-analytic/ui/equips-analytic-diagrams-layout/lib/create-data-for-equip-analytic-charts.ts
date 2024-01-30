import type { EquipsAnalyticDiagramSeriesType } from '~entities/diagrams/ui/equips-analytic-diagram'

import type { EquipsDataForCharts, OneEquipDataForChartsData, PickedEquip } from '../../../../../../srcOld/redux/slices/EquipsAnalyticSlice'
import type { Equip } from '../../../../../../srcOld/redux/slices/mapSlice'

type CreateSpeedCategoriesAndSpeedSeriesType = {
  equipsDataForCharts: EquipsDataForCharts | undefined,
  allEquips: Equip[],
  chartKey: keyof Omit<OneEquipDataForChartsData, keyof OmitOneEquipDataForChartsData>
}

type OmitOneEquipDataForChartsData = {
  id: number,
  imei_str: string
}

export const createDataForChart = ({
  equipsDataForCharts,
  allEquips,
  chartKey
}: CreateSpeedCategoriesAndSpeedSeriesType): [(string | number)[], EquipsAnalyticDiagramSeriesType[]] => {
  if (!equipsDataForCharts) return [[], []]

  const [dates, result] = Object.entries(equipsDataForCharts)
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
              name: allEquips.find(e => e.id === equipDataObj.id)?.equip_name || 'Ошибка',
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
    const dateObj = new Date(+num * 1000)
    // Опции форматирования даты
    const options: { day: 'numeric', month: 'short' } = {
      day: 'numeric',
      month: 'short'
    }
    // Получаем объект. DateTimeFormat с указанной локалью и опциями форматирования
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', options)
    // Получаем строку с отформатированной датой
    return dateFormatter.format(dateObj)
  })
}

export const createColorsForCharts = (chartData: EquipsAnalyticDiagramSeriesType[], equipColorsUsingInDiagrams: PickedEquip[]) => {
  return chartData.map(chartDataObj => {
    const findUsingEquip = equipColorsUsingInDiagrams.find(usingEquip => usingEquip.equipsId === chartDataObj.id)

    if (findUsingEquip) {
      return findUsingEquip.equipColor
    }
    return 'red'
  })
}
