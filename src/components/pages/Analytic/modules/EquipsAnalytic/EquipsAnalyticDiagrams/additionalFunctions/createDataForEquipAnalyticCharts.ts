import { ChartType, EquipsDataForCharts, OneEquipDataForChartsData } from '../../../../../../../redux/slices/EquipsAnalyticSlice'
import { Equip } from '../../../../../../../types/equip'

type CreateSpeedCategoriesAndSpeedSeriesType = {
  equipsDataForCharts: EquipsDataForCharts | undefined
  allEquips: Equip[]
  chartType: ChartType
}

export const createSpeedCategoriesAndSpeedSeries = ({
  equipsDataForCharts,
  allEquips,
  chartType
}: CreateSpeedCategoriesAndSpeedSeriesType) => {

  let speedCategories: number[] = []
  const speedSeries = equipsDataForCharts?.data
    .map((equip: OneEquipDataForChartsData) => {
      const equipName = allEquips.find(e => e.id === equip.id)?.equip_name || 'Ошибка'
      const equipData = [...equip.imei_data] //создаем копию массива
        .sort((a, b) => +a.timestamp - +b.timestamp)
        .map(imeiData => {

          //создаем категории простым push, и так же отфильтровываем массив, чтоб не повторять даты
          if (!speedCategories.includes(+imeiData.timestamp)) {
            speedCategories.push(+imeiData.timestamp)
          }

          //забираем нужную скорость avg || median
          const currentSpeed = chartType === 'AVG' ? imeiData.avg_speed : imeiData.median_speed

          if (currentSpeed === null) {
            return null //возможно нужно высчитывать промежуточный (средний) результат между предыдущим и след, для ровного графика
          } else {
            return Number(currentSpeed.toFixed(2))
          }
        })
      return {
        name: equipName,
        data: equipData
      }
    })

  return {
    speedCategories,
    speedSeries
  }
}

export const createFuelCategoriesAndFuelSeries = ({
  equipsDataForCharts,
  allEquips,
  chartType
}: CreateSpeedCategoriesAndSpeedSeriesType) => {
  let fuelCategories: number[] = []
  const fuelSeries = equipsDataForCharts?.data
    .map((equip: OneEquipDataForChartsData) => {
      const equipName = allEquips.find(e => e.id === equip.id)?.equip_name || 'Ошибка'
      const equipData = equip.imei_data.map(imeiData => {
        //создаем категории простым push, и так же отфильтровываем массив, чтоб не повторять даты
        if (!fuelCategories.includes(+imeiData.timestamp)) {
          fuelCategories.push(+imeiData.timestamp)
        }

        //забираем нужное топливо avg || median
        const currentFuel = chartType === 'AVG' ? imeiData.avg_fuel : imeiData.median_fuel

        if (currentFuel === null) {
          return null //возможно нужно высчитывать промежуточный (средний) результат между предыдущим и след, для ровного графика
        } else {
          return Number(currentFuel.toFixed(2))
        }
      })
      return {
        name: equipName,
        data: equipData
      }
    })

  return {
    fuelCategories,
    fuelSeries
  }
}

export const createTextCategories = (numCategories: number[]) => {
  return numCategories.map(num => {
    const dateObj = new Date(num * 1000)
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
