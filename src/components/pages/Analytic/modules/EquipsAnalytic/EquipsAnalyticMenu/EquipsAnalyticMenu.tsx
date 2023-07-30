import './EquipsAnalyticMenu.scss'
import React, { useEffect, useState } from 'react'
import { Button, Segmented } from 'antd'
import EquipsAnalyticMenuItems from './EquipsAnalyticMenuItems/EquipsAnalyticMenuItems'
import { useAppDispatch } from '../../../../../../redux/store'
import { ChartType, getEquipsAnalyticThunk, resetEquipsAnalyticThunk, setScheduleType, setTsEnd, setTsStart } from '../../../../../../redux/slices/EquipsAnalytic'
import { useSelector } from 'react-redux'
import { getIsLoadingSelector, getPikedEquipsIdSelector, getScheduleTypeSelector } from '../../../../../../redux/selectors/equipsAnalyticSlectors'

type Period = 'День' | 'Неделя' | 'Месяц' | 'Свой вариант'

const EquipsAnalyticMenu = () => {
  const dispatch = useAppDispatch()
  const pikedEquipsId = useSelector(getPikedEquipsIdSelector)
  const isLoading = useSelector(getIsLoadingSelector)
  const scheduleType = useSelector(getScheduleTypeSelector)
  const [period, setPeriod] = useState<Period>('День')

  //При первой загрузке сбрасываем все в 0
  useEffect(() => {
    dispatch(resetEquipsAnalyticThunk())
  }, [])

  useEffect(() => {
    createTimeStamp()
  }, [period])

  const createTimeStamp = () => {
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
        const dayAgoForDefault = now - 24 * 60 * 60 * 1000
        dispatch(setTsEnd(now))
        dispatch(setTsStart(dayAgoForDefault))
    }
  }

  const getNewAnalyticData = () => {
    if (pikedEquipsId.length === 0) {
      alert('Необходимо выбрать минимум одно оборудование')
    } else {
      dispatch(getEquipsAnalyticThunk())
    }
  }

  const resetHandler = () => {
    dispatch(resetEquipsAnalyticThunk())
  }

  return (
    <div className='equipsAnalyticMenu'>
      <div className='equipsAnalyticMenu-btns_conatiner'>
        <div className='equipsAnalyticMenu-title'>
          Тип графика
          <span>Не требует повторной загрузки с сервера</span>
        </div>
        <Segmented
          options={['Скорость', 'Топливо']}
          value={scheduleType}
          onChange={(value) => dispatch(setScheduleType(value as ChartType))}
        />
        <div className='equipsAnalyticMenu-title'>
          Временной отрезок
          <span>Берется ровно от данного момента</span>
        </div>
        <Segmented
          options={['День', 'Неделя', 'Месяц', 'Свой вариант']}
          value={period}
          onChange={(value) => setPeriod(value as Period)}
        />
        <div
          className={`
                equipsAnalyticMenu-timepicker 
                ${period === 'Свой вариант' ? 'equipsAnalyticMenu-timepicker__open' : 'equipsAnalyticMenu-timepicker__close'}
              `}
        >
          ПРИВЕТ Я ТАЙМПИКЕР
        </div>
        <Button className='equipsAnalyticMenu-btn'
                type='primary'
                disabled={isLoading}
                onClick={getNewAnalyticData}
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
