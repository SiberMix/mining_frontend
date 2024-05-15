import './index.scss'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { DefaultDiagram } from '~entities/diagrams'
import { StyledModal } from '~shared/ui/styled-modal'
import { fetchWeatherInfo, forecastHourlyEnum } from '~widgets/weather'

import { weatherStore } from '../../../../../model'
import { WeatherPreviewModalControls } from '../../weather-preview-modal-controls'

export const WeatherPreviewModal = () => {
  const isWeatherModalOpen = weatherStore(state => state.isWeatherModalOpen)
  const weatherCords = weatherStore(state => state.weatherCords)
  const setWeatherCords = weatherStore(state => state.setWeatherCords)
  const setWeatherModalOpen = weatherStore(state => state.setWeatherModalOpen)

  const [date, setDate] = useState(() => dayjs())

  const { isLoading, isError, data } = useQuery(
    ['weatherCordsRequest', weatherCords, date],
    () => {
      if (weatherCords) {
        return fetchWeatherInfo({
          ...weatherCords,
          hourly: [forecastHourlyEnum.temperature_2m, forecastHourlyEnum.precipitation, forecastHourlyEnum.precipitation_probability],
          start_date: date,
          end_date: date
        })
      }
    },
    { retry: 3 }
  )

  const onCancel = useCallback(() => {
    setWeatherModalOpen(false)
    setWeatherCords(null)
    setDate(dayjs())
  }, [setWeatherModalOpen, setWeatherCords])

  useEffect(() => {
    if (!isLoading && isError) {
      onCancel()
      toast.error('Произошла ошибка, пожалуйста повторите попытку позже')
    }
  }, [isLoading, isError, onCancel])

  const title = useMemo(() => {
    return `Прогноз погоды с ${date.format('YYYY-MM-DD')} по ${date.add(1, 'day').format('YYYY-MM-DD')}`
  }, [date])

  return (
    <StyledModal
      title={title}
      className='weather-modal'
      open={isWeatherModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      footer={
        <WeatherPreviewModalControls
          className='weather-modal-controls'
          date={date}
          onClick={setDate}
          disabled={isLoading}
        />
      }
    >
      <div className='weather-modal-content'>
        {
          isLoading || !data
            ? (
              <Spin
                style={{ margin: 'auto 0' }}
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 54 }}
                    spin
                  />
                }
              />
            )
            : (
              <>
                <DefaultDiagram
                  className='weather-modal-chart'
                  title='Температура °C'
                  series={[{
                    id: 'weather',
                    name: 'Температура, °C',
                    data: Array.from(data.hourly.temperature_2m || []).map(n => +n.toFixed(1))
                  }]}
                  categories={data.hourly.time.map(d => dayjs(d).format('MM-DD HH:mm'))}
                  isEmpty={!data.hourly.temperature_2m || data.hourly.temperature_2m.length === 0}
                  colors={['#B1AC0DFF']}
                  withAnimation={false}
                />
                <DefaultDiagram
                  className='weather-modal-chart'
                  title='Осадки, мм'
                  series={[{
                    id: 'precipitation',
                    name: 'Осадки, мм',
                    data: Array.from(data.hourly.precipitation || []).map(n => +n.toFixed(1))
                  }]}
                  categories={data.hourly.time.map(d => dayjs(d).format('MM-DD HH:mm'))}
                  isEmpty={!data.hourly.precipitation || data.hourly.precipitation.length === 0}
                  withAnimation={false}
                />
                <DefaultDiagram
                  className='weather-modal-chart'
                  title='Вероятность осадков, %'
                  series={[{
                    id: 'precipitation_probability',
                    name: 'Вероятность осадков, %',
                    data: Array.from(data.hourly.precipitation_probability || []).map(n => +n.toFixed(1))
                  }]}
                  categories={data.hourly.time.map(d => dayjs(d).format('MM-DD HH:mm'))}
                  isEmpty={!data.hourly.precipitation_probability || data.hourly.precipitation_probability.length === 0}
                  colors={['#1A7E01FF']}
                  withAnimation={false}
                />
              </>
            )
        }
      </div>
    </StyledModal>
  )
}
