import dayjs from 'dayjs'
import { fetchWeatherApi } from 'openmeteo'

import { forecastHourlyEnum, forecastUrl } from '../const'
import { range } from '../lib'
import type { FetchWeatherInfo, FetchWeatherInfoResult } from '../types'

export const fetchWeatherInfo = async ({
  start_date = dayjs(),
  end_date = dayjs(),
  hourly = forecastHourlyEnum.temperature_2m,
  ...params
}: FetchWeatherInfo): Promise<FetchWeatherInfoResult> => {
  const fetchParams = {
    latitude: params.lat,
    longitude: params.lng,
    start_date: start_date.format('YYYY-MM-DD'),
    end_date: end_date.format('YYYY-MM-DD'),
    hourly: hourly
  }

  try {
    const responses = await fetchWeatherApi(forecastUrl, fetchParams)

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0]

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds()
    const latitude = response.latitude()
    const longitude = response.longitude()

    const responseHourly = response.hourly()!

    // response create by hourly keys
    const result: FetchWeatherInfoResult = {
      latitude,
      longitude,
      hourly: {
        time: range(Number(responseHourly.time()), Number(responseHourly.timeEnd()), responseHourly.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000))
      }
    }

    console.log(responseHourly.variables(1)!.valuesArray())

    if (Array.isArray(hourly)) {
      hourly.forEach((key, index) => {
        result.hourly[key] = responseHourly.variables(index)!.valuesArray()!
      })
    } else {
      result.hourly[hourly] = responseHourly.variables(0)!.valuesArray()!
    }

    return result

  } catch (err: unknown) {
    throw new Error(err as string | undefined)
  }
}
