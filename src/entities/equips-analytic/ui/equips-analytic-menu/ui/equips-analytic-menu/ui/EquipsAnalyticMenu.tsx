import './EquipsAnalyticMenu.scss'
import 'dayjs/locale/ru'

import { Button, ConfigProvider, DatePicker, message, Segmented } from 'antd'
import locale from 'antd/locale/ru_RU'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import React, { memo, useEffect } from 'react'

import { createTimeStamp } from '../../../../../lib/create-time-stamp'
import { useEquipAnalyticStore } from '../../../../../model'
import type { FormikInitialValues, PeriodType } from '../../../../../types'
import { EquipsAnalyticMenuItem } from '../../equips-analytic-menu-item'
import { EquipsAnalyticMenuTransfer } from '../../equips-analytic-menu-transfer'

export const EquipsAnalyticMenu = memo(() => {
  const isLoading = useEquipAnalyticStore(state => state.isLoading)
  const getAllEquipList = useEquipAnalyticStore(state => state.getAllEquipList)
  const getEquipsAnalyticData = useEquipAnalyticStore(state => state.getEquipsAnalyticData)
  /** для initial values формика */
  const scheduleType = useEquipAnalyticStore(state => state.scheduleType)
  const chartType = useEquipAnalyticStore(state => state.chartType)

  useEffect(() => {
    getAllEquipList()
  }, [])

  /** функционал, для показа сообщений */
  const [messageApi, messageHolder] = message.useMessage()

  /** Запрос на данные при сабмите */
  const getNewAnalyticData = (values: FormikInitialValues) => {
    if (values.pikedEquipsId.length < 1) {
      messageApi.info('Необходимо выбрать минимум одно оборудование')
    } else {
      getEquipsAnalyticData(values)
    }
  }

  /** Формик */
  const formik = useFormik<FormikInitialValues>({
    initialValues: {
      pikedEquipsId: [],
      scheduleType: scheduleType,
      chartType: chartType,
      period: 'День',
      time: {
        start: createTimeStamp('День')?.start as number,
        end: createTimeStamp('День')?.end as number
      }
    },
    onSubmit: values => {
      getNewAnalyticData(values)
    }
  })

  const onChangeRangeHandler = (rangeValue: null | (dayjs.Dayjs | null)[]) => {
    if (rangeValue === null) return //проверка чтоб отъебался ts
    formik.setFieldValue('time', {
      start: rangeValue[0]?.valueOf(),
      end: rangeValue[1]?.valueOf()
    })
  }

  return (
    <form className='equipsAnalyticMenu'>
      <EquipsAnalyticMenuItem
        title='Тип графика'
        subTitle='Не требует повторной загрузки с сервера'
      >
        <Segmented
          name='scheduleType'
          options={['Скорость', 'Топливо']}
          value={formik.values.scheduleType}
          onChange={(value) => formik.setFieldValue('scheduleType', value)}
          disabled={isLoading}
        />
      </EquipsAnalyticMenuItem>

      <EquipsAnalyticMenuItem
        title='Тип данных'
        subTitle='Не требует повторной загрузки с сервера'
      >
        <Segmented
          name='chartType'
          options={['AVG', 'MEDIAN']}
          value={formik.values.chartType}
          onChange={(value) => formik.setFieldValue('chartType', value)}
          disabled={isLoading}
        />
      </EquipsAnalyticMenuItem>

      <EquipsAnalyticMenuItem title='Временной отрезок'>
        <Segmented
          name='period'
          options={['День', 'Неделя', 'Месяц', 'Свой вариант']}
          value={formik.values.period}
          onChange={(value) => {
            formik.setFieldValue('period', value)
            formik.setFieldValue('time', createTimeStamp(value as PeriodType))
          }}
          disabled={isLoading}
        />
        <div
          className={classNames(
            'equipsAnalyticMenu-timepicker',
            { 'equipsAnalyticMenu-timepicker__open': formik.values.period === 'Свой вариант' },
            { 'equipsAnalyticMenu-timepicker__close': formik.values.period !== 'Свой вариант' }
          )}
        >
          <span style={{ display: formik.values.period === 'Свой вариант' ? '' : 'none' }}>
            <ConfigProvider locale={locale}>
              <DatePicker.RangePicker
                name='time'
                placeholder={['Начало', 'Конец']}
                value={[dayjs(formik.values.time.start), dayjs(formik.values.time.end)]}
                onChange={onChangeRangeHandler}
              />
            </ConfigProvider>
          </span>
        </div>
      </EquipsAnalyticMenuItem>
      <EquipsAnalyticMenuItem
        gridColumn='2 / 3'
        gridRow='1 / 3'
      >
        <EquipsAnalyticMenuTransfer
          value={formik.values.pikedEquipsId}
          onChange={(value) => formik.setFieldValue('pikedEquipsId', value)}
        />
      </EquipsAnalyticMenuItem>
      <EquipsAnalyticMenuItem>
        <Button
          itemType='submit'
          className='equipsAnalyticMenu-btn'
          type='primary'
          disabled={isLoading}
          onClick={formik.submitForm}
        >
          Загрузить статистику
        </Button>
        <Button
          className='equipsAnalyticMenu-btn'
          type='primary'
          onClick={() => formik.resetForm()}
          disabled={isLoading}
        >
          Сбросить
        </Button>
      </EquipsAnalyticMenuItem>
      {messageHolder}
    </form>
  )
})
