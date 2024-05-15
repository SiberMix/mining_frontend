import { CloudDownloadOutlined } from '@ant-design/icons'
import { useCallback } from 'react'
import { useMatch } from 'react-router-dom'

import { AppRoutes } from '~shared/config/route-config/routeConfig'
import { StyledButton } from '~shared/ui/styled-button'

import { weatherStore } from '../../../model'

export const WeatherBtn = () => {
  const isWeatherPickModActive = weatherStore(state => state.isWeatherPickModActive)
  const setIsWeatherPickModActive = weatherStore(state => state.setIsWeatherPickModActive)
  const monitoringPage = useMatch(AppRoutes.MONITORING)

  const clickHandler = useCallback(() => {
    setIsWeatherPickModActive(!isWeatherPickModActive)
  }, [setIsWeatherPickModActive, isWeatherPickModActive])

  if (!monitoringPage) {
    return null
  }

  return (
    <StyledButton
      width='47px'
      height='auto'
      onClick={clickHandler}
    >
      <CloudDownloadOutlined
        width={20}
        height={20}
      />
    </StyledButton>
  )
}
