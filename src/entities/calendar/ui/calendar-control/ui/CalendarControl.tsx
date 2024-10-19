import './CalendarControl.scss'
import 'moment/locale/ru.js'

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import type { DatePickerProps } from 'antd'
import { DatePicker, Radio } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { memo, useCallback, useMemo, useState } from 'react'
import { Views } from 'react-big-calendar'

import { VIEW_OPTIONS } from '~entities/calendar/ui/calendar-control/const'
import { StyledButton } from '~shared/ui/styled-button'

import type { CalendarViewType } from '../../../types'
import { CalendarTypeJobsControl } from '../../calendar-type-jobs/components'
import { t } from 'i18next';

type CalendarControlProps = {
  isLoading: boolean,
  view: CalendarViewType,
  setView: (view: CalendarViewType) => void,
  date: Date,
  setDate: (date: Date) => void,
  setIsOpenModal: (value: boolean) => void
}

export const CalendarControl = memo(({
  isLoading,
  view,
  setView,
  date,
  setDate,
  setIsOpenModal
}: CalendarControlProps) => {
  const [datePicker, setDatePicker] = useState<dayjs.Dayjs | null>(null)

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setDatePicker(date)
    if (date !== null) {
      setDate(dayjs(date)
        .toDate())
    }
  }

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date)
        .subtract(1, 'd')
        .toDate())
    } else if (view === Views.WEEK) {
      setDate(moment(date)
        .subtract(1, 'w')
        .toDate())
    } else {
      setDate(moment(date)
        .subtract(1, 'M')
        .toDate())
    }
  }, [view, date])

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date)
        .add(1, 'd')
        .toDate())
    } else if (view === Views.WEEK) {
      setDate(moment(date)
        .add(1, 'w')
        .toDate())
    } else {
      setDate(moment(date)
        .add(1, 'M')
        .toDate())
    }
  }, [view, date])

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date)
      .format('dddd, MMMM DD')
    if (view === Views.WEEK) {
      const from = moment(date)
        ?.startOf('week')
      const to = moment(date)
        .locale('ru')
        ?.endOf('week')
      return `${from.format('MMMM DD')} to ${to.format('MMMM DD')}`
    }
    if (view === Views.MONTH) {
      return moment(date)
        .format('MMMM YYYY')
    }
  }, [view, date])

  return (
    <div className='CalendarControl'>
      <StyledButton
        width='auto'
        height='auto'
        bgc='var(--green-200)'
        color='var(--green-100)'
        hoverbgc='var(--gray-400)'
        hovercolor='var(--green-100)'
        onClick={setIsOpenModal.bind(null, true)}
        disabled={isLoading}
      >
        {t("Создать задачу")}
      </StyledButton>
      <StyledButton
        width='auto'
        height='auto'
        onClick={() => setDate(new Date())}
        disabled={isLoading}
      >
        {t("Сегодня")}
      </StyledButton>
      <DatePicker
        value={datePicker}
        onChange={onChangeDate}
        disabled={isLoading}
      />
      <div className='CalendarControl_buttons'>
        <StyledButton
          onClick={onPrevClick}
          disabled={isLoading}
        >
          <ArrowLeftOutlined />
        </StyledButton>
        <div className='CalendarControl_buttons_value'>
          {dateText}
        </div>
        <StyledButton
          onClick={onNextClick}
          disabled={isLoading}
        >
          <ArrowRightOutlined />
        </StyledButton>
      </div>
      <Radio.Group
        className='CalendarControl_radio'
        value={view}
        onChange={(e) => setView(e.target.value)}
        disabled={isLoading}
      >
        {
          VIEW_OPTIONS.map((item) => (
            <Radio.Button
              key={item.id}
              value={item.id}
            >
              {item.label}
            </Radio.Button>
          ))
        }
      </Radio.Group>
      <CalendarTypeJobsControl disabled={isLoading} />
    </div>
  )
})
