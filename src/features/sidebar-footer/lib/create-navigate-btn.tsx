import React from 'react'
import type { NavigateFunction } from 'react-router/dist/lib/hooks'

import type { AnalyticConfigEnum, MonitoringConfigEnum } from '~features/navbar'
import { removeShowingPlayback } from '~processes/redux/slices/playBackSlice'
import { setMapClickForNewBaseCoord } from '~processes/redux/slices/settingsSlice'
import type { AppDispatch } from '~processes/redux/store'
import AnalyticSidebar from '~shared/assets/icons/analyс-sidebar.svg'
import MonitoringSidebar from '~shared/assets/icons/monitoring-sidebar.svg'
import { RoutePath } from '~shared/config/route-config'
import { Svg } from '~shared/ui/svg-styled'

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
  switch (pathname) {
    case RoutePath.monitoring:
      return (
        <Svg
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
        <Svg
          title='Мониторинг'
          className='SidebarFooter-icon'
          src={MonitoringSidebar}
          onClick={() => {
            setSidebarOpenContent(null)
            dispatch(setMapClickForNewBaseCoord(false))
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
