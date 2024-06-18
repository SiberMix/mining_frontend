import React from 'react'
import type { NavigateFunction } from 'react-router/dist/lib/hooks'

import type { AnalyticConfigEnum, MonitoringConfigEnum } from '~features/navbar'
import { removeShowingPlayback } from '~processes/redux/slices/playBackSlice'
import type { AppDispatch } from '~processes/redux/store'
import AnalyticSidebar from '~shared/assets/icons/analyс-sidebar.svg'
import MonitoringSidebar from '~shared/assets/icons/monitoring-sidebar.svg'
import { RoutePath } from '~shared/config/route-config'
import { StyledSvg } from '~shared/ui/styled-svg'
import { settingsStore } from '~widgets/settings'

type CreateNavigateBtnType = {
  pathname: string,
  setSidebarOpenContent: (sidebarContent: MonitoringConfigEnum | AnalyticConfigEnum | null) => void,
  dispatch: AppDispatch,
  navigate: NavigateFunction
}

export const createNavigateBtn = ({
  pathname,
  dispatch,
  setSidebarOpenContent,
  navigate
}: CreateNavigateBtnType) => {
  const setIsClickMapForNewBaseCord = settingsStore(state => state.setIsClickMapForNewBaseCord)

  switch (pathname) {
    case RoutePath.monitoring:
      return (
        <StyledSvg
          title='Аналитика'
          src={AnalyticSidebar}
          className='SidebarFooter-icon'
          onClick={() => {
            navigate(RoutePath.analytics)
            dispatch(removeShowingPlayback(null))
            setSidebarOpenContent(null)
          }}
        />
      )
    case RoutePath.analytics:
      return (
        <StyledSvg
          title='Мониторинг'
          className='SidebarFooter-icon'
          src={MonitoringSidebar}
          onClick={() => {
            setSidebarOpenContent(null)
            setIsClickMapForNewBaseCord(false)
            navigate(RoutePath.monitoring)
          }}
        />
      )
    case RoutePath.not_found:
    case RoutePath.auth:
      return null
    default:
      return null
  }

}
