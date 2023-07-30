import './EquipsAnalyticDiagrams.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { getEquipsDataSelector, getIsLoadingSelector, getPikedEquipsColorsSelector, getScheduleTypeSelector } from '../../../../../../redux/selectors/equipsAnalyticSlectors'
import { EquipsDataData } from '../../../../../../redux/slices/EquipsAnalyticSlice'
import { getAllEquipmentSelector } from '../../../../../../redux/selectors/mapSelectors'
import EquipsAnalyticDiagram from './EquipsAnalyticDiagram/EquipsAnalyticDiagram'
import BasePreloader from '../../../../../common/BasePreloader/BasePreloader'

const EquipsAnalyticDiagrams = () => {
  const isLoading = useSelector(getIsLoadingSelector)
  const allEquips = useSelector(getAllEquipmentSelector)
  const pikedEquipsColors = useSelector(getPikedEquipsColorsSelector)
  const equipsData = useSelector(getEquipsDataSelector)
  const scheduleType = useSelector(getScheduleTypeSelector)

  let speedCategories: number[] = []
  const speedSeries = equipsData?.data
    .map((equip: EquipsDataData) => {
      const equipName = allEquips.find(e => e.id === equip.id)?.equip_name || 'Ошибка'
      const equipData = equip.imei_data.map(imeiData => {
        //заодно создаем категории
        speedCategories.push(+imeiData.timestamp)
        return +imeiData.avg_speed.toFixed(2)
      })
      return {
        name: equipName,
        data: equipData
      }
    })

  let fuelCategories: number[] = []
  const fuelSeries = equipsData?.data
    .map((equip: EquipsDataData) => {
      const equipName = allEquips.find(e => e.id === equip.id)?.equip_name || 'Ошибка'
      const equipData = equip.imei_data.map(imeiData => {
        //заодно создаем категории
        fuelCategories.push(+imeiData.timestamp)
        return +imeiData.avg_fuel.toFixed(2)
      })
      return {
        name: equipName,
        data: equipData
      }
    })

  const createTextCategories = (numCategories: number[]) => {
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

  return (
    <div className='fieldsAnalyticDiagrams'>

      {
        isLoading
          ? (
            <BasePreloader position={'relative'} />
          )
          : scheduleType === 'Скорость'
            ? (
              <EquipsAnalyticDiagram
                title={'График скорости техники'}
                series={fuelSeries !== undefined ? fuelSeries : []}
                categories={createTextCategories(fuelCategories)}
                colors={pikedEquipsColors}
              />
            )
            : (
              <EquipsAnalyticDiagram
                title={'График количества топлива техники'}
                series={speedSeries !== undefined ? speedSeries : []}
                categories={createTextCategories(speedCategories)}
                colors={pikedEquipsColors}
              />
            )
      }
    </div>
  )
}

export default EquipsAnalyticDiagrams
