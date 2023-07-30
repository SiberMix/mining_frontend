import './EquipsAnalyticMenu.scss'
import React, { useEffect } from 'react'
import { Button, Segmented } from 'antd'
import EquipsAnalyticMenuItems from './EquipsAnalyticMenuItems/EquipsAnalyticMenuItems'
import { useAppDispatch } from '../../../../../../redux/store'
import { setPikedEquipsColors, setPikedEquipsId, setTsEnd, setTsStart } from '../../../../../../redux/slices/EquipsAnalytic'
import { useSelector } from 'react-redux'
import { getIsLoadingSelector, getPikedEquipsColorsSelector, getPikedEquipsIdSelector } from '../../../../../../redux/selectors/equipsAnalyticSlectors'

const EquipsAnalyticMenu = () => {
  const dispatch = useAppDispatch()
  const pikedEquipsId = useSelector(getPikedEquipsIdSelector)
  const pikedEquipsColors = useSelector(getPikedEquipsColorsSelector)
  const isLoading = useSelector(getIsLoadingSelector)

  useEffect(() => {

  }, [])

  const pickTime = (period: 'День' | 'Неделя' | 'Месяц' | 'Свой вариант') => {
    const now = new Date().getTime() // Текущая временная метка

    switch (period) {
      case 'День':
        // Определяем дату, соответствующую "дню назад"
        const dayAgo = now - 24 * 60 * 60 * 1000
        dispatch(setTsEnd(now))
        dispatch(setTsStart(dayAgo))
        break
      case 'Неделя':
        // Определяем дату, соответствующую "неделе назад"
        const weekAgo = now - 7 * 24 * 60 * 60 * 1000
        dispatch(setTsEnd(now))
        dispatch(setTsStart(weekAgo))
        break
      case 'Месяц':
        // Определяем дату, соответствующую "месяцу назад"
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        const monthAgoTimestamp = monthAgo.getTime()
        dispatch(setTsEnd(now))
        dispatch(setTsStart(monthAgoTimestamp))
        break
      case 'Свой вариант':
        // Ваша логика для обработки "Свой вариант"
        break
      default:
      // Обработка для непредвиденных случаев
    }
  }

  const resetHandler = () => {
    dispatch(setPikedEquipsColors(pikedEquipsId[0]))
    dispatch(setPikedEquipsId(pikedEquipsColors[0]))

  }

  return (
    <div className='equipsAnalyticMenu'>
      <div className='equipsAnalyticMenu-btns_conatiner'>
        <div className='equipsAnalyticMenu-title'>
          Выберете временной промежуток
        </div>
        <Segmented
          options={['День', 'Неделя', 'Месяц', 'Свой вариант']}
          onChange={(value) => console.log(value)}
          disabled={isLoading}
        />
        <Button className='equipsAnalyticMenu-btn'
                type='primary'
                disabled={isLoading}
        >
          Загрузить статистику
        </Button>
        <Button className='equipsAnalyticMenu-btn'
                type='primary'
                onClick={resetHandler}
                disabled={isLoading}
        >
          Сбросить
        </Button>
      </div>
      <EquipsAnalyticMenuItems />
    </div>
  )
}

export default EquipsAnalyticMenu
