import type dayjs from 'dayjs'
import type { LatLngLiteral } from 'leaflet'

import type { forecastHourlyEnum } from '~widgets/weather/const'

export type WeatherStore = {
  isWeatherPickModActive: boolean,
  isWeatherModalOpen: boolean,
  weatherTime: Date,
  weatherCords: LatLngLiteral | null,
  setWeatherModalOpen: (open: boolean) => void,
  setIsWeatherPickModActive: (active: boolean) => void,
  setWeatherCords: (cords: WeatherStore['weatherCords']) => void
}

export type FetchWeatherInfo = {
  start_date?: dayjs.Dayjs,
  end_date?: dayjs.Dayjs,
  hourly?: forecastHourlyEnum | Array<forecastHourlyEnum>
} & LatLngLiteral

export type FetchWeatherInfoResult = {
  latitude: number,
  longitude: number,
  hourly: {
    time: Date[]
  } & { [key in forecastHourlyEnum]?: Float32Array }
}
