import './EquipsAnalyticMenu.scss'
import React, { useEffect, useState } from 'react'
import { Button, DatePicker, message, Segmented } from 'antd'
import EquipsAnalyticMenuItems from './EquipsAnalyticMenuItems/EquipsAnalyticMenuItems'
import { useAppDispatch } from '../../../../../../redux/store'
import { ChartType, getEquipsAnalyticThunk, resetEquipsAnalyticThunk, setChartType, setScheduleType, setTsEnd, setTsStart } from '../../../../../../redux/slices/EquipsAnalyticSlice'
import { useSelector } from 'react-redux'
import { getChartType, getIsLoadingSelector, getPikedEquipsIdSelector, getScheduleTypeSelector } from '../../../../../../redux/selectors/equipsAnalyticSlectors'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

type Period = 'День' | 'Неделя' | 'Месяц' | 'Свой вариант'

const EquipsAnalyticMenu = () => {
  const dispatch = useAppDispatch()
  const pikedEquipsId = useSelector(getPikedEquipsIdSelector)
  const isLoading = useSelector(getIsLoadingSelector)
  const scheduleType = useSelector(getScheduleTypeSelector)
  const chartType = useSelector(getChartType)
  const [period, setPeriod] = useState<Period>('День')

  /*
  * костыльная перерисовка датапикера, для сброса значений :D
  * */
  const [keyForReset, setKeyForReset] = useState(1)
  useEffect(() => {
    setKeyForReset(Date.now())
  }, [period])

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

  const [messageApi, contextHolder] = message.useMessage()
  const getNewAnalyticData = () => {
    if (pikedEquipsId.length === 0) {
      messageApi.info('Необходимо выбрать минимум одно оборудование')
    } else {
      dispatch(getEquipsAnalyticThunk())
    }
  }

  const onChangeDate = (value: any) => {
    if (value[0] !== null && value[1] !== null) {
      const startDate = value[0].toDate()
      const endDate = value[1].toDate()

      dispatch(setTsEnd(endDate.getTime()))
      dispatch(setTsStart(startDate.getTime()))
    }
  }

  const resetHandler = () => {
    dispatch(resetEquipsAnalyticThunk())
    setPeriod('День')
  }

  // Вычисляем дату на месяц назад с помощью Dayjs
  const oneMonthAgo = dayjs()
    .subtract(1, 'month')

  // Преобразуем объекты Date в Dayjs
  const defaultStartDate = dayjs(oneMonthAgo)
  const defaultEndDate = dayjs()

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
          Тип данных
          <span>Не требует повторной загрузки с сервера</span>
        </div>
        <Segmented
          options={['AVG', 'MEDIAN']}
          value={chartType}
          onChange={(value) => dispatch(setChartType(value))}
        />
        <div className='equipsAnalyticMenu-title'>
          Временной отрезок
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
          <span style={{ display: period === 'Свой вариант' ? '' : 'none' }}>
            <RangePicker
              //костыльно перерисовываем компонент для сброса значений
              key={`${keyForReset}`}
              placeholder={['Начало', 'Конец']}
              onChange={onChangeDate}
              defaultPickerValue={[defaultStartDate, defaultEndDate]}
            />
          </span>
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
      {contextHolder}
    </div>
  )
}

export default EquipsAnalyticMenu
